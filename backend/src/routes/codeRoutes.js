const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const { v4: uuidv4 } = require("uuid");
const { executeCode, isConfigured } = require("../services/codeExecutorJudge0");
const { getProblem, getAllProblems } = require("../data/problems");
const { submissionQueue, connection } = require("../services/submissionQueue");
const SubmissionsModel = require("../models/Submissions");

// Check if Judge0 is configured
if (!isConfigured()) {
  console.warn('⚠️  WARNING: Judge0 is not configured. Add JUDGE0_API_KEY to .env');
}

// ----------------------------------------------------
// UTILITIES & MIDDLEWARE
// ----------------------------------------------------

// Native Supabase JWT verifier (HS256 signature verification)
function base64UrlDecode(str) {
  str = str.replace(/-/g, '+').replace(/_/g, '/');
  while (str.length % 4) {
    str += '=';
  }
  return Buffer.from(str, 'base64');
}

function verifySupabaseJWT(token, secret) {
  try {
    const [headerStr, payloadStr, signatureStr] = token.split('.');
    if (!headerStr || !payloadStr || !signatureStr) return null;
    
    // Verify signature
    const hmac = crypto.createHmac('sha256', secret);
    hmac.update(`${headerStr}.${payloadStr}`);
    const expectedSignature = hmac.digest('base64')
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
      
    if (signatureStr !== expectedSignature) {
      console.warn('[Auth] JWT signature mismatch');
      return null;
    }
    
    return JSON.parse(base64UrlDecode(payloadStr).toString('utf8'));
  } catch (err) {
    console.warn('[Auth] JWT verification error:', err.message);
    return null;
  }
}

// JWT Extractor Middleware
const extractUserId = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7);
    const secret = process.env.SUPABASE_JWT_SECRET;
    if (secret) {
      const payload = verifySupabaseJWT(token, secret);
      if (payload && payload.sub) {
        req.verifiedUserId = payload.sub;
      }
    }
  }
  next();
};

// Redis-based Rate Limiter Middleware
const rateLimit = (limit, windowSecs) => async (req, res, next) => {
  try {
    if (!connection) {
      return next(); // Bypass if Redis is not configured
    }
    const ip = req.ip || 'global';
    const key = `ratelimit:${req.path}:${ip}`;
    const current = await connection.incr(key);
    if (current === 1) {
      await connection.expire(key, windowSecs);
    }
    if (current > limit) {
      return res.status(429).json({
        success: false,
        error: 'Too many requests. Please wait a moment.',
      });
    }
    next();
  } catch (err) {
    next();
  }
};

// Apply JWT extraction globally to all routes
router.use(extractUserId);

// ----------------------------------------------------
// ROUTES
// ----------------------------------------------------

// Get all problems
router.get("/problems", (req, res) => {
  try {
    const problems = getAllProblems();
    res.json({ success: true, problems });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get specific problem
router.get("/problems/:id", (req, res) => {
  try {
    const problem = getProblem(parseInt(req.params.id));
    if (!problem) {
      return res.status(404).json({ success: false, error: "Problem not found" });
    }
    res.json({ success: true, problem });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Run code (without test cases - for sandbox preview)
// Limit: 40 runs per minute
router.post("/run", rateLimit(40, 60), async (req, res) => {
  console.log("[API] /run endpoint called");
  try {
    const { code, language, input } = req.body;

    if (!code || !language) {
      console.log("[API] Missing code or language");
      return res.status(400).json({
        success: false,
        error: "Code and language are required",
      });
    }

    console.log(`[API] Running code - Language: ${language}, Input length: ${input?.length || 0}`);
    const result = await executeCode(code, language, input || "");
    console.log(`[API] Execution result:`, result.success ? "Success" : "Failed");
    res.json(result);
  } catch (error) {
    console.error("[API] Run error:", error);
    res.status(500).json({
      success: false,
      error: "Execution failed",
      details: error.message,
    });
  }
});

// Submit code (decoupled queue endpoint)
// Limit: 15 submissions per minute
router.post("/submit", rateLimit(15, 60), async (req, res) => {
  console.log("[API] /submit (decoupled) endpoint called");
  try {
    const { code, language, problemId } = req.body;
    
    // Resolve user identity: Auth token has absolute priority over body param, fallback to user_001
    const userId = req.verifiedUserId || req.body.userId || 'user_001';

    if (!code || !language || !problemId) {
      console.log("[API] Missing required fields");
      return res.status(400).json({
        success: false,
        error: "Code, language, and problemId are required",
      });
    }

    const problem = getProblem(parseInt(problemId));
    if (!problem) {
      console.log("[API] Problem not found");
      return res.status(404).json({
        success: false,
        error: "Problem not found",
      });
    }

    // 1. Generate Submission UUID
    const submissionId = uuidv4();
    console.log(`[API] Creating submission ${submissionId} for user ${userId}`);

    // 2. Pre-insert record into database durably (status: queued)
    await SubmissionsModel.createQueued(submissionId, userId, parseInt(problemId), language);

    // 3. Write initial queued state to Redis cache
    const initialStatus = {
      status: 'queued',
      current: 0,
      total: problem.testCases?.length || 0
    };
    await connection.setex(`submission:status:${submissionId}`, 3600, JSON.stringify(initialStatus));

    // 4. Enqueue in BullMQ, unifying job ID to matching submissionId UUID
    await submissionQueue.add(
      'submission',
      { submissionId, userId, problemId: parseInt(problemId), language, code },
      { jobId: submissionId }
    );

    res.json({
      success: true,
      submissionId,
    });

  } catch (error) {
    console.error("[API] Submit error:", error);
    res.status(500).json({
      success: false,
      error: "Submission failed to enqueue",
      details: error.message,
    });
  }
});

// Fetch asynchronous execution progress and status
router.get("/submissions/status/:id", async (req, res) => {
  const submissionId = req.params.id;
  try {
    // 1. Check Redis cache first (Fast Path)
    const cachedData = await connection.get(`submission:status:${submissionId}`);
    if (cachedData) {
      const parsed = JSON.parse(cachedData);
      return res.json({
        success: true,
        ...parsed,
      });
    }

    // 2. Fall back to Postgres Database (Cold Path)
    console.log(`[API] Redis cache cold. Querying DB for submission ${submissionId}`);
    const submission = await SubmissionsModel.getById(submissionId);
    if (!submission) {
      return res.status(404).json({
        success: false,
        error: "Submission not found",
      });
    }

    // If it's stored as completed/failed in the DB, return it
    const resultsObj = submission.results || {};
    if (resultsObj.status === 'queued' || resultsObj.status === 'running') {
      return res.json({
        success: true,
        status: resultsObj.status,
        current: resultsObj.current || 0,
        total: resultsObj.total || 0,
      });
    }

    // Default to completed if metrics exist
    res.json({
      success: true,
      status: resultsObj.status || 'completed',
      allPassed: submission.allPassed,
      passedCount: submission.passedCount,
      totalCount: submission.totalCount,
      results: resultsObj.results || [],
      metrics: resultsObj.metrics || {},
    });

  } catch (error) {
    console.error("[API] Status polling error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to load submission status",
      details: error.message,
    });
  }
});

module.exports = router;
