const { exec, execFile } = require("child_process");
const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const TEMP_DIR = path.join(__dirname, "../../temp");
const DOCKER_TIMEOUT = 10000; // 10 seconds
const MEMORY_LIMIT = "128m";
const CPU_LIMIT = "0.5";

const LANGUAGE_CONFIG = {
  python: {
    image: "python:3.11-slim",
    extension: "py",
    runCmd: (file) => ["python", `/sandbox/${file}`],
  },
  javascript: {
    image: "node:20-slim",
    extension: "js",
    runCmd: (file) => ["node", `/sandbox/${file}`],
  },
  java8: {
    image: "openjdk:17-slim",
    extension: "java",
    className: "Solution",
    compileCmd: () => ["javac", "/sandbox/Solution.java"],
    runCmd: () => ["java", "-cp", "/sandbox", "Solution"],
  },
  cpp: {
    image: "gcc:12",
    extension: "cpp",
    compileCmd: (file) => [
      "g++",
      "-std=c++17",
      "-O2",
      `-/sandbox/${file}.cpp`,
      "-o",
      `/sandbox/${file}`,
    ],
    runCmd: (file) => [`/sandbox/${file}`],
  },
};

async function ensureTempDir(subDir) {
  const dir = path.join(TEMP_DIR, subDir);
  await fs.mkdir(dir, { recursive: true });
  return dir;
}

// Convert Windows path to Docker-compatible path for volume mounting
function toDockerPath(winPath) {
  // Docker Desktop on Windows accepts C:\path format directly
  return winPath;
}

function runDockerCommand(args, input = "", timeoutMs = DOCKER_TIMEOUT) {
  return new Promise((resolve, reject) => {
    const child = exec(
      `docker ${args.join(" ")}`,
      { timeout: timeoutMs, maxBuffer: 1024 * 1024 },
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
      if (input) {
        child.stdin.write(input + "\n");
      }
      child.stdin.end();
    } catch (err) {
      reject(new Error("Failed to write input to process"));
    }
  });
}

async function executeWithDocker(code, language, input = "") {
  const config = LANGUAGE_CONFIG[language];
  if (!config) throw new Error(`Unsupported language: ${language}`);

  const runId = uuidv4();
  const sandboxDir = await ensureTempDir(runId);
  const fileName =
    language === "java8" ? config.className : `solution_${runId}`;
  const srcFile = `${fileName}.${config.extension}`;
  const srcPath = path.join(sandboxDir, srcFile);

  try {
    await fs.writeFile(srcPath, code);

    const volumeArg = `${toDockerPath(sandboxDir)}:/sandbox`;
    const baseArgs = [
      "run",
      "--rm",
      `--memory=${MEMORY_LIMIT}`,
      `--cpus=${CPU_LIMIT}`,
      "--network=none",
      "--ulimit",
      "nofile=64:64",
      "-v",
      volumeArg,
      "-i",
    ];

    // Compile step for Java and C++
    if (config.compileCmd) {
      try {
        const compileArgs = [
          ...baseArgs,
          config.image,
          ...config.compileCmd(fileName),
        ];
        const compileResult = await runDockerCommand(
          compileArgs,
          "",
          DOCKER_TIMEOUT
        );
        if (compileResult.stderr) {
          return {
            success: false,
            error: "Compilation Error",
            details: compileResult.stderr,
            runtime_ms: 0,
          };
        }
      } catch (err) {
        return {
          success: false,
          error: "Compilation Error",
          details: err.message,
          runtime_ms: 0,
        };
      }
    }

    // Run step
    const startTime = Date.now();
    try {
      const runArgs = [...baseArgs, config.image, ...config.runCmd(fileName)];
      const result = await runDockerCommand(runArgs, input, DOCKER_TIMEOUT);
      const runtime_ms = Date.now() - startTime;

      return {
        success: true,
        output: result.stdout,
        error: result.stderr || null,
        runtime_ms,
      };
    } catch (err) {
      const runtime_ms = Date.now() - startTime;
      const isTLE = err.message.includes("Time Limit");
      return {
        success: false,
        error: isTLE ? "Time Limit Exceeded" : "Runtime Error",
        details: err.message,
        runtime_ms,
      };
    }
  } finally {
    // Always clean up sandbox directory
    await fs.rm(sandboxDir, { recursive: true, force: true }).catch(() => {});
  }
}

module.exports = { executeWithDocker, LANGUAGE_CONFIG };
