/**
 * Verify Two Sum test cases have correct expected outputs
 */

function twoSum(nums, target) {
  const seen = {};
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (complement in seen) {
      return [seen[complement], i];
    }
    seen[nums[i]] = i;
  }
  return null;
}

const testCases = [
  { input: "4\n2 7 11 15\n9", expected: "0 1" },
  { input: "3\n3 2 4\n6", expected: "1 2" },
  { input: "2\n3 3\n6", expected: "0 1" },
  { input: "5\n1 5 3 7 9\n12", expected: "1 3" },
  { input: "6\n-1 -2 -3 -4 -5 -6\n-9", expected: "2 4" },
  { input: "7\n0 4 3 0 1 2 5\n0", expected: "0 3" },
  { input: "10\n10 20 30 40 50 60 70 80 90 100\n110", expected: "4 5" },
  { input: "8\n-10 -5 0 5 10 15 20 25\n15", expected: "3 4" },
  { input: "4\n1000000000 999999999 1 2\n1999999999", expected: "0 1" },
  { input: "15\n5 2 8 1 9 3 7 4 6 10 11 12 13 14 15\n19", expected: "2 6" },
];

console.log('\nVerifying Two Sum Test Cases:\n');
console.log('='.repeat(70));

testCases.forEach((test, idx) => {
  const lines = test.input.split('\n');
  const n = parseInt(lines[0]);
  const nums = lines[1].split(' ').map(Number);
  const target = parseInt(lines[2]);
  
  const result = twoSum(nums, target);
  const actual = result ? `${result[0]} ${result[1]}` : 'null';
  const match = actual === test.expected ? '✓' : '✗';
  
  console.log(`Test ${idx + 1}: ${match}`);
  console.log(`  Input: nums = [${nums.join(', ')}], target = ${target}`);
  console.log(`  Expected: ${test.expected}`);
  console.log(`  Actual:   ${actual}`);
  
  if (actual !== test.expected) {
    console.log(`  ⚠️  MISMATCH! Need to fix this test case.`);
    if (result) {
      console.log(`  Correct output should be: ${actual}`);
      console.log(`  Verification: nums[${result[0]}] + nums[${result[1]}] = ${nums[result[0]]} + ${nums[result[1]]} = ${nums[result[0]] + nums[result[1]]}`);
    }
  }
  console.log('');
});

console.log('='.repeat(70));
