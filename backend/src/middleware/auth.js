const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.SUPABASE_JWT_SECRET;

/**
 * Verify Supabase JWT and attach req.userId.
 * In development (no JWT_SECRET set), falls back to userId from body/query
 * so the existing dev workflow still works.
 */
function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;

  // 1. If Authorization header is provided, verify it (production / authenticated flow)
  if (authHeader && authHeader.startsWith("Bearer ")) {
    if (!JWT_SECRET) {
      return res.status(401).json({ success: false, error: "JWT secret not configured on server" });
    }
    const token = authHeader.slice(7);
    try {
      const payload = jwt.verify(token, JWT_SECRET);
      req.userId = payload.sub;
      return next();
    } catch (err) {
      return res.status(401).json({ success: false, error: "Invalid or expired token" });
    }
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
    error: JWT_SECRET ? "Missing Authorization header or userId" : "userId required (dev mode)",
  });
}

module.exports = { requireAuth };
