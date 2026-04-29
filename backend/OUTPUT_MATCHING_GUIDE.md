# Output Matching Guide

## How Output Matching Works

The judge system now uses **intelligent output normalization** to compare expected vs actual outputs.

## Normalization Process

Before comparing outputs, both the expected and actual outputs go through normalization:

1. **Trim whitespace** - Remove leading/trailing spaces
2. **Normalize line endings** - Convert `\r\n` (Windows) to `\n` (Unix)
3. **Remove trailing whitespace** - From each line
4. **Remove extra newlines** - Leading and trailing blank lines

## What Gets Matched

### ✅ These will PASS:

```python
# Expected: "Yes"

print("Yes")           # Exact match
print("Yes  ")         # Extra trailing spaces
print("  Yes")         # Extra leading spaces
print("Yes\n")         # Extra newline
print("Yes\n\n")       # Multiple newlines
```

### ✅ Multi-line outputs:

```python
# Expected: "Line 1\nLine 2\nLine 3"

print("Line 1")
print("Line 2")
print("Line 3")
# All variations with extra spaces/newlines will match
```

### ❌ These will FAIL:

```python
# Expected: "Yes"

print("yes")           # Case mismatch
print("YES")           # Case mismatch
print("Yes!")          # Extra characters
print("Y es")          # Space in middle
print("No")            # Wrong output
```

## Test Case Format

### Single Line Output

```javascript
{
  input: "madam",
  output: "Yes"
}
```

### Multi-Line Output

```javascript
{
  input: "5\n1 2 3 4 5",
  output: "1 2 3 4 5"
}
```

### Multiple Values

```javascript
{
  input: "3\n10 20 30",
  output: "10\n20\n30"
}
```

## Debugging Failed Tests

When a test fails, the system shows:

1. **Input** - What was provided
2. **Expected** - What should be output
3. **Got** - What was actually output
4. **Normalized versions** - Both outputs after normalization

Example:
```
Input: "hello"
Expected: "No"
Got: "No  \n"
Expected (normalized): "No"
Got (normalized): "No"
Status: ✓ PASSED
```

## Common Issues

### Issue 1: Case Sensitivity
**Problem:** Output is "yes" but expected "Yes"
**Solution:** Match the exact case in your code

### Issue 2: Extra Characters
**Problem:** Output is "Yes!" but expected "Yes"
**Solution:** Remove extra punctuation

### Issue 3: Wrong Format
**Problem:** Output is "1,2,3" but expected "1 2 3"
**Solution:** Use correct separator (space vs comma)

### Issue 4: Missing Newlines
**Problem:** Output is "123" but expected "1\n2\n3"
**Solution:** Print each number on a new line

## Testing Your Code

### Method 1: Run Code (Custom Input)
- Test with your own input
- See raw output
- Debug issues

### Method 2: Submit Code (Test Cases)
- Runs against all test cases
- Shows which tests pass/fail
- Provides detailed comparison

## Example: Palindrome Check

### Problem
Given a string, print "Yes" if palindrome, "No" otherwise.

### Test Cases
```javascript
[
  { input: "madam", output: "Yes" },
  { input: "hello", output: "No" },
  { input: "racecar", output: "Yes" }
]
```

### Correct Solution (Python)
```python
A = input()
if A == A[::-1]:
    print("Yes")
else:
    print("No")
```

### What Happens
1. Input "madam" → Code outputs "Yes\n"
2. Normalized: "Yes"
3. Expected: "Yes"
4. Match: ✓ PASSED

## Advanced: Multi-Value Outputs

### Problem: Sum of Array
Input: First line is N, second line is N numbers
Output: Sum of all numbers

### Test Case
```javascript
{
  input: "5\n1 2 3 4 5",
  output: "15"
}
```

### Solution (Python)
```python
n = int(input())
arr = list(map(int, input().split()))
print(sum(arr))
```

## Tips for Success

1. **Read problem carefully** - Check exact output format
2. **Test locally first** - Use "Run Code" before submitting
3. **Check edge cases** - Empty input, single element, etc.
4. **Match format exactly** - Spaces, newlines, case
5. **Use normalized view** - Check what judge sees after normalization

## Verification

Run the test suite:
```bash
cd backend
node test-output-matching.js
```

All tests should pass:
- ✓ Exact match
- ✓ Extra whitespace
- ✓ Extra newlines
- ✓ Palindrome check
- ✓ Multiple outputs

## Need Help?

If your code is failing tests:
1. Check the normalized comparison in the UI
2. Run with custom input to see raw output
3. Verify your logic is correct
4. Check for typos in output strings
5. Ensure correct data types (string vs number)
