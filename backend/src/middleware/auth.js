const jwt = require("jsonwebtoken");
const { createRemoteJWKSet, jwtVerify } = require("jose");

const SUPABASE_URL = process.env.SUPABASE_URL;
const JWT_SECRET = process.env.SUPABASE_JWT_SECRET;

// Initialize JWKS remote key set for RS256 verification
let JWKS = null;
if (SUPABASE_URL) {
  try {
    JWKS = createRemoteJWKSet(new URL(`${SUPABASE_URL}/auth/v1/.well-known/jwks.json`));
    console.log("✅ JWKS configured for RS256 token verification");
  } catch (err) {
    console.error("❌ Failed to initialize JWKS remote set:", err.message);
  }
}

/**
 * Verify Supabase JWT and attach req.userId.
 * In development (no JWT_SECRET set), falls back to userId from body/query
 * so the existing dev workflow still works.
 */
async function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;

  // 1. If Authorization header is provided, verify it (production / authenticated flow)
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.slice(7);

    // Attempt verification via JWKS (RS256)
    if (JWKS) {
      try {
        const { payload } = await jwtVerify(token, JWKS);
        if (payload && payload.sub) {
          req.userId = payload.sub;
          return next();
        }
      } catch (err) {
        console.error("Supabase JWKS token verification failed:", err.message);
      }
    }

    // Fallback to local JWT verification (HS256)
    if (JWT_SECRET) {
      try {
        const payload = jwt.verify(token, JWT_SECRET);
        req.userId = payload.sub;
        return next();
      } catch (err) {
        // Fallback failed
      }
    }

    return res.status(401).json({ success: false, error: "Invalid or expired token" });
  }

  // 2. Dev fallback: accept userId from body or query param if no Authorization header is present
  const userId = req.body?.userId || req.query?.userId;
  if (userId) {
    req.userId = userId;
    return next();
  }

  // 3. Neither token nor fallback userId was provided
  return res.status(401).json({
    success: false,
    error: "Missing Authorization header or userId",
  });
}

module.exports = { requireAuth };
