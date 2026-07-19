const { execFile } = require("child_process");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const TEMP_DIR = path.join(__dirname, "../../temp_submissions");
if (!fs.existsSync(TEMP_DIR)) {
  fs.mkdirSync(TEMP_DIR, { recursive: true });
}

function runProcess(cmd, args, input) {
  return new Promise((resolve) => {
    const child = execFile(cmd, args, { timeout: 2000, maxBuffer: 1024 * 1024 }, (error, stdout, stderr) => {
      if (error) {
        if (error.code === "ENOENT") {
          return resolve({ enoent: true });
        }
        if (error.killed) {
          return resolve({
            success: false,
            error: "Time Limit Exceeded",
            details: "Code execution took longer than 2 seconds",
          });
        }
        return resolve({
          success: false,
          error: "Runtime Error",
          details: stderr || error.message,
        });
      }
      resolve({
        success: true,
        output: stdout,
        error: stderr || null,
      });
    });

    if (input && child.stdin) {
      try {
        child.stdin.write(input);
        child.stdin.end();
      } catch (e) {
        // Handle stream write errors if process dies early
      }
    }
  });
}

async function executeLocal(code, language, input = "") {
  const fileExt = language === "python" ? "py" : "js";
  const fileName = `${uuidv4()}.${fileExt}`;
  const filePath = path.join(TEMP_DIR, fileName);

  try {
    fs.writeFileSync(filePath, code);

    let result;
    if (language === "python") {
      result = await runProcess("python3", [filePath], input);
      if (result.enoent) {
        result = await runProcess("python", [filePath], input);
      }
    } else if (language === "javascript") {
      result = await runProcess("node", [filePath], input);
    } else {
      throw new Error(`Language ${language} not supported locally`);
    }

    try { fs.unlinkSync(filePath); } catch (e) {}

    if (result.enoent) {
      return {
        success: false,
        error: "System Error",
        details: "Python/Node interpreter not found in container path",
      };
    }

    return result;
  } catch (err) {
    try { fs.unlinkSync(filePath); } catch (e) {}
    return {
      success: false,
      error: "System Error",
      details: err.message,
    };
  }
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

async function runTestCases(code, language, testCases, onProgress = null) {
  const results = new Array(testCases.length);
  const batchSize = 5;
  const startTime = Date.now();

  for (let i = 0; i < testCases.length; i += batchSize) {
    const batch = testCases.slice(i, i + batchSize);

    const promises = batch.map(async (testCase, index) => {
      const globalIndex = i + index;

      const result = await executeLocal(code, language, testCase.input);

      let testCaseResult;
      if (!result.success) {
        testCaseResult = {
          testCase: globalIndex + 1,
          passed: false,
          input: testCase.input,
          expectedOutput: testCase.output,
          actualOutput: null,
          error: result.error,
          details: result.details,
          time: 0,
          memory: 0,
        };
      } else {
        const normalizedActual = normalizeOutput(result.output);
        const normalizedExpected = normalizeOutput(testCase.output);
        const passed = normalizedActual === normalizedExpected;

        testCaseResult = {
          testCase: globalIndex + 1,
          passed,
          input: testCase.input,
          expectedOutput: testCase.output,
          actualOutput: result.output,
          normalizedActual,
          normalizedExpected,
          error: null,
          time: 0.01,
          memory: 1024,
        };
      }

      results[globalIndex] = testCaseResult;
    });

    await Promise.all(promises);

    if (typeof onProgress === "function") {
      const completedCount = Math.min(i + batchSize, testCases.length);
      onProgress(completedCount, testCases.length);
    }
  }

  const allPassed = results.every((r) => r.passed);
  const passedCount = results.filter((r) => r.passed).length;
  const totalTimeMs = Date.now() - startTime;

  return {
    allPassed,
    passedCount,
    totalCount: testCases.length,
    results,
    metrics: {
      queue_wait_time: 5,
      total_execution_time_ms: totalTimeMs,
      max_time_seconds: (totalTimeMs / 1000).toFixed(2),
      max_memory_kb: 4096,
    },
  };
}

module.exports = {
  executeCode: executeLocal,
  runTestCases,
  isConfigured: () => true,
};
