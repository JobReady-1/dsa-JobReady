// DSA Problems inspired by popular coding interview lists
const problems = {
  // Arrays & Hashing
  1: {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    topic: "Arrays",
    category: "Arrays & Hashing",
    description: "Given an array of integers nums and an integer target, return indices of the two numbers that add up to target. You may assume that each input has exactly one solution, and you may not use the same element twice.",
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]"
      }
    ],
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "Only one valid answer exists"
    ],
    testCases: [
      // Visible test cases (shown in examples)
      { input: "4\n2 7 11 15\n9", output: "0 1", hidden: false },
      { input: "3\n3 2 4\n6", output: "1 2", hidden: false },
      { input: "2\n3 3\n6", output: "0 1", hidden: false },
      // Hidden test cases (not shown to users)
      { input: "5\n1 5 3 7 9\n12", output: "1 3", hidden: true },  // 5 + 7 = 12
      { input: "6\n-1 -2 -3 -4 -5 -6\n-9", output: "3 4", hidden: true },  // -4 + -5 = -9
      { input: "7\n0 4 3 0 1 2 5\n0", output: "0 3", hidden: true },  // 0 + 0 = 0
      { input: "10\n10 20 30 40 50 60 70 80 90 100\n110", output: "4 5", hidden: true },  // 50 + 60 = 110
      { input: "8\n-10 -5 0 5 10 15 20 25\n15", output: "3 4", hidden: true },  // 5 + 10 = 15
      { input: "4\n1000000000 999999999 1 2\n1999999999", output: "0 1", hidden: true },  // Large numbers
      { input: "15\n5 2 8 1 9 3 7 4 6 10 11 12 13 14 15\n19", output: "4 9", hidden: true },  // 9 + 10 = 19
    ],
  },
  2: {
    id: 2,
    title: "Contains Duplicate",
    difficulty: "Easy",
    topic: "Arrays",
    category: "Arrays & Hashing",
    description: "Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.",
    examples: [
      {
        input: "nums = [1,2,3,1]",
        output: "true"
      },
      {
        input: "nums = [1,2,3,4]",
        output: "false"
      }
    ],
    constraints: [
      "1 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9"
    ],
    testCases: [
      { input: "4\n1 2 3 1", output: "true", hidden: false },
      { input: "4\n1 2 3 4", output: "false", hidden: false },
      { input: "10\n1 1 1 3 3 4 3 2 4 2", output: "true", hidden: false },
      { input: "1\n1", output: "false", hidden: true },
      { input: "5\n5 5 5 5 5", output: "true", hidden: true },
      { input: "6\n-1 -2 -3 -4 -5 -6", output: "false", hidden: true },
      { input: "7\n100 200 300 400 500 600 100", output: "true", hidden: true },
      { input: "8\n0 1 2 3 4 5 6 7", output: "false", hidden: true },
      { input: "12\n9 8 7 6 5 4 3 2 1 0 -1 -2", output: "false", hidden: true },
      { input: "15\n1 2 3 4 5 6 7 8 9 10 11 12 13 14 1", output: "true", hidden: true },
    ],
  },
  3: {
    id: 3,
    title: "Product of Array Except Self",
    difficulty: "Medium",
    topic: "Arrays",
    category: "Arrays & Hashing",
    description: "Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].",
    examples: [
      { input: "nums = [1,2,3,4]", output: "[24,12,8,6]" },
      { input: "nums = [-1,1,0,-3,3]", output: "[0,0,9,0,0]" }
    ],
    constraints: [
      "2 <= nums.length <= 10^5",
      "-30 <= nums[i] <= 30",
      "The product of any prefix or suffix is guaranteed to fit in a 32-bit integer"
    ],
    testCases: [
      { input: "4\n1 2 3 4", output: "24 12 8 6", hidden: false },
      { input: "5\n-1 1 0 -3 3", output: "0 0 9 0 0", hidden: false },
      { input: "3\n2 3 4", output: "12 8 6", hidden: true },
      { input: "6\n1 1 1 1 1 1", output: "1 1 1 1 1 1", hidden: true },
      { input: "5\n-2 -3 4 -5 6", output: "-360 -240 180 -144 120", hidden: true },
      { input: "4\n0 0 0 1", output: "0 0 0 0", hidden: true },
      { input: "7\n1 2 3 4 5 6 7", output: "5040 2520 1680 1260 1008 840 720", hidden: true },
      { input: "3\n10 20 30", output: "600 300 200", hidden: true },
      { input: "8\n-1 -2 -3 -4 1 2 3 4", output: "-576 -288 -192 -144 576 288 192 144", hidden: true },
    ],
  },

  // Two Pointers
  4: {
    id: 4,
    title: "Valid Palindrome",
    difficulty: "Easy",
    topic: "Strings",
    category: "Two Pointers",
    description: "A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.",
    examples: [
      { input: "s = \"A man, a plan, a canal: Panama\"", output: "true" },
      { input: "s = \"race a car\"", output: "false" }
    ],
    constraints: [
      "1 <= s.length <= 2 * 10^5",
      "s consists only of printable ASCII characters"
    ],
    testCases: [
      { input: "A man, a plan, a canal: Panama", output: "true", hidden: false },
      { input: "race a car", output: "false", hidden: false },
      { input: " ", output: "true", hidden: false },
      { input: "ab", output: "false", hidden: true },
      { input: "a", output: "true", hidden: true },
      { input: "racecar", output: "true", hidden: true },
      { input: "Was it a car or a cat I saw?", output: "true", hidden: true },
      { input: "Madam", output: "true", hidden: true },
      { input: "hello", output: "false", hidden: true },
      { input: "A Santa at NASA", output: "true", hidden: true },
    ],
  },
  5: {
    id: 5,
    title: "3Sum",
    difficulty: "Medium",
    topic: "Arrays",
    category: "Two Pointers",
    description: "Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.",
    examples: [
      { input: "nums = [-1,0,1,2,-1,-4]", output: "[[-1,-1,2],[-1,0,1]]" },
      { input: "nums = [0,1,1]", output: "[]" }
    ],
    constraints: [
      "3 <= nums.length <= 3000",
      "-10^5 <= nums[i] <= 10^5"
    ],
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
  },
  8: {
    id: 8,
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    topic: "Strings",
    category: "Sliding Window",
    description: "Given a string s, find the length of the longest substring without repeating characters.",
    examples: [
      { input: "s = \"abcabcbb\"", output: "3" },
      { input: "s = \"bbbbb\"", output: "1" }
    ],
    constraints: [
      "0 <= s.length <= 5 * 10^4",
      "s consists of English letters, digits, symbols and spaces"
    ],
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
  },
  9: {
    id: 9,
    title: "Minimum Window Substring",
    difficulty: "Hard",
    topic: "Strings",
    category: "Sliding Window",
    description: "Given two strings s and t, return the minimum window substring of s such that every character in t (including duplicates) is included in the window.",
    examples: [
      { input: "s = \"ADOBECODEBANC\", t = \"ABC\"", output: "\"BANC\"" },
      { input: "s = \"a\", t = \"a\"", output: "\"a\"" }
    ],
    constraints: [
      "1 <= s.length, t.length <= 10^5",
      "s and t consist of uppercase and lowercase English letters"
    ],
    testCases: [
      { input: "ADOBECODEBANC\nABC", output: "BANC", hidden: false },
      { input: "a\na", output: "a", hidden: false },
      { input: "a\naa", output: "", hidden: false },
      { input: "ab\nb", output: "b", hidden: true },
      { input: "abc\ncba", output: "abc", hidden: true },
      { input: "ADOBECODEBANC\nABCC", output: "CODEBANC", hidden: true },
      { input: "aaaaaaaaaaaabbbbbcdd\nabcdd", output: "abbbbbcdd", hidden: true },
      { input: "cabwefgewcwaefgcf\ncae", output: "cwae", hidden: true },
      { input: "bba\nab", output: "ba", hidden: true },
      { input: "abc\nb", output: "b", hidden: true },
    ],
  },

  // Linked List
  10: {
    id: 10,
    title: "Reverse Linked List",
    difficulty: "Easy",
    topic: "Linked Lists",
    category: "Linked List",
    description: "Given the head of a singly linked list, reverse the list, and return the reversed list.",
    examples: [
      { input: "head = [1,2,3,4,5]", output: "[5,4,3,2,1]" },
      { input: "head = [1,2]", output: "[2,1]" }
    ],
    constraints: [
      "The number of nodes in the list is the range [0, 5000]",
      "-5000 <= Node.val <= 5000"
    ],
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
  },
  11: {
    id: 11,
    title: "Merge Two Sorted Lists",
    difficulty: "Easy",
    topic: "Linked Lists",
    category: "Linked List",
    description: "You are given the heads of two sorted linked lists list1 and list2. Merge the two lists into one sorted list.",
    examples: [
      { input: "list1 = [1,2,4], list2 = [1,3,4]", output: "[1,1,2,3,4,4]" },
      { input: "list1 = [], list2 = []", output: "[]" }
    ],
    constraints: [
      "The number of nodes in both lists is in the range [0, 50]",
      "-100 <= Node.val <= 100"
    ],
    testCases: [
      { input: "3\n1 2 4\n3\n1 3 4", output: "1 1 2 3 4 4", hidden: false },
      { input: "0\n0", output: "", hidden: false },
      { input: "0\n1\n0", output: "0", hidden: false },
      { input: "2\n1 3\n2\n2 4", output: "1 2 3 4", hidden: true },
      { input: "4\n1 2 3 4\n4\n5 6 7 8", output: "1 2 3 4 5 6 7 8", hidden: true },
      { input: "1\n5\n3\n1 2 3", output: "1 2 3 5", hidden: true },
      { input: "3\n-1 0 1\n3\n-2 -1 0", output: "-2 -1 -1 0 0 1", hidden: true },
      { input: "5\n1 1 1 1 1\n5\n2 2 2 2 2", output: "1 1 1 1 1 2 2 2 2 2", hidden: true },
      { input: "2\n10 20\n2\n15 25", output: "10 15 20 25", hidden: true },
      { input: "1\n100\n1\n50", output: "50 100", hidden: true },
    ],
  },
  12: {
    id: 12,
    title: "Linked List Cycle",
    difficulty: "Easy",
    topic: "Linked Lists",
    category: "Linked List",
    description: "Given head, the head of a linked list, determine if the linked list has a cycle in it.",
    examples: [
      { input: "head = [3,2,0,-4], pos = 1", output: "true" },
      { input: "head = [1,2], pos = 0", output: "true" }
    ],
    constraints: [
      "The number of the nodes in the list is in the range [0, 10^4]",
      "-10^5 <= Node.val <= 10^5"
    ],
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
  },

  // Binary Search
  13: {
    id: 13,
    title: "Find Minimum in Rotated Sorted Array",
    difficulty: "Medium",
    topic: "Arrays",
    category: "Binary Search",
    description: "Suppose an array of length n sorted in ascending order is rotated between 1 and n times. Given the rotated array, return the minimum element of this array.",
    examples: [
      { input: "nums = [3,4,5,1,2]", output: "1" },
      { input: "nums = [4,5,6,7,0,1,2]", output: "0" }
    ],
    constraints: [
      "n == nums.length",
      "1 <= n <= 5000",
      "-5000 <= nums[i] <= 5000"
    ],
    testCases: [
      { input: "5\n3 4 5 1 2", output: "1", hidden: false },
      { input: "7\n4 5 6 7 0 1 2", output: "0", hidden: false },
      { input: "1\n11", output: "11", hidden: false },
      { input: "6\n2 3 4 5 6 1", output: "1", hidden: true },
      { input: "4\n10 1 2 3", output: "1", hidden: true },
      { input: "8\n5 6 7 8 9 10 1 2", output: "1", hidden: true },
      { input: "3\n2 3 1", output: "1", hidden: true },
      { input: "5\n1 2 3 4 5", output: "1", hidden: true },
      { input: "7\n-5 -4 -3 -2 -1 -10 -9", output: "-10", hidden: true },
      { input: "10\n11 13 15 17 19 21 23 25 1 3", output: "1", hidden: true },
    ],
  },
  14: {
    id: 14,
    title: "Search in Rotated Sorted Array",
    difficulty: "Medium",
    topic: "Arrays",
    category: "Binary Search",
    description: "There is an integer array nums sorted in ascending order (with distinct values). Given the array nums after the rotation and an integer target, return the index of target if it is in nums, or -1 if it is not in nums.",
    examples: [
      { input: "nums = [4,5,6,7,0,1,2], target = 0", output: "4" },
      { input: "nums = [4,5,6,7,0,1,2], target = 3", output: "-1" }
    ],
    constraints: [
      "1 <= nums.length <= 5000",
      "-10^4 <= nums[i] <= 10^4",
      "All values of nums are unique"
    ],
    testCases: [
      { input: "7\n4 5 6 7 0 1 2\n0", output: "4", hidden: false },
      { input: "7\n4 5 6 7 0 1 2\n3", output: "-1", hidden: false },
      { input: "1\n1\n0", output: "-1", hidden: false },
      { input: "7\n4 5 6 7 0 1 2\n5", output: "1", hidden: true },
      { input: "5\n3 4 5 1 2\n1", output: "3", hidden: true },
      { input: "6\n6 7 8 1 2 3\n8", output: "2", hidden: true },
      { input: "8\n10 11 12 13 14 1 2 3\n14", output: "4", hidden: true },
      { input: "4\n5 1 2 3\n2", output: "2", hidden: true },
      { input: "9\n9 10 11 12 13 14 15 1 2\n15", output: "6", hidden: true },
      { input: "3\n2 3 1\n3", output: "1", hidden: true },
    ],
  },
  15: {
    id: 15,
    title: "Binary Search",
    difficulty: "Easy",
    topic: "Arrays",
    category: "Binary Search",
    description: "Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, then return its index. Otherwise, return -1.",
    examples: [
      { input: "nums = [-1,0,3,5,9,12], target = 9", output: "4" },
      { input: "nums = [-1,0,3,5,9,12], target = 2", output: "-1" }
    ],
    constraints: [
      "1 <= nums.length <= 10^4",
      "-10^4 < nums[i], target < 10^4",
      "All the integers in nums are unique"
    ],
    testCases: [
      { input: "6\n-1 0 3 5 9 12\n9", output: "4", hidden: false },
      { input: "6\n-1 0 3 5 9 12\n2", output: "-1", hidden: false },
      { input: "1\n5\n5", output: "0", hidden: false },
      { input: "5\n1 2 3 4 5\n3", output: "2", hidden: true },
      { input: "7\n-10 -5 0 5 10 15 20\n15", output: "5", hidden: true },
      { input: "10\n1 3 5 7 9 11 13 15 17 19\n1", output: "0", hidden: true },
      { input: "8\n2 4 6 8 10 12 14 16\n16", output: "7", hidden: true },
      { input: "4\n10 20 30 40\n25", output: "-1", hidden: true },
      { input: "6\n-100 -50 0 50 100 150\n0", output: "2", hidden: true },
      { input: "9\n1 2 3 4 5 6 7 8 9\n10", output: "-1", hidden: true },
    ],
  },

  // Trees
  16: {
    id: 16,
    title: "Maximum Depth of Binary Tree",
    difficulty: "Easy",
    topic: "Trees",
    category: "Trees",
    description: "Given the root of a binary tree, return its maximum depth. A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.",
    examples: [
      { input: "root = [3,9,20,null,null,15,7]", output: "3" },
      { input: "root = [1,null,2]", output: "2" }
    ],
    constraints: [
      "The number of nodes in the tree is in the range [0, 10^4]",
      "-100 <= Node.val <= 100"
    ],
    testCases: [
      { input: "7\n3 9 20 -1 -1 15 7", output: "3", hidden: false },
      { input: "2\n1 -1 2", output: "2", hidden: false },
      { input: "1\n1", output: "1", hidden: false },
      { input: "5\n1 2 3 4 5", output: "3", hidden: true },
      { input: "3\n1 2 -1", output: "2", hidden: true },
      { input: "15\n1 2 3 4 5 6 7 8 9 10 11 12 13 14 15", output: "4", hidden: true },
      { input: "4\n10 5 15 -1", output: "3", hidden: true },
      { input: "6\n1 -1 2 -1 3 -1", output: "4", hidden: true },
      { input: "9\n5 3 8 1 4 7 9 -1 2", output: "4", hidden: true },
      { input: "10\n1 2 3 4 5 6 7 8 9 10", output: "4", hidden: true },
    ],
  },
  17: {
    id: 17,
    title: "Same Tree",
    difficulty: "Easy",
    topic: "Trees",
    category: "Trees",
    description: "Given the roots of two binary trees p and q, write a function to check if they are the same or not. Two binary trees are considered the same if they are structurally identical, and the nodes have the same value.",
    examples: [
      { input: "p = [1,2,3], q = [1,2,3]", output: "true" },
      { input: "p = [1,2], q = [1,null,2]", output: "false" }
    ],
    constraints: [
      "The number of nodes in both trees is in the range [0, 100]",
      "-10^4 <= Node.val <= 10^4"
    ],
    testCases: [
      { input: "3\n1 2 3\n3\n1 2 3", output: "true", hidden: false },
      { input: "2\n1 2\n2\n1 -1 2", output: "false", hidden: false },
      { input: "1\n1\n1\n1", output: "true", hidden: false },
      { input: "5\n1 2 3 4 5\n5\n1 2 3 4 5", output: "true", hidden: true },
      { input: "3\n1 2 3\n3\n1 3 2", output: "false", hidden: true },
      { input: "0\n0", output: "true", hidden: true },
      { input: "4\n10 5 15 3\n4\n10 5 15 4", output: "false", hidden: true },
      { input: "7\n1 2 3 4 5 6 7\n7\n1 2 3 4 5 6 7", output: "true", hidden: true },
      { input: "2\n1 -1\n2\n1 2", output: "false", hidden: true },
      { input: "6\n5 3 8 1 4 7\n6\n5 3 8 1 4 7", output: "true", hidden: true },
    ],
  },
  18: {
    id: 18,
    title: "Invert Binary Tree",
    difficulty: "Easy",
    topic: "Trees",
    category: "Trees",
    description: "Given the root of a binary tree, invert the tree, and return its root. Inverting a binary tree means swapping the left and right children of all nodes in the tree.",
    examples: [
      { input: "root = [4,2,7,1,3,6,9]", output: "[4,7,2,9,6,3,1]" },
      { input: "root = [2,1,3]", output: "[2,3,1]" }
    ],
    constraints: [
      "The number of nodes in the tree is in the range [0, 100]",
      "-100 <= Node.val <= 100"
    ],
    testCases: [
      { input: "7\n4 2 7 1 3 6 9", output: "4 7 2 9 6 3 1", hidden: false },
      { input: "3\n2 1 3", output: "2 3 1", hidden: false },
      { input: "1\n1", output: "1", hidden: false },
      { input: "5\n1 2 3 4 5", output: "1 3 2 5 4", hidden: true },
      { input: "4\n10 5 15 3", output: "10 15 5 3", hidden: true },
      { input: "6\n5 3 8 1 4 7", output: "5 8 3 7 4 1", hidden: true },
      { input: "9\n1 2 3 4 5 6 7 8 9", output: "1 3 2 7 6 5 4 9 8", hidden: true },
      { input: "2\n1 2", output: "1 2", hidden: true },
      { input: "8\n10 5 15 2 7 12 20 1", output: "10 15 5 20 12 7 2 1", hidden: true },
      { input: "15\n1 2 3 4 5 6 7 8 9 10 11 12 13 14 15", output: "1 3 2 7 6 5 4 15 14 13 12 11 10 9 8", hidden: true },
    ],
  },

  // Dynamic Programming
  19: {
    id: 19,
    title: "Climbing Stairs",
    difficulty: "Easy",
    topic: "Dynamic Programming",
    category: "Dynamic Programming",
    description: "You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
    examples: [
      { input: "n = 2", output: "2", explanation: "1. 1 step + 1 step\n2. 2 steps" },
      { input: "n = 3", output: "3", explanation: "1. 1 step + 1 step + 1 step\n2. 1 step + 2 steps\n3. 2 steps + 1 step" }
    ],
    constraints: [
      "1 <= n <= 45"
    ],
    testCases: [
      { input: "2", output: "2", hidden: false },
      { input: "3", output: "3", hidden: false },
      { input: "5", output: "8", hidden: false },
      { input: "1", output: "1", hidden: true },
      { input: "4", output: "5", hidden: true },
      { input: "10", output: "89", hidden: true },
      { input: "15", output: "987", hidden: true },
      { input: "20", output: "10946", hidden: true },
      { input: "25", output: "121393", hidden: true },
      { input: "30", output: "1346269", hidden: true },
    ],
  },
  20: {
    id: 20,
    title: "Coin Change",
    difficulty: "Medium",
    topic: "Dynamic Programming",
    category: "Dynamic Programming",
    description: "You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money. Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.",
    examples: [
      { input: "coins = [1,2,5], amount = 11", output: "3", explanation: "11 = 5 + 5 + 1" },
      { input: "coins = [2], amount = 3", output: "-1" }
    ],
    constraints: [
      "1 <= coins.length <= 12",
      "1 <= coins[i] <= 2^31 - 1",
      "0 <= amount <= 10^4"
    ],
    testCases: [
      { input: "3\n1 2 5\n11", output: "3", hidden: false },
      { input: "1\n2\n3", output: "-1", hidden: false },
      { input: "1\n1\n0", output: "0", hidden: false },
      { input: "4\n1 3 4 5\n7", output: "2", hidden: true },
      { input: "3\n2 5 10\n27", output: "4", hidden: true },
      { input: "5\n1 5 10 25 50\n63", output: "6", hidden: true },
      { input: "2\n3 7\n15", output: "3", hidden: true },
      { input: "4\n1 2 5 10\n18", output: "4", hidden: true },
      { input: "3\n5 10 25\n30", output: "2", hidden: true },
      { input: "6\n1 2 5 10 20 50\n100", output: "2", hidden: true },
    ],
  },
  21: {
    id: 21,
    title: "Longest Increasing Subsequence",
    difficulty: "Medium",
    topic: "Dynamic Programming",
    category: "Dynamic Programming",
    description: "Given an integer array nums, return the length of the longest strictly increasing subsequence. A subsequence is a sequence that can be derived from an array by deleting some or no elements without changing the order of the remaining elements.",
    examples: [
      { input: "nums = [10,9,2,5,3,7,101,18]", output: "4", explanation: "The longest increasing subsequence is [2,3,7,101]" },
      { input: "nums = [0,1,0,3,2,3]", output: "4" }
    ],
    constraints: [
      "1 <= nums.length <= 2500",
      "-10^4 <= nums[i] <= 10^4"
    ],
    testCases: [
      { input: "8\n10 9 2 5 3 7 101 18", output: "4", hidden: false },
      { input: "6\n0 1 0 3 2 3", output: "4", hidden: false },
      { input: "1\n7", output: "1", hidden: false },
      { input: "5\n1 2 3 4 5", output: "5", hidden: true },
      { input: "5\n5 4 3 2 1", output: "1", hidden: true },
      { input: "9\n1 3 6 7 9 4 10 5 6", output: "6", hidden: true },
      { input: "10\n10 22 9 33 21 50 41 60 80 1", output: "6", hidden: true },
      { input: "7\n3 5 6 2 5 4 19", output: "4", hidden: true },
      { input: "6\n1 1 1 1 1 1", output: "1", hidden: true },
      { input: "12\n-10 -5 0 5 10 3 8 12 15 20 25 30", output: "10", hidden: true },
    ],
  },

  // Graphs
  22: {
    id: 22,
    title: "Number of Islands",
    difficulty: "Medium",
    topic: "Graphs",
    category: "Graphs",
    description: "Given an m x n 2D binary grid which represents a map of '1's (land) and '0's (water), return the number of islands. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.",
    examples: [
      { input: "grid = [[1,1,1,1,0],[1,1,0,1,0],[1,1,0,0,0],[0,0,0,0,0]]", output: "1" },
      { input: "grid = [[1,1,0,0,0],[1,1,0,0,0],[0,0,1,0,0],[0,0,0,1,1]]", output: "3" }
    ],
    constraints: [
      "m == grid.length",
      "n == grid[i].length",
      "1 <= m, n <= 300"
    ],
    testCases: [
      { input: "4 5\n1 1 1 1 0\n1 1 0 1 0\n1 1 0 0 0\n0 0 0 0 0", output: "1", hidden: false },
      { input: "4 5\n1 1 0 0 0\n1 1 0 0 0\n0 0 1 0 0\n0 0 0 1 1", output: "3", hidden: false },
      { input: "1 1\n1", output: "1", hidden: false },
      { input: "3 3\n1 0 1\n0 1 0\n1 0 1", output: "5", hidden: true },
      { input: "5 5\n1 1 1 1 1\n1 0 0 0 1\n1 0 1 0 1\n1 0 0 0 1\n1 1 1 1 1", output: "2", hidden: true },
      { input: "2 2\n0 0\n0 0", output: "0", hidden: true },
      { input: "3 4\n1 1 0 0\n0 1 1 0\n0 0 1 1", output: "1", hidden: true },
      { input: "6 6\n1 0 1 0 1 0\n0 1 0 1 0 1\n1 0 1 0 1 0\n0 1 0 1 0 1\n1 0 1 0 1 0\n0 1 0 1 0 1", output: "18", hidden: true },
      { input: "4 4\n1 1 1 1\n1 1 1 1\n1 1 1 1\n1 1 1 1", output: "1", hidden: true },
      { input: "5 6\n1 1 0 0 0 1\n1 0 0 1 0 1\n0 0 1 1 0 0\n0 0 0 0 1 1\n1 1 0 0 1 0", output: "7", hidden: true },
    ],
  },
  23: {
    id: 23,
    title: "Clone Graph",
    difficulty: "Medium",
    topic: "Graphs",
    category: "Graphs",
    description: "Given a reference of a node in a connected undirected graph, return a deep copy (clone) of the graph. Each node in the graph contains a value (int) and a list of its neighbors.",
    examples: [
      { input: "adjList = [[2,4],[1,3],[2,4],[1,3]]", output: "[[2,4],[1,3],[2,4],[1,3]]" },
      { input: "adjList = [[]]", output: "[[]]" }
    ],
    constraints: [
      "The number of nodes in the graph is in the range [0, 100]",
      "1 <= Node.val <= 100"
    ],
    testCases: [
      { input: "4\n2 4\n1 3\n2 4\n1 3", output: "1 2 4\n2 1 3\n3 2 4\n4 1 3", hidden: false },
      { input: "1", output: "1", hidden: false },
      { input: "2\n2\n1", output: "1 2\n2 1", hidden: false },
      { input: "3\n2 3\n1 3\n1 2", output: "1 2 3\n2 1 3\n3 1 2", hidden: true },
      { input: "5\n2 5\n1 3\n2 4\n3 5\n1 4", output: "1 2 5\n2 1 3\n3 2 4\n4 3 5\n5 1 4", hidden: true },
      { input: "6\n2 3\n1 4\n1 5\n2 6\n3 6\n4 5", output: "1 2 3\n2 1 4\n3 1 5\n4 2 6\n5 3 6\n6 4 5", hidden: true },
      { input: "3\n2\n1 3\n2", output: "1 2\n2 1 3\n3 2", hidden: true },
      { input: "7\n2 3\n1 4 5\n1 6\n2 7\n2 7\n3 7\n4 5 6", output: "1 2 3\n2 1 4 5\n3 1 6\n4 2 7\n5 2 7\n6 3 7\n7 4 5 6", hidden: true },
      { input: "4\n2 3 4\n1 3 4\n1 2 4\n1 2 3", output: "1 2 3 4\n2 1 3 4\n3 1 2 4\n4 1 2 3", hidden: true },
      { input: "5\n2\n1 3\n2 4\n3 5\n4", output: "1 2\n2 1 3\n3 2 4\n4 3 5\n5 4", hidden: true },
    ],
  },
  24: {
    id: 24,
    title: "Pacific Atlantic Water Flow",
    difficulty: "Medium",
    topic: "Graphs",
    category: "Graphs",
    description: "There is an m x n rectangular island that borders both the Pacific Ocean and Atlantic Ocean. Given an m x n matrix of non-negative integers representing the height of each unit cell, return a list of grid coordinates where water can flow to both the Pacific and Atlantic oceans.",
    examples: [
      { input: "heights = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]", output: "[[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]" }
    ],
    constraints: [
      "m == heights.length",
      "n == heights[r].length",
      "1 <= m, n <= 200",
      "0 <= heights[r][c] <= 10^5"
    ],
    testCases: [
      { input: "5 5\n1 2 2 3 5\n3 2 3 4 4\n2 4 5 3 1\n6 7 1 4 5\n5 1 1 2 4", output: "0 4\n1 3\n1 4\n2 2\n3 0\n3 1\n4 0", hidden: false },
      { input: "1 1\n5", output: "0 0", hidden: false },
      { input: "3 3\n1 2 3\n4 5 6\n7 8 9", output: "0 2\n1 2\n2 0\n2 1\n2 2", hidden: false },
      { input: "2 2\n1 1\n1 1", output: "0 0\n0 1\n1 0\n1 1", hidden: true },
      { input: "4 4\n10 10 10 10\n10 1 1 10\n10 1 1 10\n10 10 10 10", output: "0 0\n0 1\n0 2\n0 3\n1 0\n1 3\n2 0\n2 3\n3 0\n3 1\n3 2\n3 3", hidden: true },
      { input: "3 4\n1 2 3 4\n2 3 4 5\n3 4 5 6", output: "0 3\n1 2\n1 3\n2 0\n2 1\n2 2\n2 3", hidden: true },
      { input: "2 3\n5 5 5\n5 5 5", output: "0 0\n0 1\n0 2\n1 0\n1 1\n1 2", hidden: true },
      { input: "4 5\n1 1 1 1 1\n1 2 2 2 1\n1 2 3 2 1\n1 1 1 1 1", output: "0 0\n0 1\n0 2\n0 3\n0 4\n1 0\n1 4\n2 0\n2 4\n3 0\n3 1\n3 2\n3 3\n3 4", hidden: true },
      { input: "5 3\n1 2 3\n8 9 4\n7 6 5\n10 11 12\n15 14 13", output: "0 2\n1 0\n1 1\n1 2\n2 0\n2 1\n2 2\n3 0\n3 1\n3 2\n4 0\n4 1\n4 2", hidden: true },
      { input: "3 5\n10 8 6 4 2\n9 7 5 3 1\n8 6 4 2 0", output: "0 0\n0 1\n0 2\n1 0\n2 0", hidden: true },
    ],
  },
};

function getProblem(id) {
  return problems[id] || null;
}

function getAllProblems() {
  return Object.values(problems);
}

function getProblemsByCategory(category) {
  return Object.values(problems).filter(p => p.category === category);
}

module.exports = {
  getProblem,
  getAllProblems,
  getProblemsByCategory,
};
