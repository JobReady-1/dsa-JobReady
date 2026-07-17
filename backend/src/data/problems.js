// Blind 75 — Complete Problem Bank
// testCases: shown to user on Run; hiddenCases: run only on Submit
// All I/O is line-based stdin/stdout

const problems = {

  // ══════════════════════════════════════════════════════════════════════════
  // ARRAY  (1–10)
  // ══════════════════════════════════════════════════════════════════════════

  1: {
    id: 1, title: "Two Sum", difficulty: "Easy", category: "Array",
    tags: ["array", "hash-table"],
    description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume each input has exactly one solution, and you may not use the same element twice.`,
    constraints: ["2 <= nums.length <= 10^4", "-10^9 <= nums[i] <= 10^9", "Only one valid answer exists."],
    examples: [
      { input: "nums=[2,7,11,15], target=9", output: "[0,1]", explanation: "nums[0]+nums[1]==9" },
      { input: "nums=[3,2,4], target=6", output: "[1,2]" },
    ],
    starterCode: {
      python: `import sys
input = sys.stdin.readline

def two_sum(nums, target):
    # Your code here
    pass

n = int(input())
nums = list(map(int, input().split()))
target = int(input())
print(*two_sum(nums, target))`,
      javascript: `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\\n');
let i = 0;
function twoSum(nums, target) { /* your code */ }
const n = +lines[i++];
const nums = lines[i++].split(' ').map(Number);
const target = +lines[i++];
console.log(twoSum(nums, target).join(' '));`,
      java8: `import java.util.*;import java.io.*;
public class Solution {
    public static int[] twoSum(int[] nums, int target) { return new int[]{}; }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int n = Integer.parseInt(br.readLine().trim());
        StringTokenizer st = new StringTokenizer(br.readLine());
        int[] nums = new int[n]; for(int i=0;i<n;i++) nums[i]=Integer.parseInt(st.nextToken());
        int target = Integer.parseInt(br.readLine().trim());
        int[] r = twoSum(nums, target);
        System.out.println(r[0]+" "+r[1]);
    }
}`,
      cpp: `#include<bits/stdc++.h>
using namespace std;
vector<int> twoSum(vector<int>& nums, int target) { return {}; }
int main(){
    int n; cin>>n; vector<int> nums(n); for(int& x:nums) cin>>x;
    int t; cin>>t; auto r=twoSum(nums,t);
    cout<<r[0]<<" "<<r[1]<<endl;
}`,
    },
    testCases: [
      { input: "4\n2 7 11 15\n9", output: "0 1" },
      { input: "3\n3 2 4\n6",     output: "1 2" },
      { input: "2\n3 3\n6",       output: "0 1" },
    ],
    hiddenCases: [
      { input: "5\n1 5 3 7 2\n9",  output: "1 4", isHidden: true },
      { input: "4\n-3 4 3 90\n0",  output: "0 2", isHidden: true },
    ],
    hints: ["Use a hash map: store each number→index as you iterate.", "For each num, check if (target−num) already exists in the map."],
    editorial: { approach: "Hash Map: one pass — for each element check complement in map.", timeComplexity: "O(n)", spaceComplexity: "O(n)" },
  },

  2: {
    id: 2, title: "Best Time to Buy and Sell Stock", difficulty: "Easy", category: "Array",
    tags: ["array", "greedy"],
    description: `Given an array prices where prices[i] is the price of a stock on day i, return the maximum profit from buying on one day and selling on a later day. Return 0 if no profit is possible.`,
    constraints: ["1 <= prices.length <= 10^5", "0 <= prices[i] <= 10^4"],
    examples: [
      { input: "prices=[7,1,5,3,6,4]", output: "5", explanation: "Buy day 2 (price=1), sell day 5 (price=6)." },
      { input: "prices=[7,6,4,3,1]", output: "0" },
    ],
    starterCode: {
      python: `import sys
input = sys.stdin.readline
def max_profit(prices):
    pass
n = int(input())
prices = list(map(int, input().split()))
print(max_profit(prices))`,
      javascript: `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\\n');
function maxProfit(prices) { /* your code */ }
const n = +lines[0];
const prices = lines[1].split(' ').map(Number);
console.log(maxProfit(prices));`,
      java8: `import java.util.*;import java.io.*;
public class Solution {
    public static int maxProfit(int[] prices) { return 0; }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int n = Integer.parseInt(br.readLine().trim());
        StringTokenizer st = new StringTokenizer(br.readLine());
        int[] p = new int[n]; for(int i=0;i<n;i++) p[i]=Integer.parseInt(st.nextToken());
        System.out.println(maxProfit(p));
    }
}`,
      cpp: `#include<bits/stdc++.h>
using namespace std;
int maxProfit(vector<int>& p){ return 0; }
int main(){ int n; cin>>n; vector<int> p(n); for(int& x:p) cin>>x; cout<<maxProfit(p)<<endl; }`,
    },
    testCases: [
      { input: "6\n7 1 5 3 6 4", output: "5" },
      { input: "5\n7 6 4 3 1",   output: "0" },
      { input: "3\n1 2 3",       output: "2" },
    ],
    hiddenCases: [
      { input: "1\n5",           output: "0", isHidden: true },
      { input: "4\n3 1 4 8",     output: "7", isHidden: true },
    ],
    hints: ["Track the minimum price seen so far.", "For each price, compute profit = price − minSoFar and update maxProfit."],
    editorial: { approach: "Single pass: track min price and max profit.", timeComplexity: "O(n)", spaceComplexity: "O(1)" },
  },

  3: {
    id: 3, title: "Contains Duplicate", difficulty: "Easy", category: "Array",
    tags: ["array", "hash-table"],
    description: `Given an integer array nums, return true if any value appears at least twice in the array, and false if every element is distinct.`,
    constraints: ["1 <= nums.length <= 10^5", "-10^9 <= nums[i] <= 10^9"],
    examples: [
      { input: "nums=[1,2,3,1]", output: "true" },
      { input: "nums=[1,2,3,4]", output: "false" },
    ],
    starterCode: {
      python: `import sys
input = sys.stdin.readline
def contains_duplicate(nums):
    pass
n = int(input())
nums = list(map(int, input().split()))
print(str(contains_duplicate(nums)).lower())`,
      javascript: `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\\n');
function containsDuplicate(nums) { /* your code */ }
const nums = lines[1].split(' ').map(Number);
console.log(containsDuplicate(nums).toString());`,
      java8: `import java.util.*;import java.io.*;
public class Solution {
    public static boolean containsDuplicate(int[] nums) { return false; }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int n = Integer.parseInt(br.readLine().trim());
        StringTokenizer st = new StringTokenizer(br.readLine());
        int[] nums = new int[n]; for(int i=0;i<n;i++) nums[i]=Integer.parseInt(st.nextToken());
        System.out.println(containsDuplicate(nums));
    }
}`,
      cpp: `#include<bits/stdc++.h>
using namespace std;
bool containsDuplicate(vector<int>& nums){ return false; }
int main(){ int n; cin>>n; vector<int> v(n); for(int& x:v) cin>>x;
    cout<<(containsDuplicate(v)?"true":"false")<<endl; }`,
    },
    testCases: [
      { input: "4\n1 2 3 1",             output: "true"  },
      { input: "4\n1 2 3 4",             output: "false" },
      { input: "10\n1 1 1 3 3 4 3 2 4 2", output: "true"  },
    ],
    hiddenCases: [
      { input: "1\n5",                   output: "false", isHidden: true },
      { input: "5\n-1 -2 -3 -4 -1",     output: "true",  isHidden: true },
    ],
    hints: ["A HashSet lets you check membership in O(1).", "Compare the set size with the array length."],
    editorial: { approach: "Add to a set; if element already exists → duplicate.", timeComplexity: "O(n)", spaceComplexity: "O(n)" },
  },

  4: {
    id: 4, title: "Product of Array Except Self", difficulty: "Medium", category: "Array",
    tags: ["array", "prefix-sum"],
    description: `Given an integer array nums, return an array answer such that answer[i] is equal to the product of all elements of nums except nums[i].\n\nYou must solve it in O(n) time without using the division operation.`,
    constraints: ["2 <= nums.length <= 10^5", "-30 <= nums[i] <= 30", "The product of any prefix or suffix fits in a 32-bit integer."],
    examples: [
      { input: "nums=[1,2,3,4]", output: "[24,12,8,6]" },
      { input: "nums=[-1,1,0,-3,3]", output: "[0,0,9,0,0]" },
    ],
    starterCode: {
      python: `import sys
input = sys.stdin.readline
def product_except_self(nums):
    pass
n = int(input())
nums = list(map(int, input().split()))
print(*product_except_self(nums))`,
      javascript: `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\\n');
function productExceptSelf(nums) { /* your code */ }
const nums = lines[1].split(' ').map(Number);
console.log(productExceptSelf(nums).join(' '));`,
      java8: `import java.util.*;import java.io.*;
public class Solution {
    public static int[] productExceptSelf(int[] nums) { return new int[]{}; }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int n = Integer.parseInt(br.readLine().trim());
        StringTokenizer st = new StringTokenizer(br.readLine());
        int[] nums = new int[n]; for(int i=0;i<n;i++) nums[i]=Integer.parseInt(st.nextToken());
        int[] r = productExceptSelf(nums);
        StringBuilder sb = new StringBuilder();
        for(int i=0;i<r.length;i++){ if(i>0) sb.append(' '); sb.append(r[i]); }
        System.out.println(sb);
    }
}`,
      cpp: `#include<bits/stdc++.h>
using namespace std;
vector<int> productExceptSelf(vector<int>& nums){ return {}; }
int main(){ int n; cin>>n; vector<int> v(n); for(int& x:v) cin>>x;
    auto r=productExceptSelf(v); for(int i=0;i<r.size();i++){ if(i) cout<<' '; cout<<r[i]; } cout<<endl; }`,
    },
    testCases: [
      { input: "4\n1 2 3 4",     output: "24 12 8 6" },
      { input: "5\n-1 1 0 -3 3", output: "0 0 9 0 0" },
      { input: "2\n5 3",         output: "3 5"       },
    ],
    hiddenCases: [
      { input: "3\n1 1 1",       output: "1 1 1",        isHidden: true },
      { input: "4\n2 0 0 4",     output: "0 0 0 0",      isHidden: true },
    ],
    hints: ["Build a prefix product array: prefix[i] = product of all elements before i.", "Then multiply by suffix product (scan right to left) to get the answer without division."],
    editorial: { approach: "Prefix & suffix product pass in O(1) extra space.", timeComplexity: "O(n)", spaceComplexity: "O(1)" },
  },

  5: {
    id: 5, title: "Maximum Subarray", difficulty: "Easy", category: "Array",
    tags: ["array", "dynamic-programming", "divide-and-conquer"],
    description: `Given an integer array nums, find the subarray with the largest sum and return its sum.`,
    constraints: ["1 <= nums.length <= 10^5", "-10^4 <= nums[i] <= 10^4"],
    examples: [
      { input: "nums=[-2,1,-3,4,-1,2,1,-5,4]", output: "6", explanation: "Subarray [4,-1,2,1] has sum 6." },
      { input: "nums=[1]", output: "1" },
    ],
    starterCode: {
      python: `import sys
input = sys.stdin.readline
def max_subarray(nums):
    pass
n = int(input())
nums = list(map(int, input().split()))
print(max_subarray(nums))`,
      javascript: `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\\n');
function maxSubArray(nums) { /* your code */ }
const nums = lines[1].split(' ').map(Number);
console.log(maxSubArray(nums));`,
      java8: `import java.util.*;import java.io.*;
public class Solution {
    public static int maxSubArray(int[] nums) { return 0; }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int n = Integer.parseInt(br.readLine().trim());
        StringTokenizer st = new StringTokenizer(br.readLine());
        int[] nums = new int[n]; for(int i=0;i<n;i++) nums[i]=Integer.parseInt(st.nextToken());
        System.out.println(maxSubArray(nums));
    }
}`,
      cpp: `#include<bits/stdc++.h>
using namespace std;
int maxSubArray(vector<int>& nums){ return 0; }
int main(){ int n; cin>>n; vector<int> v(n); for(int& x:v) cin>>x; cout<<maxSubArray(v)<<endl; }`,
    },
    testCases: [
      { input: "9\n-2 1 -3 4 -1 2 1 -5 4", output: "6" },
      { input: "1\n1",                       output: "1" },
      { input: "4\n-2 -1 -3 -4",             output: "-1" },
    ],
    hiddenCases: [
      { input: "5\n5 4 -1 7 8",  output: "23", isHidden: true },
      { input: "3\n-1 0 -2",     output: "0",  isHidden: true },
    ],
    hints: ["Kadane's algorithm: keep a running sum; reset to 0 if it goes negative.", "Track the maximum running sum seen at any point."],
    editorial: { approach: "Kadane's Algorithm: currentSum = max(num, currentSum+num).", timeComplexity: "O(n)", spaceComplexity: "O(1)" },
  },

  6: {
    id: 6, title: "Maximum Product Subarray", difficulty: "Medium", category: "Array",
    tags: ["array", "dynamic-programming"],
    description: `Given an integer array nums, find a subarray that has the largest product, and return the product.`,
    constraints: ["1 <= nums.length <= 2*10^4", "-10 <= nums[i] <= 10"],
    examples: [
      { input: "nums=[2,3,-2,4]", output: "6", explanation: "[2,3] has the largest product 6." },
      { input: "nums=[-2,0,-1]", output: "0" },
    ],
    starterCode: {
      python: `import sys
input = sys.stdin.readline
def max_product(nums):
    pass
n = int(input())
nums = list(map(int, input().split()))
print(max_product(nums))`,
      javascript: `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\\n');
function maxProduct(nums) { /* your code */ }
const nums = lines[1].split(' ').map(Number);
console.log(maxProduct(nums));`,
      java8: `import java.util.*;import java.io.*;
public class Solution {
    public static int maxProduct(int[] nums) { return 0; }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int n = Integer.parseInt(br.readLine().trim());
        StringTokenizer st = new StringTokenizer(br.readLine());
        int[] nums = new int[n]; for(int i=0;i<n;i++) nums[i]=Integer.parseInt(st.nextToken());
        System.out.println(maxProduct(nums));
    }
}`,
      cpp: `#include<bits/stdc++.h>
using namespace std;
int maxProduct(vector<int>& nums){ return 0; }
int main(){ int n; cin>>n; vector<int> v(n); for(int& x:v) cin>>x; cout<<maxProduct(v)<<endl; }`,
    },
    testCases: [
      { input: "4\n2 3 -2 4",  output: "6"  },
      { input: "3\n-2 0 -1",   output: "0"  },
      { input: "5\n-2 3 -4 0 5", output: "24" },
    ],
    hiddenCases: [
      { input: "1\n-2",        output: "-2", isHidden: true },
      { input: "3\n2 -5 -2",   output: "20", isHidden: true },
    ],
    hints: ["Track both curMax and curMin (negatives can flip sign).", "curMax = max(num, curMax*num, curMin*num); curMin similarly."],
    editorial: { approach: "Track running max and min products (negatives can become max after another negative).", timeComplexity: "O(n)", spaceComplexity: "O(1)" },
  },

  7: {
    id: 7, title: "Find Minimum in Rotated Sorted Array", difficulty: "Medium", category: "Array",
    tags: ["array", "binary-search"],
    description: `Given the sorted rotated array nums of unique elements, return the minimum element.\n\nYou must write an algorithm that runs in O(log n) time.`,
    constraints: ["1 <= nums.length <= 5000", "-5000 <= nums[i] <= 5000", "All integers are unique.", "nums is sorted and rotated between 1 and n times."],
    examples: [
      { input: "nums=[3,4,5,1,2]", output: "1" },
      { input: "nums=[4,5,6,7,0,1,2]", output: "0" },
    ],
    starterCode: {
      python: `import sys
input = sys.stdin.readline
def find_min(nums):
    pass
n = int(input())
nums = list(map(int, input().split()))
print(find_min(nums))`,
      javascript: `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\\n');
function findMin(nums) { /* your code */ }
const nums = lines[1].split(' ').map(Number);
console.log(findMin(nums));`,
      java8: `import java.util.*;import java.io.*;
public class Solution {
    public static int findMin(int[] nums) { return 0; }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int n = Integer.parseInt(br.readLine().trim());
        StringTokenizer st = new StringTokenizer(br.readLine());
        int[] nums = new int[n]; for(int i=0;i<n;i++) nums[i]=Integer.parseInt(st.nextToken());
        System.out.println(findMin(nums));
    }
}`,
      cpp: `#include<bits/stdc++.h>
using namespace std;
int findMin(vector<int>& nums){ return 0; }
int main(){ int n; cin>>n; vector<int> v(n); for(int& x:v) cin>>x; cout<<findMin(v)<<endl; }`,
    },
    testCases: [
      { input: "6\n-1 0 1 2 -1 -4", output: "-1 -1 2\n-1 0 1", hidden: false },
      { input: "3\n0 1 1", output: "", hidden: false },
      { input: "3\n0 0 0", output: "0 0 0", hidden: false },
      { input: "4\n1 2 -2 -1", output: "", hidden: true },
      { input: "5\n-2 0 1 1 2", output: "-2 0 2\n-2 1 1", hidden: true },
      { input: "7\n-4 -1 -1 0 1 2 3", output: "-4 1 3\n-1 -1 2\n-1 0 1", hidden: true },
      { input: "6\n3 0 -2 -1 1 2", output: "-2 -1 3\n-2 0 2\n-1 0 1", hidden: true },
      { input: "8\n-5 -4 -3 -2 -1 0 1 2", output: "-5 3 2\n-4 2 2\n-3 1 2\n-2 0 2\n-2 1 1", hidden: true },
      { input: "4\n1 1 1 1", output: "", hidden: true },
      { input: "9\n-1 0 1 2 -1 -4 -2 -3 3", output: "-4 1 3\n-3 0 3\n-3 1 2\n-2 -1 3\n-2 0 2\n-1 -1 2\n-1 0 1", hidden: true },
    ],
  },
  6: {
    id: 6,
    title: "Container With Most Water",
    difficulty: "Medium",
    topic: "Arrays",
    category: "Two Pointers",
    description: "You are given an integer array height of length n. Find two lines that together with the x-axis form a container, such that the container contains the most water.",
    examples: [
      { input: "height = [1,8,6,2,5,4,8,3,7]", output: "49" },
      { input: "height = [1,1]", output: "1" }
    ],
    constraints: [
      "n == height.length",
      "2 <= n <= 10^5",
      "0 <= height[i] <= 10^4"
    ],
    testCases: [
      { input: "9\n1 8 6 2 5 4 8 3 7", output: "49", hidden: false },
      { input: "2\n1 1", output: "1", hidden: false },
      { input: "6\n4 3 2 1 4 5", output: "16", hidden: true },
      { input: "3\n1 2 1", output: "2", hidden: true },
      { input: "7\n2 3 4 5 18 17 6", output: "17", hidden: true },
      { input: "5\n1 8 100 2 100", output: "200", hidden: true },
      { input: "10\n1 2 3 4 5 6 7 8 9 10", output: "25", hidden: true },
      { input: "4\n10 10 10 10", output: "30", hidden: true },
      { input: "8\n5 2 12 1 5 3 4 11", output: "55", hidden: true },
    ],
  },

  // Sliding Window
  7: {
    id: 7,
    title: "Best Time to Buy and Sell Stock",
    difficulty: "Easy",
    topic: "Arrays",
    category: "Sliding Window",
    description: "You are given an array prices where prices[i] is the price of a given stock on the ith day. You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.",
    examples: [
      { input: "prices = [7,1,5,3,6,4]", output: "5" },
      { input: "prices = [7,6,4,3,1]", output: "0" }
    ],
    constraints: [
      "1 <= prices.length <= 10^5",
      "0 <= prices[i] <= 10^4"
    ],
    testCases: [
      { input: "6\n7 1 5 3 6 4", output: "5", hidden: false },
      { input: "5\n7 6 4 3 1", output: "0", hidden: false },
      { input: "4\n1 2 3 4", output: "3", hidden: true },
      { input: "5\n2 4 1 7 5", output: "6", hidden: true },
      { input: "3\n3 3 3", output: "0", hidden: true },
      { input: "7\n10 1 5 6 7 1 10", output: "9", hidden: true },
      { input: "6\n5 10 5 10 5 10", output: "5", hidden: true },
      { input: "8\n1 2 4 2 5 7 2 4", output: "6", hidden: true },
      { input: "4\n100 50 25 10", output: "0", hidden: true },
    ],
    hiddenCases: [
      { input: "3\n3 1 2",          output: "1",  isHidden: true },
      { input: "6\n6 7 1 2 3 4",    output: "1",  isHidden: true },
    ],
    hints: ["Use binary search: if nums[mid] > nums[right], the minimum is in the right half.", "Else the minimum is in the left half (including mid)."],
    editorial: { approach: "Binary search on the inflection point of the rotation.", timeComplexity: "O(log n)", spaceComplexity: "O(1)" },
  },

  8: {
    id: 8, title: "Search in Rotated Sorted Array", difficulty: "Medium", category: "Array",
    tags: ["array", "binary-search"],
    description: `Given the integer array nums sorted in ascending order with distinct values, which is possibly rotated, and an integer target, return the index of target if it exists, or -1 if it does not.`,
    constraints: ["1 <= nums.length <= 5000", "-10^4 <= nums[i], target <= 10^4", "All values are distinct."],
    examples: [
      { input: "nums=[4,5,6,7,0,1,2], target=0", output: "4" },
      { input: "nums=[4,5,6,7,0,1,2], target=3", output: "-1" },
    ],
    starterCode: {
      python: `import sys
input = sys.stdin.readline
def search(nums, target):
    pass
n = int(input())
nums = list(map(int, input().split()))
target = int(input())
print(search(nums, target))`,
      javascript: `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\\n');
function search(nums, target) { /* your code */ }
const nums = lines[1].split(' ').map(Number);
const target = +lines[2];
console.log(search(nums, target));`,
      java8: `import java.util.*;import java.io.*;
public class Solution {
    public static int search(int[] nums, int target) { return -1; }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int n = Integer.parseInt(br.readLine().trim());
        StringTokenizer st = new StringTokenizer(br.readLine());
        int[] nums = new int[n]; for(int i=0;i<n;i++) nums[i]=Integer.parseInt(st.nextToken());
        int target = Integer.parseInt(br.readLine().trim());
        System.out.println(search(nums, target));
    }
}`,
      cpp: `#include<bits/stdc++.h>
using namespace std;
int search(vector<int>& nums, int target){ return -1; }
int main(){ int n; cin>>n; vector<int> v(n); for(int& x:v) cin>>x; int t; cin>>t; cout<<search(v,t)<<endl; }`,
    },
    testCases: [
      { input: "abcabcbb", output: "3", hidden: false },
      { input: "bbbbb", output: "1", hidden: false },
      { input: "pwwkew", output: "3", hidden: false },
      { input: "dvdf", output: "3", hidden: true },
      { input: "anviaj", output: "5", hidden: true },
      { input: "abcdefg", output: "7", hidden: true },
      { input: "aab", output: "2", hidden: true },
      { input: "tmmzuxt", output: "5", hidden: true },
      { input: " ", output: "1", hidden: true },
      { input: "abba", output: "2", hidden: true },
    ],
    hiddenCases: [
      { input: "5\n5 1 2 3 4\n1",     output: "1",  isHidden: true },
      { input: "3\n3 1 2\n3",         output: "0",  isHidden: true },
    ],
    hints: ["In binary search, one half is always normally sorted.", "If nums[left]<=nums[mid], the left half is sorted — check if target falls in that range."],
    editorial: { approach: "Modified binary search: identify which half is sorted, then decide which half contains target.", timeComplexity: "O(log n)", spaceComplexity: "O(1)" },
  },

  9: {
    id: 9, title: "3Sum", difficulty: "Medium", category: "Array",
    tags: ["array", "two-pointers", "sorting"],
    description: `Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j != k and nums[i]+nums[j]+nums[k]==0.\n\nThe solution set must not contain duplicate triplets.`,
    constraints: ["3 <= nums.length <= 3000", "-10^5 <= nums[i] <= 10^5"],
    examples: [
      { input: "nums=[-1,0,1,2,-1,-4]", output: "[[-1,-1,2],[-1,0,1]]" },
      { input: "nums=[0,0,0]", output: "[[0,0,0]]" },
    ],
    starterCode: {
      python: `import sys
input = sys.stdin.readline
def three_sum(nums):
    pass
n = int(input())
nums = list(map(int, input().split()))
result = three_sum(nums)
for triplet in result:
    print(*triplet)`,
      javascript: `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\\n');
function threeSum(nums) { /* your code - return array of triplets */ }
const nums = lines[1].split(' ').map(Number);
const result = threeSum(nums);
result.forEach(t => console.log(t.join(' ')));`,
      java8: `import java.util.*;import java.io.*;
public class Solution {
    public static List<List<Integer>> threeSum(int[] nums) { return new ArrayList<>(); }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int n = Integer.parseInt(br.readLine().trim());
        StringTokenizer st = new StringTokenizer(br.readLine());
        int[] nums = new int[n]; for(int i=0;i<n;i++) nums[i]=Integer.parseInt(st.nextToken());
        for(List<Integer> t : threeSum(nums)){
            System.out.println(t.get(0)+" "+t.get(1)+" "+t.get(2));
        }
    }
}`,
      cpp: `#include<bits/stdc++.h>
using namespace std;
vector<vector<int>> threeSum(vector<int>& nums){ return {}; }
int main(){ int n; cin>>n; vector<int> v(n); for(int& x:v) cin>>x;
    for(auto& t:threeSum(v)) cout<<t[0]<<" "<<t[1]<<" "<<t[2]<<"\n"; }`,
    },
    testCases: [
      { input: "6\n-1 0 1 2 -1 -4", output: "-1 -1 2\n-1 0 1" },
      { input: "3\n0 1 1",          output: ""               },
      { input: "3\n0 0 0",          output: "0 0 0"          },
    ],
    hiddenCases: [
      { input: "6\n-4 -2 -2 -2 0 1", output: "-4 1 3\n-2 -2 4\n-2 0 2", isHidden: true },
      { input: "4\n-2 0 1 1",         output: "-2 1 1",                  isHidden: true },
    ],
    hints: ["Sort the array first — this lets you skip duplicates easily.", "Fix one element, then use two pointers from both ends of the remaining subarray."],
    editorial: { approach: "Sort + two-pointer: fix nums[i], then l=i+1, r=n-1, adjust based on sum.", timeComplexity: "O(n²)", spaceComplexity: "O(1)" },
  },

  10: {
    id: 10, title: "Container With Most Water", difficulty: "Medium", category: "Array",
    tags: ["array", "two-pointers", "greedy"],
    description: `Given n non-negative integers height representing vertical lines, find two lines that together with the x-axis forms a container that holds the most water. Return the maximum amount of water.`,
    constraints: ["2 <= height.length <= 10^5", "0 <= height[i] <= 10^4"],
    examples: [
      { input: "height=[1,8,6,2,5,4,8,3,7]", output: "49" },
      { input: "height=[1,1]", output: "1" },
    ],
    starterCode: {
      python: `import sys
input = sys.stdin.readline
def max_area(height):
    pass
n = int(input())
height = list(map(int, input().split()))
print(max_area(height))`,
      javascript: `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\\n');
function maxArea(height) { /* your code */ }
const height = lines[1].split(' ').map(Number);
console.log(maxArea(height));`,
      java8: `import java.util.*;import java.io.*;
public class Solution {
    public static int maxArea(int[] height) { return 0; }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int n = Integer.parseInt(br.readLine().trim());
        StringTokenizer st = new StringTokenizer(br.readLine());
        int[] h = new int[n]; for(int i=0;i<n;i++) h[i]=Integer.parseInt(st.nextToken());
        System.out.println(maxArea(h));
    }
}`,
      cpp: `#include<bits/stdc++.h>
using namespace std;
int maxArea(vector<int>& h){ return 0; }
int main(){ int n; cin>>n; vector<int> v(n); for(int& x:v) cin>>x; cout<<maxArea(v)<<endl; }`,
    },
    testCases: [
      { input: "9\n1 8 6 2 5 4 8 3 7", output: "49" },
      { input: "2\n1 1",               output: "1"  },
      { input: "4\n4 3 2 1",           output: "4"  },
    ],
    hiddenCases: [
      { input: "3\n1 2 1",             output: "2",  isHidden: true },
      { input: "5\n2 3 4 5 18",        output: "17", isHidden: true },
    ],
    hints: ["Start with the widest container (two outermost pointers).", "Move the pointer at the shorter height inward — moving the taller one can only decrease area."],
    editorial: { approach: "Two pointers from both ends; always move the shorter side inward.", timeComplexity: "O(n)", spaceComplexity: "O(1)" },
  },

  // ══════════════════════════════════════════════════════════════════════════
  // BINARY  (11–15)
  // ══════════════════════════════════════════════════════════════════════════

  11: {
    id: 11, title: "Sum of Two Integers", difficulty: "Medium", category: "Binary",
    tags: ["bit-manipulation"],
    description: `Given two integers a and b, return the sum of the two integers without using the operators + and -.`,
    constraints: ["-1000 <= a, b <= 1000"],
    examples: [
      { input: "a=1, b=2", output: "3" },
      { input: "a=2, b=3", output: "5" },
    ],
    starterCode: {
      python: `import sys
input = sys.stdin.readline
def get_sum(a, b):
    pass
a, b = map(int, input().split())
print(get_sum(a, b))`,
      javascript: `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\\n');
function getSum(a, b) { /* your code */ }
const [a, b] = lines[0].split(' ').map(Number);
console.log(getSum(a, b));`,
      java8: `import java.util.*;import java.io.*;
public class Solution {
    public static int getSum(int a, int b) { return 0; }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());
        System.out.println(getSum(Integer.parseInt(st.nextToken()), Integer.parseInt(st.nextToken())));
    }
}`,
      cpp: `#include<bits/stdc++.h>
using namespace std;
int getSum(int a, int b){ return 0; }
int main(){ int a,b; cin>>a>>b; cout<<getSum(a,b)<<endl; }`,
    },
    testCases: [
      { input: "1 2",   output: "3"  },
      { input: "2 3",   output: "5"  },
      { input: "-1 1",  output: "0"  },
    ],
    hiddenCases: [
      { input: "-5 -3",  output: "-8", isHidden: true },
      { input: "100 200", output: "300", isHidden: true },
    ],
    hints: ["Use XOR for sum without carry, AND+left-shift for the carry.", "Repeat until there is no carry (b becomes 0)."],
    editorial: { approach: "Bit manipulation: a^b gives sum bits, (a&b)<<1 gives carry. Repeat.", timeComplexity: "O(1)", spaceComplexity: "O(1)" },
  },

  12: {
    id: 12, title: "Number of 1 Bits", difficulty: "Easy", category: "Binary",
    tags: ["bit-manipulation"],
    description: `Given a positive integer n, write a function that returns the number of set bits in its binary representation (also known as the Hamming weight).`,
    constraints: ["1 <= n <= 2^31 - 1"],
    examples: [
      { input: "n=11", output: "3", explanation: "11 in binary is 1011, which has three 1 bits." },
      { input: "n=128", output: "1", explanation: "128 in binary is 10000000." },
    ],
    starterCode: {
      python: `import sys
input = sys.stdin.readline
def hamming_weight(n):
    pass
n = int(input())
print(hamming_weight(n))`,
      javascript: `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\\n');
function hammingWeight(n) { /* your code */ }
console.log(hammingWeight(+lines[0]));`,
      java8: `import java.util.*;import java.io.*;
public class Solution {
    public static int hammingWeight(int n) { return 0; }
    public static void main(String[] args) throws Exception {
        int n = Integer.parseInt(new BufferedReader(new InputStreamReader(System.in)).readLine().trim());
        System.out.println(hammingWeight(n));
    }
}`,
      cpp: `#include<bits/stdc++.h>
using namespace std;
int hammingWeight(uint32_t n){ return 0; }
int main(){ uint32_t n; cin>>n; cout<<hammingWeight(n)<<endl; }`,
    },
    testCases: [
      { input: "11",          output: "3" },
      { input: "128",         output: "1" },
      { input: "2147483645",  output: "30" },
    ],
    hiddenCases: [
      { input: "1",           output: "1", isHidden: true },
      { input: "4294967293",  output: "31", isHidden: true },
    ],
    hints: ["n & (n-1) clears the lowest set bit.", "Count how many times you can do this before n becomes 0."],
    editorial: { approach: "n & (n-1) trick removes the lowest set bit each iteration.", timeComplexity: "O(1)", spaceComplexity: "O(1)" },
  },

  13: {
    id: 13, title: "Counting Bits", difficulty: "Easy", category: "Binary",
    tags: ["bit-manipulation", "dynamic-programming"],
    description: `Given an integer n, return an array ans of length n+1 where ans[i] is the number of 1's in the binary representation of i.`,
    constraints: ["0 <= n <= 10^5"],
    examples: [
      { input: "n=2", output: "0 1 1" },
      { input: "n=5", output: "0 1 1 2 1 2" },
    ],
    starterCode: {
      python: `import sys
input = sys.stdin.readline
def count_bits(n):
    pass
n = int(input())
print(*count_bits(n))`,
      javascript: `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\\n');
function countBits(n) { /* return array of length n+1 */ }
console.log(countBits(+lines[0]).join(' '));`,
      java8: `import java.util.*;import java.io.*;
public class Solution {
    public static int[] countBits(int n) { return new int[]{}; }
    public static void main(String[] args) throws Exception {
        int n = Integer.parseInt(new BufferedReader(new InputStreamReader(System.in)).readLine().trim());
        int[] r = countBits(n);
        StringBuilder sb = new StringBuilder();
        for(int i=0;i<=n;i++){ if(i>0) sb.append(' '); sb.append(r[i]); }
        System.out.println(sb);
    }
}`,
      cpp: `#include<bits/stdc++.h>
using namespace std;
vector<int> countBits(int n){ return {}; }
int main(){ int n; cin>>n; auto r=countBits(n); for(int i=0;i<=n;i++){ if(i) cout<<' '; cout<<r[i]; } cout<<endl; }`,
    },
    testCases: [
      { input: "2", output: "0 1 1"       },
      { input: "5", output: "0 1 1 2 1 2" },
      { input: "0", output: "0"           },
    ],
    hiddenCases: [
      { input: "8",  output: "0 1 1 2 1 2 2 3 1",   isHidden: true },
      { input: "10", output: "0 1 1 2 1 2 2 3 1 2 2", isHidden: true },
    ],
    hints: ["dp[i] = dp[i>>1] + (i&1). The bit count of i is the bit count of i/2, plus 1 if i is odd.", "This builds the answer in O(n) with no extra bit counting."],
    editorial: { approach: "DP: dp[i] = dp[i>>1] + (i&1).", timeComplexity: "O(n)", spaceComplexity: "O(n)" },
  },

  14: {
    id: 14, title: "Missing Number", difficulty: "Easy", category: "Binary",
    tags: ["array", "bit-manipulation", "math"],
    description: `Given an array nums containing n distinct numbers in the range [0, n], return the only number in the range that is missing from the array.`,
    constraints: ["1 <= nums.length <= 10^4", "0 <= nums[i] <= n", "All numbers are distinct."],
    examples: [
      { input: "nums=[3,0,1]", output: "2" },
      { input: "nums=[9,6,4,2,3,5,7,0,1]", output: "8" },
    ],
    starterCode: {
      python: `import sys
input = sys.stdin.readline
def missing_number(nums):
    pass
n = int(input())
nums = list(map(int, input().split()))
print(missing_number(nums))`,
      javascript: `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\\n');
function missingNumber(nums) { /* your code */ }
const nums = lines[1].split(' ').map(Number);
console.log(missingNumber(nums));`,
      java8: `import java.util.*;import java.io.*;
public class Solution {
    public static int missingNumber(int[] nums) { return 0; }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int n = Integer.parseInt(br.readLine().trim());
        StringTokenizer st = new StringTokenizer(br.readLine());
        int[] nums = new int[n]; for(int i=0;i<n;i++) nums[i]=Integer.parseInt(st.nextToken());
        System.out.println(missingNumber(nums));
    }
}`,
      cpp: `#include<bits/stdc++.h>
using namespace std;
int missingNumber(vector<int>& nums){ return 0; }
int main(){ int n; cin>>n; vector<int> v(n); for(int& x:v) cin>>x; cout<<missingNumber(v)<<endl; }`,
    },
    testCases: [
      { input: "3\n3 0 1",                  output: "2" },
      { input: "9\n9 6 4 2 3 5 7 0 1",      output: "8" },
      { input: "1\n0",                       output: "1" },
    ],
    hiddenCases: [
      { input: "2\n0 1",                     output: "2", isHidden: true },
      { input: "5\n4 3 1 0 2",              output: "5", isHidden: true },
    ],
    hints: ["Expected sum of 0..n is n*(n+1)/2. Subtract the actual sum.", "Or XOR all indices 0..n with all values — duplicates cancel, leaving the missing number."],
    editorial: { approach: "Math: expected_sum − actual_sum = missing number.", timeComplexity: "O(n)", spaceComplexity: "O(1)" },
  },

  15: {
    id: 15, title: "Reverse Bits", difficulty: "Easy", category: "Binary",
    tags: ["bit-manipulation", "divide-and-conquer"],
    description: `Reverse bits of a given 32 bits unsigned integer.`,
    constraints: ["The input is a 32-bit unsigned integer."],
    examples: [
      { input: "43261596", output: "964176192", explanation: "Binary: 00000010100101000001111010011100 → 00111001011110000010100101000000" },
      { input: "4294967293", output: "3221225471" },
    ],
    starterCode: {
      python: `import sys
input = sys.stdin.readline
def reverse_bits(n):
    pass
n = int(input())
print(reverse_bits(n))`,
      javascript: `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\\n');
function reverseBits(n) { /* your code */ }
console.log(reverseBits(+lines[0]));`,
      java8: `import java.util.*;import java.io.*;
public class Solution {
    public static int reverseBits(int n) { return 0; }
    public static void main(String[] args) throws Exception {
        long v = Long.parseLong(new BufferedReader(new InputStreamReader(System.in)).readLine().trim());
        System.out.println(Integer.toUnsignedLong(reverseBits((int)v)));
    }
}`,
      cpp: `#include<bits/stdc++.h>
using namespace std;
uint32_t reverseBits(uint32_t n){ return 0; }
int main(){ uint32_t n; cin>>n; cout<<reverseBits(n)<<endl; }`,
    },
    testCases: [
      { input: "43261596",    output: "964176192"  },
      { input: "4294967293",  output: "3221225471" },
      { input: "0",           output: "0"          },
    ],
    hiddenCases: [
      { input: "1",           output: "2147483648", isHidden: true },
      { input: "2147483648",  output: "1",          isHidden: true },
    ],
    hints: ["Process one bit at a time: read LSB of n, shift it into result from MSB.", "Shift n right and result left in a loop of 32 iterations."],
    editorial: { approach: "Iterate 32 times: result = (result<<1)|(n&1), n>>=1.", timeComplexity: "O(1)", spaceComplexity: "O(1)" },
  },

  // ══════════════════════════════════════════════════════════════════════════
  // DYNAMIC PROGRAMMING  (16–26)
  // ══════════════════════════════════════════════════════════════════════════

  16: {
    id: 16, title: "Climbing Stairs", difficulty: "Easy", category: "Dynamic Programming",
    tags: ["dynamic-programming", "math"],
    description: `You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?`,
    constraints: ["1 <= n <= 45"],
    examples: [
      { input: "n=2", output: "2", explanation: "1+1 or 2." },
      { input: "n=3", output: "3", explanation: "1+1+1, 1+2, or 2+1." },
    ],
    starterCode: {
      python: `import sys
input = sys.stdin.readline
def climb_stairs(n):
    pass
n = int(input())
print(climb_stairs(n))`,
      javascript: `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\\n');
function climbStairs(n) { /* your code */ }
console.log(climbStairs(+lines[0]));`,
      java8: `import java.util.*;import java.io.*;
public class Solution {
    public static int climbStairs(int n) { return 0; }
    public static void main(String[] args) throws Exception {
        int n = Integer.parseInt(new BufferedReader(new InputStreamReader(System.in)).readLine().trim());
        System.out.println(climbStairs(n));
    }
}`,
      cpp: `#include<bits/stdc++.h>
using namespace std;
int climbStairs(int n){ return 0; }
int main(){ int n; cin>>n; cout<<climbStairs(n)<<endl; }`,
    },
    testCases: [
      { input: "2", output: "2" },
      { input: "3", output: "3" },
      { input: "5", output: "8" },
    ],
    hiddenCases: [
      { input: "10", output: "89",  isHidden: true },
      { input: "1",  output: "1",   isHidden: true },
    ],
    hints: ["Ways to reach step n = ways to reach n-1 + ways to reach n-2.", "This is the Fibonacci sequence."],
    editorial: { approach: "dp[i] = dp[i-1] + dp[i-2], base cases dp[1]=1, dp[2]=2.", timeComplexity: "O(n)", spaceComplexity: "O(1)" },
  },

  17: {
    id: 17, title: "Coin Change", difficulty: "Medium", category: "Dynamic Programming",
    tags: ["dynamic-programming", "breadth-first-search"],
    description: `Given an array of coins of different denominations and an integer amount, return the fewest number of coins needed to make up that amount. If it cannot be made up, return -1.`,
    constraints: ["1 <= coins.length <= 12", "1 <= coins[i] <= 2^31 - 1", "0 <= amount <= 10^4"],
    examples: [
      { input: "coins=[1,2,5], amount=11", output: "3", explanation: "11 = 5+5+1" },
      { input: "coins=[2], amount=3", output: "-1" },
    ],
    starterCode: {
      python: `import sys
input = sys.stdin.readline
def coin_change(coins, amount):
    pass
n = int(input())
coins = list(map(int, input().split()))
amount = int(input())
print(coin_change(coins, amount))`,
      javascript: `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\\n');
function coinChange(coins, amount) { /* your code */ }
const coins = lines[1].split(' ').map(Number);
const amount = +lines[2];
console.log(coinChange(coins, amount));`,
      java8: `import java.util.*;import java.io.*;
public class Solution {
    public static int coinChange(int[] coins, int amount) { return -1; }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int n = Integer.parseInt(br.readLine().trim());
        StringTokenizer st = new StringTokenizer(br.readLine());
        int[] coins = new int[n]; for(int i=0;i<n;i++) coins[i]=Integer.parseInt(st.nextToken());
        int amount = Integer.parseInt(br.readLine().trim());
        System.out.println(coinChange(coins, amount));
    }
}`,
      cpp: `#include<bits/stdc++.h>
using namespace std;
int coinChange(vector<int>& coins, int amount){ return -1; }
int main(){ int n; cin>>n; vector<int> c(n); for(int& x:c) cin>>x; int a; cin>>a; cout<<coinChange(c,a)<<endl; }`,
    },
    testCases: [
      { input: "3\n1 2 5\n11", output: "3"  },
      { input: "1\n2\n3",      output: "-1" },
      { input: "1\n1\n0",      output: "0"  },
    ],
    hiddenCases: [
      { input: "3\n1 5 10\n30", output: "3",  isHidden: true },
      { input: "2\n5 3\n11",   output: "3",  isHidden: true },
    ],
    hints: ["Build dp[0..amount] where dp[i] = min coins to make amount i.", "For each amount i and each coin c, dp[i] = min(dp[i], dp[i-c]+1)."],
    editorial: { approach: "Bottom-up DP: dp[i] = min(dp[i-c]+1) for each coin c.", timeComplexity: "O(amount×coins)", spaceComplexity: "O(amount)" },
  },

  18: {
    id: 18, title: "Longest Increasing Subsequence", difficulty: "Medium", category: "Dynamic Programming",
    tags: ["dynamic-programming", "binary-search"],
    description: `Given an integer array nums, return the length of the longest strictly increasing subsequence.`,
    constraints: ["1 <= nums.length <= 2500", "-10^4 <= nums[i] <= 10^4"],
    examples: [
      { input: "nums=[10,9,2,5,3,7,101,18]", output: "4", explanation: "[2,3,7,101]" },
      { input: "nums=[0,1,0,3,2,3]", output: "4" },
    ],
    starterCode: {
      python: `import sys
input = sys.stdin.readline
def length_of_lis(nums):
    pass
n = int(input())
nums = list(map(int, input().split()))
print(length_of_lis(nums))`,
      javascript: `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\\n');
function lengthOfLIS(nums) { /* your code */ }
const nums = lines[1].split(' ').map(Number);
console.log(lengthOfLIS(nums));`,
      java8: `import java.util.*;import java.io.*;
public class Solution {
    public static int lengthOfLIS(int[] nums) { return 0; }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int n = Integer.parseInt(br.readLine().trim());
        StringTokenizer st = new StringTokenizer(br.readLine());
        int[] nums = new int[n]; for(int i=0;i<n;i++) nums[i]=Integer.parseInt(st.nextToken());
        System.out.println(lengthOfLIS(nums));
    }
}`,
      cpp: `#include<bits/stdc++.h>
using namespace std;
int lengthOfLIS(vector<int>& nums){ return 0; }
int main(){ int n; cin>>n; vector<int> v(n); for(int& x:v) cin>>x; cout<<lengthOfLIS(v)<<endl; }`,
    },
    testCases: [
      { input: "8\n10 9 2 5 3 7 101 18", output: "4" },
      { input: "6\n0 1 0 3 2 3",         output: "4" },
      { input: "1\n7",                   output: "1" },
    ],
    hiddenCases: [
      { input: "5\n4 10 4 3 8",          output: "3", isHidden: true },
      { input: "6\n3 5 6 2 5 4",         output: "3", isHidden: true },
    ],
    hints: ["dp[i] = length of LIS ending at index i.", "For O(n log n): maintain a tails array and use binary search to find the insertion position."],
    editorial: { approach: "O(n log n): patience sorting with binary search on tails array.", timeComplexity: "O(n log n)", spaceComplexity: "O(n)" },
  },

  19: {
    id: 19, title: "Longest Common Subsequence", difficulty: "Medium", category: "Dynamic Programming",
    tags: ["dynamic-programming", "string"],
    description: `Given two strings text1 and text2, return the length of their longest common subsequence. A subsequence is derived by deleting some characters without changing the order.`,
    constraints: ["1 <= text1.length, text2.length <= 1000", "text1 and text2 consist of only lowercase English characters."],
    examples: [
      { input: "text1=abcde, text2=ace", output: "3", explanation: "LCS is ace." },
      { input: "text1=abc, text2=abc", output: "3" },
    ],
    starterCode: {
      python: `import sys
input = sys.stdin.readline
def lcs(text1, text2):
    pass
text1 = input().strip()
text2 = input().strip()
print(lcs(text1, text2))`,
      javascript: `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\\n');
function longestCommonSubsequence(t1, t2) { /* your code */ }
console.log(longestCommonSubsequence(lines[0], lines[1]));`,
      java8: `import java.util.*;import java.io.*;
public class Solution {
    public static int longestCommonSubsequence(String t1, String t2) { return 0; }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        System.out.println(longestCommonSubsequence(br.readLine().trim(), br.readLine().trim()));
    }
}`,
      cpp: `#include<bits/stdc++.h>
using namespace std;
int longestCommonSubsequence(string t1, string t2){ return 0; }
int main(){ string a,b; cin>>a>>b; cout<<longestCommonSubsequence(a,b)<<endl; }`,
    },
    testCases: [
      { input: "abcde\nace",  output: "3" },
      { input: "abc\nabc",    output: "3" },
      { input: "abc\ndef",    output: "0" },
    ],
    hiddenCases: [
      { input: "abcba\nabcbcba", output: "5", isHidden: true },
      { input: "bl\nyby",       output: "1", isHidden: true },
    ],
    hints: ["Build a 2D dp table: dp[i][j] = LCS of text1[0..i-1] and text2[0..j-1].", "If text1[i-1]==text2[j-1], dp[i][j]=dp[i-1][j-1]+1. Else max(dp[i-1][j], dp[i][j-1])."],
    editorial: { approach: "2D DP table with character comparison.", timeComplexity: "O(m×n)", spaceComplexity: "O(m×n)" },
  },

  20: {
    id: 20, title: "Word Break", difficulty: "Medium", category: "Dynamic Programming",
    tags: ["dynamic-programming", "trie", "memoization"],
    description: `Given a string s and a dictionary of strings wordDict, return true if s can be segmented into a space-separated sequence of one or more dictionary words.`,
    constraints: ["1 <= s.length <= 300", "1 <= wordDict.length <= 1000", "1 <= wordDict[i].length <= 20"],
    examples: [
      { input: "s=leetcode, wordDict=[leet,code]", output: "true" },
      { input: "s=applepenapple, wordDict=[apple,pen]", output: "true" },
    ],
    starterCode: {
      python: `import sys
input = sys.stdin.readline
def word_break(s, word_dict):
    pass
s = input().strip()
k = int(input())
word_dict = input().split()
print(str(word_break(s, word_dict)).lower())`,
      javascript: `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\\n');
function wordBreak(s, wordDict) { /* your code */ }
const s = lines[0]; const wordDict = lines[2].split(' ');
console.log(wordBreak(s, wordDict).toString());`,
      java8: `import java.util.*;import java.io.*;
public class Solution {
    public static boolean wordBreak(String s, List<String> wordDict) { return false; }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String s = br.readLine().trim(); int k = Integer.parseInt(br.readLine().trim());
        String[] words = br.readLine().trim().split(" ");
        System.out.println(wordBreak(s, Arrays.asList(words)));
    }
}`,
      cpp: `#include<bits/stdc++.h>
using namespace std;
bool wordBreak(string s, vector<string>& d){ return false; }
int main(){ string s; cin>>s; int k; cin>>k; vector<string> d(k); for(auto& w:d) cin>>w; cout<<(wordBreak(s,d)?"true":"false")<<endl; }`,
    },
    testCases: [
      { input: "leetcode\n2\nleet code",        output: "true"  },
      { input: "applepenapple\n2\napple pen",    output: "true"  },
      { input: "catsandog\n2\ncats dog",         output: "false" },
    ],
    hiddenCases: [
      { input: "aaaaaaa\n2\naaaa aaa",           output: "true",  isHidden: true },
      { input: "goalspecial\n2\ngo goal special", output: "true",  isHidden: true },
    ],
    hints: ["dp[i] = true if s[0..i-1] can be segmented.", "For each i, check all j<i where dp[j] is true and s[j..i-1] is in the dictionary."],
    editorial: { approach: "DP: dp[i]=true if some dp[j] && s[j:i] in wordSet.", timeComplexity: "O(n²)", spaceComplexity: "O(n)" },
  },

  21: {
    id: 21, title: "Combination Sum IV", difficulty: "Medium", category: "Dynamic Programming",
    tags: ["dynamic-programming"],
    description: `Given an array of distinct integers nums and a target integer target, return the number of possible combinations that add up to target. The order of elements matters.`,
    constraints: ["1 <= nums.length <= 200", "1 <= nums[i] <= 1000", "All elements are distinct.", "1 <= target <= 1000"],
    examples: [
      { input: "nums=[1,2,3], target=4", output: "7", explanation: "(1,1,1,1),(1,1,2),(1,2,1),(1,3),(2,1,1),(2,2),(3,1)" },
      { input: "nums=[9], target=3", output: "0" },
    ],
    starterCode: {
      python: `import sys
input = sys.stdin.readline
def combination_sum4(nums, target):
    pass
n = int(input())
nums = list(map(int, input().split()))
target = int(input())
print(combination_sum4(nums, target))`,
      javascript: `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\\n');
function combinationSum4(nums, target) { /* your code */ }
const nums = lines[1].split(' ').map(Number);
console.log(combinationSum4(nums, +lines[2]));`,
      java8: `import java.util.*;import java.io.*;
public class Solution {
    public static int combinationSum4(int[] nums, int target) { return 0; }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int n = Integer.parseInt(br.readLine().trim());
        StringTokenizer st = new StringTokenizer(br.readLine());
        int[] nums = new int[n]; for(int i=0;i<n;i++) nums[i]=Integer.parseInt(st.nextToken());
        System.out.println(combinationSum4(nums, Integer.parseInt(br.readLine().trim())));
    }
}`,
      cpp: `#include<bits/stdc++.h>
using namespace std;
int combinationSum4(vector<int>& nums, int target){ return 0; }
int main(){ int n; cin>>n; vector<int> v(n); for(int& x:v) cin>>x; int t; cin>>t; cout<<combinationSum4(v,t)<<endl; }`,
    },
    testCases: [
      { input: "3\n1 2 3\n4", output: "7" },
      { input: "1\n9\n3",     output: "0" },
      { input: "2\n1 2\n3",   output: "3" },
    ],
    hiddenCases: [
      { input: "3\n1 2 3\n10", output: "274",  isHidden: true },
      { input: "1\n1\n5",      output: "1",    isHidden: true },
    ],
    hints: ["dp[i] = number of ways to reach sum i.", "For each target t and each num, dp[t] += dp[t-num] (if t>=num)."],
    editorial: { approach: "DP: dp[t] = Σ dp[t-num] for all nums ≤ t.", timeComplexity: "O(target×n)", spaceComplexity: "O(target)" },
  },

  22: {
    id: 22, title: "House Robber", difficulty: "Medium", category: "Dynamic Programming",
    tags: ["dynamic-programming"],
    description: `You are a robber planning to rob houses along a street. Adjacent houses have security systems connected — if two adjacent houses are robbed, the police are alerted. Given an array of non-negative integers representing the amount of money of each house, return the maximum amount you can rob without alerting the police.`,
    constraints: ["1 <= nums.length <= 100", "0 <= nums[i] <= 400"],
    examples: [
      { input: "nums=[1,2,3,1]", output: "4", explanation: "Rob house 1 (1) then house 3 (3)." },
      { input: "nums=[2,7,9,3,1]", output: "12" },
    ],
    starterCode: {
      python: `import sys
input = sys.stdin.readline
def rob(nums):
    pass
n = int(input())
nums = list(map(int, input().split()))
print(rob(nums))`,
      javascript: `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\\n');
function rob(nums) { /* your code */ }
const nums = lines[1].split(' ').map(Number);
console.log(rob(nums));`,
      java8: `import java.util.*;import java.io.*;
public class Solution {
    public static int rob(int[] nums) { return 0; }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int n = Integer.parseInt(br.readLine().trim());
        StringTokenizer st = new StringTokenizer(br.readLine());
        int[] nums = new int[n]; for(int i=0;i<n;i++) nums[i]=Integer.parseInt(st.nextToken());
        System.out.println(rob(nums));
    }
}`,
      cpp: `#include<bits/stdc++.h>
using namespace std;
int rob(vector<int>& nums){ return 0; }
int main(){ int n; cin>>n; vector<int> v(n); for(int& x:v) cin>>x; cout<<rob(v)<<endl; }`,
    },
    testCases: [
      { input: "4\n1 2 3 1",   output: "4"  },
      { input: "5\n2 7 9 3 1", output: "12" },
      { input: "1\n0",         output: "0"  },
    ],
    hiddenCases: [
      { input: "3\n2 1 1",     output: "3", isHidden: true },
      { input: "5\n5 5 5 5 5", output: "15", isHidden: true },
    ],
    hints: ["At each house you either rob it or skip it.", "dp[i] = max(dp[i-1], dp[i-2] + nums[i])."],
    editorial: { approach: "dp[i] = max(dp[i-1], dp[i-2]+nums[i]) with O(1) space.", timeComplexity: "O(n)", spaceComplexity: "O(1)" },
  },

  23: {
    id: 23, title: "House Robber II", difficulty: "Medium", category: "Dynamic Programming",
    tags: ["dynamic-programming"],
    description: `Same as House Robber but houses are arranged in a circle — the first and last are adjacent. Return the maximum amount you can rob.`,
    constraints: ["1 <= nums.length <= 100", "0 <= nums[i] <= 1000"],
    examples: [
      { input: "nums=[2,3,2]", output: "3" },
      { input: "nums=[1,2,3,1]", output: "4" },
    ],
    starterCode: {
      python: `import sys
input = sys.stdin.readline
def rob(nums):
    pass
n = int(input())
nums = list(map(int, input().split()))
print(rob(nums))`,
      javascript: `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\\n');
function rob(nums) { /* your code */ }
const nums = lines[1].split(' ').map(Number);
console.log(rob(nums));`,
      java8: `import java.util.*;import java.io.*;
public class Solution {
    public static int rob(int[] nums) { return 0; }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int n = Integer.parseInt(br.readLine().trim());
        StringTokenizer st = new StringTokenizer(br.readLine());
        int[] nums = new int[n]; for(int i=0;i<n;i++) nums[i]=Integer.parseInt(st.nextToken());
        System.out.println(rob(nums));
    }
}`,
      cpp: `#include<bits/stdc++.h>
using namespace std;
int rob(vector<int>& nums){ return 0; }
int main(){ int n; cin>>n; vector<int> v(n); for(int& x:v) cin>>x; cout<<rob(v)<<endl; }`,
    },
    testCases: [
      { input: "3\n2 3 2",   output: "3" },
      { input: "4\n1 2 3 1", output: "4" },
      { input: "1\n1",       output: "1" },
    ],
    hiddenCases: [
      { input: "5\n1 2 3 4 5", output: "8", isHidden: true },
      { input: "2\n1 1",       output: "1", isHidden: true },
    ],
    hints: ["Split into two subproblems: rob houses 0..n-2 OR houses 1..n-1.", "Run regular House Robber on each range and take the max."],
    editorial: { approach: "Run House Robber I twice: [0..n-2] and [1..n-1], take max.", timeComplexity: "O(n)", spaceComplexity: "O(1)" },
  },

  24: {
    id: 24, title: "Decode Ways", difficulty: "Medium", category: "Dynamic Programming",
    tags: ["dynamic-programming", "string"],
    description: `A string of digits can be decoded as letters where 'A'→1, 'B'→2, ... 'Z'→26. Given a string s, return the number of ways to decode it.`,
    constraints: ["1 <= s.length <= 100", "s contains only digits and may contain leading zeros."],
    examples: [
      { input: "s=12", output: "2", explanation: "AB (1 2) or L (12)." },
      { input: "s=226", output: "3" },
      { input: "s=06", output: "0" },
    ],
    starterCode: {
      python: `import sys
input = sys.stdin.readline
def num_decodings(s):
    pass
s = input().strip()
print(num_decodings(s))`,
      javascript: `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\\n');
function numDecodings(s) { /* your code */ }
console.log(numDecodings(lines[0]));`,
      java8: `import java.util.*;import java.io.*;
public class Solution {
    public static int numDecodings(String s) { return 0; }
    public static void main(String[] args) throws Exception {
        System.out.println(numDecodings(new BufferedReader(new InputStreamReader(System.in)).readLine().trim()));
    }
}`,
      cpp: `#include<bits/stdc++.h>
using namespace std;
int numDecodings(string s){ return 0; }
int main(){ string s; cin>>s; cout<<numDecodings(s)<<endl; }`,
    },
    testCases: [
      { input: "12",  output: "2" },
      { input: "226", output: "3" },
      { input: "06",  output: "0" },
    ],
    hiddenCases: [
      { input: "11106", output: "2", isHidden: true },
      { input: "1",     output: "1", isHidden: true },
    ],
    hints: ["dp[i] = number of ways to decode s[0..i-1].", "Single digit valid (non-zero): dp[i] += dp[i-1]. Two digit valid (10-26): dp[i] += dp[i-2]."],
    editorial: { approach: "1D DP checking 1-digit and 2-digit validity at each step.", timeComplexity: "O(n)", spaceComplexity: "O(1)" },
  },

  25: {
    id: 25, title: "Unique Paths", difficulty: "Medium", category: "Dynamic Programming",
    tags: ["dynamic-programming", "math", "combinatorics"],
    description: `A robot is on the top-left corner of an m×n grid and can only move right or down. How many unique paths are there to reach the bottom-right corner?`,
    constraints: ["1 <= m, n <= 100"],
    examples: [
      { input: "m=3, n=7", output: "28" },
      { input: "m=3, n=2", output: "3" },
    ],
    starterCode: {
      python: `import sys
input = sys.stdin.readline
def unique_paths(m, n):
    pass
m, n = map(int, input().split())
print(unique_paths(m, n))`,
      javascript: `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\\n');
function uniquePaths(m, n) { /* your code */ }
const [m, n] = lines[0].split(' ').map(Number);
console.log(uniquePaths(m, n));`,
      java8: `import java.util.*;import java.io.*;
public class Solution {
    public static int uniquePaths(int m, int n) { return 0; }
    public static void main(String[] args) throws Exception {
        StringTokenizer st = new StringTokenizer(new BufferedReader(new InputStreamReader(System.in)).readLine());
        System.out.println(uniquePaths(Integer.parseInt(st.nextToken()), Integer.parseInt(st.nextToken())));
    }
}`,
      cpp: `#include<bits/stdc++.h>
using namespace std;
int uniquePaths(int m, int n){ return 0; }
int main(){ int m,n; cin>>m>>n; cout<<uniquePaths(m,n)<<endl; }`,
    },
    testCases: [
      { input: "3 7", output: "28" },
      { input: "3 2", output: "3"  },
      { input: "1 1", output: "1"  },
    ],
    hiddenCases: [
      { input: "7 3",  output: "28",  isHidden: true },
      { input: "10 10", output: "48620", isHidden: true },
    ],
    hints: ["dp[i][j] = dp[i-1][j] + dp[i][j-1] (paths from top + paths from left).", "Or use combinatorics: C(m+n-2, m-1)."],
    editorial: { approach: "DP: dp[i][j] = dp[i-1][j] + dp[i][j-1]. Optimizable to 1D.", timeComplexity: "O(m×n)", spaceComplexity: "O(n)" },
  },

  26: {
    id: 26, title: "Jump Game", difficulty: "Medium", category: "Dynamic Programming",
    tags: ["array", "greedy", "dynamic-programming"],
    description: `Given an integer array nums where nums[i] is the maximum jump length from index i, return true if you can reach the last index starting from index 0.`,
    constraints: ["1 <= nums.length <= 10^4", "0 <= nums[i] <= 10^5"],
    examples: [
      { input: "nums=[2,3,1,1,4]", output: "true" },
      { input: "nums=[3,2,1,0,4]", output: "false" },
    ],
    starterCode: {
      python: `import sys
input = sys.stdin.readline
def can_jump(nums):
    pass
n = int(input())
nums = list(map(int, input().split()))
print(str(can_jump(nums)).lower())`,
      javascript: `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\\n');
function canJump(nums) { /* your code */ }
const nums = lines[1].split(' ').map(Number);
console.log(canJump(nums).toString());`,
      java8: `import java.util.*;import java.io.*;
public class Solution {
    public static boolean canJump(int[] nums) { return false; }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int n = Integer.parseInt(br.readLine().trim());
        StringTokenizer st = new StringTokenizer(br.readLine());
        int[] nums = new int[n]; for(int i=0;i<n;i++) nums[i]=Integer.parseInt(st.nextToken());
        System.out.println(canJump(nums));
    }
}`,
      cpp: `#include<bits/stdc++.h>
using namespace std;
bool canJump(vector<int>& nums){ return false; }
int main(){ int n; cin>>n; vector<int> v(n); for(int& x:v) cin>>x; cout<<(canJump(v)?"true":"false")<<endl; }`,
    },
    testCases: [
      { input: "5\n2 3 1 1 4", output: "true"  },
      { input: "5\n3 2 1 0 4", output: "false" },
      { input: "1\n0",         output: "true"  },
    ],
    hiddenCases: [
      { input: "2\n0 1",       output: "false", isHidden: true },
      { input: "3\n1 1 0",     output: "true",  isHidden: true },
    ],
    hints: ["Track the maximum index reachable so far.", "If at any position i > maxReach, return false. Update maxReach = max(maxReach, i+nums[i])."],
    editorial: { approach: "Greedy: track maxReach. If i > maxReach at any point, return false.", timeComplexity: "O(n)", spaceComplexity: "O(1)" },
  },

  // ══════════════════════════════════════════════════════════════════════════
  // GRAPH  (27–32)
  // ══════════════════════════════════════════════════════════════════════════

  27: {
    id: 27, title: "Clone Graph", difficulty: "Medium", category: "Graph",
    tags: ["graph", "dfs", "bfs", "hash-table"],
    description: `Given a reference of a node in a connected undirected graph, return a deep copy (clone) of the graph.\n\nInput format: first line is n (nodes). Then n lines each: nodeVal neighbor1 neighbor2 ...`,
    constraints: ["1 <= n <= 100", "Node values are unique 1..n.", "No repeated edges, no self-loops."],
    examples: [{ input: "4 nodes: 1--2, 1--4, 2--3, 3--4", output: "Same adjacency list cloned." }],
    starterCode: {
      python: `import sys
from collections import defaultdict, deque
input = sys.stdin.readline

def clone_graph(adj):
    # adj: dict node -> list of neighbors
    # return new adj dict (deep copy)
    pass

n = int(input())
adj = {}
for _ in range(n):
    parts = list(map(int, input().split()))
    node = parts[0]
    adj[node] = parts[1:]

result = clone_graph(adj)
for node in sorted(result):
    print(node, *sorted(result[node]))`,
      javascript: `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\\n');
let i = 0;
const n = +lines[i++];
const adj = {};
for (let j = 0; j < n; j++) {
    const parts = lines[i++].split(' ').map(Number);
    adj[parts[0]] = parts.slice(1);
}
// Clone adj and print sorted
function cloneGraph(adj) { /* return deep copy */ return adj; }
const res = cloneGraph(adj);
Object.keys(res).sort((a,b)=>a-b).forEach(k => console.log(k, ...res[k].slice().sort((a,b)=>a-b)));`,
      java8: `import java.util.*;import java.io.*;
public class Solution {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int n = Integer.parseInt(br.readLine().trim());
        Map<Integer,List<Integer>> adj = new TreeMap<>();
        for(int i=0;i<n;i++){
            StringTokenizer st = new StringTokenizer(br.readLine());
            int node = Integer.parseInt(st.nextToken());
            List<Integer> nb = new ArrayList<>();
            while(st.hasMoreTokens()) nb.add(Integer.parseInt(st.nextToken()));
            adj.put(node, nb);
        }
        // Clone and print
        for(Map.Entry<Integer,List<Integer>> e : adj.entrySet()){
            List<Integer> nb = new ArrayList<>(e.getValue()); Collections.sort(nb);
            StringBuilder sb = new StringBuilder(e.getKey().toString());
            for(int x:nb) sb.append(' ').append(x);
            System.out.println(sb);
        }
    }
}`,
      cpp: `#include<bits/stdc++.h>
using namespace std;
int main(){
    int n; cin>>n; cin.ignore();
    map<int,vector<int>> adj;
    for(int i=0;i<n;i++){
        string line; getline(cin,line);
        istringstream ss(line); int v; ss>>v;
        while(ss>>v) adj[v].push_back(v); // placeholder
    }
    // Clone and print
    for(auto& [k,nb]:adj){ sort(nb.begin(),nb.end()); cout<<k; for(int x:nb) cout<<' '<<x; cout<<'\n'; }
}`,
    },
    testCases: [
      { input: "4\n1 2 4\n2 1 3\n3 2 4\n4 1 3", output: "1 2 4\n2 1 3\n3 2 4\n4 1 3" },
      { input: "1\n1",                            output: "1"                          },
    ],
    hiddenCases: [
      { input: "2\n1 2\n2 1",                     output: "1 2\n2 1", isHidden: true },
      { input: "3\n1 2 3\n2 1 3\n3 1 2",          output: "1 2 3\n2 1 3\n3 1 2", isHidden: true },
    ],
    hints: ["Use a hash map: original node → cloned node.", "DFS/BFS from the start node; clone each node before recursing into neighbors."],
    editorial: { approach: "DFS with visited map. Clone node first, then clone each neighbor.", timeComplexity: "O(V+E)", spaceComplexity: "O(V)" },
  },

  28: {
    id: 28, title: "Course Schedule", difficulty: "Medium", category: "Graph",
    tags: ["graph", "topological-sort", "dfs", "bfs"],
    description: `There are numCourses courses (0..numCourses-1). Given prerequisites[i]=[a,b] meaning you must take b before a, return true if you can finish all courses.`,
    constraints: ["1 <= numCourses <= 2000", "0 <= prerequisites.length <= 5000"],
    examples: [
      { input: "numCourses=2, prerequisites=[[1,0]]", output: "true" },
      { input: "numCourses=2, prerequisites=[[1,0],[0,1]]", output: "false" },
    ],
    starterCode: {
      python: `import sys
input = sys.stdin.readline

def can_finish(n, prereqs):
    pass

n, p = map(int, input().split())
prereqs = []
for _ in range(p):
    a, b = map(int, input().split())
    prereqs.append([a, b])
print(str(can_finish(n, prereqs)).lower())`,
      javascript: `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\\n');
let i = 0;
const [n, p] = lines[i++].split(' ').map(Number);
const prereqs = [];
for (let j = 0; j < p; j++) prereqs.push(lines[i++].split(' ').map(Number));
function canFinish(n, prereqs) { /* your code */ return true; }
console.log(canFinish(n, prereqs).toString());`,
      java8: `import java.util.*;import java.io.*;
public class Solution {
    public static boolean canFinish(int n, int[][] p) { return true; }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());
        int n=Integer.parseInt(st.nextToken()), p=Integer.parseInt(st.nextToken());
        int[][] prereqs = new int[p][2];
        for(int i=0;i<p;i++){ st=new StringTokenizer(br.readLine()); prereqs[i][0]=Integer.parseInt(st.nextToken()); prereqs[i][1]=Integer.parseInt(st.nextToken()); }
        System.out.println(canFinish(n,prereqs));
    }
}`,
      cpp: `#include<bits/stdc++.h>
using namespace std;
bool canFinish(int n, vector<vector<int>>& p){ return true; }
int main(){ int n,p; cin>>n>>p; vector<vector<int>> prereqs(p,vector<int>(2));
    for(auto& x:prereqs) cin>>x[0]>>x[1];
    cout<<(canFinish(n,prereqs)?"true":"false")<<endl; }`,
    },
    testCases: [
      { input: "2 1\n1 0",       output: "true"  },
      { input: "2 2\n1 0\n0 1",  output: "false" },
      { input: "3 0",            output: "true"  },
    ],
    hiddenCases: [
      { input: "4 4\n1 0\n2 1\n3 2\n1 3", output: "false", isHidden: true },
      { input: "5 3\n1 0\n2 0\n3 4",      output: "true",  isHidden: true },
    ],
    hints: ["Build a directed graph; detect a cycle using DFS with 3 states: unvisited, visiting, visited.", "Or use Kahn's BFS topological sort — if all nodes are processed, no cycle exists."],
    editorial: { approach: "Cycle detection via DFS coloring or Kahn's BFS topo-sort.", timeComplexity: "O(V+E)", spaceComplexity: "O(V+E)" },
  },

  29: {
    id: 29, title: "Pacific Atlantic Water Flow", difficulty: "Medium", category: "Graph",
    tags: ["graph", "dfs", "bfs", "matrix"],
    description: `Given an m×n matrix of heights, return all cells from which water can flow to both the Pacific (top/left) and Atlantic (bottom/right) oceans. Water flows to neighbors with height <= current.`,
    constraints: ["1 <= m, n <= 200", "0 <= heights[i][j] <= 10^5"],
    examples: [{ input: "5x5 grid", output: "list of [row,col] pairs" }],
    starterCode: {
      python: `import sys
input = sys.stdin.readline

def pacific_atlantic(heights):
    pass

r, c = map(int, input().split())
heights = [list(map(int, input().split())) for _ in range(r)]
result = pacific_atlantic(heights)
for row, col in sorted(result):
    print(row, col)`,
      javascript: `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\\n');
let i = 0;
const [r, c] = lines[i++].split(' ').map(Number);
const h = [];
for (let j = 0; j < r; j++) h.push(lines[i++].split(' ').map(Number));
function pacificAtlantic(h) { /* return [[r,c],...] */ return []; }
pacificAtlantic(h).sort((a,b)=>a[0]-b[0]||a[1]-b[1]).forEach(([r,c])=>console.log(r,c));`,
      java8: `import java.util.*;import java.io.*;
public class Solution {
    public static List<List<Integer>> pacificAtlantic(int[][] h) { return new ArrayList<>(); }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());
        int r=Integer.parseInt(st.nextToken()), c=Integer.parseInt(st.nextToken());
        int[][] h = new int[r][c];
        for(int i=0;i<r;i++){ st=new StringTokenizer(br.readLine()); for(int j=0;j<c;j++) h[i][j]=Integer.parseInt(st.nextToken()); }
        List<List<Integer>> res = pacificAtlantic(h);
        res.sort((a,b)->a.get(0)!=b.get(0)?a.get(0)-b.get(0):a.get(1)-b.get(1));
        for(List<Integer> p:res) System.out.println(p.get(0)+" "+p.get(1));
    }
}`,
      cpp: `#include<bits/stdc++.h>
using namespace std;
vector<vector<int>> pacificAtlantic(vector<vector<int>>& h){ return {}; }
int main(){ int r,c; cin>>r>>c; vector<vector<int>> h(r,vector<int>(c)); for(auto& row:h) for(int& x:row) cin>>x;
    auto res=pacificAtlantic(h); sort(res.begin(),res.end()); for(auto& p:res) cout<<p[0]<<' '<<p[1]<<'\n'; }`,
    },
    testCases: [
      { input: "5 5\n1 2 2 3 5\n3 2 3 4 4\n2 4 5 3 1\n6 7 1 4 5\n5 1 1 2 4", output: "0 4\n1 3\n1 4\n2 2\n3 0\n3 1\n4 0" },
      { input: "1 1\n1", output: "0 0" },
    ],
    hiddenCases: [
      { input: "2 2\n1 2\n4 3", output: "0 1\n1 0\n1 1", isHidden: true },
      { input: "3 3\n1 1 1\n1 1 1\n1 1 1", output: "0 0\n0 1\n0 2\n1 0\n1 1\n1 2\n2 0\n2 1\n2 2", isHidden: true },
    ],
    hints: ["Reverse the problem: BFS/DFS from all Pacific border cells (mark reachable going uphill), then from Atlantic border cells.", "Cells in both sets are the answer."],
    editorial: { approach: "Reverse BFS from both oceans; intersection is the answer.", timeComplexity: "O(m×n)", spaceComplexity: "O(m×n)" },
  },

  30: {
    id: 30, title: "Number of Islands", difficulty: "Medium", category: "Graph",
    tags: ["graph", "dfs", "bfs", "union-find", "matrix"],
    description: `Given an m×n binary grid where '1' is land and '0' is water, return the number of islands. An island is surrounded by water and formed by connecting adjacent lands horizontally or vertically.`,
    constraints: ["1 <= m, n <= 300", "grid[i][j] is '0' or '1'."],
    examples: [
      { input: "4x5 grid", output: "1" },
    ],
    starterCode: {
      python: `import sys
input = sys.stdin.readline

def num_islands(grid):
    pass

r, c = map(int, input().split())
grid = [list(input().split()) for _ in range(r)]
print(num_islands(grid))`,
      javascript: `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\\n');
let i = 0;
const [r, c] = lines[i++].split(' ').map(Number);
const grid = [];
for (let j = 0; j < r; j++) grid.push(lines[i++].split(' '));
function numIslands(grid) { /* your code */ return 0; }
console.log(numIslands(grid));`,
      java8: `import java.util.*;import java.io.*;
public class Solution {
    public static int numIslands(char[][] grid) { return 0; }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());
        int r=Integer.parseInt(st.nextToken()), c=Integer.parseInt(st.nextToken());
        char[][] grid = new char[r][c];
        for(int i=0;i<r;i++){ st=new StringTokenizer(br.readLine()); for(int j=0;j<c;j++) grid[i][j]=st.nextToken().charAt(0); }
        System.out.println(numIslands(grid));
    }
}`,
      cpp: `#include<bits/stdc++.h>
using namespace std;
int numIslands(vector<vector<char>>& g){ return 0; }
int main(){ int r,c; cin>>r>>c; vector<vector<char>> g(r,vector<char>(c));
    for(auto& row:g) for(char& x:row){ string s; cin>>s; x=s[0]; }
    cout<<numIslands(g)<<endl; }`,
    },
    testCases: [
      { input: "4 5\n1 1 1 1 0\n1 1 0 1 0\n1 1 0 0 0\n0 0 0 0 0", output: "1" },
      { input: "4 5\n1 1 0 0 0\n1 1 0 0 0\n0 0 1 0 0\n0 0 0 1 1", output: "3" },
      { input: "1 1\n1",                                               output: "1" },
    ],
    hiddenCases: [
      { input: "3 3\n0 0 0\n0 0 0\n0 0 0", output: "0", isHidden: true },
      { input: "3 3\n1 0 1\n0 1 0\n1 0 1", output: "5", isHidden: true },
    ],
    hints: ["DFS/BFS from each unvisited '1', marking visited cells as '0' to avoid revisiting.", "Each DFS call from a new '1' counts as one island."],
    editorial: { approach: "DFS flood-fill from each unvisited land cell; count flood-fill calls.", timeComplexity: "O(m×n)", spaceComplexity: "O(m×n)" },
  },

  31: {
    id: 31, title: "Longest Consecutive Sequence", difficulty: "Medium", category: "Graph",
    tags: ["array", "hash-table", "union-find"],
    description: `Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence. Must run in O(n) time.`,
    constraints: ["0 <= nums.length <= 10^5", "-10^9 <= nums[i] <= 10^9"],
    examples: [
      { input: "nums=[100,4,200,1,3,2]", output: "4", explanation: "[1,2,3,4]" },
      { input: "nums=[0,3,7,2,5,8,4,6,0,1]", output: "9" },
    ],
    starterCode: {
      python: `import sys
input = sys.stdin.readline
def longest_consecutive(nums):
    pass
n = int(input())
nums = list(map(int, input().split()))
print(longest_consecutive(nums))`,
      javascript: `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\\n');
function longestConsecutive(nums) { /* your code */ return 0; }
const nums = lines[1].split(' ').map(Number);
console.log(longestConsecutive(nums));`,
      java8: `import java.util.*;import java.io.*;
public class Solution {
    public static int longestConsecutive(int[] nums) { return 0; }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int n = Integer.parseInt(br.readLine().trim());
        StringTokenizer st = new StringTokenizer(br.readLine());
        int[] nums = new int[n]; for(int i=0;i<n;i++) nums[i]=Integer.parseInt(st.nextToken());
        System.out.println(longestConsecutive(nums));
    }
}`,
      cpp: `#include<bits/stdc++.h>
using namespace std;
int longestConsecutive(vector<int>& nums){ return 0; }
int main(){ int n; cin>>n; vector<int> v(n); for(int& x:v) cin>>x; cout<<longestConsecutive(v)<<endl; }`,
    },
    testCases: [
      { input: "6\n100 4 200 1 3 2",        output: "4" },
      { input: "10\n0 3 7 2 5 8 4 6 0 1",   output: "9" },
      { input: "0\n",                         output: "0" },
    ],
    hiddenCases: [
      { input: "1\n5",                        output: "1", isHidden: true },
      { input: "5\n1 2 0 1 -1",               output: "4", isHidden: true },
    ],
    hints: ["Put all numbers in a hash set.", "For each number, only start counting if num-1 is NOT in the set (it's a sequence start)."],
    editorial: { approach: "Hash set + only expand from sequence starts (num-1 not in set).", timeComplexity: "O(n)", spaceComplexity: "O(n)" },
  },

  32: {
    id: 32, title: "Alien Dictionary", difficulty: "Hard", category: "Graph",
    tags: ["graph", "topological-sort", "string"],
    description: `Given a list of words sorted lexicographically by alien language rules, derive the character order. Return a string of unique characters in the alien language order. If invalid, return "".`,
    constraints: ["1 <= words.length <= 100", "1 <= words[i].length <= 100", "words[i] consists of lowercase English letters."],
    examples: [
      { input: 'words=["wrt","wrf","er","ett","rftt"]', output: "wertf" },
      { input: 'words=["z","x"]', output: "zx" },
    ],
    starterCode: {
      python: `import sys
input = sys.stdin.readline
def alien_order(words):
    pass
n = int(input())
words = [input().strip() for _ in range(n)]
print(alien_order(words))`,
      javascript: `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\\n');
function alienOrder(words) { /* your code */ return ""; }
const n = +lines[0];
const words = lines.slice(1, 1+n);
console.log(alienOrder(words));`,
      java8: `import java.util.*;import java.io.*;
public class Solution {
    public static String alienOrder(String[] words) { return ""; }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int n = Integer.parseInt(br.readLine().trim());
        String[] words = new String[n];
        for(int i=0;i<n;i++) words[i]=br.readLine().trim();
        System.out.println(alienOrder(words));
    }
}`,
      cpp: `#include<bits/stdc++.h>
using namespace std;
string alienOrder(vector<string>& words){ return ""; }
int main(){ int n; cin>>n; vector<string> w(n); for(auto& s:w) cin>>s; cout<<alienOrder(w)<<endl; }`,
    },
    testCases: [
      { input: "5\nwrt\nwrf\ner\nett\nrftt", output: "wertf" },
      { input: "2\nz\nx",                    output: "zx"    },
      { input: "2\nz\nz",                    output: "z"     },
    ],
    hiddenCases: [
      { input: "2\nabc\nab",   output: "",    isHidden: true },
      { input: "3\nz\nx\nz",   output: "zx",  isHidden: true },
    ],
    hints: ["Compare adjacent words character by character to build directed edges (c1→c2 means c1 comes before c2).", "Run topological sort (Kahn's BFS). If a cycle exists, return \"\"."],
    editorial: { approach: "Build char graph from adjacent word diffs → topo sort (Kahn's BFS).", timeComplexity: "O(total chars)", spaceComplexity: "O(1) — 26 chars max" },
  },

  // ══════════════════════════════════════════════════════════════════════════
  // INTERVAL  (33–37)
  // ══════════════════════════════════════════════════════════════════════════

  33: {
    id: 33, title: "Insert Interval", difficulty: "Medium", category: "Interval",
    tags: ["array", "sorting"],
    description: `Given a list of non-overlapping intervals sorted by start time, and a new interval, insert the new interval and merge if necessary. Return the resulting list.`,
    constraints: ["0 <= intervals.length <= 10^4", "intervals are sorted by start ascending.", "new interval may overlap several existing ones."],
    examples: [
      { input: "intervals=[[1,3],[6,9]], newInterval=[2,5]", output: "[[1,5],[6,9]]" },
    ],
    starterCode: {
      python: `import sys
input = sys.stdin.readline
def insert(intervals, new_interval):
    pass
n = int(input())
intervals = [list(map(int, input().split())) for _ in range(n)]
new_interval = list(map(int, input().split()))
for s, e in insert(intervals, new_interval):
    print(s, e)`,
      javascript: `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\\n');
let i = 0;
const n = +lines[i++];
const intervals = Array.from({length:n}, ()=>lines[i++].split(' ').map(Number));
const ni = lines[i++].split(' ').map(Number);
function insert(intervals, newInterval) { /* your code */ return []; }
insert(intervals, ni).forEach(([s,e])=>console.log(s,e));`,
      java8: `import java.util.*;import java.io.*;
public class Solution {
    public static int[][] insert(int[][] intervals, int[] ni) { return new int[][]{}; }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int n = Integer.parseInt(br.readLine().trim());
        int[][] intervals = new int[n][2];
        for(int i=0;i<n;i++){ StringTokenizer st=new StringTokenizer(br.readLine()); intervals[i][0]=Integer.parseInt(st.nextToken()); intervals[i][1]=Integer.parseInt(st.nextToken()); }
        StringTokenizer st=new StringTokenizer(br.readLine());
        int[] ni={Integer.parseInt(st.nextToken()),Integer.parseInt(st.nextToken())};
        for(int[] p:insert(intervals,ni)) System.out.println(p[0]+" "+p[1]);
    }
}`,
      cpp: `#include<bits/stdc++.h>
using namespace std;
vector<vector<int>> insert(vector<vector<int>>& iv, vector<int>& ni){ return {}; }
int main(){ int n; cin>>n; vector<vector<int>> iv(n,vector<int>(2)); for(auto& x:iv) cin>>x[0]>>x[1];
    vector<int> ni(2); cin>>ni[0]>>ni[1]; for(auto& p:insert(iv,ni)) cout<<p[0]<<' '<<p[1]<<'\n'; }`,
    },
    testCases: [
      { input: "2\n1 3\n6 9\n2 5",   output: "1 5\n6 9"     },
      { input: "5\n1 2\n3 5\n6 7\n8 10\n12 16\n4 8", output: "1 2\n3 10\n12 16" },
      { input: "0\n\n5 7",            output: "5 7"          },
    ],
    hiddenCases: [
      { input: "1\n1 5\n2 3",         output: "1 5",          isHidden: true },
      { input: "1\n1 5\n2 7",         output: "1 7",          isHidden: true },
    ],
    hints: ["Add all intervals that end before newInterval starts, then merge overlapping ones, then add the rest.", "An interval overlaps newInterval if its start <= newInterval.end."],
    editorial: { approach: "Linear scan: collect non-overlapping left, merge overlapping middle, append right.", timeComplexity: "O(n)", spaceComplexity: "O(n)" },
  },

  34: {
    id: 34, title: "Merge Intervals", difficulty: "Medium", category: "Interval",
    tags: ["array", "sorting"],
    description: `Given an array of intervals, merge all overlapping intervals and return an array of the non-overlapping intervals.`,
    constraints: ["1 <= intervals.length <= 10^4", "0 <= start <= end <= 10^4"],
    examples: [
      { input: "intervals=[[1,3],[2,6],[8,10],[15,18]]", output: "[[1,6],[8,10],[15,18]]" },
    ],
    starterCode: {
      python: `import sys
input = sys.stdin.readline
def merge(intervals):
    pass
n = int(input())
intervals = [list(map(int, input().split())) for _ in range(n)]
for s, e in merge(intervals):
    print(s, e)`,
      javascript: `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\\n');
let i = 0;
const n = +lines[i++];
const iv = Array.from({length:n}, ()=>lines[i++].split(' ').map(Number));
function merge(iv) { /* your code */ return []; }
merge(iv).forEach(([s,e])=>console.log(s,e));`,
      java8: `import java.util.*;import java.io.*;
public class Solution {
    public static int[][] merge(int[][] iv) { return new int[][]{}; }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int n = Integer.parseInt(br.readLine().trim());
        int[][] iv = new int[n][2];
        for(int i=0;i<n;i++){ StringTokenizer st=new StringTokenizer(br.readLine()); iv[i][0]=Integer.parseInt(st.nextToken()); iv[i][1]=Integer.parseInt(st.nextToken()); }
        for(int[] p:merge(iv)) System.out.println(p[0]+" "+p[1]);
    }
}`,
      cpp: `#include<bits/stdc++.h>
using namespace std;
vector<vector<int>> merge(vector<vector<int>>& iv){ return {}; }
int main(){ int n; cin>>n; vector<vector<int>> iv(n,vector<int>(2)); for(auto& x:iv) cin>>x[0]>>x[1];
    for(auto& p:merge(iv)) cout<<p[0]<<' '<<p[1]<<'\n'; }`,
    },
    testCases: [
      { input: "4\n1 3\n2 6\n8 10\n15 18", output: "1 6\n8 10\n15 18" },
      { input: "2\n1 4\n4 5",              output: "1 5"              },
      { input: "1\n1 1",                   output: "1 1"              },
    ],
    hiddenCases: [
      { input: "3\n1 4\n2 3\n3 5",         output: "1 5",             isHidden: true },
      { input: "4\n1 2\n3 4\n5 6\n7 8",    output: "1 2\n3 4\n5 6\n7 8", isHidden: true },
    ],
    hints: ["Sort by start time.", "Iterate: if current interval overlaps the last merged one (cur.start <= last.end), extend last.end. Otherwise push a new interval."],
    editorial: { approach: "Sort by start; merge greedily by extending the last interval's end.", timeComplexity: "O(n log n)", spaceComplexity: "O(n)" },
  },

  35: {
    id: 35, title: "Non-Overlapping Intervals", difficulty: "Medium", category: "Interval",
    tags: ["array", "greedy", "sorting"],
    description: `Given an array of intervals, return the minimum number of intervals you need to remove to make the rest non-overlapping.`,
    constraints: ["1 <= intervals.length <= 10^5", "-5*10^4 <= start < end <= 5*10^4"],
    examples: [
      { input: "intervals=[[1,2],[2,3],[3,4],[1,3]]", output: "1" },
      { input: "intervals=[[1,2],[1,2],[1,2]]", output: "2" },
    ],
    starterCode: {
      python: `import sys
input = sys.stdin.readline
def erase_overlap_intervals(intervals):
    pass
n = int(input())
intervals = [list(map(int, input().split())) for _ in range(n)]
print(erase_overlap_intervals(intervals))`,
      javascript: `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\\n');
let i = 0;
const n = +lines[i++];
const iv = Array.from({length:n}, ()=>lines[i++].split(' ').map(Number));
function eraseOverlapIntervals(iv) { /* your code */ return 0; }
console.log(eraseOverlapIntervals(iv));`,
      java8: `import java.util.*;import java.io.*;
public class Solution {
    public static int eraseOverlapIntervals(int[][] iv) { return 0; }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int n = Integer.parseInt(br.readLine().trim());
        int[][] iv = new int[n][2];
        for(int i=0;i<n;i++){ StringTokenizer st=new StringTokenizer(br.readLine()); iv[i][0]=Integer.parseInt(st.nextToken()); iv[i][1]=Integer.parseInt(st.nextToken()); }
        System.out.println(eraseOverlapIntervals(iv));
    }
}`,
      cpp: `#include<bits/stdc++.h>
using namespace std;
int eraseOverlapIntervals(vector<vector<int>>& iv){ return 0; }
int main(){ int n; cin>>n; vector<vector<int>> iv(n,vector<int>(2)); for(auto& x:iv) cin>>x[0]>>x[1];
    cout<<eraseOverlapIntervals(iv)<<endl; }`,
    },
    testCases: [
      { input: "4\n1 2\n2 3\n3 4\n1 3", output: "1" },
      { input: "3\n1 2\n1 2\n1 2",       output: "2" },
      { input: "2\n1 2\n2 3",            output: "0" },
    ],
    hiddenCases: [
      { input: "4\n0 2\n1 3\n2 4\n3 5",  output: "2", isHidden: true },
      { input: "1\n0 1",                  output: "0", isHidden: true },
    ],
    hints: ["Sort by end time — greedily keep the interval with the earliest end.", "If the next interval starts before the last kept end, it overlaps → remove it (count++)."],
    editorial: { approach: "Sort by end; greedy keep. Count overlaps with previous end.", timeComplexity: "O(n log n)", spaceComplexity: "O(1)" },
  },

  36: {
    id: 36, title: "Meeting Rooms", difficulty: "Easy", category: "Interval",
    tags: ["array", "sorting"],
    description: `Given an array of meeting time intervals [[start, end]], determine if a person could attend all meetings (no two meetings overlap).`,
    constraints: ["0 <= intervals.length <= 10^4", "0 <= start < end <= 10^6"],
    examples: [
      { input: "intervals=[[0,30],[5,10],[15,20]]", output: "false" },
      { input: "intervals=[[7,10],[2,4]]", output: "true" },
    ],
    starterCode: {
      python: `import sys
input = sys.stdin.readline
def can_attend_meetings(intervals):
    pass
n = int(input())
intervals = [list(map(int, input().split())) for _ in range(n)]
print(str(can_attend_meetings(intervals)).lower())`,
      javascript: `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\\n');
let i = 0;
const n = +lines[i++];
const iv = Array.from({length:n}, ()=>lines[i++].split(' ').map(Number));
function canAttendMeetings(iv) { /* your code */ return true; }
console.log(canAttendMeetings(iv).toString());`,
      java8: `import java.util.*;import java.io.*;
public class Solution {
    public static boolean canAttendMeetings(int[][] iv) { return true; }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int n = Integer.parseInt(br.readLine().trim());
        int[][] iv = new int[n][2];
        for(int i=0;i<n;i++){ StringTokenizer st=new StringTokenizer(br.readLine()); iv[i][0]=Integer.parseInt(st.nextToken()); iv[i][1]=Integer.parseInt(st.nextToken()); }
        System.out.println(canAttendMeetings(iv));
    }
}`,
      cpp: `#include<bits/stdc++.h>
using namespace std;
bool canAttendMeetings(vector<vector<int>>& iv){ return true; }
int main(){ int n; cin>>n; vector<vector<int>> iv(n,vector<int>(2)); for(auto& x:iv) cin>>x[0]>>x[1];
    cout<<(canAttendMeetings(iv)?"true":"false")<<endl; }`,
    },
    testCases: [
      { input: "3\n0 30\n5 10\n15 20", output: "false" },
      { input: "2\n7 10\n2 4",         output: "true"  },
      { input: "0\n",                  output: "true"  },
    ],
    hiddenCases: [
      { input: "2\n1 5\n5 10",         output: "true",  isHidden: true },
      { input: "3\n1 3\n2 5\n4 6",     output: "false", isHidden: true },
    ],
    hints: ["Sort by start time.", "Check if any meeting starts before the previous one ends."],
    editorial: { approach: "Sort by start; check if intervals[i].start < intervals[i-1].end.", timeComplexity: "O(n log n)", spaceComplexity: "O(1)" },
  },

  37: {
    id: 37, title: "Meeting Rooms II", difficulty: "Medium", category: "Interval",
    tags: ["array", "sorting", "heap", "greedy"],
    description: `Given an array of meeting time intervals, return the minimum number of conference rooms required.`,
    constraints: ["1 <= intervals.length <= 10^4", "0 <= start < end <= 10^6"],
    examples: [
      { input: "intervals=[[0,30],[5,10],[15,20]]", output: "2" },
      { input: "intervals=[[7,10],[2,4]]", output: "1" },
    ],
    starterCode: {
      python: `import sys, heapq
input = sys.stdin.readline
def min_meeting_rooms(intervals):
    pass
n = int(input())
intervals = [list(map(int, input().split())) for _ in range(n)]
print(min_meeting_rooms(intervals))`,
      javascript: `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\\n');
let i = 0;
const n = +lines[i++];
const iv = Array.from({length:n}, ()=>lines[i++].split(' ').map(Number));
function minMeetingRooms(iv) { /* your code */ return 0; }
console.log(minMeetingRooms(iv));`,
      java8: `import java.util.*;import java.io.*;
public class Solution {
    public static int minMeetingRooms(int[][] iv) { return 0; }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int n = Integer.parseInt(br.readLine().trim());
        int[][] iv = new int[n][2];
        for(int i=0;i<n;i++){ StringTokenizer st=new StringTokenizer(br.readLine()); iv[i][0]=Integer.parseInt(st.nextToken()); iv[i][1]=Integer.parseInt(st.nextToken()); }
        System.out.println(minMeetingRooms(iv));
    }
}`,
      cpp: `#include<bits/stdc++.h>
using namespace std;
int minMeetingRooms(vector<vector<int>>& iv){ return 0; }
int main(){ int n; cin>>n; vector<vector<int>> iv(n,vector<int>(2)); for(auto& x:iv) cin>>x[0]>>x[1];
    cout<<minMeetingRooms(iv)<<endl; }`,
    },
    testCases: [
      { input: "3\n0 30\n5 10\n15 20", output: "2" },
      { input: "2\n7 10\n2 4",         output: "1" },
      { input: "1\n0 10",              output: "1" },
    ],
    hiddenCases: [
      { input: "4\n1 4\n2 5\n7 9\n8 11", output: "2", isHidden: true },
      { input: "3\n1 10\n2 6\n5 9",       output: "3", isHidden: true },
    ],
    hints: ["Sort by start. Use a min-heap of end times.", "For each meeting: if heap.top <= meeting.start, reuse that room (pop it). Push current end time. Answer = heap.size."],
    editorial: { approach: "Min-heap of end times; reuse room if earliest end ≤ current start.", timeComplexity: "O(n log n)", spaceComplexity: "O(n)" },
  },

  // ══════════════════════════════════════════════════════════════════════════
  // LINKED LIST  (38–43)
  // ══════════════════════════════════════════════════════════════════════════

  38: {
    id: 38, title: "Reverse Linked List", difficulty: "Easy", category: "Linked List",
    tags: ["linked-list", "recursion"],
    description: `Given the head of a singly linked list, reverse the list and return the reversed list.\n\nInput: n, then space-separated values. Output: space-separated reversed values.`,
    constraints: ["0 <= n <= 5000", "-5000 <= Node.val <= 5000"],
    examples: [{ input: "[1,2,3,4,5]", output: "[5,4,3,2,1]" }],
    starterCode: {
      python: `import sys
input = sys.stdin.readline
def reverse_list(vals):
    return vals[::-1]  # work with list; replace with linked list logic
n = int(input())
vals = list(map(int, input().split())) if n > 0 else []
print(*reverse_list(vals))`,
      javascript: `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\\n');
function reverseList(vals) { return vals.slice().reverse(); }
const n = +lines[0];
const vals = n > 0 ? lines[1].split(' ').map(Number) : [];
console.log(reverseList(vals).join(' '));`,
      java8: `import java.util.*;import java.io.*;
public class Solution {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int n = Integer.parseInt(br.readLine().trim());
        if(n==0){System.out.println("");return;}
        StringTokenizer st = new StringTokenizer(br.readLine());
        int[] vals = new int[n]; for(int i=0;i<n;i++) vals[i]=Integer.parseInt(st.nextToken());
        // reverse vals array as placeholder
        StringBuilder sb = new StringBuilder();
        for(int i=n-1;i>=0;i--){ if(i<n-1) sb.append(' '); sb.append(vals[i]); }
        System.out.println(sb);
    }
}`,
      cpp: `#include<bits/stdc++.h>
using namespace std;
int main(){ int n; cin>>n; vector<int> v(n); for(int& x:v) cin>>x;
    reverse(v.begin(),v.end()); for(int i=0;i<n;i++){ if(i) cout<<' '; cout<<v[i]; } cout<<endl; }`,
    },
    testCases: [
      { input: "5\n1 2 3 4 5", output: "5 4 3 2 1", hidden: false },
      { input: "2\n1 2", output: "2 1", hidden: false },
      { input: "1\n1", output: "1", hidden: false },
      { input: "3\n10 20 30", output: "30 20 10", hidden: true },
      { input: "4\n-1 -2 -3 -4", output: "-4 -3 -2 -1", hidden: true },
      { input: "6\n1 1 1 1 1 1", output: "1 1 1 1 1 1", hidden: true },
      { input: "7\n7 6 5 4 3 2 1", output: "1 2 3 4 5 6 7", hidden: true },
      { input: "8\n100 200 300 400 500 600 700 800", output: "800 700 600 500 400 300 200 100", hidden: true },
      { input: "4\n0 0 0 0", output: "0 0 0 0", hidden: true },
      { input: "10\n1 2 3 4 5 6 7 8 9 10", output: "10 9 8 7 6 5 4 3 2 1", hidden: true },
    ],
    hiddenCases: [
      { input: "0\n",          output: "",          isHidden: true },
      { input: "4\n4 3 2 1",   output: "1 2 3 4",  isHidden: true },
    ],
    hints: ["Use three pointers: prev, curr, next.", "At each step: save next, point curr.next to prev, advance prev and curr."],
    editorial: { approach: "Iterative: prev=null, while curr: save next, redirect, advance.", timeComplexity: "O(n)", spaceComplexity: "O(1)" },
  },

  39: {
    id: 39, title: "Linked List Cycle", difficulty: "Easy", category: "Linked List",
    tags: ["linked-list", "two-pointers", "hash-table"],
    description: `Given the head of a linked list, determine if the list has a cycle.\n\nInput: n (values), then the cycle position (-1 if no cycle). Output: true/false.`,
    constraints: ["0 <= n <= 10^4", "-10^5 <= Node.val <= 10^5", "pos is -1 or a valid index."],
    examples: [
      { input: "[3,2,0,-4], pos=1", output: "true" },
      { input: "[1,2], pos=0", output: "true" },
      { input: "[1], pos=-1", output: "false" },
    ],
    starterCode: {
      python: `import sys
input = sys.stdin.readline
def has_cycle(vals, pos):
    # pos = index where tail connects (-1 = no cycle)
    if pos == -1: return False
    return True  # a cycle always exists when pos >= 0

n = int(input())
vals = list(map(int, input().split())) if n > 0 else []
pos = int(input())
print(str(has_cycle(vals, pos)).lower())`,
      javascript: `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\\n');
function hasCycle(vals, pos) { return pos !== -1; }
const n = +lines[0];
const vals = n > 0 ? lines[1].split(' ').map(Number) : [];
const pos = +lines[2];
console.log(hasCycle(vals, pos).toString());`,
      java8: `import java.util.*;import java.io.*;
public class Solution {
    public static boolean hasCycle(int[] vals, int pos) { return pos != -1; }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int n = Integer.parseInt(br.readLine().trim());
        int[] vals = new int[n];
        if(n>0){ StringTokenizer st=new StringTokenizer(br.readLine()); for(int i=0;i<n;i++) vals[i]=Integer.parseInt(st.nextToken()); }
        else br.readLine();
        int pos = Integer.parseInt(br.readLine().trim());
        System.out.println(hasCycle(vals,pos));
    }
}`,
      cpp: `#include<bits/stdc++.h>
using namespace std;
int main(){ int n; cin>>n; vector<int> v(n); for(int& x:v) cin>>x; int pos; cin>>pos;
    cout<<(pos!=-1?"true":"false")<<endl; }`,
    },
    testCases: [
      { input: "4\n3 2 0 -4\n1",  output: "true"  },
      { input: "2\n1 2\n0",       output: "true"  },
      { input: "1\n1\n-1",        output: "false" },
    ],
    hiddenCases: [
      { input: "0\n\n-1",         output: "false", isHidden: true },
      { input: "3\n1 2 3\n2",     output: "true",  isHidden: true },
    ],
    hints: ["Floyd's cycle detection: slow pointer moves 1 step, fast pointer moves 2.", "If they ever meet, there's a cycle."],
    editorial: { approach: "Floyd's tortoise & hare: if fast catches slow → cycle.", timeComplexity: "O(n)", spaceComplexity: "O(1)" },
  },

  40: {
    id: 40, title: "Merge Two Sorted Lists", difficulty: "Easy", category: "Linked List",
    tags: ["linked-list", "recursion"],
    description: `Merge two sorted linked lists and return it as a sorted list.\n\nInput: two lines, each with space-separated sorted values (or empty). Output: merged sorted values.`,
    constraints: ["0 <= n, m <= 50", "-100 <= Node.val <= 100"],
    examples: [{ input: "list1=[1,2,4], list2=[1,3,4]", output: "[1,1,2,3,4,4]" }],
    starterCode: {
      python: `import sys
input = sys.stdin.readline
def merge_lists(l1, l2):
    result = []
    i = j = 0
    while i < len(l1) and j < len(l2):
        if l1[i] <= l2[j]: result.append(l1[i]); i += 1
        else: result.append(l2[j]); j += 1
    return result + l1[i:] + l2[j:]

line1 = input().strip()
line2 = input().strip()
l1 = list(map(int, line1.split())) if line1 else []
l2 = list(map(int, line2.split())) if line2 else []
print(*merge_lists(l1, l2))`,
      javascript: `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\\n');
const l1 = lines[0] ? lines[0].split(' ').map(Number) : [];
const l2 = lines[1] ? lines[1].split(' ').map(Number) : [];
function mergeLists(a, b) {
    const res = []; let i=0,j=0;
    while(i<a.length&&j<b.length) a[i]<=b[j]?res.push(a[i++]):res.push(b[j++]);
    return res.concat(a.slice(i)).concat(b.slice(j));
}
console.log(mergeLists(l1,l2).join(' '));`,
      java8: `import java.util.*;import java.io.*;
public class Solution {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line1=br.readLine().trim(), line2=br.readLine().trim();
        List<Integer> res = new ArrayList<>();
        int[] a=line1.isEmpty()?new int[0]:Arrays.stream(line1.split(" ")).mapToInt(Integer::parseInt).toArray();
        int[] b=line2.isEmpty()?new int[0]:Arrays.stream(line2.split(" ")).mapToInt(Integer::parseInt).toArray();
        int i=0,j=0;
        while(i<a.length&&j<b.length) res.add(a[i]<=b[j]?a[i++]:b[j++]);
        while(i<a.length) res.add(a[i++]); while(j<b.length) res.add(b[j++]);
        StringBuilder sb=new StringBuilder(); for(int k=0;k<res.size();k++){ if(k>0)sb.append(' '); sb.append(res.get(k)); } System.out.println(sb);
    }
}`,
      cpp: `#include<bits/stdc++.h>
using namespace std;
int main(){ string l1,l2; getline(cin,l1); getline(cin,l2);
    vector<int> a,b,res;
    istringstream ss1(l1); int x; while(ss1>>x) a.push_back(x);
    istringstream ss2(l2); while(ss2>>x) b.push_back(x);
    merge(a.begin(),a.end(),b.begin(),b.end(),back_inserter(res));
    for(int i=0;i<res.size();i++){ if(i) cout<<' '; cout<<res[i]; } cout<<endl; }`,
    },
    testCases: [
      { input: "1 2 4\n1 3 4", output: "1 1 2 3 4 4" },
      { input: "\n",           output: ""            },
      { input: "\n0",          output: "0"           },
    ],
    hiddenCases: [
      { input: "1 3 5\n2 4 6", output: "1 2 3 4 5 6", isHidden: true },
      { input: "1\n2",         output: "1 2",          isHidden: true },
    ],
    hints: ["Use a dummy head node to simplify the merge logic.", "Compare heads of both lists; attach the smaller one and advance that pointer."],
    editorial: { approach: "Dummy head + two-pointer merge. Recursion also works.", timeComplexity: "O(m+n)", spaceComplexity: "O(1)" },
  },

  41: {
    id: 41, title: "Merge K Sorted Lists", difficulty: "Hard", category: "Linked List",
    tags: ["linked-list", "divide-and-conquer", "heap"],
    description: `Given an array of k linked lists, each sorted in ascending order, merge all the linked lists into one sorted list and return it.\n\nInput: k, then k lines each with space-separated values (empty line = empty list).`,
    constraints: ["0 <= k <= 10^4", "0 <= list length <= 500", "-10^4 <= Node.val <= 10^4"],
    examples: [{ input: "k=3, lists=[[1,4,5],[1,3,4],[2,6]]", output: "[1,1,2,3,4,4,5,6]" }],
    starterCode: {
      python: `import sys, heapq
input = sys.stdin.readline
def merge_k_lists(lists):
    heap = []
    for i, l in enumerate(lists):
        for val in l:
            heapq.heappush(heap, val)
    return list(heapq.nsmallest(sum(len(l) for l in lists), heap))

k = int(input())
lists = []
for _ in range(k):
    line = input().strip()
    lists.append(list(map(int, line.split())) if line else [])
print(*merge_k_lists(lists))`,
      javascript: `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\\n');
let i = 0;
const k = +lines[i++];
const lists = Array.from({length:k}, ()=>{ const l=lines[i++]; return l?l.split(' ').map(Number):[]; });
function mergeKLists(lists) {
    return [].concat(...lists).sort((a,b)=>a-b);
}
console.log(mergeKLists(lists).join(' '));`,
      java8: `import java.util.*;import java.io.*;
public class Solution {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int k = Integer.parseInt(br.readLine().trim());
        PriorityQueue<Integer> pq = new PriorityQueue<>();
        for(int i=0;i<k;i++){
            String line=br.readLine(); if(line==null||line.trim().isEmpty()) continue;
            for(String s:line.trim().split(" ")) pq.add(Integer.parseInt(s));
        }
        StringBuilder sb=new StringBuilder(); boolean first=true;
        while(!pq.isEmpty()){ if(!first)sb.append(' '); sb.append(pq.poll()); first=false; }
        System.out.println(sb);
    }
}`,
      cpp: `#include<bits/stdc++.h>
using namespace std;
int main(){ int k; cin>>k; cin.ignore(); priority_queue<int,vector<int>,greater<int>> pq;
    for(int i=0;i<k;i++){ string line; getline(cin,line); istringstream ss(line); int x; while(ss>>x) pq.push(x); }
    bool first=true; while(!pq.empty()){ if(!first) cout<<' '; cout<<pq.top(); pq.pop(); first=false; } cout<<endl; }`,
    },
    testCases: [
      { input: "3\n1 4 5\n1 3 4\n2 6", output: "1 1 2 3 4 4 5 6" },
      { input: "0\n",                   output: ""                },
      { input: "1\n",                   output: ""                },
    ],
    hiddenCases: [
      { input: "2\n1 2 3\n4 5 6",       output: "1 2 3 4 5 6",    isHidden: true },
      { input: "3\n\n1\n",              output: "1",               isHidden: true },
    ],
    hints: ["Use a min-heap: push (val, listIndex, nodeIndex) tuples.", "Or use divide-and-conquer: repeatedly merge pairs of lists."],
    editorial: { approach: "Min-heap of size k; always extract min and push next from same list.", timeComplexity: "O(n log k)", spaceComplexity: "O(k)" },
  },

  42: {
    id: 42, title: "Remove Nth Node From End of List", difficulty: "Medium", category: "Linked List",
    tags: ["linked-list", "two-pointers"],
    description: `Given the head of a linked list, remove the nth node from the end of the list and return the head.\n\nInput: n (size), values, then k (remove kth from end).`,
    constraints: ["1 <= sz <= 30", "0 <= Node.val <= 100", "1 <= n <= sz"],
    examples: [{ input: "list=[1,2,3,4,5], n=2", output: "[1,2,3,5]" }],
    starterCode: {
      python: `import sys
input = sys.stdin.readline
def remove_nth_from_end(vals, n):
    idx = len(vals) - n
    return vals[:idx] + vals[idx+1:]

sz = int(input())
vals = list(map(int, input().split()))
n = int(input())
print(*remove_nth_from_end(vals, n))`,
      javascript: `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\\n');
const sz = +lines[0], vals = lines[1].split(' ').map(Number), n = +lines[2];
function removeNth(vals, n) { const i=vals.length-n; return [...vals.slice(0,i),...vals.slice(i+1)]; }
console.log(removeNth(vals,n).join(' '));`,
      java8: `import java.util.*;import java.io.*;
public class Solution {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int sz=Integer.parseInt(br.readLine().trim());
        StringTokenizer st=new StringTokenizer(br.readLine());
        int[] vals=new int[sz]; for(int i=0;i<sz;i++) vals[i]=Integer.parseInt(st.nextToken());
        int n=Integer.parseInt(br.readLine().trim()), idx=sz-n;
        StringBuilder sb=new StringBuilder();
        for(int i=0;i<sz;i++){ if(i==idx) continue; if(sb.length()>0) sb.append(' '); sb.append(vals[i]); }
        System.out.println(sb);
    }
}`,
      cpp: `#include<bits/stdc++.h>
using namespace std;
int main(){ int sz; cin>>sz; vector<int> v(sz); for(int& x:v) cin>>x; int n; cin>>n;
    int idx=sz-n; v.erase(v.begin()+idx); for(int i=0;i<v.size();i++){ if(i) cout<<' '; cout<<v[i]; } cout<<endl; }`,
    },
    testCases: [
      { input: "5\n1 2 3 4 5\n2", output: "1 2 3 5" },
      { input: "1\n1\n1",         output: ""        },
      { input: "2\n1 2\n1",       output: "1"       },
    ],
    hiddenCases: [
      { input: "3\n1 2 3\n3",     output: "2 3",    isHidden: true },
      { input: "4\n1 2 3 4\n2",   output: "1 2 4",  isHidden: true },
    ],
    hints: ["Use two pointers with a gap of n between them.", "When the fast pointer reaches the end, the slow pointer is right before the target node."],
    editorial: { approach: "Two pointers n apart; when fast hits end, slow.next is the node to remove.", timeComplexity: "O(sz)", spaceComplexity: "O(1)" },
  },

  43: {
    id: 43, title: "Reorder List", difficulty: "Medium", category: "Linked List",
    tags: ["linked-list", "two-pointers", "recursion"],
    description: `Given head of a list L0→L1→…→Ln, reorder it to L0→Ln→L1→Ln-1→L2→Ln-2→…\n\nInput: n, then values. Output: reordered values.`,
    constraints: ["1 <= n <= 5*10^4", "1 <= Node.val <= 1000"],
    examples: [{ input: "[1,2,3,4]", output: "[1,4,2,3]" }],
    starterCode: {
      python: `import sys
input = sys.stdin.readline
def reorder(vals):
    l, r = 0, len(vals) - 1
    result = []
    while l < r:
        result.append(vals[l]); l += 1
        result.append(vals[r]); r -= 1
    if l == r: result.append(vals[l])
    return result

n = int(input())
vals = list(map(int, input().split()))
print(*reorder(vals))`,
      javascript: `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\\n');
const vals = lines[1].split(' ').map(Number);
function reorder(vals) {
    const res=[]; let l=0,r=vals.length-1;
    while(l<r){ res.push(vals[l++]); res.push(vals[r--]); }
    if(l===r) res.push(vals[l]);
    return res;
}
console.log(reorder(vals).join(' '));`,
      java8: `import java.util.*;import java.io.*;
public class Solution {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int n=Integer.parseInt(br.readLine().trim());
        StringTokenizer st=new StringTokenizer(br.readLine());
        int[] v=new int[n]; for(int i=0;i<n;i++) v[i]=Integer.parseInt(st.nextToken());
        int l=0,r=n-1; List<Integer> res=new ArrayList<>();
        while(l<r){ res.add(v[l++]); res.add(v[r--]); }
        if(l==r) res.add(v[l]);
        StringBuilder sb=new StringBuilder(); for(int i=0;i<res.size();i++){ if(i>0)sb.append(' '); sb.append(res.get(i)); }
        System.out.println(sb);
    }
}`,
      cpp: `#include<bits/stdc++.h>
using namespace std;
int main(){ int n; cin>>n; vector<int> v(n); for(int& x:v) cin>>x;
    vector<int> res; int l=0,r=n-1;
    while(l<r){ res.push_back(v[l++]); res.push_back(v[r--]); }
    if(l==r) res.push_back(v[l]);
    for(int i=0;i<res.size();i++){ if(i) cout<<' '; cout<<res[i]; } cout<<endl; }`,
    },
    testCases: [
      { input: "4\n1 2 3 4",   output: "1 4 2 3" },
      { input: "5\n1 2 3 4 5", output: "1 5 2 4 3" },
      { input: "1\n1",         output: "1"         },
    ],
    hiddenCases: [
      { input: "2\n1 2",       output: "1 2",       isHidden: true },
      { input: "6\n1 2 3 4 5 6", output: "1 6 2 5 3 4", isHidden: true },
    ],
    hints: ["Find the middle (slow/fast pointers), reverse the second half, then merge the two halves.", "Do this in-place on the actual linked list."],
    editorial: { approach: "1) Find mid 2) Reverse second half 3) Interleave.", timeComplexity: "O(n)", spaceComplexity: "O(1)" },
  },

  // ══════════════════════════════════════════════════════════════════════════
  // MATRIX  (44–47)
  // ══════════════════════════════════════════════════════════════════════════

  44: {
    id: 44, title: "Set Matrix Zeroes", difficulty: "Medium", category: "Matrix",
    tags: ["array", "matrix", "hash-table"],
    description: `Given an m×n integer matrix, if an element is 0, set its entire row and column to 0. Do it in-place.\n\nInput: rows cols, then matrix. Output: modified matrix.`,
    constraints: ["1 <= m, n <= 200", "-2^31 <= matrix[i][j] <= 2^31 - 1"],
    examples: [{ input: "[[1,1,1],[1,0,1],[1,1,1]]", output: "[[1,0,1],[0,0,0],[1,0,1]]" }],
    starterCode: {
      python: `import sys
input = sys.stdin.readline
def set_zeroes(matrix):
    rows, cols = set(), set()
    for i in range(len(matrix)):
        for j in range(len(matrix[0])):
            if matrix[i][j] == 0:
                rows.add(i); cols.add(j)
    for i in range(len(matrix)):
        for j in range(len(matrix[0])):
            if i in rows or j in cols:
                matrix[i][j] = 0
    return matrix

r, c = map(int, input().split())
matrix = [list(map(int, input().split())) for _ in range(r)]
for row in set_zeroes(matrix):
    print(*row)`,
      javascript: `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\\n');
let i=0; const [r,c]=lines[i++].split(' ').map(Number);
const matrix=Array.from({length:r},()=>lines[i++].split(' ').map(Number));
function setZeroes(m){ const rows=new Set(),cols=new Set();
    m.forEach((row,i)=>row.forEach((v,j)=>{ if(v===0){rows.add(i);cols.add(j);} }));
    for(let i=0;i<m.length;i++) for(let j=0;j<m[0].length;j++) if(rows.has(i)||cols.has(j)) m[i][j]=0; }
setZeroes(matrix); matrix.forEach(row=>console.log(row.join(' ')));`,
      java8: `import java.util.*;import java.io.*;
public class Solution {
    public static void main(String[] args) throws Exception {
        BufferedReader br=new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st=new StringTokenizer(br.readLine()); int r=Integer.parseInt(st.nextToken()),c=Integer.parseInt(st.nextToken());
        int[][] m=new int[r][c]; Set<Integer> rows=new HashSet<>(),cols=new HashSet<>();
        for(int i=0;i<r;i++){ st=new StringTokenizer(br.readLine()); for(int j=0;j<c;j++){ m[i][j]=Integer.parseInt(st.nextToken()); if(m[i][j]==0){rows.add(i);cols.add(j);} } }
        for(int i=0;i<r;i++) for(int j=0;j<c;j++) if(rows.contains(i)||cols.contains(j)) m[i][j]=0;
        for(int[] row:m){ StringBuilder sb=new StringBuilder(); for(int k=0;k<c;k++){if(k>0)sb.append(' ');sb.append(row[k]);} System.out.println(sb); }
    }
}`,
      cpp: `#include<bits/stdc++.h>
using namespace std;
int main(){ int r,c; cin>>r>>c; vector<vector<int>> m(r,vector<int>(c));
    set<int> rows,cols; for(int i=0;i<r;i++) for(int j=0;j<c;j++){ cin>>m[i][j]; if(m[i][j]==0){rows.insert(i);cols.insert(j);} }
    for(int i=0;i<r;i++) for(int j=0;j<c;j++) if(rows.count(i)||cols.count(j)) m[i][j]=0;
    for(auto& row:m){ for(int k=0;k<c;k++){if(k)cout<<' ';cout<<row[k];}cout<<'\n'; } }`,
    },
    testCases: [
      { input: "3 3\n1 1 1\n1 0 1\n1 1 1", output: "1 0 1\n0 0 0\n1 0 1" },
      { input: "3 4\n0 1 2 0\n3 4 5 2\n1 3 1 5", output: "0 0 0 0\n0 4 5 0\n0 3 1 0" },
    ],
    hiddenCases: [
      { input: "2 2\n1 1\n1 1",             output: "1 1\n1 1",           isHidden: true },
      { input: "2 2\n0 1\n1 1",             output: "0 0\n0 1",           isHidden: true },
    ],
    hints: ["First pass: record which rows and columns contain a zero.", "Second pass: zero out those rows and columns."],
    editorial: { approach: "Use first row/col as markers for O(1) extra space, or O(m+n) with sets.", timeComplexity: "O(m×n)", spaceComplexity: "O(1)" },
  },

  45: {
    id: 45, title: "Spiral Matrix", difficulty: "Medium", category: "Matrix",
    tags: ["array", "matrix", "simulation"],
    description: `Given an m×n matrix, return all elements in spiral order.`,
    constraints: ["1 <= m, n <= 10", "-100 <= matrix[i][j] <= 100"],
    examples: [{ input: "[[1,2,3],[4,5,6],[7,8,9]]", output: "[1,2,3,6,9,8,7,4,5]" }],
    starterCode: {
      python: `import sys
input = sys.stdin.readline
def spiral_order(matrix):
    result = []
    while matrix:
        result += matrix.pop(0)
        matrix = list(zip(*matrix))[::-1]
    return result

r, c = map(int, input().split())
matrix = [list(map(int, input().split())) for _ in range(r)]
print(*spiral_order(matrix))`,
      javascript: `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\\n');
let i=0; const [r,c]=lines[i++].split(' ').map(Number);
const matrix=Array.from({length:r},()=>lines[i++].split(' ').map(Number));
function spiralOrder(m){ const res=[]; while(m.length){ res.push(...m.shift()); m=m[0]?m.map(r=>r.reverse()).reverse():m; } return res; }
console.log(spiralOrder(matrix).join(' '));`,
      java8: `import java.util.*;import java.io.*;
public class Solution {
    public static List<Integer> spiralOrder(int[][] m) {
        List<Integer> res=new ArrayList<>(); if(m.length==0) return res;
        int top=0,bot=m.length-1,left=0,right=m[0].length-1;
        while(top<=bot&&left<=right){
            for(int i=left;i<=right;i++) res.add(m[top][i]); top++;
            for(int i=top;i<=bot;i++) res.add(m[i][right]); right--;
            if(top<=bot){ for(int i=right;i>=left;i--) res.add(m[bot][i]); bot--; }
            if(left<=right){ for(int i=bot;i>=top;i--) res.add(m[i][left]); left++; }
        } return res;
    }
    public static void main(String[] args) throws Exception {
        BufferedReader br=new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st=new StringTokenizer(br.readLine()); int r=Integer.parseInt(st.nextToken()),c=Integer.parseInt(st.nextToken());
        int[][] m=new int[r][c]; for(int i=0;i<r;i++){st=new StringTokenizer(br.readLine());for(int j=0;j<c;j++) m[i][j]=Integer.parseInt(st.nextToken());}
        List<Integer> res=spiralOrder(m); StringBuilder sb=new StringBuilder(); for(int k=0;k<res.size();k++){if(k>0)sb.append(' ');sb.append(res.get(k));} System.out.println(sb);
    }
}`,
      cpp: `#include<bits/stdc++.h>
using namespace std;
int main(){ int r,c; cin>>r>>c; vector<vector<int>> m(r,vector<int>(c)); for(auto& row:m) for(int& x:row) cin>>x;
    int top=0,bot=r-1,left=0,right=c-1; vector<int> res;
    while(top<=bot&&left<=right){
        for(int i=left;i<=right;i++) res.push_back(m[top][i]); top++;
        for(int i=top;i<=bot;i++) res.push_back(m[i][right]); right--;
        if(top<=bot){for(int i=right;i>=left;i--) res.push_back(m[bot][i]); bot--;}
        if(left<=right){for(int i=bot;i>=top;i--) res.push_back(m[i][left]); left++;}
    }
    for(int i=0;i<res.size();i++){if(i) cout<<' ';cout<<res[i];} cout<<endl; }`,
    },
    testCases: [
      { input: "3 3\n1 2 3\n4 5 6\n7 8 9",    output: "1 2 3 6 9 8 7 4 5" },
      { input: "3 4\n1 2 3 4\n5 6 7 8\n9 10 11 12", output: "1 2 3 4 8 12 11 10 9 5 6 7" },
    ],
    hiddenCases: [
      { input: "1 4\n1 2 3 4",                 output: "1 2 3 4",          isHidden: true },
      { input: "4 1\n1\n2\n3\n4",              output: "1 2 3 4",          isHidden: true },
    ],
    hints: ["Use four boundaries: top, bottom, left, right. Shrink after each side is traversed.", "Direction: right → down → left → up. Repeat until boundaries cross."],
    editorial: { approach: "Four-boundary shrink simulation.", timeComplexity: "O(m×n)", spaceComplexity: "O(1)" },
  },

  46: {
    id: 46, title: "Rotate Image", difficulty: "Medium", category: "Matrix",
    tags: ["array", "matrix", "math"],
    description: `Given an n×n matrix, rotate the image by 90 degrees clockwise in-place.`,
    constraints: ["1 <= n <= 20", "-1000 <= matrix[i][j] <= 1000"],
    examples: [{ input: "[[1,2,3],[4,5,6],[7,8,9]]", output: "[[7,4,1],[8,5,2],[9,6,3]]" }],
    starterCode: {
      python: `import sys
input = sys.stdin.readline
def rotate(matrix):
    n = len(matrix)
    # transpose
    for i in range(n):
        for j in range(i+1, n):
            matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]
    # reverse each row
    for row in matrix:
        row.reverse()

n = int(input())
matrix = [list(map(int, input().split())) for _ in range(n)]
rotate(matrix)
for row in matrix:
    print(*row)`,
      javascript: `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\\n');
let i=0; const n=+lines[i++];
const m=Array.from({length:n},()=>lines[i++].split(' ').map(Number));
function rotate(m){ const n=m.length;
    for(let i=0;i<n;i++) for(let j=i+1;j<n;j++) [m[i][j],m[j][i]]=[m[j][i],m[i][j]];
    m.forEach(r=>r.reverse()); }
rotate(m); m.forEach(r=>console.log(r.join(' ')));`,
      java8: `import java.util.*;import java.io.*;
public class Solution {
    public static void main(String[] args) throws Exception {
        BufferedReader br=new BufferedReader(new InputStreamReader(System.in));
        int n=Integer.parseInt(br.readLine().trim()); int[][] m=new int[n][n];
        for(int i=0;i<n;i++){StringTokenizer st=new StringTokenizer(br.readLine());for(int j=0;j<n;j++) m[i][j]=Integer.parseInt(st.nextToken());}
        for(int i=0;i<n;i++) for(int j=i+1;j<n;j++){int t=m[i][j];m[i][j]=m[j][i];m[j][i]=t;}
        for(int[] row:m){for(int l=0,r=n-1;l<r;l++,r--){int t=row[l];row[l]=row[r];row[r]=t;}}
        for(int[] row:m){StringBuilder sb=new StringBuilder();for(int k=0;k<n;k++){if(k>0)sb.append(' ');sb.append(row[k]);}System.out.println(sb);}
    }
}`,
      cpp: `#include<bits/stdc++.h>
using namespace std;
int main(){ int n; cin>>n; vector<vector<int>> m(n,vector<int>(n)); for(auto& r:m) for(int& x:r) cin>>x;
    for(int i=0;i<n;i++) for(int j=i+1;j<n;j++) swap(m[i][j],m[j][i]);
    for(auto& r:m) reverse(r.begin(),r.end());
    for(auto& r:m){for(int k=0;k<n;k++){if(k)cout<<' ';cout<<r[k];}cout<<'\n';} }`,
    },
    testCases: [
      { input: "3\n1 2 3\n4 5 6\n7 8 9",          output: "7 4 1\n8 5 2\n9 6 3" },
      { input: "4\n5 1 9 11\n2 4 8 10\n13 3 6 7\n15 14 12 16", output: "15 13 2 5\n14 3 4 1\n12 6 8 9\n16 7 10 11" },
    ],
    hiddenCases: [
      { input: "1\n1",                              output: "1",              isHidden: true },
      { input: "2\n1 2\n3 4",                       output: "3 1\n4 2",      isHidden: true },
    ],
    hints: ["Step 1: Transpose the matrix (swap matrix[i][j] with matrix[j][i]).", "Step 2: Reverse each row. Together these give a 90° clockwise rotation."],
    editorial: { approach: "Transpose then reverse each row.", timeComplexity: "O(n²)", spaceComplexity: "O(1)" },
  },

  47: {
    id: 47, title: "Word Search", difficulty: "Medium", category: "Matrix",
    tags: ["array", "backtracking", "matrix"],
    description: `Given an m×n board of characters and a string word, return true if the word exists in the grid. The word must be constructed from letters of sequentially adjacent cells (horizontally or vertically). The same cell may not be used more than once.`,
    constraints: ["1 <= m, n <= 6", "1 <= word.length <= 15", "board and word consist of only lowercase and uppercase English letters."],
    examples: [{ input: 'board=[["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word="ABCCED"', output: "true" }],
    starterCode: {
      python: `import sys
input = sys.stdin.readline
def exist(board, word):
    rows, cols = len(board), len(board[0])
    def dfs(r, c, i):
        if i == len(word): return True
        if r<0 or r>=rows or c<0 or c>=cols or board[r][c]!=word[i]: return False
        tmp, board[r][c] = board[r][c], '#'
        found = dfs(r+1,c,i+1) or dfs(r-1,c,i+1) or dfs(r,c+1,i+1) or dfs(r,c-1,i+1)
        board[r][c] = tmp
        return found
    for r in range(rows):
        for c in range(cols):
            if dfs(r, c, 0): return True
    return False

r, c = map(int, input().split())
board = [list(input().strip()) for _ in range(r)]
word = input().strip()
print(str(exist(board, word)).lower())`,
      javascript: `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\\n');
let i=0; const [r,c]=lines[i++].split(' ').map(Number);
const board=Array.from({length:r},()=>lines[i++].split(''));
const word=lines[i++];
function exist(b,w){ const R=b.length,C=b[0].length;
    function dfs(r,c,k){ if(k===w.length) return true; if(r<0||r>=R||c<0||c>=C||b[r][c]!==w[k]) return false;
        const tmp=b[r][c]; b[r][c]='#';
        const ok=dfs(r+1,c,k+1)||dfs(r-1,c,k+1)||dfs(r,c+1,k+1)||dfs(r,c-1,k+1);
        b[r][c]=tmp; return ok; }
    for(let r=0;r<R;r++) for(let c=0;c<C;c++) if(dfs(r,c,0)) return true; return false; }
console.log(exist(board,word).toString());`,
      java8: `import java.util.*;import java.io.*;
public class Solution {
    static char[][] board; static String word;
    static boolean dfs(int r,int c,int k){
        if(k==word.length()) return true;
        if(r<0||r>=board.length||c<0||c>=board[0].length||board[r][c]!=word.charAt(k)) return false;
        char tmp=board[r][c]; board[r][c]='#';
        boolean ok=dfs(r+1,c,k+1)||dfs(r-1,c,k+1)||dfs(r,c+1,k+1)||dfs(r,c-1,k+1);
        board[r][c]=tmp; return ok;
    }
    public static void main(String[] args) throws Exception {
        BufferedReader br=new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st=new StringTokenizer(br.readLine()); int r=Integer.parseInt(st.nextToken()),c=Integer.parseInt(st.nextToken());
        board=new char[r][c]; for(int i=0;i<r;i++){String line=br.readLine();for(int j=0;j<c;j++) board[i][j]=line.charAt(j);}
        word=br.readLine().trim(); boolean found=false;
        outer: for(int i=0;i<r;i++) for(int j=0;j<c;j++) if(dfs(i,j,0)){found=true;break outer;}
        System.out.println(found);
    }
}`,
      cpp: `#include<bits/stdc++.h>
using namespace std;
int R,C; string word; vector<vector<char>> board;
bool dfs(int r,int c,int k){ if(k==(int)word.size()) return true;
    if(r<0||r>=R||c<0||c>=C||board[r][c]!=word[k]) return false;
    char tmp=board[r][c]; board[r][c]='#';
    bool ok=dfs(r+1,c,k+1)||dfs(r-1,c,k+1)||dfs(r,c+1,k+1)||dfs(r,c-1,k+1);
    board[r][c]=tmp; return ok; }
int main(){ cin>>R>>C; board.assign(R,vector<char>(C));
    for(auto& row:board) for(char& ch:row) cin>>ch; cin>>word;
    for(int i=0;i<R;i++) for(int j=0;j<C;j++) if(dfs(i,j,0)){cout<<"true\n";return 0;}
    cout<<"false\n"; }`,
    },
    testCases: [
      { input: "3 4\nABCE\nSFCS\nADEE\nABCCED", output: "true"  },
      { input: "3 4\nABCE\nSFCS\nADEE\nSEE",    output: "true"  },
      { input: "3 4\nABCE\nSFCS\nADEE\nABCB",   output: "false" },
    ],
    hiddenCases: [
      { input: "1 1\nA\nA",                      output: "true",  isHidden: true },
      { input: "2 2\nAB\nCD\nABDC",              output: "false", isHidden: true },
    ],
    hints: ["DFS + backtracking from each starting cell.", "Mark a cell as visited during DFS (e.g., replace with '#'), then restore it after backtracking."],
    editorial: { approach: "DFS with backtracking; mark visited cells temporarily.", timeComplexity: "O(m×n×4^L)", spaceComplexity: "O(L)" },
  },

  // ══════════════════════════════════════════════════════════════════════════
  // STRING  (48–56)
  // ══════════════════════════════════════════════════════════════════════════

  48: {
    id: 48, title: "Longest Substring Without Repeating Characters", difficulty: "Medium", category: "String",
    tags: ["string", "sliding-window", "hash-table"],
    description: `Given a string s, find the length of the longest substring without repeating characters.`,
    constraints: ["0 <= s.length <= 5*10^4", "s consists of English letters, digits, symbols, and spaces."],
    examples: [
      { input: "s=abcabcbb", output: "3", explanation: "abc" },
      { input: "s=bbbbb", output: "1" },
    ],
    starterCode: {
      python: `import sys
input = sys.stdin.readline
def length_of_longest_substring(s):
    pass
s = input().strip()
print(length_of_longest_substring(s))`,
      javascript: `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\\n');
function lengthOfLongestSubstring(s) { /* your code */ return 0; }
console.log(lengthOfLongestSubstring(lines[0]));`,
      java8: `import java.util.*;import java.io.*;
public class Solution {
    public static int lengthOfLongestSubstring(String s) { return 0; }
    public static void main(String[] args) throws Exception {
        System.out.println(lengthOfLongestSubstring(new BufferedReader(new InputStreamReader(System.in)).readLine().trim()));
    }
}`,
      cpp: `#include<bits/stdc++.h>
using namespace std;
int lengthOfLongestSubstring(string s){ return 0; }
int main(){ string s; getline(cin,s); cout<<lengthOfLongestSubstring(s)<<endl; }`,
    },
    testCases: [
      { input: "abcabcbb", output: "3" },
      { input: "bbbbb",    output: "1" },
      { input: "pwwkew",   output: "3" },
    ],
    hiddenCases: [
      { input: "",         output: "0", isHidden: true },
      { input: "dvdf",     output: "3", isHidden: true },
    ],
    hints: ["Sliding window: expand right, shrink left when a duplicate is found.", "Use a map to store the last seen index of each character."],
    editorial: { approach: "Sliding window with char→last-index map; skip left past duplicate.", timeComplexity: "O(n)", spaceComplexity: "O(min(n,charset))" },
  },

  49: {
    id: 49, title: "Longest Repeating Character Replacement", difficulty: "Medium", category: "String",
    tags: ["string", "sliding-window", "hash-table"],
    description: `Given a string s and an integer k, you can choose any character and change it to any other English letter up to k times. Return the length of the longest substring containing the same letter you can get after performing at most k operations.`,
    constraints: ["1 <= s.length <= 10^5", "s consists of uppercase English letters.", "0 <= k <= s.length"],
    examples: [
      { input: "s=ABAB, k=2", output: "4" },
      { input: "s=AABABBA, k=1", output: "4" },
    ],
    starterCode: {
      python: `import sys
input = sys.stdin.readline
def character_replacement(s, k):
    pass
s = input().strip()
k = int(input())
print(character_replacement(s, k))`,
      javascript: `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\\n');
function characterReplacement(s, k) { /* your code */ return 0; }
console.log(characterReplacement(lines[0], +lines[1]));`,
      java8: `import java.util.*;import java.io.*;
public class Solution {
    public static int characterReplacement(String s, int k) { return 0; }
    public static void main(String[] args) throws Exception {
        BufferedReader br=new BufferedReader(new InputStreamReader(System.in));
        System.out.println(characterReplacement(br.readLine().trim(), Integer.parseInt(br.readLine().trim())));
    }
}`,
      cpp: `#include<bits/stdc++.h>
using namespace std;
int characterReplacement(string s, int k){ return 0; }
int main(){ string s; getline(cin,s); int k; cin>>k; cout<<characterReplacement(s,k)<<endl; }`,
    },
    testCases: [
      { input: "ABAB\n2",    output: "4" },
      { input: "AABABBA\n1", output: "4" },
      { input: "AAAA\n0",    output: "4" },
    ],
    hiddenCases: [
      { input: "ABCDE\n1",   output: "2", isHidden: true },
      { input: "AABB\n2",    output: "4", isHidden: true },
    ],
    hints: ["Sliding window: window is valid if (window_size - max_freq) <= k.", "Track max frequency of any character in the current window."],
    editorial: { approach: "Sliding window; valid if len - maxFreq ≤ k. Never shrink maxFreq.", timeComplexity: "O(n)", spaceComplexity: "O(1)" },
  },

  50: {
    id: 50, title: "Minimum Window Substring", difficulty: "Hard", category: "String",
    tags: ["string", "sliding-window", "hash-table"],
    description: `Given strings s and t, return the minimum window substring of s such that every character in t (including duplicates) is included in the window. If no such window exists, return "".`,
    constraints: ["1 <= s.length, t.length <= 10^5", "s and t consist of uppercase and lowercase English letters."],
    examples: [
      { input: "s=ADOBECODEBANC, t=ABC", output: "BANC" },
      { input: "s=a, t=a", output: "a" },
    ],
    starterCode: {
      python: `import sys
from collections import Counter
input = sys.stdin.readline
def min_window(s, t):
    pass
s = input().strip()
t = input().strip()
print(min_window(s, t))`,
      javascript: `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\\n');
function minWindow(s, t) { /* your code */ return ""; }
console.log(minWindow(lines[0], lines[1]));`,
      java8: `import java.util.*;import java.io.*;
public class Solution {
    public static String minWindow(String s, String t) { return ""; }
    public static void main(String[] args) throws Exception {
        BufferedReader br=new BufferedReader(new InputStreamReader(System.in));
        System.out.println(minWindow(br.readLine().trim(), br.readLine().trim()));
    }
}`,
      cpp: `#include<bits/stdc++.h>
using namespace std;
string minWindow(string s, string t){ return ""; }
int main(){ string s,t; getline(cin,s); getline(cin,t); cout<<minWindow(s,t)<<endl; }`,
    },
    testCases: [
      { input: "ADOBECODEBANC\nABC", output: "BANC" },
      { input: "a\na",              output: "a"    },
      { input: "a\naa",             output: ""     },
    ],
    hiddenCases: [
      { input: "AAABBBCC\nABC",     output: "ABBB", isHidden: true },
      { input: "ABC\nB",            output: "B",    isHidden: true },
    ],
    hints: ["Use two frequency maps: need (chars in t) and have (chars in window).", "Expand right until window is valid, then shrink left to minimize."],
    editorial: { approach: "Sliding window with formed/required counters. Shrink when valid.", timeComplexity: "O(|s|+|t|)", spaceComplexity: "O(|s|+|t|)" },
  },

  51: {
    id: 51, title: "Valid Anagram", difficulty: "Easy", category: "String",
    tags: ["string", "hash-table", "sorting"],
    description: `Given two strings s and t, return true if t is an anagram of s, and false otherwise. An anagram uses all original letters exactly once.`,
    constraints: ["1 <= s.length, t.length <= 5*10^4", "s and t consist of lowercase English letters."],
    examples: [
      { input: "s=anagram, t=nagaram", output: "true" },
      { input: "s=rat, t=car", output: "false" },
    ],
    starterCode: {
      python: `import sys
input = sys.stdin.readline
def is_anagram(s, t):
    pass
s = input().strip()
t = input().strip()
print(str(is_anagram(s, t)).lower())`,
      javascript: `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\\n');
function isAnagram(s, t) { /* your code */ return false; }
console.log(isAnagram(lines[0], lines[1]).toString());`,
      java8: `import java.util.*;import java.io.*;
public class Solution {
    public static boolean isAnagram(String s, String t) { return false; }
    public static void main(String[] args) throws Exception {
        BufferedReader br=new BufferedReader(new InputStreamReader(System.in));
        System.out.println(isAnagram(br.readLine().trim(), br.readLine().trim()));
    }
}`,
      cpp: `#include<bits/stdc++.h>
using namespace std;
bool isAnagram(string s, string t){ return false; }
int main(){ string s,t; cin>>s>>t; cout<<(isAnagram(s,t)?"true":"false")<<endl; }`,
    },
    testCases: [
      { input: "anagram\nnagaram", output: "true"  },
      { input: "rat\ncar",         output: "false" },
      { input: "a\na",             output: "true"  },
    ],
    hiddenCases: [
      { input: "ab\na",            output: "false", isHidden: true },
      { input: "listen\nsilent",   output: "true",  isHidden: true },
    ],
    hints: ["If lengths differ, return false immediately.", "Count character frequencies in s and t; they must be equal."],
    editorial: { approach: "Frequency count (or sort both strings and compare).", timeComplexity: "O(n)", spaceComplexity: "O(1)" },
  },

  52: {
    id: 52, title: "Group Anagrams", difficulty: "Medium", category: "String",
    tags: ["string", "hash-table", "sorting"],
    description: `Given an array of strings strs, group the anagrams together. You can return the answer in any order.`,
    constraints: ["1 <= strs.length <= 10^4", "0 <= strs[i].length <= 100", "strs[i] consists of lowercase English letters."],
    examples: [{ input: 'strs=["eat","tea","tan","ate","nat","bat"]', output: '[["bat"],["nat","tan"],["ate","eat","tea"]]' }],
    starterCode: {
      python: `import sys
from collections import defaultdict
input = sys.stdin.readline
def group_anagrams(strs):
    groups = defaultdict(list)
    for s in strs:
        groups[tuple(sorted(s))].append(s)
    return list(groups.values())

n = int(input())
strs = [input().strip() for _ in range(n)]
result = group_anagrams(strs)
for group in sorted(result, key=lambda g: sorted(g)[0]):
    print(*sorted(group))`,
      javascript: `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\\n');
let i=0; const n=+lines[i++]; const strs=Array.from({length:n},()=>lines[i++]);
function groupAnagrams(strs){ const map=new Map();
    strs.forEach(s=>{ const k=s.split('').sort().join(''); if(!map.has(k)) map.set(k,[]); map.get(k).push(s); });
    return [...map.values()]; }
groupAnagrams(strs).sort((a,b)=>a[0].localeCompare(b[0])).forEach(g=>console.log(g.slice().sort().join(' ')));`,
      java8: `import java.util.*;import java.io.*;
public class Solution {
    public static void main(String[] args) throws Exception {
        BufferedReader br=new BufferedReader(new InputStreamReader(System.in));
        int n=Integer.parseInt(br.readLine().trim());
        Map<String,List<String>> map=new TreeMap<>();
        for(int i=0;i<n;i++){ String s=br.readLine().trim(); char[] c=s.toCharArray(); Arrays.sort(c); String key=new String(c);
            map.computeIfAbsent(key,k->new ArrayList<>()).add(s); }
        for(List<String> g:map.values()){ Collections.sort(g); System.out.println(String.join(" ",g)); }
    }
}`,
      cpp: `#include<bits/stdc++.h>
using namespace std;
int main(){ int n; cin>>n; map<string,vector<string>> mp;
    for(int i=0;i<n;i++){ string s; cin>>s; string k=s; sort(k.begin(),k.end()); mp[k].push_back(s); }
    for(auto& [k,v]:mp){ sort(v.begin(),v.end()); for(int i=0;i<v.size();i++){if(i)cout<<' ';cout<<v[i];} cout<<'\n'; } }`,
    },
    testCases: [
      { input: "6\neat\ntea\ntan\nate\nnat\nbat", output: "bat\nnat tan\nate eat tea" },
      { input: "1\n",                              output: ""                        },
      { input: "1\na",                             output: "a"                       },
    ],
    hiddenCases: [
      { input: "3\nabc\nbca\nfoo",                 output: "foo\nabc bca",           isHidden: true },
      { input: "2\nab\nba",                        output: "ab ba",                  isHidden: true },
    ],
    hints: ["Sort each string to get its canonical key — anagrams share the same key.", "Use a hash map: sorted_string → list of original strings."],
    editorial: { approach: "Map sorted-string → group. Or use char-count tuple as key.", timeComplexity: "O(n×k log k)", spaceComplexity: "O(n×k)" },
  },

  53: {
    id: 53, title: "Valid Parentheses", difficulty: "Easy", category: "String",
    tags: ["string", "stack"],
    description: `Given a string s containing just '(', ')', '{', '}', '[', ']', determine if the input string is valid. Open brackets must be closed by the same type and in the correct order.`,
    constraints: ["1 <= s.length <= 10^4", "s consists of parentheses only."],
    examples: [
      { input: "()", output: "true" },
      { input: "()[]{}", output: "true" },
      { input: "(]", output: "false" },
    ],
    starterCode: {
      python: `import sys
input = sys.stdin.readline
def is_valid(s):
    pass
s = input().strip()
print(str(is_valid(s)).lower())`,
      javascript: `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\\n');
function isValid(s) { /* your code */ return false; }
console.log(isValid(lines[0]).toString());`,
      java8: `import java.util.*;import java.io.*;
public class Solution {
    public static boolean isValid(String s) { return false; }
    public static void main(String[] args) throws Exception {
        System.out.println(isValid(new BufferedReader(new InputStreamReader(System.in)).readLine().trim()));
    }
}`,
      cpp: `#include<bits/stdc++.h>
using namespace std;
bool isValid(string s){ return false; }
int main(){ string s; cin>>s; cout<<(isValid(s)?"true":"false")<<endl; }`,
    },
    testCases: [
      { input: "()",     output: "true"  },
      { input: "()[]{}", output: "true"  },
      { input: "(]",     output: "false" },
    ],
    hiddenCases: [
      { input: "([)]",   output: "false", isHidden: true },
      { input: "{[]}",   output: "true",  isHidden: true },
    ],
    hints: ["Use a stack. Push opening brackets.", "For closing brackets, check if the top of the stack matches."],
    editorial: { approach: "Stack: push opens, pop and match on close. Empty stack = valid.", timeComplexity: "O(n)", spaceComplexity: "O(n)" },
  },

  54: {
    id: 54, title: "Valid Palindrome", difficulty: "Easy", category: "String",
    tags: ["string", "two-pointers"],
    description: `A phrase is a palindrome if, after converting all uppercase to lowercase and removing all non-alphanumeric characters, it reads the same forward and backward. Given a string s, return true if it is a palindrome, or false otherwise.`,
    constraints: ["1 <= s.length <= 2*10^5", "s consists only of printable ASCII characters."],
    examples: [
      { input: "A man, a plan, a canal: Panama", output: "true" },
      { input: "race a car", output: "false" },
    ],
    starterCode: {
      python: `import sys
input = sys.stdin.readline
def is_palindrome(s):
    pass
s = input().strip()
print(str(is_palindrome(s)).lower())`,
      javascript: `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\\n');
function isPalindrome(s) { /* your code */ return false; }
console.log(isPalindrome(lines[0]).toString());`,
      java8: `import java.util.*;import java.io.*;
public class Solution {
    public static boolean isPalindrome(String s) { return false; }
    public static void main(String[] args) throws Exception {
        System.out.println(isPalindrome(new BufferedReader(new InputStreamReader(System.in)).readLine().trim()));
    }
}`,
      cpp: `#include<bits/stdc++.h>
using namespace std;
bool isPalindrome(string s){ return false; }
int main(){ string s; getline(cin,s); cout<<(isPalindrome(s)?"true":"false")<<endl; }`,
    },
    testCases: [
      { input: "4\n3 2 0 -4\n1", output: "true", hidden: false },
      { input: "2\n1 2\n0", output: "true", hidden: false },
      { input: "1\n1\n-1", output: "false", hidden: false },
      { input: "3\n1 2 3\n-1", output: "false", hidden: true },
      { input: "5\n1 2 3 4 5\n2", output: "true", hidden: true },
      { input: "3\n1 2 3\n0", output: "true", hidden: true },
      { input: "6\n10 20 30 40 50 60\n-1", output: "false", hidden: true },
      { input: "4\n5 5 5 5\n3", output: "true", hidden: true },
      { input: "7\n1 2 3 4 5 6 7\n4", output: "true", hidden: true },
      { input: "2\n100 200\n-1", output: "false", hidden: true },
    ],
    hiddenCases: [
      { input: "0P",                            output: "false", isHidden: true },
      { input: "ab_a",                          output: "true",  isHidden: true },
    ],
    hints: ["Filter to alphanumeric and lowercase, then use two pointers from both ends.", "Or build the cleaned string and compare it to its reverse."],
    editorial: { approach: "Two pointers skipping non-alphanumeric characters.", timeComplexity: "O(n)", spaceComplexity: "O(1)" },
  },

  55: {
    id: 55, title: "Longest Palindromic Substring", difficulty: "Medium", category: "String",
    tags: ["string", "dynamic-programming", "two-pointers"],
    description: `Given a string s, return the longest palindromic substring in s.`,
    constraints: ["1 <= s.length <= 1000", "s consists of only digits and English letters."],
    examples: [
      { input: "s=babad", output: "bab", explanation: "bab or aba are both valid." },
      { input: "s=cbbd", output: "bb" },
    ],
    starterCode: `import sys
input = sys.stdin.readline
def longest_palindrome(s):
    pass
s = input().strip()
print(longest_palindrome(s))`,
    starterCode: {
      python: `import sys
input = sys.stdin.readline
def longest_palindrome(s):
    res = ""
    for i in range(len(s)):
        for odd, even in [(i,i), (i,i+1)]:
            l, r = odd, even
            while l >= 0 and r < len(s) and s[l] == s[r]:
                if r-l+1 > len(res): res = s[l:r+1]
                l -= 1; r += 1
    return res
s = input().strip()
print(longest_palindrome(s))`,
      javascript: `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\\n');
function longestPalindrome(s) { /* your code */ return ""; }
console.log(longestPalindrome(lines[0]));`,
      java8: `import java.util.*;import java.io.*;
public class Solution {
    public static String longestPalindrome(String s) { return ""; }
    public static void main(String[] args) throws Exception {
        System.out.println(longestPalindrome(new BufferedReader(new InputStreamReader(System.in)).readLine().trim()));
    }
}`,
      cpp: `#include<bits/stdc++.h>
using namespace std;
string longestPalindrome(string s){ return ""; }
int main(){ string s; cin>>s; cout<<longestPalindrome(s)<<endl; }`,
    },
    testCases: [
      { input: "babad", output: "bab" },
      { input: "cbbd",  output: "bb"  },
      { input: "a",     output: "a"   },
    ],
    hiddenCases: [
      { input: "racecar", output: "racecar", isHidden: true },
      { input: "abcba",   output: "abcba",   isHidden: true },
    ],
    hints: ["Expand around center: try each index as the center of an odd-length palindrome, and each pair as the center of an even-length one.", "Manacher's algorithm achieves O(n) but expand-around-center is sufficient for this problem."],
    editorial: { approach: "Expand around center for O(n²). Manacher's for O(n).", timeComplexity: "O(n²)", spaceComplexity: "O(1)" },
  },

  56: {
    id: 56, title: "Palindromic Substrings", difficulty: "Medium", category: "String",
    tags: ["string", "dynamic-programming", "two-pointers"],
    description: `Given a string s, return the number of palindromic substrings in it. A substring is a contiguous sequence of characters within the string.`,
    constraints: ["1 <= s.length <= 1000", "s consists of lowercase English letters."],
    examples: [
      { input: "s=abc", output: "3", explanation: "a, b, c" },
      { input: "s=aaa", output: "6", explanation: "a, a, a, aa, aa, aaa" },
    ],
    starterCode: {
      python: `import sys
input = sys.stdin.readline
def count_substrings(s):
    pass
s = input().strip()
print(count_substrings(s))`,
      javascript: `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\\n');
function countSubstrings(s) { /* your code */ return 0; }
console.log(countSubstrings(lines[0]));`,
      java8: `import java.util.*;import java.io.*;
public class Solution {
    public static int countSubstrings(String s) { return 0; }
    public static void main(String[] args) throws Exception {
        System.out.println(countSubstrings(new BufferedReader(new InputStreamReader(System.in)).readLine().trim()));
    }
}`,
      cpp: `#include<bits/stdc++.h>
using namespace std;
int countSubstrings(string s){ return 0; }
int main(){ string s; cin>>s; cout<<countSubstrings(s)<<endl; }`,
    },
    testCases: [
      { input: "abc", output: "3" },
      { input: "aaa", output: "6" },
      { input: "a",   output: "1" },
    ],
    hiddenCases: [
      { input: "abba",  output: "6",  isHidden: true },
      { input: "aaaa",  output: "10", isHidden: true },
    ],
    hints: ["Use the same expand-around-center approach as Longest Palindromic Substring, but count instead of track length.", "For each center, count expansions while palindrome holds."],
    editorial: { approach: "Expand around center; increment count for each valid palindrome.", timeComplexity: "O(n²)", spaceComplexity: "O(1)" },
  },

  // ══════════════════════════════════════════════════════════════════════════
  // TREE  (57–67)
  // ══════════════════════════════════════════════════════════════════════════

  57: {
    id: 57, title: "Maximum Depth of Binary Tree", difficulty: "Easy", category: "Tree",
    tags: ["tree", "dfs", "bfs", "recursion"],
    description: `Given the root of a binary tree, return its maximum depth. Maximum depth is the number of nodes along the longest path from the root node to the farthest leaf node.\n\nInput: level-order array with -1 for null nodes.`,
    constraints: ["0 <= number of nodes <= 10^4", "-100 <= Node.val <= 100"],
    examples: [{ input: "[3,9,20,null,null,15,7] → depth 3", output: "3" }],
    starterCode: {
      python: `import sys
from collections import deque
input = sys.stdin.readline

def max_depth(level_order):
    # level_order: list with -1 as null
    if not level_order or level_order[0] == -1:
        return 0
    depth = 0
    queue = deque([0])
    while queue:
        depth += 1
        for _ in range(len(queue)):
            i = queue.popleft()
            l, r = 2*i+1, 2*i+2
            if l < len(level_order) and level_order[l] != -1:
                queue.append(l)
            if r < len(level_order) and level_order[r] != -1:
                queue.append(r)
    return depth

n = int(input())
vals = list(map(int, input().split())) if n > 0 else []
print(max_depth(vals))`,
      javascript: `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\\n');
const n = +lines[0];
const vals = n > 0 ? lines[1].split(' ').map(Number) : [];
function maxDepth(vals) {
    if (!vals.length || vals[0] === -1) return 0;
    let depth = 0; const q = [0];
    while (q.length) { depth++; const next = [];
        q.forEach(i => { const l=2*i+1,r=2*i+2;
            if(l<vals.length&&vals[l]!==-1) next.push(l);
            if(r<vals.length&&vals[r]!==-1) next.push(r); });
        q.splice(0,q.length,...next); }
    return depth; }
console.log(maxDepth(vals));`,
      java8: `import java.util.*;import java.io.*;
public class Solution {
    public static int maxDepth(int[] v) {
        if(v.length==0||v[0]==-1) return 0;
        int depth=0; Queue<Integer> q=new LinkedList<>(); q.add(0);
        while(!q.isEmpty()){ depth++; int sz=q.size();
            for(int k=0;k<sz;k++){ int i=q.poll(); int l=2*i+1,r=2*i+2;
                if(l<v.length&&v[l]!=-1) q.add(l);
                if(r<v.length&&v[r]!=-1) q.add(r); } }
        return depth; }
    public static void main(String[] args) throws Exception {
        BufferedReader br=new BufferedReader(new InputStreamReader(System.in));
        int n=Integer.parseInt(br.readLine().trim());
        if(n==0){System.out.println(0);return;}
        StringTokenizer st=new StringTokenizer(br.readLine());
        int[] v=new int[n]; for(int i=0;i<n;i++) v[i]=Integer.parseInt(st.nextToken());
        System.out.println(maxDepth(v));
    }
}`,
      cpp: `#include<bits/stdc++.h>
using namespace std;
int maxDepth(vector<int>& v){ if(v.empty()||v[0]==-1) return 0;
    int depth=0; queue<int> q; q.push(0);
    while(!q.empty()){ depth++; int sz=q.size();
        for(int k=0;k<sz;k++){ int i=q.front();q.pop(); int l=2*i+1,r=2*i+2;
            if(l<(int)v.size()&&v[l]!=-1) q.push(l);
            if(r<(int)v.size()&&v[r]!=-1) q.push(r); } }
    return depth; }
int main(){ int n; cin>>n; vector<int> v(n); for(int& x:v) cin>>x; cout<<maxDepth(v)<<endl; }`,
    },
    testCases: [
      { input: "7\n3 9 20 -1 -1 15 7", output: "3" },
      { input: "2\n1 -1 2",            output: "2" },
      { input: "0\n",                  output: "0" },
    ],
    hiddenCases: [
      { input: "1\n1",                 output: "1", isHidden: true },
      { input: "3\n1 2 3",             output: "2", isHidden: true },
    ],
    hints: ["Recursive: depth = 1 + max(depth(left), depth(right)).", "Or BFS level by level and count levels."],
    editorial: { approach: "DFS: return 1+max(left,right). BFS counts levels.", timeComplexity: "O(n)", spaceComplexity: "O(h)" },
  },

  58: {
    id: 58, title: "Same Tree", difficulty: "Easy", category: "Tree",
    tags: ["tree", "dfs", "bfs", "recursion"],
    description: `Given the roots of two binary trees p and q, write a function to check if they are the same or not. Two binary trees are considered the same if they are structurally identical and the nodes have the same value.\n\nInput: two lines each with level-order array (-1 = null).`,
    constraints: ["0 <= number of nodes <= 100", "-10^4 <= Node.val <= 10^4"],
    examples: [{ input: "p=[1,2,3] q=[1,2,3]", output: "true" }],
    starterCode: {
      python: `import sys
input = sys.stdin.readline
def is_same(p, q):
    def same(i, a, j, b):
        av = a[i] if i < len(a) else -1
        bv = b[j] if j < len(b) else -1
        if av == -1 and bv == -1: return True
        if av != bv: return False
        return same(2*i+1,a,2*j+1,b) and same(2*i+2,a,2*j+2,b)
    return same(0,p,0,q)

p = list(map(int, input().split()))
q = list(map(int, input().split()))
print(str(is_same(p, q)).lower())`,
      javascript: `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\\n');
const p=lines[0].split(' ').map(Number), q=lines[1].split(' ').map(Number);
function same(a,i,b,j){ const av=i<a.length?a[i]:-1, bv=j<b.length?b[j]:-1;
    if(av===-1&&bv===-1) return true; if(av!==bv) return false;
    return same(a,2*i+1,b,2*j+1)&&same(a,2*i+2,b,2*j+2); }
console.log(same(p,0,q,0).toString());`,
      java8: `import java.util.*;import java.io.*;
public class Solution {
    static int[] p,q;
    static boolean same(int i, int j){
        int av=i<p.length?p[i]:-1, bv=j<q.length?q[j]:-1;
        if(av==-1&&bv==-1) return true; if(av!=bv) return false;
        return same(2*i+1,2*j+1)&&same(2*i+2,2*j+2); }
    public static void main(String[] args) throws Exception {
        BufferedReader br=new BufferedReader(new InputStreamReader(System.in));
        p=Arrays.stream(br.readLine().trim().split(" ")).mapToInt(Integer::parseInt).toArray();
        q=Arrays.stream(br.readLine().trim().split(" ")).mapToInt(Integer::parseInt).toArray();
        System.out.println(same(0,0));
    }
}`,
      cpp: `#include<bits/stdc++.h>
using namespace std;
vector<int> p,q;
bool same(int i,int j){ int av=i<(int)p.size()?p[i]:-1,bv=j<(int)q.size()?q[j]:-1;
    if(av==-1&&bv==-1) return true; if(av!=bv) return false;
    return same(2*i+1,2*j+1)&&same(2*i+2,2*j+2); }
int main(){ string line; getline(cin,line); istringstream ss1(line); int x; while(ss1>>x) p.push_back(x);
    getline(cin,line); istringstream ss2(line); while(ss2>>x) q.push_back(x);
    cout<<(same(0,0)?"true":"false")<<endl; }`,
    },
    testCases: [
      { input: "1 2 3\n1 2 3",  output: "true"  },
      { input: "1 2\n1 -1 2",   output: "false" },
      { input: "1 2 1\n1 1 2",  output: "false" },
    ],
    hiddenCases: [
      { input: "-1\n-1",        output: "true",  isHidden: true },
      { input: "1\n1",          output: "true",  isHidden: true },
    ],
    hints: ["Recursively compare left subtrees and right subtrees.", "If both nodes are null → same. If one is null or values differ → not same."],
    editorial: { approach: "DFS: base cases null==null, null!=non-null, then recurse.", timeComplexity: "O(n)", spaceComplexity: "O(h)" },
  },

  59: {
    id: 59, title: "Invert Binary Tree", difficulty: "Easy", category: "Tree",
    tags: ["tree", "dfs", "bfs", "recursion"],
    description: `Given the root of a binary tree, invert the tree, and return its root. Output the level-order traversal of the inverted tree.`,
    constraints: ["0 <= number of nodes <= 100", "-100 <= Node.val <= 100"],
    examples: [{ input: "[4,2,7,1,3,6,9]", output: "[4,7,2,9,6,3,1]" }],
    starterCode: {
      python: `import sys
input = sys.stdin.readline
def invert(vals):
    def inv(i):
        if i >= len(vals) or vals[i] == -1: return
        l, r = 2*i+1, 2*i+2
        if l < len(vals) and r < len(vals):
            vals[l], vals[r] = vals[r], vals[l]
        inv(l); inv(r)
    inv(0)
    return [v for v in vals if v != -1]

n = int(input())
vals = list(map(int, input().split())) if n > 0 else []
print(*invert(vals))`,
      javascript: `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\\n');
const n=+lines[0], vals=n>0?lines[1].split(' ').map(Number):[];
function inv(v,i){ if(i>=v.length||v[i]===-1) return; const l=2*i+1,r=2*i+2;
    if(l<v.length&&r<v.length)[v[l],v[r]]=[v[r],v[l]]; inv(v,l); inv(v,r); }
inv(vals,0); console.log(vals.filter(x=>x!==-1).join(' '));`,
      java8: `import java.util.*;import java.io.*;
public class Solution {
    static int[] v;
    static void inv(int i){ if(i>=v.length||v[i]==-1) return; int l=2*i+1,r=2*i+2;
        if(l<v.length&&r<v.length){int t=v[l];v[l]=v[r];v[r]=t;} inv(l);inv(r); }
    public static void main(String[] args) throws Exception {
        BufferedReader br=new BufferedReader(new InputStreamReader(System.in));
        int n=Integer.parseInt(br.readLine().trim());
        if(n==0){System.out.println("");return;}
        StringTokenizer st=new StringTokenizer(br.readLine());
        v=new int[n]; for(int i=0;i<n;i++) v[i]=Integer.parseInt(st.nextToken());
        inv(0); StringBuilder sb=new StringBuilder(); boolean first=true;
        for(int x:v){if(x==-1)continue;if(!first)sb.append(' ');sb.append(x);first=false;}
        System.out.println(sb);
    }
}`,
      cpp: `#include<bits/stdc++.h>
using namespace std;
vector<int> v;
void inv(int i){ if(i>=(int)v.size()||v[i]==-1) return; int l=2*i+1,r=2*i+2;
    if(l<(int)v.size()&&r<(int)v.size()) swap(v[l],v[r]); inv(l);inv(r); }
int main(){ int n; cin>>n; v.resize(n); for(int& x:v) cin>>x; inv(0);
    bool first=true; for(int x:v){if(x==-1)continue;if(!first)cout<<' ';cout<<x;first=false;} cout<<endl; }`,
    },
    testCases: [
      { input: "7\n4 2 7 1 3 6 9", output: "4 7 2 9 6 3 1" },
      { input: "3\n2 1 3",         output: "2 3 1"         },
      { input: "0\n",              output: ""              },
    ],
    hiddenCases: [
      { input: "1\n1",             output: "1",            isHidden: true },
      { input: "5\n1 2 3 4 5",     output: "1 3 2 5 4",   isHidden: true },
    ],
    hints: ["Recursively swap the left and right children of every node.", "DFS (pre-order): swap first, then recurse into children."],
    editorial: { approach: "Recursive swap of left/right children at every node.", timeComplexity: "O(n)", spaceComplexity: "O(h)" },
  },

  60: {
    id: 60, title: "Binary Tree Maximum Path Sum", difficulty: "Hard", category: "Tree",
    tags: ["tree", "dfs", "dynamic-programming"],
    description: `A path in a binary tree is a sequence of nodes where each pair of adjacent nodes has an edge. The path does not need to pass through the root. Given the root of a binary tree, return the maximum path sum.`,
    constraints: ["1 <= number of nodes <= 3*10^4", "-1000 <= Node.val <= 1000"],
    examples: [{ input: "[1,2,3]", output: "6" }, { input: "[-10,9,20,-1,-1,15,7]", output: "42" }],
    starterCode: {
      python: `import sys
input = sys.stdin.readline
def max_path_sum(vals):
    res = [vals[0]]
    def dfs(i):
        if i >= len(vals) or vals[i] == -1: return 0
        left = max(dfs(2*i+1), 0)
        right = max(dfs(2*i+2), 0)
        res[0] = max(res[0], vals[i] + left + right)
        return vals[i] + max(left, right)
    dfs(0)
    return res[0]

n = int(input())
vals = list(map(int, input().split()))
print(max_path_sum(vals))`,
      javascript: `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\\n');
const n=+lines[0], vals=lines[1].split(' ').map(Number);
function maxPathSum(vals){ let res=vals[0];
    function dfs(i){ if(i>=vals.length||vals[i]===-1000000) return 0;
        const l=Math.max(dfs(2*i+1),0), r=Math.max(dfs(2*i+2),0);
        res=Math.max(res,vals[i]+l+r); return vals[i]+Math.max(l,r); }
    dfs(0); return res; }
console.log(maxPathSum(vals));`,
      java8: `import java.util.*;import java.io.*;
public class Solution {
    static int[] v; static int res;
    static int dfs(int i){ if(i>=v.length||v[i]==-1001) return 0;
        int l=Math.max(dfs(2*i+1),0), r=Math.max(dfs(2*i+2),0);
        res=Math.max(res,v[i]+l+r); return v[i]+Math.max(l,r); }
    public static void main(String[] args) throws Exception {
        BufferedReader br=new BufferedReader(new InputStreamReader(System.in));
        int n=Integer.parseInt(br.readLine().trim());
        StringTokenizer st=new StringTokenizer(br.readLine());
        v=new int[n]; for(int i=0;i<n;i++) v[i]=Integer.parseInt(st.nextToken());
        res=v[0]; dfs(0); System.out.println(res);
    }
}`,
      cpp: `#include<bits/stdc++.h>
using namespace std;
vector<int> v; int res;
int dfs(int i){ if(i>=(int)v.size()||v[i]==-1001) return 0;
    int l=max(dfs(2*i+1),0), r=max(dfs(2*i+2),0);
    res=max(res,v[i]+l+r); return v[i]+max(l,r); }
int main(){ int n; cin>>n; v.resize(n); for(int& x:v) cin>>x; res=v[0]; dfs(0); cout<<res<<endl; }`,
    },
    testCases: [
      { input: "3\n1 2 3",                     output: "6"  },
      { input: "7\n-10 9 20 -1001 -1001 15 7", output: "42" },
      { input: "1\n-3",                         output: "-3" },
    ],
    hiddenCases: [
      { input: "3\n-1 -2 -3",                  output: "-1", isHidden: true },
      { input: "5\n5 4 8 11 -1001",             output: "20", isHidden: true },
    ],
    hints: ["DFS returns the max gain from each subtree (0 if negative).", "At each node: path sum = node + left_gain + right_gain. Update global max."],
    editorial: { approach: "Post-order DFS; at each node update global max with left+node+right.", timeComplexity: "O(n)", spaceComplexity: "O(h)" },
  },

  61: {
    id: 61, title: "Binary Tree Level Order Traversal", difficulty: "Medium", category: "Tree",
    tags: ["tree", "bfs"],
    description: `Given the root of a binary tree, return the level order traversal of its nodes' values (i.e., from left to right, level by level). Output one level per line.`,
    constraints: ["0 <= number of nodes <= 2000", "-1000 <= Node.val <= 1000"],
    examples: [{ input: "[3,9,20,-1,-1,15,7]", output: "3\n9 20\n15 7" }],
    starterCode: {
      python: `import sys
from collections import deque
input = sys.stdin.readline
def level_order(vals):
    if not vals or vals[0] == -1: return []
    result, q = [], deque([0])
    while q:
        level = []
        for _ in range(len(q)):
            i = q.popleft()
            level.append(vals[i])
            l, r = 2*i+1, 2*i+2
            if l < len(vals) and vals[l] != -1: q.append(l)
            if r < len(vals) and vals[r] != -1: q.append(r)
        result.append(level)
    return result

n = int(input())
vals = list(map(int, input().split())) if n > 0 else []
for level in level_order(vals):
    print(*level)`,
      javascript: `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\\n');
const n=+lines[0], vals=n>0?lines[1].split(' ').map(Number):[];
function levelOrder(vals){ if(!vals.length||vals[0]===-1) return [];
    const res=[]; let q=[0];
    while(q.length){ const lvl=[],next=[];
        q.forEach(i=>{ lvl.push(vals[i]); const l=2*i+1,r=2*i+2;
            if(l<vals.length&&vals[l]!==-1) next.push(l);
            if(r<vals.length&&vals[r]!==-1) next.push(r); });
        res.push(lvl); q=next; }
    return res; }
levelOrder(vals).forEach(l=>console.log(l.join(' ')));`,
      java8: `import java.util.*;import java.io.*;
public class Solution {
    public static void main(String[] args) throws Exception {
        BufferedReader br=new BufferedReader(new InputStreamReader(System.in));
        int n=Integer.parseInt(br.readLine().trim());
        if(n==0){return;} StringTokenizer st=new StringTokenizer(br.readLine());
        int[] v=new int[n]; for(int i=0;i<n;i++) v[i]=Integer.parseInt(st.nextToken());
        Queue<Integer> q=new LinkedList<>(); if(v[0]!=-1) q.add(0);
        while(!q.isEmpty()){ int sz=q.size(); StringBuilder sb=new StringBuilder();
            for(int k=0;k<sz;k++){ int i=q.poll(); if(k>0)sb.append(' '); sb.append(v[i]);
                int l=2*i+1,r=2*i+2;
                if(l<n&&v[l]!=-1) q.add(l); if(r<n&&v[r]!=-1) q.add(r); }
            System.out.println(sb); }
    }
}`,
      cpp: `#include<bits/stdc++.h>
using namespace std;
int main(){ int n; cin>>n; vector<int> v(n); for(int& x:v) cin>>x;
    queue<int> q; if(v[0]!=-1) q.push(0);
    while(!q.empty()){ int sz=q.size(); bool first=true;
        for(int k=0;k<sz;k++){ int i=q.front();q.pop();
            if(!first)cout<<' '; cout<<v[i]; first=false;
            int l=2*i+1,r=2*i+2;
            if(l<n&&v[l]!=-1) q.push(l); if(r<n&&v[r]!=-1) q.push(r); }
        cout<<'\n'; } }`,
    },
    testCases: [
      { input: "7\n3 9 20 -1 -1 15 7", output: "3\n9 20\n15 7" },
      { input: "1\n1",                  output: "1"            },
      { input: "0\n",                   output: ""             },
    ],
    hiddenCases: [
      { input: "3\n1 2 3",              output: "1\n2 3",      isHidden: true },
      { input: "4\n1 2 -1 3",           output: "1\n2\n3",     isHidden: true },
    ],
    hints: ["BFS with a queue. At each level, process all current nodes before adding their children.", "Track level size (queue size at start of each iteration)."],
    editorial: { approach: "BFS with level-size tracking.", timeComplexity: "O(n)", spaceComplexity: "O(n)" },
  },

  62: {
    id: 62, title: "Validate Binary Search Tree", difficulty: "Medium", category: "Tree",
    tags: ["tree", "dfs", "recursion"],
    description: `Given the root of a binary tree, determine if it is a valid binary search tree (BST). A valid BST: left subtree contains only nodes with keys less than the node's key; right subtree only greater; both subtrees are also valid BSTs.`,
    constraints: ["1 <= number of nodes <= 10^4", "-2^31 <= Node.val <= 2^31 - 1"],
    examples: [{ input: "[2,1,3]", output: "true" }, { input: "[5,1,4,-1,-1,3,6]", output: "false" }],
    starterCode: {
      python: `import sys
input = sys.stdin.readline
def is_valid_bst(vals):
    def validate(i, lo, hi):
        if i >= len(vals) or vals[i] == -10001: return True
        if vals[i] <= lo or vals[i] >= hi: return False
        return validate(2*i+1, lo, vals[i]) and validate(2*i+2, vals[i], hi)
    return validate(0, float('-inf'), float('inf'))

n = int(input())
vals = list(map(int, input().split()))
print(str(is_valid_bst(vals)).lower())`,
      javascript: `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\\n');
const vals=lines[1].split(' ').map(Number);
function isValidBST(v,i=0,lo=-Infinity,hi=Infinity){ if(i>=v.length||v[i]===-10001) return true;
    if(v[i]<=lo||v[i]>=hi) return false;
    return isValidBST(v,2*i+1,lo,v[i])&&isValidBST(v,2*i+2,v[i],hi); }
console.log(isValidBST(vals).toString());`,
      java8: `import java.util.*;import java.io.*;
public class Solution {
    static int[] v;
    static boolean validate(int i, long lo, long hi){
        if(i>=v.length||v[i]==-10001) return true;
        if(v[i]<=lo||v[i]>=hi) return false;
        return validate(2*i+1,lo,v[i])&&validate(2*i+2,v[i],hi); }
    public static void main(String[] args) throws Exception {
        BufferedReader br=new BufferedReader(new InputStreamReader(System.in));
        int n=Integer.parseInt(br.readLine().trim());
        StringTokenizer st=new StringTokenizer(br.readLine());
        v=new int[n]; for(int i=0;i<n;i++) v[i]=Integer.parseInt(st.nextToken());
        System.out.println(validate(0,Long.MIN_VALUE,Long.MAX_VALUE));
    }
}`,
      cpp: `#include<bits/stdc++.h>
using namespace std;
vector<int> v;
bool validate(int i, long lo, long hi){ if(i>=(int)v.size()||v[i]==-10001) return true;
    if(v[i]<=lo||v[i]>=hi) return false;
    return validate(2*i+1,lo,v[i])&&validate(2*i+2,v[i],hi); }
int main(){ int n; cin>>n; v.resize(n); for(int& x:v) cin>>x;
    cout<<(validate(0,LLONG_MIN,LLONG_MAX)?"true":"false")<<endl; }`,
    },
    testCases: [
      { input: "3\n2 1 3",                  output: "true"  },
      { input: "5\n5 1 4 -1 -1 3 6",        output: "false" },
      { input: "1\n1",                       output: "true"  },
    ],
    hiddenCases: [
      { input: "5\n3 1 5 -1 2",             output: "false", isHidden: true },
      { input: "7\n5 3 7 1 4 6 8",           output: "true",  isHidden: true },
    ],
    hints: ["Pass min/max bounds through recursion: each node must be strictly inside (min, max).", "Left child gets max=current; right child gets min=current."],
    editorial: { approach: "DFS with (lo, hi) range — node value must be strictly within range.", timeComplexity: "O(n)", spaceComplexity: "O(h)" },
  },

  63: {
    id: 63, title: "Kth Smallest Element in a BST", difficulty: "Medium", category: "Tree",
    tags: ["tree", "dfs", "sorting"],
    description: `Given the root of a binary search tree, and an integer k, return the kth smallest value (1-indexed) of all the values of the nodes in the tree.`,
    constraints: ["1 <= k <= number of nodes <= 10^4", "0 <= Node.val <= 10^4"],
    examples: [{ input: "[3,1,4,-1,2], k=1", output: "1" }],
    starterCode: {
      python: `import sys
input = sys.stdin.readline
def kth_smallest(vals, k):
    result = []
    def inorder(i):
        if i >= len(vals) or vals[i] == -1 or len(result) >= k: return
        inorder(2*i+1)
        result.append(vals[i])
        inorder(2*i+2)
    inorder(0)
    return result[k-1]

n = int(input())
vals = list(map(int, input().split()))
k = int(input())
print(kth_smallest(vals, k))`,
      javascript: `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\\n');
const vals=lines[1].split(' ').map(Number), k=+lines[2];
function kthSmallest(v,k){ const res=[];
    function inorder(i){ if(i>=v.length||v[i]===-1||res.length>=k) return;
        inorder(2*i+1); res.push(v[i]); inorder(2*i+2); }
    inorder(0); return res[k-1]; }
console.log(kthSmallest(vals,k));`,
      java8: `import java.util.*;import java.io.*;
public class Solution {
    static int[] v; static int k,cnt,res;
    static void inorder(int i){ if(i>=v.length||v[i]==-1||cnt>=k) return;
        inorder(2*i+1); cnt++; if(cnt==k) res=v[i]; inorder(2*i+2); }
    public static void main(String[] args) throws Exception {
        BufferedReader br=new BufferedReader(new InputStreamReader(System.in));
        int n=Integer.parseInt(br.readLine().trim());
        StringTokenizer st=new StringTokenizer(br.readLine());
        v=new int[n]; for(int i=0;i<n;i++) v[i]=Integer.parseInt(st.nextToken());
        k=Integer.parseInt(br.readLine().trim()); inorder(0); System.out.println(res);
    }
}`,
      cpp: `#include<bits/stdc++.h>
using namespace std;
vector<int> v; int k,cnt,res;
void inorder(int i){ if(i>=(int)v.size()||v[i]==-1||cnt>=k) return;
    inorder(2*i+1); if(++cnt==k) res=v[i]; inorder(2*i+2); }
int main(){ int n; cin>>n; v.resize(n); for(int& x:v) cin>>x; cin>>k; inorder(0); cout<<res<<endl; }`,
    },
    testCases: [
      { input: "5\n3 1 4 -1 2\n1", output: "1" },
      { input: "7\n5 3 6 2 4 -1 -1\n3", output: "3" },
    ],
    hiddenCases: [
      { input: "3\n3 1 4\n2",    output: "3", isHidden: true },
      { input: "1\n1\n1",        output: "1", isHidden: true },
    ],
    hints: ["In-order traversal of a BST gives nodes in sorted order.", "Count nodes during in-order; stop at the kth node."],
    editorial: { approach: "In-order DFS with counter; return when counter hits k.", timeComplexity: "O(H+k)", spaceComplexity: "O(H)" },
  },

  64: {
    id: 64, title: "Lowest Common Ancestor of a BST", difficulty: "Easy", category: "Tree",
    tags: ["tree", "dfs", "recursion"],
    description: `Given a BST and two nodes p and q, find their lowest common ancestor (LCA). The LCA is defined as the lowest node that has both p and q as descendants (a node can be a descendant of itself).`,
    constraints: ["2 <= number of nodes <= 10^5", "-10^9 <= Node.val <= 10^9", "All values are unique.", "p != q, both p and q exist in the tree."],
    examples: [{ input: "BST=[6,2,8,0,4,7,9,-1,-1,3,5], p=2, q=8", output: "6" }],
    starterCode: {
      python: `import sys
input = sys.stdin.readline
def lca_bst(vals, p, q):
    def find(i):
        if i >= len(vals) or vals[i] == -1: return -1
        v = vals[i]
        if p < v and q < v: return find(2*i+1)
        if p > v and q > v: return find(2*i+2)
        return v
    return find(0)

n = int(input())
vals = list(map(int, input().split()))
p, q = map(int, input().split())
print(lca_bst(vals, p, q))`,
      javascript: `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\\n');
const vals=lines[1].split(' ').map(Number), [p,q]=lines[2].split(' ').map(Number);
function lcaBST(v,p,q,i=0){ if(i>=v.length||v[i]===-1) return -1;
    const val=v[i]; if(p<val&&q<val) return lcaBST(v,p,q,2*i+1);
    if(p>val&&q>val) return lcaBST(v,p,q,2*i+2); return val; }
console.log(lcaBST(vals,p,q));`,
      java8: `import java.util.*;import java.io.*;
public class Solution {
    static int[] v;
    static int lca(int i, int p, int q){
        if(i>=v.length||v[i]==-1) return -1;
        int val=v[i];
        if(p<val&&q<val) return lca(2*i+1,p,q);
        if(p>val&&q>val) return lca(2*i+2,p,q);
        return val; }
    public static void main(String[] args) throws Exception {
        BufferedReader br=new BufferedReader(new InputStreamReader(System.in));
        int n=Integer.parseInt(br.readLine().trim());
        StringTokenizer st=new StringTokenizer(br.readLine());
        v=new int[n]; for(int i=0;i<n;i++) v[i]=Integer.parseInt(st.nextToken());
        st=new StringTokenizer(br.readLine());
        int p=Integer.parseInt(st.nextToken()),q=Integer.parseInt(st.nextToken());
        System.out.println(lca(0,p,q));
    }
}`,
      cpp: `#include<bits/stdc++.h>
using namespace std;
vector<int> v;
int lca(int i, int p, int q){ if(i>=(int)v.size()||v[i]==-1) return -1;
    int val=v[i]; if(p<val&&q<val) return lca(2*i+1,p,q);
    if(p>val&&q>val) return lca(2*i+2,p,q); return val; }
int main(){ int n; cin>>n; v.resize(n); for(int& x:v) cin>>x; int p,q; cin>>p>>q; cout<<lca(0,p,q)<<endl; }`,
    },
    testCases: [
      { input: "11\n6 2 8 0 4 7 9 -1 -1 3 5\n2 8", output: "6" },
      { input: "11\n6 2 8 0 4 7 9 -1 -1 3 5\n2 4", output: "2" },
    ],
    hiddenCases: [
      { input: "3\n2 1 3\n1 3",    output: "2", isHidden: true },
      { input: "3\n6 2 8\n2 6",    output: "6", isHidden: true },
    ],
    hints: ["In a BST, if both p and q are less than root → LCA is in left subtree.", "If both are greater → LCA is in right subtree. Otherwise root is the LCA."],
    editorial: { approach: "Navigate left/right based on BST property; when p and q split → current node is LCA.", timeComplexity: "O(h)", spaceComplexity: "O(h)" },
  },

  65: {
    id: 65, title: "Subtree of Another Tree", difficulty: "Easy", category: "Tree",
    tags: ["tree", "dfs", "string-matching"],
    description: `Given the roots of two binary trees root and subRoot, return true if there is a subtree of root with the same structure and node values as subRoot, and false otherwise.`,
    constraints: ["1 <= root nodes <= 2000", "1 <= subRoot nodes <= 1000", "-10^4 <= Node.val <= 10^4"],
    examples: [{ input: "root=[3,4,5,1,2], subRoot=[4,1,2]", output: "true" }],
    starterCode: {
      python: `import sys
input = sys.stdin.readline
def is_subtree(root_vals, sub_vals):
    def same(a, i, b, j):
        av = a[i] if i < len(a) else -10001
        bv = b[j] if j < len(b) else -10001
        if av == -10001 and bv == -10001: return True
        if av != bv: return False
        return same(a,2*i+1,b,2*j+1) and same(a,2*i+2,b,2*j+2)
    def check(i):
        if i >= len(root_vals) or root_vals[i] == -10001: return False
        return same(root_vals,i,sub_vals,0) or check(2*i+1) or check(2*i+2)
    return check(0)

n = int(input())
root_vals = list(map(int, input().split()))
m = int(input())
sub_vals = list(map(int, input().split()))
print(str(is_subtree(root_vals, sub_vals)).lower())`,
      javascript: `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\\n');
let i=0; const n=+lines[i++], rv=lines[i++].split(' ').map(Number);
const m=+lines[i++], sv=lines[i++].split(' ').map(Number);
function same(a,i,b,j){ const av=i<a.length?a[i]:-10001, bv=j<b.length?b[j]:-10001;
    if(av===-10001&&bv===-10001) return true; if(av!==bv) return false;
    return same(a,2*i+1,b,2*j+1)&&same(a,2*i+2,b,2*j+2); }
function check(i){ if(i>=rv.length||rv[i]===-10001) return false;
    return same(rv,i,sv,0)||check(2*i+1)||check(2*i+2); }
console.log(check(0).toString());`,
      java8: `import java.util.*;import java.io.*;
public class Solution {
    static int[] root, sub;
    static boolean same(int i,int j){ int av=i<root.length?root[i]:-10001,bv=j<sub.length?sub[j]:-10001;
        if(av==-10001&&bv==-10001) return true; if(av!=bv) return false;
        return same(2*i+1,2*j+1)&&same(2*i+2,2*j+2); }
    static boolean check(int i){ if(i>=root.length||root[i]==-10001) return false;
        return same(i,0)||check(2*i+1)||check(2*i+2); }
    public static void main(String[] args) throws Exception {
        BufferedReader br=new BufferedReader(new InputStreamReader(System.in));
        int n=Integer.parseInt(br.readLine().trim()); StringTokenizer st=new StringTokenizer(br.readLine());
        root=new int[n]; for(int i=0;i<n;i++) root[i]=Integer.parseInt(st.nextToken());
        int m=Integer.parseInt(br.readLine().trim()); st=new StringTokenizer(br.readLine());
        sub=new int[m]; for(int i=0;i<m;i++) sub[i]=Integer.parseInt(st.nextToken());
        System.out.println(check(0));
    }
}`,
      cpp: `#include<bits/stdc++.h>
using namespace std;
vector<int> root,sub;
bool same(int i,int j){ int av=i<(int)root.size()?root[i]:-10001,bv=j<(int)sub.size()?sub[j]:-10001;
    if(av==-10001&&bv==-10001) return true; if(av!=bv) return false;
    return same(2*i+1,2*j+1)&&same(2*i+2,2*j+2); }
bool check(int i){ if(i>=(int)root.size()||root[i]==-10001) return false;
    return same(i,0)||check(2*i+1)||check(2*i+2); }
int main(){ int n; cin>>n; root.resize(n); for(int& x:root) cin>>x;
    int m; cin>>m; sub.resize(m); for(int& x:sub) cin>>x;
    cout<<(check(0)?"true":"false")<<endl; }`,
    },
    testCases: [
      { input: "5\n3 4 5 1 2\n3\n4 1 2",      output: "true"  },
      { input: "7\n3 4 5 1 2 -1 -1\n3\n4 1 2", output: "false" },
    ],
    hiddenCases: [
      { input: "1\n1\n1\n1",                   output: "true",  isHidden: true },
      { input: "3\n1 2 3\n1\n4",               output: "false", isHidden: true },
    ],
    hints: ["A subtree match means the trees rooted at both nodes are identical.", "For each node in root, check if the tree rooted there equals subRoot."],
    editorial: { approach: "DFS: isSame(root,sub) OR isSubtree(root.left,sub) OR isSubtree(root.right,sub).", timeComplexity: "O(m×n)", spaceComplexity: "O(h)" },
  },

  66: {
    id: 66, title: "Construct Binary Tree from Preorder and Inorder Traversal", difficulty: "Medium", category: "Tree",
    tags: ["tree", "divide-and-conquer", "hash-table"],
    description: `Given two integer arrays preorder and inorder where preorder is the preorder traversal of a binary tree and inorder is the inorder traversal of the same tree, construct and return the binary tree. Output level-order traversal (-1 for null).`,
    constraints: ["1 <= n <= 3000", "-3000 <= Node.val <= 3000", "All values are unique."],
    examples: [{ input: "preorder=[3,9,20,15,7], inorder=[9,3,15,20,7]", output: "[3,9,20,-1,-1,15,7]" }],
    starterCode: {
      python: `import sys
from collections import deque
input = sys.stdin.readline
def build_tree(preorder, inorder):
    if not preorder: return []
    idx = {v:i for i,v in enumerate(inorder)}
    result = [-1] * 10000
    def build(pre_l, pre_r, in_l, in_r, pos):
        if pre_l > pre_r: return
        root_val = preorder[pre_l]
        result[pos] = root_val
        mid = idx[root_val]
        left_size = mid - in_l
        build(pre_l+1, pre_l+left_size, in_l, mid-1, 2*pos+1)
        build(pre_l+left_size+1, pre_r, mid+1, in_r, 2*pos+2)
    n = len(preorder)
    build(0, n-1, 0, n-1, 0)
    # trim trailing -1
    while result and result[-1] == -1: result.pop()
    return result

n = int(input())
preorder = list(map(int, input().split()))
inorder = list(map(int, input().split()))
print(*build_tree(preorder, inorder))`,
      javascript: `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\\n');
let i=0; const n=+lines[i++], pre=lines[i++].split(' ').map(Number), ino=lines[i++].split(' ').map(Number);
function buildTree(pre,ino){ const idx=new Map(ino.map((v,i)=>[v,i])); const res=[];
    function build(pl,pr,il,ir,pos){ if(pl>pr) return; const rv=pre[pl]; while(res.length<=pos) res.push(-1); res[pos]=rv;
        const mid=idx.get(rv), ls=mid-il;
        build(pl+1,pl+ls,il,mid-1,2*pos+1); build(pl+ls+1,pr,mid+1,ir,2*pos+2); }
    build(0,n-1,0,n-1,0); while(res[res.length-1]===-1) res.pop(); return res; }
console.log(buildTree(pre,ino).join(' '));`,
      java8: `import java.util.*;import java.io.*;
public class Solution {
    static int[] pre; static Map<Integer,Integer> idx=new HashMap<>(); static int[] res=new int[10000];
    static {Arrays.fill(res,-1);}
    static void build(int pl,int pr,int il,int ir,int pos){ if(pl>pr) return;
        int rv=pre[pl]; res[pos]=rv; int mid=idx.get(rv),ls=mid-il;
        build(pl+1,pl+ls,il,mid-1,2*pos+1); build(pl+ls+1,pr,mid+1,ir,2*pos+2); }
    public static void main(String[] args) throws Exception {
        BufferedReader br=new BufferedReader(new InputStreamReader(System.in));
        int n=Integer.parseInt(br.readLine().trim());
        StringTokenizer st=new StringTokenizer(br.readLine()); pre=new int[n]; for(int i=0;i<n;i++) pre[i]=Integer.parseInt(st.nextToken());
        st=new StringTokenizer(br.readLine()); int[] ino=new int[n]; for(int i=0;i<n;i++){ino[i]=Integer.parseInt(st.nextToken());idx.put(ino[i],i);}
        build(0,n-1,0,n-1,0);
        int last=0; for(int i=0;i<10000;i++) if(res[i]!=-1) last=i;
        StringBuilder sb=new StringBuilder(); for(int i=0;i<=last;i++){if(i>0)sb.append(' ');sb.append(res[i]);} System.out.println(sb);
    }
}`,
      cpp: `#include<bits/stdc++.h>
using namespace std;
int pre_arr[3001]; map<int,int> idx; vector<int> res(10000,-1);
void build(int pl,int pr,int il,int ir,int pos){ if(pl>pr) return;
    int rv=pre_arr[pl]; res[pos]=rv; int mid=idx[rv],ls=mid-il;
    build(pl+1,pl+ls,il,mid-1,2*pos+1); build(pl+ls+1,pr,mid+1,ir,2*pos+2); }
int main(){ int n; cin>>n; for(int i=0;i<n;i++) cin>>pre_arr[i];
    for(int i=0;i<n;i++){int x;cin>>x;idx[x]=i;}
    build(0,n-1,0,n-1,0);
    int last=0; for(int i=0;i<10000;i++) if(res[i]!=-1) last=i;
    for(int i=0;i<=last;i++){if(i)cout<<' ';cout<<res[i];} cout<<endl; }`,
    },
    testCases: [
      { input: "5\n3 9 20 15 7\n9 3 15 20 7", output: "3 9 20 -1 -1 15 7" },
      { input: "1\n1\n1",                      output: "1"                 },
    ],
    hiddenCases: [
      { input: "3\n1 2 3\n2 1 3",             output: "1 2 3",            isHidden: true },
      { input: "4\n4 2 1 3\n1 2 3 4",         output: "4 2 -1 1 3",       isHidden: true },
    ],
    hints: ["Preorder's first element is always the root.", "Find that root in inorder — everything to the left is the left subtree, everything to the right is the right subtree. Recurse."],
    editorial: { approach: "Recursion: root=preorder[0], split inorder at root, recurse.", timeComplexity: "O(n)", spaceComplexity: "O(n)" },
  },

  67: {
    id: 67, title: "Serialize and Deserialize Binary Tree", difficulty: "Hard", category: "Tree",
    tags: ["tree", "dfs", "bfs", "design", "string"],
    description: `Design an algorithm to serialize and deserialize a binary tree. Serialization is converting the tree to a string; deserialization is reconstructing the tree from that string.\n\nFor this problem: encode the tree as a level-order string and decode it back. We verify by round-tripping the level-order input.`,
    constraints: ["0 <= number of nodes <= 10^4", "-1000 <= Node.val <= 1000"],
    examples: [{ input: "[1,2,3,-1,-1,4,5]", output: "1 2 3 -1 -1 4 5" }],
    starterCode: {
      python: `import sys
from collections import deque
input = sys.stdin.readline

def serialize(vals):
    # Convert level-order array to string
    return ','.join(map(str, vals))

def deserialize(data):
    # Convert string back to level-order array
    return list(map(int, data.split(',')))

n = int(input())
vals = list(map(int, input().split())) if n > 0 else []
encoded = serialize(vals)
decoded = deserialize(encoded)
print(*decoded)`,
      javascript: `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\\n');
const n=+lines[0], vals=n>0?lines[1].split(' ').map(Number):[];
function serialize(vals){ return vals.join(','); }
function deserialize(data){ return data.split(',').map(Number); }
console.log(deserialize(serialize(vals)).join(' '));`,
      java8: `import java.util.*;import java.io.*;
public class Solution {
    static String serialize(int[] v){ return Arrays.stream(v).mapToObj(String::valueOf).reduce((a,b)->a+","+b).orElse(""); }
    static int[] deserialize(String s){ return Arrays.stream(s.split(",")).mapToInt(Integer::parseInt).toArray(); }
    public static void main(String[] args) throws Exception {
        BufferedReader br=new BufferedReader(new InputStreamReader(System.in));
        int n=Integer.parseInt(br.readLine().trim());
        if(n==0){System.out.println("");return;}
        StringTokenizer st=new StringTokenizer(br.readLine());
        int[] v=new int[n]; for(int i=0;i<n;i++) v[i]=Integer.parseInt(st.nextToken());
        int[] res=deserialize(serialize(v));
        StringBuilder sb=new StringBuilder(); for(int i=0;i<res.length;i++){if(i>0)sb.append(' ');sb.append(res[i]);} System.out.println(sb);
    }
}`,
      cpp: `#include<bits/stdc++.h>
using namespace std;
int main(){ int n; cin>>n; vector<int> v(n); for(int& x:v) cin>>x;
    // serialize to comma string then deserialize back
    string s; for(int i=0;i<n;i++){if(i)s+=',';s+=to_string(v[i]);}
    for(int i=0;i<n;i++){if(i)cout<<' ';cout<<v[i];} cout<<endl; }`,
    },
    testCases: [
      { input: "7\n1 2 3 -1 -1 4 5", output: "1 2 3 -1 -1 4 5" },
      { input: "0\n",                 output: ""                 },
      { input: "1\n1",               output: "1"               },
    ],
    hiddenCases: [
      { input: "3\n1 2 3",           output: "1 2 3",           isHidden: true },
      { input: "5\n5 4 -1 3 -1",     output: "5 4 -1 3 -1",    isHidden: true },
    ],
    hints: ["Use BFS level-order with null markers (e.g., 'N' or -1) for serialization.", "For deserialization, use a queue: read next two values as left/right children of each dequeued node."],
    editorial: { approach: "BFS serialize with null markers; BFS deserialize reading children from queue.", timeComplexity: "O(n)", spaceComplexity: "O(n)" },
  },

  // ══════════════════════════════════════════════════════════════════════════
  // HEAP  (68–69)
  // ══════════════════════════════════════════════════════════════════════════

  68: {
    id: 68, title: "Top K Frequent Elements", difficulty: "Medium", category: "Heap",
    tags: ["array", "hash-table", "heap", "bucket-sort"],
    description: `Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order.`,
    constraints: ["1 <= nums.length <= 10^5", "k is in [1, unique count of nums]", "Answer is guaranteed to be unique."],
    examples: [{ input: "nums=[1,1,1,2,2,3], k=2", output: "[1,2]" }],
    starterCode: {
      python: `import sys, heapq
from collections import Counter
input = sys.stdin.readline
def top_k_frequent(nums, k):
    count = Counter(nums)
    return [x for x, _ in count.most_common(k)]

n = int(input())
nums = list(map(int, input().split()))
k = int(input())
print(*sorted(top_k_frequent(nums, k)))`,
      javascript: `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\\n');
const nums=lines[1].split(' ').map(Number), k=+lines[2];
function topKFrequent(nums,k){ const cnt=new Map();
    nums.forEach(x=>cnt.set(x,(cnt.get(x)||0)+1));
    return [...cnt.entries()].sort((a,b)=>b[1]-a[1]).slice(0,k).map(([x])=>x); }
console.log(topKFrequent(nums,k).sort((a,b)=>a-b).join(' '));`,
      java8: `import java.util.*;import java.io.*;
public class Solution {
    public static void main(String[] args) throws Exception {
        BufferedReader br=new BufferedReader(new InputStreamReader(System.in));
        int n=Integer.parseInt(br.readLine().trim());
        StringTokenizer st=new StringTokenizer(br.readLine());
        Map<Integer,Integer> cnt=new HashMap<>();
        for(int i=0;i<n;i++){ int x=Integer.parseInt(st.nextToken()); cnt.merge(x,1,Integer::sum); }
        int k=Integer.parseInt(br.readLine().trim());
        cnt.entrySet().stream().sorted((a,b)->b.getValue()-a.getValue()).limit(k).map(Map.Entry::getKey).sorted().forEach(x->System.out.print(x+" "));
        System.out.println();
    }
}`,
      cpp: `#include<bits/stdc++.h>
using namespace std;
int main(){ int n; cin>>n; map<int,int> cnt; for(int i=0;i<n;i++){int x;cin>>x;cnt[x]++;}
    int k; cin>>k; vector<pair<int,int>> v(cnt.begin(),cnt.end());
    sort(v.begin(),v.end(),[](auto& a,auto& b){return a.second>b.second;});
    vector<int> res; for(int i=0;i<k;i++) res.push_back(v[i].first);
    sort(res.begin(),res.end()); for(int i=0;i<k;i++){if(i)cout<<' ';cout<<res[i];} cout<<endl; }`,
    },
    testCases: [
      { input: "6\n1 1 1 2 2 3\n2", output: "1 2" },
      { input: "1\n1\n1",           output: "1"   },
    ],
    hiddenCases: [
      { input: "5\n4 1 1 2 2\n2",   output: "1 2", isHidden: true },
      { input: "4\n1 2 3 4\n3",     output: "1 2 3", isHidden: true },
    ],
    hints: ["Use a frequency map, then a min-heap of size k.", "Or use bucket sort: index = frequency, gives O(n) solution."],
    editorial: { approach: "Freq map + min-heap of size k, or bucket sort (index = freq).", timeComplexity: "O(n)", spaceComplexity: "O(n)" },
  },

  69: {
    id: 69, title: "Find Median from Data Stream", difficulty: "Hard", category: "Heap",
    tags: ["heap", "design", "sorting"],
    description: `Design a data structure that supports:\n- addNum(num): add an integer to the data structure.\n- findMedian(): return the median of all elements so far.\n\nInput: operations one per line (ADD x or MEDIAN). Output: result for each MEDIAN query.`,
    constraints: ["-10^5 <= num <= 10^5", "At most 5*10^4 calls total.", "At least one element before findMedian is called."],
    examples: [{ input: "ADD 1\nADD 2\nMEDIAN\nADD 3\nMEDIAN", output: "1.5\n2.0" }],
    starterCode: {
      python: `import sys, heapq
input = sys.stdin.readline

class MedianFinder:
    def __init__(self):
        self.small = []  # max-heap (negated)
        self.large = []  # min-heap
    def add_num(self, num):
        heapq.heappush(self.small, -num)
        heapq.heappush(self.large, -heapq.heappop(self.small))
        if len(self.large) > len(self.small):
            heapq.heappush(self.small, -heapq.heappop(self.large))
    def find_median(self):
        if len(self.small) > len(self.large):
            return float(-self.small[0])
        return (-self.small[0] + self.large[0]) / 2.0

mf = MedianFinder()
for line in sys.stdin:
    line = line.strip()
    if not line: continue
    if line.startswith('ADD'):
        mf.add_num(int(line.split()[1]))
    elif line == 'MEDIAN':
        m = mf.find_median()
        print(f"{m:.1f}")`,
      javascript: `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\\n');
// Simple sorted-array approach for clarity
const nums = [];
function addNum(x){ let lo=0,hi=nums.length; while(lo<hi){const m=(lo+hi)>>1;if(nums[m]<x)lo=m+1;else hi=m;} nums.splice(lo,0,x); }
function findMedian(){ const n=nums.length; return n%2?nums[n>>1]:(nums[n/2-1]+nums[n/2])/2; }
lines.forEach(l=>{ l=l.trim(); if(l.startsWith('ADD')) addNum(+l.split(' ')[1]);
    else if(l==='MEDIAN') console.log(findMedian().toFixed(1)); });`,
      java8: `import java.util.*;import java.io.*;
public class Solution {
    static PriorityQueue<Integer> small=new PriorityQueue<>(Collections.reverseOrder()), large=new PriorityQueue<>();
    static void add(int n){ small.add(n); large.add(small.poll()); if(large.size()>small.size()) small.add(large.poll()); }
    static double median(){ return small.size()>large.size()?small.peek():(small.peek()+large.peek())/2.0; }
    public static void main(String[] args) throws Exception {
        BufferedReader br=new BufferedReader(new InputStreamReader(System.in));
        String line; while((line=br.readLine())!=null){ line=line.trim();
            if(line.startsWith("ADD")) add(Integer.parseInt(line.split(" ")[1]));
            else if(line.equals("MEDIAN")) System.out.printf("%.1f%n",median()); }
    }
}`,
      cpp: `#include<bits/stdc++.h>
using namespace std;
priority_queue<int> small; priority_queue<int,vector<int>,greater<int>> large;
void add(int n){ small.push(n); large.push(small.top()); small.pop(); if(large.size()>small.size()){small.push(large.top());large.pop();} }
double median(){ return small.size()>large.size()?small.top():(small.top()+large.top())/2.0; }
int main(){ string op; while(cin>>op){ if(op=="ADD"){int x;cin>>x;add(x);}
    else if(op=="MEDIAN") cout<<fixed<<setprecision(1)<<median()<<'\n'; } }`,
    },
    testCases: [
      { input: "ADD 1\nADD 2\nMEDIAN\nADD 3\nMEDIAN", output: "1.5\n2.0" },
      { input: "ADD 5\nMEDIAN",                         output: "5.0"     },
    ],
    hiddenCases: [
      { input: "ADD 1\nMEDIAN\nADD 2\nMEDIAN",          output: "1.0\n1.5", isHidden: true },
      { input: "ADD 3\nADD 1\nADD 2\nMEDIAN",           output: "2.0",      isHidden: true },
    ],
    hints: ["Maintain two heaps: a max-heap for the lower half and a min-heap for the upper half.", "Balance them so sizes differ by at most 1. Median is the top of the larger heap or average of both tops."],
    editorial: { approach: "Two heaps (max-heap small, min-heap large) balanced by size.", timeComplexity: "O(log n) add, O(1) median", spaceComplexity: "O(n)" },
  },

  // ══════════════════════════════════════════════════════════════════════════
  // TRIE  (70–72)
  // ══════════════════════════════════════════════════════════════════════════

  70: {
    id: 70, title: "Implement Trie (Prefix Tree)", difficulty: "Medium", category: "Trie",
    tags: ["trie", "design", "string"],
    description: `Implement a Trie with insert, search, and startsWith methods.\n\nInput: operations one per line (INSERT word, SEARCH word, STARTSWITH prefix). Output: true/false for SEARCH and STARTSWITH.`,
    constraints: ["1 <= word.length, prefix.length <= 2000", "word and prefix consist only of lowercase English letters.", "At most 3*10^4 calls total."],
    examples: [{ input: "INSERT apple\nSEARCH apple\nSEARCH app\nSTARTSWITH app\nINSERT app\nSEARCH app", output: "true\nfalse\ntrue\ntrue" }],
    starterCode: {
      python: `import sys
input = sys.stdin.readline

class Trie:
    def __init__(self):
        self.children = {}
        self.end = False
    def insert(self, word):
        node = self
        for c in word:
            if c not in node.children:
                node.children[c] = Trie()
            node = node.children[c]
        node.end = True
    def search(self, word):
        node = self
        for c in word:
            if c not in node.children: return False
            node = node.children[c]
        return node.end
    def starts_with(self, prefix):
        node = self
        for c in prefix:
            if c not in node.children: return False
            node = node.children[c]
        return True

trie = Trie()
for line in sys.stdin:
    line = line.strip()
    if not line: continue
    parts = line.split()
    op, arg = parts[0], parts[1]
    if op == 'INSERT': trie.insert(arg)
    elif op == 'SEARCH': print(str(trie.search(arg)).lower())
    elif op == 'STARTSWITH': print(str(trie.starts_with(arg)).lower())`,
      javascript: `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\\n');
class Trie{ constructor(){this.c={};this.end=false;}
    insert(w){let n=this;for(const c of w){if(!n.c[c])n.c[c]=new Trie();n=n.c[c];}n.end=true;}
    search(w){let n=this;for(const c of w){if(!n.c[c])return false;n=n.c[c];}return n.end;}
    startsWith(p){let n=this;for(const c of p){if(!n.c[c])return false;n=n.c[c];}return true;} }
const t=new Trie();
lines.forEach(l=>{ const [op,arg]=l.trim().split(' ');
    if(op==='INSERT') t.insert(arg);
    else if(op==='SEARCH') console.log(t.search(arg).toString());
    else if(op==='STARTSWITH') console.log(t.startsWith(arg).toString()); });`,
      java8: `import java.util.*;import java.io.*;
public class Solution {
    static Map<Character,Object[]>[] nodes; static boolean[] ends; static int cnt=0, CAP=100000;
    static { nodes=new Map[CAP]; ends=new boolean[CAP]; nodes[0]=new HashMap<>(); cnt=1; }
    static void insert(String w){ int cur=0; for(char c:w.toCharArray()){ if(!nodes[cur].containsKey(c)){nodes[cnt]=new HashMap<>();nodes[cur].put(c,new Object[]{cnt});cnt++;} cur=(int)((Object[])nodes[cur].get(c))[0]; } ends[cur]=true; }
    static boolean search(String w){ int cur=0; for(char c:w.toCharArray()){if(!nodes[cur].containsKey(c))return false;cur=(int)((Object[])nodes[cur].get(c))[0];}return ends[cur];}
    static boolean sw(String p){ int cur=0; for(char c:p.toCharArray()){if(!nodes[cur].containsKey(c))return false;cur=(int)((Object[])nodes[cur].get(c))[0];}return true;}
    public static void main(String[] args) throws Exception {
        BufferedReader br=new BufferedReader(new InputStreamReader(System.in)); String line;
        while((line=br.readLine())!=null){ String[] parts=line.trim().split(" "); if(parts.length<2) continue;
            if(parts[0].equals("INSERT")) insert(parts[1]);
            else if(parts[0].equals("SEARCH")) System.out.println(search(parts[1]));
            else if(parts[0].equals("STARTSWITH")) System.out.println(sw(parts[1])); }
    }
}`,
      cpp: `#include<bits/stdc++.h>
using namespace std;
struct Trie{ map<char,Trie*> c; bool end=false; };
Trie* root=new Trie();
void insert(string w){Trie* n=root;for(char c:w){if(!n->c[c])n->c[c]=new Trie();n=n->c[c];}n->end=true;}
bool search(string w){Trie* n=root;for(char c:w){if(!n->c.count(c))return false;n=n->c[c];}return n->end;}
bool sw(string p){Trie* n=root;for(char c:p){if(!n->c.count(c))return false;n=n->c[c];}return true;}
int main(){string op,arg;while(cin>>op>>arg){
    if(op=="INSERT") insert(arg);
    else if(op=="SEARCH") cout<<(search(arg)?"true":"false")<<'\n';
    else if(op=="STARTSWITH") cout<<(sw(arg)?"true":"false")<<'\n';} }`,
    },
    testCases: [
      { input: "INSERT apple\nSEARCH apple\nSEARCH app\nSTARTSWITH app\nINSERT app\nSEARCH app", output: "true\nfalse\ntrue\ntrue" },
      { input: "INSERT ab\nSTARTSWITH a\nSEARCH a",                                               output: "true\nfalse"         },
    ],
    hiddenCases: [
      { input: "INSERT hello\nINSERT world\nSEARCH hello\nSEARCH wor\nSTARTSWITH wor", output: "true\nfalse\ntrue", isHidden: true },
      { input: "INSERT a\nSEARCH a\nSTARTSWITH b",                                     output: "true\nfalse",      isHidden: true },
    ],
    hints: ["Each node has a map of children (char → child node) and a boolean isEnd.", "Insert: traverse/create nodes character by character, mark last as end. Search: traverse and check isEnd. StartsWith: just traverse."],
    editorial: { approach: "Trie node: children[26] + isEnd flag. O(L) per operation.", timeComplexity: "O(L) per op", spaceComplexity: "O(total chars)" },
  },

  71: {
    id: 71, title: "Design Add and Search Words Data Structure", difficulty: "Medium", category: "Trie",
    tags: ["trie", "design", "string", "dfs"],
    description: `Design a data structure with addWord and search methods where '.' in search matches any letter.\n\nInput: ADD word or SEARCH pattern (. is wildcard). Output: true/false for SEARCH.`,
    constraints: ["1 <= word.length <= 25", "word consists of lowercase English letters.", "search may contain lowercase letters or '.'"],
    examples: [{ input: "ADD bad\nADD dad\nADD mad\nSEARCH pad\nSEARCH bad\nSEARCH .ad\nSEARCH b..", output: "false\ntrue\ntrue\ntrue" }],
    starterCode: {
      python: `import sys
input = sys.stdin.readline

class WordDictionary:
    def __init__(self):
        self.children = {}
        self.end = False
    def add_word(self, word):
        node = self
        for c in word:
            if c not in node.children:
                node.children[c] = WordDictionary()
            node = node.children[c]
        node.end = True
    def search(self, word):
        def dfs(node, i):
            if i == len(word): return node.end
            c = word[i]
            if c == '.':
                return any(dfs(child, i+1) for child in node.children.values())
            if c not in node.children: return False
            return dfs(node.children[c], i+1)
        return dfs(self, 0)

wd = WordDictionary()
for line in sys.stdin:
    parts = line.strip().split()
    if not parts: continue
    if parts[0] == 'ADD': wd.add_word(parts[1])
    elif parts[0] == 'SEARCH': print(str(wd.search(parts[1])).lower())`,
      javascript: `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\\n');
class WD{ constructor(){this.c={};this.end=false;}
    add(w){let n=this;for(const c of w){if(!n.c[c])n.c[c]=new WD();n=n.c[c];}n.end=true;}
    search(w,n=this,i=0){ if(i===w.length) return n.end; const c=w[i];
        if(c==='.') return Object.values(n.c).some(ch=>this.search(w,ch,i+1));
        return n.c[c]?this.search(w,n.c[c],i+1):false; } }
const wd=new WD();
lines.forEach(l=>{ const [op,arg]=l.trim().split(' ');
    if(op==='ADD') wd.add(arg); else if(op==='SEARCH') console.log(wd.search(arg).toString()); });`,
      java8: `import java.util.*;import java.io.*;
public class Solution {
    static class WD{ Map<Character,WD> c=new HashMap<>(); boolean end; }
    static WD root=new WD();
    static void add(String w){ WD n=root; for(char c:w.toCharArray()){n.c.putIfAbsent(c,new WD());n=n.c.get(c);} n.end=true; }
    static boolean search(String w,WD n,int i){ if(i==w.length()) return n.end;
        char c=w.charAt(i); if(c=='.'){ for(WD ch:n.c.values()) if(search(w,ch,i+1)) return true; return false; }
        return n.c.containsKey(c)&&search(w,n.c.get(c),i+1); }
    public static void main(String[] args) throws Exception {
        BufferedReader br=new BufferedReader(new InputStreamReader(System.in)); String line;
        while((line=br.readLine())!=null){ String[] p=line.trim().split(" "); if(p.length<2) continue;
            if(p[0].equals("ADD")) add(p[1]); else System.out.println(search(p[1],root,0)); }
    }
}`,
      cpp: `#include<bits/stdc++.h>
using namespace std;
struct WD{ map<char,WD*> c; bool end=false; };
WD* root=new WD();
void add(string w){WD* n=root;for(char c:w){if(!n->c[c])n->c[c]=new WD();n=n->c[c];}n->end=true;}
bool search(string& w,WD* n,int i){if(i==(int)w.size())return n->end;char c=w[i];
    if(c=='.'){for(auto& [_,ch]:n->c)if(search(w,ch,i+1))return true;return false;}
    return n->c.count(c)&&search(w,n->c[c],i+1);}
int main(){string op,arg;while(cin>>op>>arg){
    if(op=="ADD")add(arg); else cout<<(search(arg,root,0)?"true":"false")<<'\n';}}`,
    },
    testCases: [
      { input: "ADD bad\nADD dad\nADD mad\nSEARCH pad\nSEARCH bad\nSEARCH .ad\nSEARCH b..", output: "false\ntrue\ntrue\ntrue" },
      { input: "ADD a\nSEARCH .",                                                             output: "true"                  },
    ],
    hiddenCases: [
      { input: "ADD abc\nSEARCH ...\nSEARCH ab",  output: "true\nfalse", isHidden: true },
      { input: "ADD a\nSEARCH a\nSEARCH b",       output: "true\nfalse", isHidden: true },
    ],
    hints: ["Build the same trie as Implement Trie, but search must handle '.' by branching into all children.", "Use recursive DFS for the search function."],
    editorial: { approach: "Trie + DFS for wildcard: at '.', recurse into all children.", timeComplexity: "O(M×26^N) worst", spaceComplexity: "O(total chars)" },
  },

  72: {
    id: 72, title: "Word Search II", difficulty: "Hard", category: "Trie",
    tags: ["trie", "backtracking", "matrix", "dfs"],
    description: `Given an m×n board of characters and a list of words, return all words on the board. Each word must be constructed from letters of sequentially adjacent cells (same cell not used twice).`,
    constraints: ["1 <= m, n <= 12", "1 <= words.length <= 3*10^4", "1 <= words[i].length <= 10"],
    examples: [{ input: 'board=[["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]], words=["oath","pea","eat","rain"]', output: "eat\noath" }],
    starterCode: {
      python: `import sys
input = sys.stdin.readline

def find_words(board, words):
    # Build trie
    trie = {}
    for word in words:
        node = trie
        for c in word:
            node = node.setdefault(c, {})
        node['$'] = word

    rows, cols = len(board), len(board[0])
    result = set()

    def dfs(node, r, c):
        if '$' in node:
            result.add(node['$'])
        if r < 0 or r >= rows or c < 0 or c >= cols: return
        tmp, board[r][c] = board[r][c], '#'
        for dr, dc in [(0,1),(0,-1),(1,0),(-1,0)]:
            nr, nc = r+dr, c+dc
            if 0<=nr<rows and 0<=nc<cols and board[nr][nc] in node:
                dfs(node[board[nr][nc]], nr, nc)
        board[r][c] = tmp

    for r in range(rows):
        for c in range(cols):
            if board[r][c] in trie:
                dfs(trie[board[r][c]], r, c)
    return sorted(result)

r, c = map(int, input().split())
board = [list(input().strip()) for _ in range(r)]
n = int(input())
words = [input().strip() for _ in range(n)]
for w in find_words(board, words):
    print(w)`,
      javascript: `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\\n');
let i=0; const [r,c]=lines[i++].split(' ').map(Number);
const board=Array.from({length:r},()=>lines[i++].split(''));
const n=+lines[i++]; const words=Array.from({length:n},()=>lines[i++]);
function findWords(board,words){
    const trie={}; words.forEach(w=>{let n=trie;for(const c of w){n[c]=n[c]||{};n=n[c];}n['$']=w;});
    const res=new Set(), R=board.length, C=board[0].length;
    function dfs(node,r,c){if(node['$'])res.add(node['$']);if(r<0||r>=R||c<0||c>=C)return;
        const tmp=board[r][c]; board[r][c]='#';
        for(const[dr,dc]of[[0,1],[0,-1],[1,0],[-1,0]]){const nr=r+dr,nc=c+dc;
            if(nr>=0&&nr<R&&nc>=0&&nc<C&&node[board[nr][nc]]) dfs(node[board[nr][nc]],nr,nc);}
        board[r][c]=tmp;}
    for(let r=0;r<R;r++) for(let c=0;c<C;c++) if(trie[board[r][c]]) dfs(trie[board[r][c]],r,c);
    return [...res].sort(); }
findWords(board,words).forEach(w=>console.log(w));`,
      java8: `import java.util.*;import java.io.*;
public class Solution {
    static Map<Character,Object> buildTrie(String[] words){ Map<Character,Object> root=new HashMap<>();
        for(String w:words){ Map<Character,Object> n=(Map)root; for(char c:w.toCharArray()){n.putIfAbsent(c,new HashMap<>());n=(Map)n.get(c);} n.put('$',w); } return root; }
    static Set<String> res=new TreeSet<>(); static char[][] board; static int R,C;
    static void dfs(Map<Character,Object> node, int r, int c){
        if(node.containsKey('$')) res.add((String)node.get('$'));
        if(r<0||r>=R||c<0||c>=C) return;
        char tmp=board[r][c]; board[r][c]='#';
        for(int[] d:new int[][]{{0,1},{0,-1},{1,0},{-1,0}}){ int nr=r+d[0],nc=c+d[1];
            if(nr>=0&&nr<R&&nc>=0&&nc<C&&node.containsKey(board[nr][nc])) dfs((Map)node.get(board[nr][nc]),nr,nc); }
        board[r][c]=tmp; }
    public static void main(String[] args) throws Exception {
        BufferedReader br=new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st=new StringTokenizer(br.readLine()); R=Integer.parseInt(st.nextToken()); C=Integer.parseInt(st.nextToken());
        board=new char[R][C]; for(int i=0;i<R;i++){String l=br.readLine();for(int j=0;j<C;j++)board[i][j]=l.charAt(j);}
        int n=Integer.parseInt(br.readLine().trim()); String[] words=new String[n]; for(int i=0;i<n;i++) words[i]=br.readLine().trim();
        Map<Character,Object> trie=buildTrie(words);
        for(int r=0;r<R;r++) for(int c=0;c<C;c++) if(trie.containsKey(board[r][c])) dfs((Map)trie.get(board[r][c]),r,c);
        for(String w:res) System.out.println(w);
    }
}`,
      cpp: `#include<bits/stdc++.h>
using namespace std;
struct Node{ map<char,Node*> c; string word=""; };
Node* root=new Node();
void insert(string& w){ Node* n=root; for(char c:w){if(!n->c[c])n->c[c]=new Node();n=n->c[c];} n->word=w; }
int R,C; vector<vector<char>> board; set<string> res;
void dfs(Node* node, int r, int c){
    if(!node->word.empty()) res.insert(node->word);
    if(r<0||r>=R||c<0||c>=C) return;
    char tmp=board[r][c]; board[r][c]='#';
    for(auto[dr,dc]:vector<pair<int,int>>{{0,1},{0,-1},{1,0},{-1,0}}){ int nr=r+dr,nc=c+dc;
        if(nr>=0&&nr<R&&nc>=0&&nc<C&&node->c.count(board[nr][nc])) dfs(node->c[board[nr][nc]],nr,nc); }
    board[r][c]=tmp; }
int main(){ cin>>R>>C; board.assign(R,vector<char>(C));
    for(auto& row:board) for(char& ch:row) cin>>ch;
    int n; cin>>n; for(int i=0;i<n;i++){string w;cin>>w;insert(w);}
    for(int r=0;r<R;r++) for(int c=0;c<C;c++) if(root->c.count(board[r][c])) dfs(root->c[board[r][c]],r,c);
    for(auto& w:res) cout<<w<<'\n'; }`,
    },
    testCases: [
      { input: "4 4\noannneteaihkriiflv\n2\noath\neat", output: "eat\noath" },
    ],
    hiddenCases: [
      { input: "3 3\nABCDEFGHI\n2\nABC\nCFI", output: "ABC\nCFI", isHidden: true },
    ],
    hints: ["Build a trie from all words, then DFS from each board cell.", "If the current path exists in the trie, keep going. Mark cells visited; restore after backtrack."],
    editorial: { approach: "Trie-guided DFS + backtracking. Prune branches not in trie.", timeComplexity: "O(m×n×4^L)", spaceComplexity: "O(total word chars)" },
  },

  // ══════════════════════════════════════════════════════════════════════════
  // GRAPH EXTRAS  (73–75) — complete Blind 75
  // ══════════════════════════════════════════════════════════════════════════

  73: {
    id: 73, title: "Graph Valid Tree", difficulty: "Medium", category: "Graph",
    tags: ["graph", "union-find", "dfs", "bfs"],
    description: `Given n nodes labeled 0 to n-1, and a list of edges, determine if these edges make up a valid tree. A valid tree has exactly n-1 edges and is connected with no cycles.`,
    constraints: ["1 <= n <= 2000", "0 <= edges.length <= 5000"],
    examples: [
      { input: "n=5, edges=[[0,1],[0,2],[0,3],[1,4]]", output: "true" },
      { input: "n=5, edges=[[0,1],[1,2],[2,3],[1,3],[1,4]]", output: "false" },
    ],
    starterCode: {
      python: `import sys
input = sys.stdin.readline
def valid_tree(n, edges):
    if len(edges) != n - 1: return False
    adj = [[] for _ in range(n)]
    for u, v in edges:
        adj[u].append(v); adj[v].append(u)
    visited = set()
    def dfs(node, parent):
        visited.add(node)
        for nb in adj[node]:
            if nb == parent: continue
            if nb in visited: return False
            if not dfs(nb, node): return False
        return True
    return dfs(0, -1) and len(visited) == n

n, e = map(int, input().split())
edges = [list(map(int, input().split())) for _ in range(e)]
print(str(valid_tree(n, edges)).lower())`,
      javascript: `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\\n');
let i=0; const [n,e]=lines[i++].split(' ').map(Number);
const edges=Array.from({length:e},()=>lines[i++].split(' ').map(Number));
function validTree(n,edges){ if(edges.length!==n-1) return false;
    const adj=Array.from({length:n},()=>[]);
    edges.forEach(([u,v])=>{adj[u].push(v);adj[v].push(u);});
    const vis=new Set(); function dfs(node,par){ vis.add(node);
        for(const nb of adj[node]){ if(nb===par) continue; if(vis.has(nb)) return false; if(!dfs(nb,node)) return false; } return true; }
    return dfs(0,-1)&&vis.size===n; }
console.log(validTree(n,edges).toString());`,
      java8: `import java.util.*;import java.io.*;
public class Solution {
    static List<Integer>[] adj; static Set<Integer> vis=new HashSet<>();
    static boolean dfs(int node, int par){ vis.add(node); for(int nb:adj[node]){ if(nb==par) continue; if(vis.contains(nb)) return false; if(!dfs(nb,node)) return false; } return true; }
    public static void main(String[] args) throws Exception {
        BufferedReader br=new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st=new StringTokenizer(br.readLine()); int n=Integer.parseInt(st.nextToken()),e=Integer.parseInt(st.nextToken());
        adj=new List[n]; for(int i=0;i<n;i++) adj[i]=new ArrayList<>();
        for(int i=0;i<e;i++){st=new StringTokenizer(br.readLine());int u=Integer.parseInt(st.nextToken()),v=Integer.parseInt(st.nextToken());adj[u].add(v);adj[v].add(u);}
        System.out.println(e==n-1&&dfs(0,-1)&&vis.size()==n);
    }
}`,
      cpp: `#include<bits/stdc++.h>
using namespace std;
vector<int> adj[2001]; set<int> vis;
bool dfs(int node,int par){vis.insert(node); for(int nb:adj[node]){if(nb==par)continue;if(vis.count(nb))return false;if(!dfs(nb,node))return false;} return true;}
int main(){ int n,e; cin>>n>>e;
    for(int i=0;i<e;i++){int u,v;cin>>u>>v;adj[u].push_back(v);adj[v].push_back(u);}
    cout<<((int)e==n-1&&dfs(0,-1)&&(int)vis.size()==n?"true":"false")<<endl; }`,
    },
    testCases: [
      { input: "5 4\n0 1\n0 2\n0 3\n1 4",   output: "true"  },
      { input: "5 5\n0 1\n1 2\n2 3\n1 3\n1 4", output: "false" },
      { input: "1 0",                          output: "true"  },
    ],
    hiddenCases: [
      { input: "4 3\n0 1\n2 3\n1 2",           output: "true",  isHidden: true },
      { input: "3 3\n0 1\n1 2\n2 0",           output: "false", isHidden: true },
    ],
    hints: ["A valid tree must have exactly n-1 edges AND be fully connected (no cycles, no disconnected components).", "Check n-1 edges first (quick fail), then DFS/BFS to verify connectivity and no cycles."],
    editorial: { approach: "Check edge count = n-1, then DFS for cycle-free connectivity.", timeComplexity: "O(V+E)", spaceComplexity: "O(V+E)" },
  },

  74: {
    id: 74, title: "Number of Connected Components in Undirected Graph", difficulty: "Medium", category: "Graph",
    tags: ["graph", "union-find", "dfs", "bfs"],
    description: `Given n nodes labeled 0 to n-1 and a list of undirected edges, return the number of connected components.`,
    constraints: ["1 <= n <= 2000", "0 <= edges.length <= 5000", "No repeated edges, no self-loops."],
    examples: [
      { input: "n=5, edges=[[0,1],[1,2],[3,4]]", output: "2" },
      { input: "n=5, edges=[[0,1],[1,2],[2,3],[3,4]]", output: "1" },
    ],
    starterCode: {
      python: `import sys
input = sys.stdin.readline
def count_components(n, edges):
    parent = list(range(n))
    def find(x):
        while parent[x] != x: parent[x] = parent[parent[x]]; x = parent[x]
        return x
    def union(a, b):
        pa, pb = find(a), find(b)
        if pa == pb: return 0
        parent[pa] = pb; return 1
    return n - sum(union(u, v) for u, v in edges)

n, e = map(int, input().split())
edges = [list(map(int, input().split())) for _ in range(e)]
print(count_components(n, edges))`,
      javascript: `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\\n');
let i=0; const [n,e]=lines[i++].split(' ').map(Number);
const edges=Array.from({length:e},()=>lines[i++].split(' ').map(Number));
function countComponents(n,edges){ const par=[...Array(n).keys()];
    function find(x){while(par[x]!==x){par[x]=par[par[x]];x=par[x];}return x;}
    let res=n; edges.forEach(([u,v])=>{const pu=find(u),pv=find(v);if(pu!==pv){par[pu]=pv;res--;}});
    return res; }
console.log(countComponents(n,edges));`,
      java8: `import java.util.*;import java.io.*;
public class Solution {
    static int[] parent; static int find(int x){while(parent[x]!=x){parent[x]=parent[parent[x]];x=parent[x];}return x;}
    public static void main(String[] args) throws Exception {
        BufferedReader br=new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st=new StringTokenizer(br.readLine()); int n=Integer.parseInt(st.nextToken()),e=Integer.parseInt(st.nextToken());
        parent=new int[n]; for(int i=0;i<n;i++) parent[i]=i;
        int res=n; for(int i=0;i<e;i++){st=new StringTokenizer(br.readLine());int u=Integer.parseInt(st.nextToken()),v=Integer.parseInt(st.nextToken());
            int pu=find(u),pv=find(v); if(pu!=pv){parent[pu]=pv;res--;} }
        System.out.println(res);
    }
}`,
      cpp: `#include<bits/stdc++.h>
using namespace std;
int parent[2001];
int find(int x){while(parent[x]!=x){parent[x]=parent[parent[x]];x=parent[x];}return x;}
int main(){ int n,e; cin>>n>>e; for(int i=0;i<n;i++) parent[i]=i;
    int res=n; for(int i=0;i<e;i++){int u,v;cin>>u>>v;int pu=find(u),pv=find(v);if(pu!=pv){parent[pu]=pv;res--;}}
    cout<<res<<endl; }`,
    },
    testCases: [
      { input: "5 2\n0 1\n1 2",            output: "3" },
      { input: "5 4\n0 1\n1 2\n2 3\n3 4",  output: "1" },
      { input: "4 0",                       output: "4" },
    ],
    hiddenCases: [
      { input: "3 1\n0 2",                  output: "2", isHidden: true },
      { input: "6 3\n0 1\n2 3\n4 5",        output: "3", isHidden: true },
    ],
    hints: ["Union-Find: merge components as you process each edge.", "Or DFS/BFS: count how many times you start a new traversal from an unvisited node."],
    editorial: { approach: "Union-Find with path compression. Count = n - unions applied.", timeComplexity: "O(E×α(V))", spaceComplexity: "O(V)" },
  },

  75: {
    id: 75, title: "Encode and Decode Strings", difficulty: "Medium", category: "String",
    tags: ["string", "design"],
    description: `Design an algorithm to encode a list of strings to a single string and decode it back.\n\nInput: n strings, one per line. Output encode result then decoded strings.\n\nFor this problem: encode to a single line, then decode back to original strings. We verify by outputting the decoded strings.`,
    constraints: ["0 <= strs.length <= 200", "0 <= strs[i].length <= 200", "strs[i] contains any possible characters."],
    examples: [{ input: 'strs=["lint","code","love","you"]', output: "lint\ncode\nlove\nyou" }],
    starterCode: {
      python: `import sys
input = sys.stdin.readline

def encode(strs):
    return ''.join(f"{len(s)}#{s}" for s in strs)

def decode(s):
    result, i = [], 0
    while i < len(s):
        j = s.index('#', i)
        length = int(s[i:j])
        result.append(s[j+1:j+1+length])
        i = j + 1 + length
    return result

n = int(input())
strs = [input().rstrip('\\n') for _ in range(n)]
encoded = encode(strs)
decoded = decode(encoded)
for s in decoded:
    print(s)`,
      javascript: `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\\n');
let i=0; const n=+lines[i++]; const strs=Array.from({length:n},()=>lines[i++]||'');
function encode(strs){ return strs.map(s=>\`\${s.length}#\${s}\`).join(''); }
function decode(s){ const res=[]; let i=0;
    while(i<s.length){ const j=s.indexOf('#',i); const len=+s.slice(i,j); res.push(s.slice(j+1,j+1+len)); i=j+1+len; }
    return res; }
decode(encode(strs)).forEach(s=>console.log(s));`,
      java8: `import java.util.*;import java.io.*;
public class Solution {
    static String encode(List<String> strs){ StringBuilder sb=new StringBuilder(); for(String s:strs) sb.append(s.length()).append('#').append(s); return sb.toString(); }
    static List<String> decode(String s){ List<String> res=new ArrayList<>(); int i=0;
        while(i<s.length()){ int j=s.indexOf('#',i); int len=Integer.parseInt(s.substring(i,j)); res.add(s.substring(j+1,j+1+len)); i=j+1+len; } return res; }
    public static void main(String[] args) throws Exception {
        BufferedReader br=new BufferedReader(new InputStreamReader(System.in));
        int n=Integer.parseInt(br.readLine().trim()); List<String> strs=new ArrayList<>();
        for(int i=0;i<n;i++) strs.add(br.readLine());
        for(String s:decode(encode(strs))) System.out.println(s);
    }
}`,
      cpp: `#include<bits/stdc++.h>
using namespace std;
string encode(vector<string>& strs){ string res; for(auto& s:strs) res+=to_string(s.size())+"#"+s; return res; }
vector<string> decode(string s){ vector<string> res; int i=0;
    while(i<(int)s.size()){ int j=s.find('#',i); int len=stoi(s.substr(i,j-i)); res.push_back(s.substr(j+1,len)); i=j+1+len; } return res; }
int main(){ int n; cin>>n; cin.ignore(); vector<string> strs(n); for(auto& s:strs) getline(cin,s);
    for(auto& s:decode(encode(strs))) cout<<s<<'\n'; }`,
    },
    testCases: [
      { input: "4\nlint\ncode\nlove\nyou", output: "lint\ncode\nlove\nyou" },
      { input: "2\nhello\nworld",          output: "hello\nworld"          },
      { input: "0\n",                     output: ""                      },
    ],
    hiddenCases: [
      { input: "1\n",                     output: "",                      isHidden: true },
      { input: "3\na#b\nc\nd#e#f",        output: "a#b\nc\nd#e#f",        isHidden: true },
    ],
    hints: ["Prefix each string with its length and a delimiter: '4#lint'. This handles strings containing '#'.", "Decode by reading the length, skipping the '#', then reading that many characters."],
    editorial: { approach: "Length-prefixed encoding: 'len#string'. Decode by reading len first.", timeComplexity: "O(n)", spaceComplexity: "O(n)" },
  },

};

const FRONTEND_TO_BACKEND_MAP = {
  1: 1,    // Two Sum
  3: 2,    // Contains Duplicate
  4: 3,    // Product of Array Except Self
  56: 4,   // Valid Palindrome
  9: 5,    // 3Sum
  10: 6,   // Container With Most Water
  2: 7,    // Best Time to Buy and Sell Stock
  50: 8,   // Longest Substring Without Repeating Characters
  52: 9,   // Minimum Window Substring
  40: 10,  // Reverse Linked List
  42: 11,  // Merge Two Sorted Lists
  41: 12,  // Linked List Cycle
  7: 13,   // Find Minimum in Rotated Sorted Array
  8: 14,   // Search in Rotated Sorted Array
  60: 16,  // Maximum Depth of Binary Tree
  61: 17,  // Same Tree
  62: 18,  // Invert Binary Tree
  16: 19,  // Climbing Stairs
  17: 20,  // Coin Change
  18: 21,  // Longest Increasing Subsequence
  30: 22,  // Number of Islands
  27: 23,  // Clone Graph
  29: 24,  // Pacific Atlantic Water Flow
};

function getProblem(id) {
  const backendId = FRONTEND_TO_BACKEND_MAP[id] || id;
  return problems[backendId] || null;
}

function getAllProblems() {
  return Object.values(problems).map(p => ({
    id: p.id,
    title: p.title,
    difficulty: p.difficulty,
    category: p.category,
    tags: p.tags,
  }));
}

function getFullProblem(id) {
  return problems[id] || null;
}

function getProblemsByCategory(category) {
  return Object.values(problems).filter(p => p.category === category);
}

// Merge visible + hidden test cases for submission (hides fields via isHidden flag)
function getTestCasesForSubmit(id) {
  const p = problems[id];
  if (!p) return null;
  return [...(p.testCases || []), ...(p.hiddenCases || [])];
}

module.exports = {
  getProblem,
  getAllProblems,
  getFullProblem,
  getProblemsByCategory,
  getTestCasesForSubmit,
};
