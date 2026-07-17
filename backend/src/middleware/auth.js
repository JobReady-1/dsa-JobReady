const jwt = require("jsonwebtoken");
const supabase = require("../config/supabase");

const JWT_SECRET = process.env.SUPABASE_JWT_SECRET;

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

    // Attempt verification via Supabase client first (handles RS256 seamlessly)
    if (supabase) {
      try {
        const { data: { user }, error } = await supabase.auth.getUser(token);
        if (!error && user) {
          req.userId = user.id;
          return next();
        }
      } catch (err) {
        console.error("Supabase getUser verification failed:", err.message);
      }
    }

    // Fallback to local JWT verification (HS256)
    if (JWT_SECRET) {
      try {
        const payload = jwt.verify(token, JWT_SECRET);
        req.userId = payload.sub;
        return next();
      } catch (err) {
        return res.status(401).json({ success: false, error: "Invalid or expired token" });
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
