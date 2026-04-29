const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code, language, input }),
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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code, language, problemId }),
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
    const response = await fetch(`${API_BASE_URL}/progress`);
    
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
      },
      body: JSON.stringify({ problemId }),
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
