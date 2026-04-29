// Quick test script to verify the judge system works
const { executeCode, runTestCases } = require("./src/services/codeExecutor");

// Test 1: Simple Python code
async function testPython() {
  console.log("\n=== Testing Python ===");
  const code = `A = input()
if A == A[::-1]:
    print("Yes")
else:
    print("No")`;

  const result = await executeCode(code, "python", "madam");
  console.log("Result:", result);
}

// Test 2: Java code
async function testJava() {
  console.log("\n=== Testing Java ===");
  const code = `import java.util.Scanner;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String A = sc.next();
        String reversed = new StringBuilder(A).reverse().toString();
        if (A.equals(reversed)) {
            System.out.println("Yes");
        } else {
            System.out.println("No");
        }
    }
}`;

  const result = await executeCode(code, "java8", "racecar");
  console.log("Result:", result);
}

// Test 3: C++ code
async function testCpp() {
  console.log("\n=== Testing C++ ===");
  const code = `#include <iostream>
#include <string>
#include <algorithm>
using namespace std;

int main() {
    string A;
    cin >> A;
    string reversed = A;
    reverse(reversed.begin(), reversed.end());
    if (A == reversed) {
        cout << "Yes" << endl;
    } else {
        cout << "No" << endl;
    }
    return 0;
}`;

  const result = await executeCode(code, "cpp", "hello");
  console.log("Result:", result);
}

// Test 4: JavaScript code
async function testJavaScript() {
  console.log("\n=== Testing JavaScript ===");
  const code = `const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on('line', (A) => {
    const reversed = A.split('').reverse().join('');
    if (A === reversed) {
        console.log('Yes');
    } else {
        console.log('No');
    }
    rl.close();
});`;

  const result = await executeCode(code, "javascript", "level");
  console.log("Result:", result);
}

// Test 5: Run with test cases
async function testWithTestCases() {
  console.log("\n=== Testing with Test Cases ===");
  const code = `A = input()
if A == A[::-1]:
    print("Yes")
else:
    print("No")`;

  const testCases = [
    { input: "madam", output: "Yes" },
    { input: "hello", output: "No" },
    { input: "racecar", output: "Yes" },
  ];

  const result = await runTestCases(code, "python", testCases);
  console.log("Result:", JSON.stringify(result, null, 2));
}

// Run all tests
async function runAllTests() {
  try {
    await testPython();
    await testJava();
    await testCpp();
    await testJavaScript();
    await testWithTestCases();
    console.log("\n✓ All tests completed!");
  } catch (error) {
    console.error("\n✗ Test failed:", error.message);
  }
}

runAllTests();
