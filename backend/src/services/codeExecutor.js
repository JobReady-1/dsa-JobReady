const { exec } = require("child_process");
const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const TEMP_DIR = path.join(__dirname, "../../temp");
const TIMEOUT = 10000; // 10 seconds (increased from 5)

// Language configurations
const LANGUAGE_CONFIG = {
  java8: {
    extension: "java",
    compile: (fileName) => `javac ${fileName}.java`,
    run: (fileName) => `java ${fileName}`,
    className: "Solution",
  },
  python: {
    extension: "py",
    run: (fileName) => `python ${fileName}.py`,
  },
  cpp: {
    extension: "cpp",
    compile: (fileName) => `g++ -o ${fileName} ${fileName}.cpp -std=c++17`,
    run: (fileName) => `./${fileName}`,
  },
  javascript: {
    extension: "js",
    run: (fileName) => `node ${fileName}.js`,
  },
};

// Ensure temp directory exists
async function ensureTempDir() {
  try {
    await fs.access(TEMP_DIR);
  } catch {
    await fs.mkdir(TEMP_DIR, { recursive: true });
  }
}

// Execute command with timeout
function executeCommand(command, input = "", cwd = TEMP_DIR) {
  return new Promise((resolve, reject) => {
    console.log(`[Executor] Running command: ${command}`);
    console.log(`[Executor] Input length: ${input.length} chars`);
    
    const child = exec(
      command,
      {
        cwd,
        timeout: TIMEOUT,
        maxBuffer: 1024 * 1024, // 1MB
        killSignal: 'SIGTERM',
      },
      (error, stdout, stderr) => {
        if (error) {
          console.log(`[Executor] Error occurred:`, error.message);
          if (error.killed || error.signal === 'SIGTERM') {
            reject(new Error("Time Limit Exceeded"));
          } else {
            reject(new Error(stderr || error.message));
          }
        } else {
          console.log(`[Executor] Success - Output length: ${stdout.length} chars`);
          resolve({ stdout: stdout.trim(), stderr: stderr.trim() });
        }
      }
    );

    if (input) {
      try {
        child.stdin.write(input + '\n');
        child.stdin.end();
      } catch (err) {
        console.log(`[Executor] Error writing input:`, err.message);
        reject(new Error("Failed to write input to process"));
      }
    } else {
      child.stdin.end();
    }
  });
}

// Clean up temporary files
async function cleanup(filePath, compiledPath = null) {
  try {
    await fs.unlink(filePath);
    if (compiledPath) {
      await fs.unlink(compiledPath);
    }
  } catch (err) {
    console.error("Cleanup error:", err);
  }
}

// Main execution function
async function executeCode(code, language, input = "") {
  console.log(`[Executor] Starting execution - Language: ${language}`);
  
  await ensureTempDir();

  const config = LANGUAGE_CONFIG[language];
  if (!config) {
    throw new Error(`Unsupported language: ${language}`);
  }

  const fileId = uuidv4();
  const fileName = language === "java8" ? config.className : fileId;
  const filePath = path.join(TEMP_DIR, `${fileName}.${config.extension}`);
  const compiledPath = language === "cpp" ? path.join(TEMP_DIR, fileName) : null;

  console.log(`[Executor] File path: ${filePath}`);

  try {
    // Write code to file
    await fs.writeFile(filePath, code);
    console.log(`[Executor] Code written to file`);

    // Compile if needed
    if (config.compile) {
      console.log(`[Executor] Compiling...`);
      try {
        const compileResult = await executeCommand(config.compile(fileName));
        if (compileResult.stderr) {
          console.log(`[Executor] Compilation warning/error:`, compileResult.stderr);
          await cleanup(filePath, compiledPath);
          return {
            success: false,
            error: "Compilation Error",
            details: compileResult.stderr,
          };
        }
        console.log(`[Executor] Compilation successful`);
      } catch (err) {
        console.log(`[Executor] Compilation failed:`, err.message);
        await cleanup(filePath, compiledPath);
        return {
          success: false,
          error: "Compilation Error",
          details: err.message,
        };
      }
    }

    // Execute code
    console.log(`[Executor] Executing code...`);
    try {
      const result = await executeCommand(config.run(fileName), input);
      console.log(`[Executor] Execution successful`);
      await cleanup(filePath, compiledPath);
      
      return {
        success: true,
        output: result.stdout,
        error: result.stderr || null,
      };
    } catch (err) {
      console.log(`[Executor] Execution failed:`, err.message);
      await cleanup(filePath, compiledPath);
      return {
        success: false,
        error: err.message.includes("Time Limit") ? "Time Limit Exceeded" : "Runtime Error",
        details: err.message,
      };
    }
  } catch (err) {
    console.log(`[Executor] Unexpected error:`, err.message);
    await cleanup(filePath, compiledPath);
    throw err;
  }
}

// Normalize output for comparison
function normalizeOutput(output) {
  if (!output) return "";
  
  return output
    .trim()                           // Remove leading/trailing whitespace
    .replace(/\r\n/g, "\n")          // Normalize line endings (Windows to Unix)
    .replace(/\r/g, "\n")            // Handle old Mac line endings
    .replace(/\s+$/gm, "")           // Remove trailing whitespace from each line
    .replace(/\n+$/, "")             // Remove trailing newlines
    .replace(/^\n+/, "");            // Remove leading newlines
}

// Run code against test cases
async function runTestCases(code, language, testCases) {
  const results = [];

  for (let i = 0; i < testCases.length; i++) {
    const testCase = testCases[i];
    const result = await executeCode(code, language, testCase.input);

    if (!result.success) {
      results.push({
        testCase: i + 1,
        passed: false,
        input: testCase.input,
        expectedOutput: testCase.output,
        actualOutput: null,
        error: result.error,
        details: result.details,
      });
    } else {
      // Normalize both outputs for comparison
      const normalizedActual = normalizeOutput(result.output);
      const normalizedExpected = normalizeOutput(testCase.output);
      const passed = normalizedActual === normalizedExpected;
      
      results.push({
        testCase: i + 1,
        passed,
        input: testCase.input,
        expectedOutput: testCase.output,
        actualOutput: result.output,
        normalizedActual,
        normalizedExpected,
        error: null,
      });
    }
  }

  const allPassed = results.every((r) => r.passed);
  const passedCount = results.filter((r) => r.passed).length;

  return {
    allPassed,
    passedCount,
    totalCount: testCases.length,
    results,
  };
}

module.exports = {
  executeCode,
  runTestCases,
};
