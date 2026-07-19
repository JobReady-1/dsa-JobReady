const { fork } = require("child_process");
const path = require("path");

console.log("🚀 Starting DSA Platform: API Server + Queue Worker...");

function startProcess(scriptPath, name) {
  console.log(`[Manager] Launching ${name}...`);
  const child = fork(scriptPath);

  child.on("exit", (code) => {
    console.log(`[${name}] Process exited with code ${code}. Restarting in 5s...`);
    setTimeout(() => startProcess(scriptPath, name), 5000);
  });

  child.on("error", (err) => {
    console.error(`[${name}] Process error:`, err);
  });
}

// Start both Express API server and Queue Worker in the same container instance
startProcess(path.join(__dirname, "app.js"), "API");
startProcess(path.join(__dirname, "worker.js"), "Worker");
