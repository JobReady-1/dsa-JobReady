// Test output matching with various edge cases
const { runTestCases } = require("./src/services/codeExecutor");

async function testOutputMatching() {
  console.log("=== Testing Output Matching ===\n");

  // Test 1: Exact match
  console.log("Test 1: Exact match");
  const code1 = `print("Yes")`;
  const testCases1 = [{ input: "", output: "Yes" }];
  const result1 = await runTestCases(code1, "python", testCases1);
  console.log(`Result: ${result1.allPassed ? "✓ PASSED" : "✗ FAILED"}`);
  console.log(`Details:`, result1.results[0]);
  console.log();

  // Test 2: Extra whitespace
  console.log("Test 2: Extra whitespace");
  const code2 = `print("Yes  ")`;
  const testCases2 = [{ input: "", output: "Yes" }];
  const result2 = await runTestCases(code2, "python", testCases2);
  console.log(`Result: ${result2.allPassed ? "✓ PASSED" : "✗ FAILED"}`);
  console.log(`Details:`, result2.results[0]);
  console.log();

  // Test 3: Extra newlines
  console.log("Test 3: Extra newlines");
  const code3 = `print("Yes\\n\\n")`;
  const testCases3 = [{ input: "", output: "Yes" }];
  const result3 = await runTestCases(code3, "python", testCases3);
  console.log(`Result: ${result3.allPassed ? "✓ PASSED" : "✗ FAILED"}`);
  console.log(`Details:`, result3.results[0]);
  console.log();

  // Test 4: Palindrome check
  console.log("Test 4: Palindrome check");
  const code4 = `A = input()
if A == A[::-1]:
    print("Yes")
else:
    print("No")`;
  const testCases4 = [
    { input: "madam", output: "Yes" },
    { input: "hello", output: "No" },
    { input: "racecar", output: "Yes" },
  ];
  const result4 = await runTestCases(code4, "python", testCases4);
  console.log(`Result: ${result4.passedCount}/${result4.totalCount} passed`);
  result4.results.forEach((r) => {
    console.log(`  Test ${r.testCase}: ${r.passed ? "✓" : "✗"} - Input: "${r.input}", Expected: "${r.expectedOutput}", Got: "${r.actualOutput}"`);
  });
  console.log();

  // Test 5: Multiple outputs
  console.log("Test 5: Multiple outputs");
  const code5 = `print("Line 1")
print("Line 2")
print("Line 3")`;
  const testCases5 = [{ input: "", output: "Line 1\nLine 2\nLine 3" }];
  const result5 = await runTestCases(code5, "python", testCases5);
  console.log(`Result: ${result5.allPassed ? "✓ PASSED" : "✗ FAILED"}`);
  console.log(`Details:`, result5.results[0]);
  console.log();

  console.log("=== All Tests Completed ===");
}

testOutputMatching().catch(console.error);
