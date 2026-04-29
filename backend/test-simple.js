// Simple test to debug timeout issue
const { executeCode } = require("./src/services/codeExecutor");

async function testSimple() {
  console.log("=== Testing Simple Python Code ===\n");

  // Test 1: No input needed
  console.log("Test 1: No input");
  const code1 = `print("Hello World")`;
  try {
    const result1 = await executeCode(code1, "python", "");
    console.log("Result:", result1);
  } catch (err) {
    console.error("Error:", err.message);
  }
  console.log();

  // Test 2: With input
  console.log("Test 2: With input");
  const code2 = `A = input()
print(f"Got: {A}")`;
  try {
    const result2 = await executeCode(code2, "python", "test");
    console.log("Result:", result2);
  } catch (err) {
    console.error("Error:", err.message);
  }
  console.log();

  // Test 3: Palindrome
  console.log("Test 3: Palindrome check");
  const code3 = `A = input()
if A == A[::-1]:
    print("Yes")
else:
    print("No")`;
  try {
    const result3 = await executeCode(code3, "python", "madam");
    console.log("Result:", result3);
  } catch (err) {
    console.error("Error:", err.message);
  }
}

testSimple();
