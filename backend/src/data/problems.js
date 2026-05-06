// DSA Problems — IDs match the frontend's Blind 75 problem IDs exactly
const problems = {

  // ── Arrays ──────────────────────────────────────────────────────────────────
  1: {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    topic: "Arrays",
    category: "Array",
    testCases: [
      { input: "4\n2 7 11 15\n9",  output: "0 1" },
      { input: "3\n3 2 4\n6",      output: "1 2" },
      { input: "2\n3 3\n6",        output: "0 1" },
    ],
  },
  2: {
    id: 2,
    title: "Best Time to Buy and Sell Stock",
    difficulty: "Easy",
    topic: "Arrays",
    category: "Array",
    testCases: [
      { input: "6\n7 1 5 3 6 4", output: "5" },
      { input: "5\n7 6 4 3 1",   output: "0" },
      { input: "3\n1 2 3",        output: "2" },
    ],
  },
  3: {
    id: 3,
    title: "Contains Duplicate",
    difficulty: "Easy",
    topic: "Arrays",
    category: "Array",
    testCases: [
      { input: "4\n1 2 3 1",          output: "true"  },
      { input: "4\n1 2 3 4",          output: "false" },
      { input: "10\n1 1 1 3 3 4 3 2 4 2", output: "true"  },
    ],
  },
  4: {
    id: 4,
    title: "Product of Array Except Self",
    difficulty: "Medium",
    topic: "Arrays",
    category: "Array",
    testCases: [
      { input: "4\n1 2 3 4",      output: "24 12 8 6" },
      { input: "5\n-1 1 0 -3 3",  output: "0 0 9 0 0" },
    ],
  },
  7: {
    id: 7,
    title: "Find Minimum in Rotated Sorted Array",
    difficulty: "Medium",
    topic: "Arrays",
    category: "Array",
    testCases: [
      { input: "5\n3 4 5 1 2",      output: "1"  },
      { input: "7\n4 5 6 7 0 1 2",  output: "0"  },
      { input: "1\n11",             output: "11" },
    ],
  },
  8: {
    id: 8,
    title: "Search in Rotated Sorted Array",
    difficulty: "Medium",
    topic: "Arrays",
    category: "Array",
    testCases: [
      { input: "7\n4 5 6 7 0 1 2\n0", output: "4"  },
      { input: "7\n4 5 6 7 0 1 2\n3", output: "-1" },
      { input: "1\n1\n0",             output: "-1" },
    ],
  },
  9: {
    id: 9,
    title: "3Sum",
    difficulty: "Medium",
    topic: "Arrays",
    category: "Array",
    testCases: [
      { input: "6\n-1 0 1 2 -1 -4", output: "-1 -1 2\n-1 0 1" },
      { input: "3\n0 1 1",          output: ""              },
      { input: "3\n0 0 0",          output: "0 0 0"         },
    ],
  },
  10: {
    id: 10,
    title: "Container With Most Water",
    difficulty: "Medium",
    topic: "Arrays",
    category: "Array",
    testCases: [
      { input: "9\n1 8 6 2 5 4 8 3 7", output: "49" },
      { input: "2\n1 1",               output: "1"  },
    ],
  },

  // ── Dynamic Programming ─────────────────────────────────────────────────────
  16: {
    id: 16,
    title: "Climbing Stairs",
    difficulty: "Easy",
    topic: "Dynamic Programming",
    category: "Dynamic Programming",
    testCases: [
      { input: "2", output: "2" },
      { input: "3", output: "3" },
      { input: "5", output: "8" },
    ],
  },
  17: {
    id: 17,
    title: "Coin Change",
    difficulty: "Medium",
    topic: "Dynamic Programming",
    category: "Dynamic Programming",
    testCases: [
      { input: "3\n1 2 5\n11", output: "3"  },
      { input: "1\n2\n3",      output: "-1" },
      { input: "1\n1\n0",      output: "0"  },
    ],
  },
  18: {
    id: 18,
    title: "Longest Increasing Subsequence",
    difficulty: "Medium",
    topic: "Dynamic Programming",
    category: "Dynamic Programming",
    testCases: [
      { input: "8\n10 9 2 5 3 7 101 18", output: "4" },
      { input: "6\n0 1 0 3 2 3",         output: "4" },
      { input: "1\n7",                   output: "1" },
    ],
  },

  // ── Graphs ──────────────────────────────────────────────────────────────────
  27: {
    id: 27,
    title: "Clone Graph",
    difficulty: "Medium",
    topic: "Graphs",
    category: "Graph",
    testCases: [
      { input: "4\n2 4\n1 3\n2 4\n1 3", output: "1 2 4\n2 1 3\n3 2 4\n4 1 3" },
      { input: "1",                      output: "1"                            },
    ],
  },
  29: {
    id: 29,
    title: "Pacific Atlantic Water Flow",
    difficulty: "Medium",
    topic: "Graphs",
    category: "Graph",
    testCases: [
      {
        input:  "5 5\n1 2 2 3 5\n3 2 3 4 4\n2 4 5 3 1\n6 7 1 4 5\n5 1 1 2 4",
        output: "0 4\n1 3\n1 4\n2 2\n3 0\n3 1\n4 0",
      },
    ],
  },
  30: {
    id: 30,
    title: "Number of Islands",
    difficulty: "Medium",
    topic: "Graphs",
    category: "Graph",
    testCases: [
      { input: "4 5\n1 1 1 1 0\n1 1 0 1 0\n1 1 0 0 0\n0 0 0 0 0", output: "1" },
      { input: "4 5\n1 1 0 0 0\n1 1 0 0 0\n0 0 1 0 0\n0 0 0 1 1", output: "3" },
    ],
  },

  // ── Linked Lists ────────────────────────────────────────────────────────────
  40: {
    id: 40,
    title: "Reverse Linked List",
    difficulty: "Easy",
    topic: "Linked Lists",
    category: "Linked List",
    testCases: [
      { input: "5\n1 2 3 4 5", output: "5 4 3 2 1" },
      { input: "2\n1 2",       output: "2 1"       },
      { input: "1\n1",         output: "1"         },
    ],
  },
  41: {
    id: 41,
    title: "Linked List Cycle",
    difficulty: "Easy",
    topic: "Linked Lists",
    category: "Linked List",
    testCases: [
      { input: "4\n3 2 0 -4\n1",  output: "true"  },
      { input: "2\n1 2\n0",       output: "true"  },
      { input: "1\n1\n-1",        output: "false" },
    ],
  },
  42: {
    id: 42,
    title: "Merge Two Sorted Lists",
    difficulty: "Easy",
    topic: "Linked Lists",
    category: "Linked List",
    testCases: [
      { input: "3\n1 2 4\n3\n1 3 4", output: "1 1 2 3 4 4" },
      { input: "0\n0\n0",            output: ""            },
      { input: "0\n1\n1\n0",         output: "0"           },
    ],
  },

  // ── Strings ─────────────────────────────────────────────────────────────────
  50: {
    id: 50,
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    topic: "Strings",
    category: "String",
    testCases: [
      { input: "abcabcbb", output: "3" },
      { input: "bbbbb",    output: "1" },
      { input: "pwwkew",   output: "3" },
    ],
  },
  52: {
    id: 52,
    title: "Minimum Window Substring",
    difficulty: "Hard",
    topic: "Strings",
    category: "String",
    testCases: [
      { input: "ADOBECODEBANC\nABC", output: "BANC" },
      { input: "a\na",              output: "a"    },
      { input: "a\naa",             output: ""     },
    ],
  },
  56: {
    id: 56,
    title: "Valid Palindrome",
    difficulty: "Easy",
    topic: "Strings",
    category: "String",
    testCases: [
      { input: "A man, a plan, a canal: Panama", output: "true"  },
      { input: "race a car",                    output: "false" },
      { input: " ",                             output: "true"  },
    ],
  },

  // ── Trees ───────────────────────────────────────────────────────────────────
  60: {
    id: 60,
    title: "Maximum Depth of Binary Tree",
    difficulty: "Easy",
    topic: "Trees",
    category: "Tree",
    testCases: [
      { input: "7\n3 9 20 -1 -1 15 7", output: "3" },
      { input: "2\n1 -1 2",            output: "2" },
    ],
  },
  61: {
    id: 61,
    title: "Same Tree",
    difficulty: "Easy",
    topic: "Trees",
    category: "Tree",
    testCases: [
      { input: "3\n1 2 3\n3\n1 2 3",    output: "true"  },
      { input: "2\n1 2\n2\n1 -1 2",     output: "false" },
    ],
  },
  62: {
    id: 62,
    title: "Invert Binary Tree",
    difficulty: "Easy",
    topic: "Trees",
    category: "Tree",
    testCases: [
      { input: "7\n4 2 7 1 3 6 9", output: "4 7 2 9 6 3 1" },
      { input: "3\n2 1 3",         output: "2 3 1"         },
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
