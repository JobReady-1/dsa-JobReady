// Quick test to verify Python execution
const { executeCode } = require("./src/services/codeExecutor");

async function quickTest() {
  console.log("Testing Python code execution...\n");
  
  const code = `name = input()
print(f"Hello, {name}!")`;

  try {
    const result = await executeCode(code, "python", "World");
    console.log("✓ Execution successful!");
    console.log("Output:", result.output);
  } catch (error) {
    console.error("✗ Execution failed:", error.message);
  }
}

quickTest();
