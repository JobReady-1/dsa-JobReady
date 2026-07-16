const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// ─── Auth helpers ─────────────────────────────────────────────────────────────
// In production, set a Supabase access token via setAuthToken() after login.
// In dev (no token), a persistent local userId is sent instead — matches the
// backend's dev fallback in middleware/auth.js.

let _authToken = null;

export function setAuthToken(token) {
  _authToken = token;
}

export function getDevUserId() {
  let id = localStorage.getItem("dsa_dev_user_id");
  if (!id) {
    id = "dev-" + Math.random().toString(36).slice(2, 10);
    localStorage.setItem("dsa_dev_user_id", id);
  }
  return id;
}

function authHeaders() {
  return _authToken ? { Authorization: `Bearer ${_authToken}` } : {};
}

// Adds userId to a body object when running without a token (dev mode)
function withUser(body = {}) {
  return _authToken ? body : { ...body, userId: getDevUserId() };
}

// Adds userId as a query param when running without a token (dev mode)
function withUserQuery(url) {
  if (_authToken) return url;
  const sep = url.includes("?") ? "&" : "?";
  return `${url}${sep}userId=${encodeURIComponent(getDevUserId())}`;
}

// Helper function to fetch with timeout
async function fetchWithTimeout(url, options = {}, timeout = 30000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    if (error.name === 'AbortError') {
      throw new Error('Request timeout - code execution took too long');
    }
    throw error;
  }
}

export async function runCode(code, language, input = "") {
  try {
    const response = await fetchWithTimeout(
      `${API_BASE_URL}/run`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json", ...authHeaders() },
        body: JSON.stringify(withUser({ code, language, input })),
      },
      30000 // 30 second timeout
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || errorData.details || "Failed to run code");
    }

    return response.json();
  } catch (error) {
    console.error("[API] Run code error:", error);
    throw error;
  }
}

export async function submitCode(code, language, problemId) {
  try {
    const response = await fetchWithTimeout(
      `${API_BASE_URL}/submit`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json", ...authHeaders() },
        body: JSON.stringify(withUser({ code, language, problemId })),
      },
      60000 // 60 second timeout for submissions (multiple test cases)
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || errorData.details || "Failed to submit code");
    }

    return response.json();
  } catch (error) {
    console.error("[API] Submit code error:", error);
    throw error;
  }
}

export async function getSubmissionStatus(submissionId) {
  try {
    const response = await fetch(
      withUserQuery(`${API_BASE_URL}/submissions/status/${submissionId}`),
      { headers: authHeaders() }
    );
    if (!response.ok) throw new Error("Failed to fetch submission status");
    return response.json();
  } catch (error) {
    console.error("[API] Get submission status error:", error);
    throw error;
  }
}

export async function getProblems() {
  const response = await fetch(`${API_BASE_URL}/problems`);

  if (!response.ok) {
    throw new Error("Failed to fetch problems");
  }

  return response.json();
}

export async function getProblem(id) {
  const response = await fetch(`${API_BASE_URL}/problems/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch problem");
  }

  return response.json();
}

// Progress API functions
export async function getProgress() {
  try {
    const response = await fetch(withUserQuery(`${API_BASE_URL}/progress`), {
      headers: authHeaders(),
    });
    
    if (!response.ok) {
      throw new Error("Failed to fetch progress");
    }
    
    return response.json();
  } catch (error) {
    console.error("[API] Get progress error:", error);
    throw error;
  }
}

export async function markProblemSolved(problemId) {
  try {
    const response = await fetch(`${API_BASE_URL}/progress/solve`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...authHeaders(),
      },
      body: JSON.stringify(withUser({ problemId })),
    });
    
    if (!response.ok) {
      throw new Error("Failed to mark problem as solved");
    }
    
    return response.json();
  } catch (error) {
    console.error("[API] Mark problem solved error:", error);
    throw error;
  }
}

export async function startSession() {
  try {
    const response = await fetch(`${API_BASE_URL}/progress/start-session`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...authHeaders() },
      body: JSON.stringify(withUser()),
    });
    
    if (!response.ok) {
      throw new Error("Failed to start session");
    }
    
    return response.json();
  } catch (error) {
    console.error("[API] Start session error:", error);
    throw error;
  }
}

export async function updateTimeSpent() {
  try {
    const response = await fetch(`${API_BASE_URL}/progress/update-time`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...authHeaders() },
      body: JSON.stringify(withUser()),
    });
    
    if (!response.ok) {
      throw new Error("Failed to update time spent");
    }
    
    return response.json();
  } catch (error) {
    console.error("[API] Update time error:", error);
    throw error;
  }
}

export async function resetProgress() {
  try {
    const response = await fetch(`${API_BASE_URL}/progress/reset`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...authHeaders() },
      body: JSON.stringify(withUser()),
    });
    
    if (!response.ok) {
      throw new Error("Failed to reset progress");
    }
    
    return response.json();
  } catch (error) {
    console.error("[API] Reset progress error:", error);
    throw error;
  }
}

// ─── Analytics ────────────────────────────────────────────────────────────────

export async function getAnalytics() {
  const response = await fetch(withUserQuery(`${API_BASE_URL}/analytics`), {
    headers: authHeaders(),
  });
  if (!response.ok) throw new Error("Failed to fetch analytics");
  return response.json();
}

export async function recomputeAnalytics() {
  const response = await fetch(`${API_BASE_URL}/analytics/recompute`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(withUser()),
  });
  if (!response.ok) throw new Error("Failed to recompute analytics");
  return response.json();
}

// ─── Code drafts & submission history ────────────────────────────────────────

export async function saveDraft(problemId, language, code) {
  const response = await fetch(`${API_BASE_URL}/code/save`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(withUser({ problemId, language, code })),
  });
  if (!response.ok) throw new Error("Failed to save draft");
  return response.json();
}

export async function getDraft(problemId, language) {
  const response = await fetch(
    withUserQuery(`${API_BASE_URL}/code/${problemId}/${language}`),
    { headers: authHeaders() }
  );
  if (!response.ok) throw new Error("Failed to fetch draft");
  return response.json();
}

export async function getSubmissions(problemId) {
  const response = await fetch(
    withUserQuery(`${API_BASE_URL}/submissions/${problemId}`),
    { headers: authHeaders() }
  );
  if (!response.ok) throw new Error("Failed to fetch submissions");
  return response.json();
}
