const axios = require('axios');

// Judge0 API Configuration
// Supports both self-hosted and RapidAPI
const JUDGE0_API_URL = process.env.JUDGE0_API_URL || 'http://localhost:2358';
const JUDGE0_API_KEY = process.env.JUDGE0_API_KEY || '';
const JUDGE0_API_HOST = process.env.JUDGE0_API_HOST || '';

// Determine if using RapidAPI or self-hosted
const isRapidAPI = !!(JUDGE0_API_KEY && JUDGE0_API_HOST);
const isSelfHosted = JUDGE0_API_URL.includes('localhost') || JUDGE0_API_URL.includes('127.0.0.1');

console.log(`[Judge0] Mode: ${isRapidAPI ? 'RapidAPI' : isSelfHosted ? 'Self-Hosted' : 'Custom'}`);
console.log(`[Judge0] URL: ${JUDGE0_API_URL}`);

// Language ID mapping for Judge0
// See: https://ce.judge0.com/#statuses-and-languages-language-get
const LANGUAGE_IDS = {
  python: 71,      // Python 3.8.1
  javascript: 63,  // JavaScript (Node.js 12.14.0)
  java8: 62,       // Java (OpenJDK 13.0.1)
  cpp: 54,         // C++ (GCC 9.2.0)
};

// Status IDs from Judge0
const STATUS = {
  IN_QUEUE: 1,
  PROCESSING: 2,
  ACCEPTED: 3,
  WRONG_ANSWER: 4,
  TIME_LIMIT_EXCEEDED: 5,
  COMPILATION_ERROR: 6,
  RUNTIME_ERROR_SIGSEGV: 7,
  RUNTIME_ERROR_SIGXFSZ: 8,
  RUNTIME_ERROR_SIGFPE: 9,
  RUNTIME_ERROR_SIGABRT: 10,
  RUNTIME_ERROR_NZEC: 11,
  RUNTIME_ERROR_OTHER: 12,
  INTERNAL_ERROR: 13,
  EXEC_FORMAT_ERROR: 14,
};

/**
 * Submit code to Judge0 for execution
 * @param {string} code - Source code to execute
 * @param {string} language - Language (python, javascript, java8, cpp)
 * @param {string} input - Input to provide via stdin
 * @returns {Promise<Object>} Submission token
 */
async function submitCode(code, language, input = '') {
  const languageId = LANGUAGE_IDS[language];
  
  if (!languageId) {
    throw new Error(`Unsupported language: ${language}`);
  }

  try {
    console.log(`[Judge0] Submitting code - Language: ${language} (ID: ${languageId})`);
    
    // Build headers based on mode
    const headers = {
      'Content-Type': 'application/json',
    };
    
    // Add RapidAPI headers only if using RapidAPI
    if (isRapidAPI) {
      headers['X-RapidAPI-Key'] = JUDGE0_API_KEY;
      headers['X-RapidAPI-Host'] = JUDGE0_API_HOST;
    }
    
    const response = await axios.post(
      `${JUDGE0_API_URL}/submissions?base64_encoded=false&wait=false`,
      {
        source_code: code,
        language_id: languageId,
        stdin: input,
        cpu_time_limit: 10,      // 10 seconds
        memory_limit: 256000,    // 256 MB
        wall_time_limit: 15,     // 15 seconds wall time
      },
      { headers }
    );

    console.log(`[Judge0] Submission created - Token: ${response.data.token}`);
    return response.data;
  } catch (error) {
    console.error('[Judge0] Submission error:', error.response?.data || error.message);
    throw new Error(`Failed to submit code: ${error.message}`);
  }
}

/**
 * Get submission result from Judge0
 * @param {string} token - Submission token
 * @returns {Promise<Object>} Submission result
 */
async function getSubmission(token) {
  try {
    const headers = {
      'Content-Type': 'application/json',
    };
    
    // Add RapidAPI headers only if using RapidAPI
    if (isRapidAPI) {
      headers['X-RapidAPI-Key'] = JUDGE0_API_KEY;
      headers['X-RapidAPI-Host'] = JUDGE0_API_HOST;
    }
    
    const response = await axios.get(
      `${JUDGE0_API_URL}/submissions/${token}?base64_encoded=false`,
      { headers }
    );

    return response.data;
  } catch (error) {
    console.error('[Judge0] Get submission error:', error.response?.data || error.message);
    throw new Error(`Failed to get submission: ${error.message}`);
  }
}

/**
 * Wait for submission to complete
 * @param {string} token - Submission token
 * @param {number} maxAttempts - Maximum polling attempts
 * @param {number} interval - Polling interval in ms
 * @returns {Promise<Object>} Final submission result
 */
async function waitForSubmission(token, maxAttempts = 30, interval = 1000) {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const submission = await getSubmission(token);
    
    // Check if processing is complete
    if (submission.status.id > 2) {
      console.log(`[Judge0] Submission complete - Status: ${submission.status.description}`);
      return submission;
    }

    console.log(`[Judge0] Waiting for submission... (${attempt + 1}/${maxAttempts})`);
    await new Promise(resolve => setTimeout(resolve, interval));
  }

  throw new Error('Submission timeout - took too long to process');
}

/**
 * Execute code using Judge0
 * @param {string} code - Source code
 * @param {string} language - Language
 * @param {string} input - Input via stdin
 * @returns {Promise<Object>} Execution result
 */
async function executeCode(code, language, input = '') {
  try {
    // Submit code
    const submission = await submitCode(code, language, input);
    
    // Wait for result
    const result = await waitForSubmission(submission.token);
    
    // Parse result
    return parseSubmissionResult(result);
  } catch (error) {
    console.error('[Judge0] Execute error:', error.message);
    return {
      success: false,
      error: 'Execution Failed',
      details: error.message,
    };
  }
}

/**
 * Parse Judge0 submission result
 * @param {Object} submission - Judge0 submission object
 * @returns {Object} Parsed result
 */
function parseSubmissionResult(submission) {
  const statusId = submission.status.id;
  
  // Accepted (success)
  if (statusId === STATUS.ACCEPTED) {
    return {
      success: true,
      output: submission.stdout || '',
      error: submission.stderr || null,
      time: submission.time,
      memory: submission.memory,
    };
  }
  
  // Compilation Error
  if (statusId === STATUS.COMPILATION_ERROR) {
    return {
      success: false,
      error: 'Compilation Error',
      details: submission.compile_output || 'Unknown compilation error',
      output: null,
    };
  }
  
  // Time Limit Exceeded
  if (statusId === STATUS.TIME_LIMIT_EXCEEDED) {
    return {
      success: false,
      error: 'Time Limit Exceeded',
      details: 'Code execution took longer than 10 seconds',
      output: submission.stdout || null,
    };
  }
  
  // Runtime Errors
  if (statusId >= STATUS.RUNTIME_ERROR_SIGSEGV && statusId <= STATUS.RUNTIME_ERROR_OTHER) {
    return {
      success: false,
      error: 'Runtime Error',
      details: submission.stderr || submission.status.description,
      output: submission.stdout || null,
    };
  }
  
  // Wrong Answer (shouldn't happen in execute, only in judge)
  if (statusId === STATUS.WRONG_ANSWER) {
    return {
      success: true,
      output: submission.stdout || '',
      error: submission.stderr || null,
      time: submission.time,
      memory: submission.memory,
    };
  }
  
  // Other errors
  return {
    success: false,
    error: submission.status.description,
    details: submission.stderr || 'Unknown error',
    output: submission.stdout || null,
  };
}

/**
 * Normalize output for comparison
 * @param {string} output - Output string
 * @returns {string} Normalized output
 */
function normalizeOutput(output) {
  if (!output) return '';
  
  return output
    .trim()
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .replace(/\s+$/gm, '')
    .replace(/\n+$/, '')
    .replace(/^\n+/, '');
}

/**
 * Run code against multiple test cases
 * @param {string} code - Source code
 * @param {string} language - Language
 * @param {Array} testCases - Array of {input, output} objects
 * @returns {Promise<Object>} Test results
 */
async function runTestCases(code, language, testCases, onProgress = null) {
  const results = new Array(testCases.length);
  const batchSize = 5;

  for (let i = 0; i < testCases.length; i += batchSize) {
    const batch = testCases.slice(i, i + batchSize);
    
    const promises = batch.map(async (testCase, index) => {
      const globalIndex = i + index;
      console.log(`[Judge0] Running test case ${globalIndex + 1}/${testCases.length}`);
      
      const result = await executeCode(code, language, testCase.input);

      let testCaseResult;
      if (!result.success) {
        testCaseResult = {
          testCase: globalIndex + 1,
          passed: false,
          input: testCase.input,
          expectedOutput: testCase.output,
          actualOutput: null,
          error: result.error,
          details: result.details,
          time: result.time,
          memory: result.memory,
        };
      } else {
        // Normalize and compare outputs
        const normalizedActual = normalizeOutput(result.output);
        const normalizedExpected = normalizeOutput(testCase.output);
        const passed = normalizedActual === normalizedExpected;
        
        testCaseResult = {
          testCase: globalIndex + 1,
          passed,
          input: testCase.input,
          expectedOutput: testCase.output,
          actualOutput: result.output,
          normalizedActual,
          normalizedExpected,
          error: null,
          time: result.time,
          memory: result.memory,
        };
      }
      
      results[globalIndex] = testCaseResult;
    });

    await Promise.all(promises);

    if (typeof onProgress === 'function') {
      const completedCount = Math.min(i + batchSize, testCases.length);
      onProgress(completedCount, testCases.length);
    }
  }

  const allPassed = results.every((r) => r.passed);
  const passedCount = results.filter((r) => r.passed).length;

  return {
    allPassed,
    passedCount,
    totalCount: testCases.length,
    results,
  };
}

/**
 * Check if Judge0 is configured
 * @returns {boolean} True if configured
 */
function isConfigured() {
  // Self-hosted is always considered configured if URL is localhost
  if (isSelfHosted) {
    return true;
  }
  // RapidAPI requires API key
  return !!(JUDGE0_API_KEY && JUDGE0_API_URL);
}

module.exports = {
  executeCode,
  runTestCases,
  isConfigured,
  LANGUAGE_IDS,
};
