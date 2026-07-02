const { exec } = require("child_process");
const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const { executeWithDocker } = require("./dockerExecutor");
const { isJudge0Configured, executeWithJudge0, executeBatchWithJudge0 } = require("./judge0Executor");

const TEMP_DIR = path.join(__dirname, "../../temp");
const TIMEOUT = 10000;

// Detect Docker availability once at startup
let dockerAvailable = null;
async function isDockerAvailable() {
  if (dockerAvailable !== null) return dockerAvailable;
  return new Promise((resolve) => {
    exec("docker info", { timeout: 3000 }, (err) => {
      dockerAvailable = !err;
      if (dockerAvailable) {
        console.log("[Executor] Docker detected — using sandboxed execution");
      } else {
        console.warn(
          "[Executor] Docker not available — falling back to local execution (dev only)"
        );
      }
      resolve(dockerAvailable);
    });
  });
}

// ─── Local fallback (dev only) ───────────────────────────────────────────────

const LOCAL_CONFIG = {
  java8: {
    extension: "java",
    compile: (f) => `javac ${f}.java`,
    run: (f) => `java ${f}`,
    className: "Solution",
  },
  python: {
    extension: "py",
    run: (f) => `python ${f}.py`,
  },
  cpp: {
    extension: "cpp",
    compile: (f) => `g++ -o ${f} ${f}.cpp -std=c++17`,
    run: (f) => `./${f}`,
  },
  javascript: {
    extension: "js",
    run: (f) => `node ${f}.js`,
  },
};

async function ensureTempDir() {
  try {
    await fs.access(TEMP_DIR);
  } catch {
    await fs.mkdir(TEMP_DIR, { recursive: true });
  }
}

function executeCommand(command, input = "", cwd = TEMP_DIR) {
  return new Promise((resolve, reject) => {
    const child = exec(
      command,
      { cwd, timeout: TIMEOUT, maxBuffer: 1024 * 1024 },
      (error, stdout, stderr) => {
        if (error) {
          if (error.killed || error.signal === "SIGTERM") {
            reject(new Error("Time Limit Exceeded"));
          } else {
            reject(new Error(stderr || error.message));
          }
        } else {
          resolve({ stdout: stdout.trim(), stderr: stderr.trim() });
        }
      }
    );
    try {
      child.stdin.write(input ? input + "\n" : "");
      child.stdin.end();
    } catch {
      reject(new Error("Failed to write input to process"));
    }
  });
}

async function executeLocally(code, language, input = "") {
  await ensureTempDir();
  const config = LOCAL_CONFIG[language];
  if (!config) throw new Error(`Unsupported language: ${language}`);

  const fileId = uuidv4();
  const fileName = language === "java8" ? config.className : fileId;
  const filePath = path.join(TEMP_DIR, `${fileName}.${config.extension}`);
  const compiledPath =
    language === "cpp" ? path.join(TEMP_DIR, fileName) : null;

  try {
    await fs.writeFile(filePath, code);

    if (config.compile) {
      try {
        const cr = await executeCommand(config.compile(fileName));
        if (cr.stderr) {
          return { success: false, error: "Compilation Error", details: cr.stderr, runtime_ms: 0 };
        }
      } catch (err) {
        return { success: false, error: "Compilation Error", details: err.message, runtime_ms: 0 };
      }
    }

    const startTime = Date.now();
    try {
      const result = await executeCommand(config.run(fileName), input);
      return {
        success: true,
        output: result.stdout,
        error: result.stderr || null,
        runtime_ms: Date.now() - startTime,
      };
    } catch (err) {
      const isTLE = err.message.includes("Time Limit");
      const isEOF = err.message.includes("EOFError") || err.message.includes("EOF");
      return {
        success: false,
        error: isTLE ? "Time Limit Exceeded" : isEOF ? "Input Error" : "Runtime Error",
        details: isEOF
          ? "Your code called input() but no input was provided."
          : err.message,
        runtime_ms: Date.now() - startTime,
      };
    }
  } finally {
    try { await fs.unlink(filePath); } catch {}
    if (compiledPath) try { await fs.unlink(compiledPath); } catch {}
  }
}

// ─── Public API ──────────────────────────────────────────────────────────────

// Execution priority: Judge0 (if configured) → Docker → local (dev only)
let judge0Announced = false;
async function executeCode(code, language, input = "") {
  if (isJudge0Configured()) {
    if (!judge0Announced) {
      console.log("[Executor] Judge0 configured — using Judge0 for execution");
      judge0Announced = true;
    }
    try {
      return await executeWithJudge0(code, language, input);
    } catch (err) {
      console.error("[Executor] Judge0 failed, falling back:", err.message);
    }
  }
  const useDocker = await isDockerAvailable();
  if (useDocker) {
    return executeWithDocker(code, language, input);
  }
  return executeLocally(code, language, input);
}

function normalizeOutput(output) {
  if (!output) return "";
  return output
    .trim()
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .replace(/\s+$/gm, "")
    .replace(/\n+$/, "")
    .replace(/^\n+/, "");
}

async function runTestCases(code, language, testCases) {
  const results = [];

  // Judge0 batch: run all test cases in one round-trip
  let batchResults = null;
  if (isJudge0Configured()) {
    try {
      batchResults = await executeBatchWithJudge0(
        code,
        language,
        testCases.map((tc) => tc.input)
      );
    } catch (err) {
      console.error("[Executor] Judge0 batch failed, falling back to sequential:", err.message);
    }
  }

  for (let i = 0; i < testCases.length; i++) {
    const tc = testCases[i];
    const result = batchResults ? batchResults[i] : await executeCode(code, language, tc.input);

    if (!result.success) {
      results.push({
        testCase: i + 1,
        passed: false,
        input: tc.input,
        expectedOutput: tc.output,
        actualOutput: null,
        error: result.error,
        details: result.details,
        runtime_ms: result.runtime_ms || 0,
        isHidden: tc.isHidden || false,
      });
    } else {
      const normalizedActual = normalizeOutput(result.output);
      const normalizedExpected = normalizeOutput(tc.output);
      const passed = normalizedActual === normalizedExpected;

      results.push({
        testCase: i + 1,
        passed,
        input: tc.isHidden ? "[hidden]" : tc.input,
        expectedOutput: tc.isHidden ? "[hidden]" : tc.output,
        actualOutput: tc.isHidden && !passed ? "[hidden]" : result.output,
        normalizedActual: tc.isHidden ? undefined : normalizedActual,
        normalizedExpected: tc.isHidden ? undefined : normalizedExpected,
        error: null,
        runtime_ms: result.runtime_ms || 0,
        isHidden: tc.isHidden || false,
      });
    }
  }

  const allPassed = results.every((r) => r.passed);
  const passedCount = results.filter((r) => r.passed).length;
  const avgRuntime =
    results.length > 0
      ? Math.round(results.reduce((s, r) => s + (r.runtime_ms || 0), 0) / results.length)
      : 0;

  return {
    allPassed,
    passedCount,
    totalCount: testCases.length,
    avgRuntime_ms: avgRuntime,
    results,
  };
}

module.exports = { executeCode, runTestCases };
