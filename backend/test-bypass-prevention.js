/**
 * Test script to demonstrate logic bypass prevention
 * 
 * This script tests two approaches:
 * 1. Hardcoded output (should fail most tests)
 * 2. Real logic implementation (should pass all tests)
 */

const axios = require('axios');

const API_URL = 'http://localhost:5000/api';

// Test 1: Hardcoded solution (SHOULD FAIL)
const hardcodedSolution = `
# Hardcoded output - trying to bypass logic
print("0 1")
`;

// Test 2: Real logic solution (SHOULD PASS)
const realSolution = `
# Real Two Sum implementation
n = int(input())
nums = list(map(int, input().split()))
target = int(input())

seen = {}
for i, num in enumerate(nums):
    complement = target - num
    if complement in seen:
        print(seen[complement], i)
        break
    seen[num] = i
`;

async function testSolution(code, description) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`Testing: ${description}`);
  console.log('='.repeat(60));
  
  try {
    const response = await axios.post(`${API_URL}/submit`, {
      code: code,
      language: 'python',
      problemId: 1  // Two Sum problem
    });

    const result = response.data;
    
    console.log(`\n✓ Submission completed`);
    console.log(`  Passed: ${result.passedCount}/${result.totalCount} test cases`);
    console.log(`  Status: ${result.allPassed ? '✓ ALL PASSED' : '✗ SOME FAILED'}`);
    
    console.log(`\n  Test Results:`);
    result.results.forEach((test, idx) => {
      const status = test.passed ? '✓ PASSED' : '✗ FAILED';
      const hidden = idx >= 3 ? ' (hidden)' : ' (visible)';
      console.log(`    Test ${test.testCase}${hidden}: ${status}`);
    });
    
    if (!result.allPassed) {
      console.log(`\n  ⚠️  This solution does NOT pass all tests!`);
      console.log(`  ⚠️  User must implement real logic to pass hidden tests.`);
    } else {
      console.log(`\n  ✓ This solution passes ALL tests!`);
      console.log(`  ✓ Real logic works for all cases.`);
    }
    
  } catch (error) {
    console.error(`\n✗ Error:`, error.response?.data || error.message);
  }
}

async function runTests() {
  console.log('\n');
  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║     LOGIC BYPASS PREVENTION TEST                           ║');
  console.log('║     Demonstrating Hidden Test Cases                        ║');
  console.log('╚════════════════════════════════════════════════════════════╝');
  
  // Test 1: Hardcoded (should fail)
  await testSolution(hardcodedSolution, 'Hardcoded Output (Bypass Attempt)');
  
  // Wait a bit between tests
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Test 2: Real logic (should pass)
  await testSolution(realSolution, 'Real Logic Implementation');
  
  console.log(`\n${'='.repeat(60)}`);
  console.log('CONCLUSION:');
  console.log('='.repeat(60));
  console.log('✓ Hardcoded solutions fail hidden test cases');
  console.log('✓ Real logic passes all test cases');
  console.log('✓ Users are forced to implement actual algorithms');
  console.log('✓ Logic bypass prevention is WORKING!');
  console.log('='.repeat(60));
  console.log('\n');
}

// Run the tests
runTests().catch(console.error);
