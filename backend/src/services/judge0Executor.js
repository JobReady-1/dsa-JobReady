/**
 * Judge0 executor — preferred execution backend when configured.
 *
 * Works with either:
 *  - Self-hosted Judge0 CE (docker-compose): set JUDGE0_URL=http://localhost:2358
 *  - Judge0 CE on RapidAPI: set JUDGE0_URL=https://judge0-ce.p.rapidapi.com
 *    and JUDGE0_API_KEY=<your RapidAPI key>
 *
 * Uses base64 encoding for safe transport and wait=true for synchronous results.
 */

const JUDGE0_URL = process.env.JUDGE0_URL || "";
const JUDGE0_API_KEY = process.env.JUDGE0_API_KEY || "";

// Judge0 CE language IDs — https://ce.judge0.com/languages
// Keys match the language identifiers used across the app.
const LANGUAGE_IDS = {
  python: 71,      // Python 3.8.1
  javascript: 63,  // Node.js 12.14
  java8: 62,       // Java (OpenJDK 13)
  java: 62,
  cpp: 54,         // C++ (GCC 9.2.0)
  c: 50,           // C (GCC 9.2.0)
  csharp: 51,      // C# (Mono 6.6)
  go: 60,          // Go 1.13.5
  rust: 73,        // Rust 1.40.0
  kotlin: 78,      // Kotlin 1.3.70
  swift: 83,       // Swift 5.2.3
  typescript: 74,  // TypeScript 3.7.4
  ruby: 72,        // Ruby 2.7.0
  php: 68,         // PHP 7.4.1
};

function isJudge0Configured() {
  return Boolean(JUDGE0_URL);
}

function headers() {
  const h = { "Content-Type": "application/json" };
  if (JUDGE0_API_KEY) {
    h["X-RapidAPI-Key"] = JUDGE0_API_KEY;
    h["X-RapidAPI-Host"] = new URL(JUDGE0_URL).host;
  }
  return h;
}

const b64encode = (s) => Buffer.from(s ?? "", "utf8").toString("base64");
const b64decode = (s) => (s ? Buffer.from(s, "base64").toString("utf8") : "");

/**
 * Execute code once with the given stdin. Returns the same shape as the
 * Docker/local executors: { success, output, error, details, runtime_ms }
 */
async function executeWithJudge0(code, language, input = "") {
  const languageId = LANGUAGE_IDS[language];
  if (!languageId) {
    return {
      success: false,
      error: "Unsupported Language",
      details: `Judge0 mapping missing for "${language}"`,
      runtime_ms: 0,
    };
  }

  const res = await fetch(
    `${JUDGE0_URL}/submissions?base64_encoded=true&wait=true`,
    {
      method: "POST",
      headers: headers(),
      body: JSON.stringify({
        source_code: b64encode(code),
        language_id: languageId,
        stdin: b64encode(input ? input + "\n" : ""),
        cpu_time_limit: 5,      // seconds
        memory_limit: 128000,   // KB
      }),
    }
  );

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Judge0 request failed (${res.status}): ${text.slice(0, 200)}`);
  }

  const data = await res.json();
  const statusId = data.status?.id;
  const runtime_ms = data.time ? Math.round(parseFloat(data.time) * 1000) : 0;

  // Judge0 status IDs: 3=Accepted, 4=Wrong Answer (only with expected_output),
  // 5=TLE, 6=Compilation Error, 7-12=Runtime Errors, 13=Internal, 14=Exec Format
  if (statusId === 3 || statusId === 4) {
    return {
      success: true,
      output: b64decode(data.stdout).trim(),
      error: b64decode(data.stderr).trim() || null,
      runtime_ms,
      memory_kb: data.memory ?? null,
    };
  }

  if (statusId === 5) {
    return { success: false, error: "Time Limit Exceeded", details: "Execution exceeded the 5s CPU limit", runtime_ms };
  }
  if (statusId === 6) {
    return { success: false, error: "Compilation Error", details: b64decode(data.compile_output), runtime_ms: 0 };
  }
  if (statusId >= 7 && statusId <= 12) {
    return {
      success: false,
      error: "Runtime Error",
      details: b64decode(data.stderr) || data.status?.description || "Runtime error",
      runtime_ms,
    };
  }
  return {
    success: false,
    error: "Execution Error",
    details: data.status?.description || "Unknown Judge0 status",
    runtime_ms,
  };
}

/**
 * Batch execution — one HTTP round-trip for all test cases.
 * Falls back gracefully; caller handles per-case results.
 */
async function executeBatchWithJudge0(code, language, inputs) {
  const languageId = LANGUAGE_IDS[language];
  if (!languageId) throw new Error(`Judge0 mapping missing for "${language}"`);

  const res = await fetch(
    `${JUDGE0_URL}/submissions/batch?base64_encoded=true`,
    {
      method: "POST",
      headers: headers(),
      body: JSON.stringify({
        submissions: inputs.map((input) => ({
          source_code: b64encode(code),
          language_id: languageId,
          stdin: b64encode(input ? input + "\n" : ""),
          cpu_time_limit: 5,
          memory_limit: 128000,
        })),
      }),
    }
  );

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Judge0 batch failed (${res.status}): ${text.slice(0, 200)}`);
  }

  const tokens = (await res.json()).map((t) => t.token);

  // Poll until every submission has finished (status > 2)
  const fields = "status_id,stdout,stderr,compile_output,time,memory";
  for (let attempt = 0; attempt < 30; attempt++) {
    const pollRes = await fetch(
      `${JUDGE0_URL}/submissions/batch?tokens=${tokens.join(",")}&base64_encoded=true&fields=${fields}`,
      { headers: headers() }
    );
    if (!pollRes.ok) throw new Error(`Judge0 poll failed (${pollRes.status})`);
    const { submissions } = await pollRes.json();

    if (submissions.every((s) => s.status_id > 2)) {
      return submissions.map((s) => {
        const runtime_ms = s.time ? Math.round(parseFloat(s.time) * 1000) : 0;
        if (s.status_id === 3 || s.status_id === 4) {
          return {
            success: true,
            output: b64decode(s.stdout).trim(),
            error: b64decode(s.stderr).trim() || null,
            runtime_ms,
            memory_kb: s.memory ?? null,
          };
        }
        if (s.status_id === 5) {
          return { success: false, error: "Time Limit Exceeded", details: "Execution exceeded the 5s CPU limit", runtime_ms };
        }
        if (s.status_id === 6) {
          return { success: false, error: "Compilation Error", details: b64decode(s.compile_output), runtime_ms: 0 };
        }
        return {
          success: false,
          error: s.status_id >= 7 && s.status_id <= 12 ? "Runtime Error" : "Execution Error",
          details: b64decode(s.stderr) || `Judge0 status ${s.status_id}`,
          runtime_ms,
        };
      });
    }
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error("Judge0 batch timed out waiting for results");
}

module.exports = {
  isJudge0Configured,
  executeWithJudge0,
  executeBatchWithJudge0,
  SUPPORTED_LANGUAGES: Object.keys(LANGUAGE_IDS),
};
