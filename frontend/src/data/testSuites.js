// Test suites - each test has 3 problems with mixed topics
export const getStriverTests = () => {
  return [
    {
      id: 1,
      title: "Fundamentals Mix",
      topic: "Mixed",
      difficulty: "Easy",
      description: "Start with essential problems: arrays, strings, and linked lists basics.",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80",
      problemIds: [1, 50, 40], // Two Sum, Longest Substring, Reverse Linked List
      problemCount: 3,
    },
    {
      id: 2,
      title: "Array Techniques",
      topic: "Arrays",
      difficulty: "Easy",
      description: "Master array manipulation: duplicates, products, and stock trading.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
      problemIds: [2, 3, 4], // Best Time to Buy Stock, Contains Duplicate, Product of Array
      problemCount: 3,
    },
    {
      id: 3,
      title: "Dynamic Programming Intro",
      topic: "Dynamic Programming",
      difficulty: "Medium",
      description: "Learn DP fundamentals: climbing stairs, coin change, and house robber.",
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&q=80",
      problemIds: [16, 17, 22], // Climbing Stairs, Coin Change, House Robber
      problemCount: 3,
    },
    {
      id: 4,
      title: "Tree Traversal",
      topic: "Trees",
      difficulty: "Easy",
      description: "Understand binary trees: depth, inversion, and validation.",
      image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=600&q=80",
      problemIds: [60, 62, 68], // Max Depth, Invert Tree, Validate BST
      problemCount: 3,
    },
    {
      id: 5,
      title: "Graph Essentials",
      topic: "Graphs",
      difficulty: "Medium",
      description: "Master graph algorithms: islands, cloning, and course scheduling.",
      image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=600&q=80",
      problemIds: [30, 27, 28], // Number of Islands, Clone Graph, Course Schedule
      problemCount: 3,
    },
    {
      id: 6,
      title: "String Patterns",
      topic: "Strings",
      difficulty: "Medium",
      description: "Solve string problems: anagrams, palindromes, and parentheses.",
      image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=600&q=80",
      problemIds: [53, 56, 55], // Valid Anagram, Valid Palindrome, Valid Parentheses
      problemCount: 3,
    },
    {
      id: 7,
      title: "Advanced Arrays",
      topic: "Arrays",
      difficulty: "Medium",
      description: "Tackle complex array problems: subarrays, 3Sum, and container.",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80",
      problemIds: [5, 9, 10], // Maximum Subarray, 3Sum, Container With Most Water
      problemCount: 3,
    },
    {
      id: 8,
      title: "Linked List Advanced",
      topic: "Linked Lists",
      difficulty: "Medium",
      description: "Master linked lists: cycles, merging, and reordering.",
      image: "https://images.unsplash.com/photo-1545987796-200677ee1011?w=600&q=80",
      problemIds: [41, 42, 43], // Linked List Cycle, Merge Two Lists, Merge K Lists
      problemCount: 3,
    },
    {
      id: 9,
      title: "Binary Search Mastery",
      topic: "Binary Search",
      difficulty: "Medium",
      description: "Apply binary search: rotated arrays and search techniques.",
      image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=600&q=80",
      problemIds: [7, 8, 14], // Find Min in Rotated, Search in Rotated, Missing Number
      problemCount: 3,
    },
    {
      id: 10,
      title: "Matrix Operations",
      topic: "Matrix",
      difficulty: "Medium",
      description: "Work with 2D arrays: spiral, rotation, and word search.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
      problemIds: [46, 47, 48], // Set Matrix Zeroes, Spiral Matrix, Rotate Image
      problemCount: 3,
    },
    {
      id: 11,
      title: "Bit Manipulation",
      topic: "Binary",
      difficulty: "Easy",
      description: "Master bit operations: counting bits, sum, and reverse.",
      image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=600&q=80",
      problemIds: [11, 12, 13], // Sum of Two Integers, Number of 1 Bits, Counting Bits
      problemCount: 3,
    },
    {
      id: 12,
      title: "Interval Problems",
      topic: "Intervals",
      difficulty: "Medium",
      description: "Handle intervals: merging, inserting, and non-overlapping.",
      image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=600&q=80",
      problemIds: [35, 36, 37], // Insert Interval, Merge Intervals, Non-overlapping
      problemCount: 3,
    },
    {
      id: 13,
      title: "DP Advanced",
      topic: "Dynamic Programming",
      difficulty: "Hard",
      description: "Advanced DP: word break, combination sum, and unique paths.",
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&q=80",
      problemIds: [20, 21, 25], // Word Break, Combination Sum, Unique Paths
      problemCount: 3,
    },
    {
      id: 14,
      title: "Tree Advanced",
      topic: "Trees",
      difficulty: "Hard",
      description: "Complex tree problems: serialization, path sum, and construction.",
      image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=600&q=80",
      problemIds: [63, 64, 65], // Binary Tree Max Path Sum, Level Order, Serialize
      problemCount: 3,
    },
    {
      id: 15,
      title: "String Advanced",
      topic: "Strings",
      difficulty: "Hard",
      description: "Challenging strings: minimum window, palindromes, and encoding.",
      image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=600&q=80",
      problemIds: [52, 57, 54], // Minimum Window, Longest Palindrome, Group Anagrams
      problemCount: 3,
    },
    {
      id: 16,
      title: "Heap & Priority Queue",
      topic: "Heap",
      difficulty: "Medium",
      description: "Use heaps effectively: top K elements and median finding.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
      problemIds: [74, 75, 43], // Top K Frequent, Find Median, Merge K Lists
      problemCount: 3,
    },
    {
      id: 17,
      title: "Graph Advanced",
      topic: "Graphs",
      difficulty: "Hard",
      description: "Advanced graphs: water flow, longest sequence, and alien dictionary.",
      image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=600&q=80",
      problemIds: [29, 31, 28], // Pacific Atlantic, Longest Consecutive, Course Schedule
      problemCount: 3,
    },
    {
      id: 18,
      title: "Mixed Challenge",
      topic: "Mixed",
      difficulty: "Hard",
      description: "Final challenge: mix of hard problems across all topics.",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80",
      problemIds: [6, 49, 26], // Maximum Product Subarray, Word Search, Jump Game
      problemCount: 3,
    },
  ];
};
