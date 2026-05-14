import { useState, useEffect } from "react";
import { runCode, submitCode, markProblemSolved, updateTimeSpent } from "../services/api";
import { getProblemById } from "../data/problems";
import Editor from "@monaco-editor/react";

// Mock test data - in real app, this would come from props
const MOCK_TEST = {
  id: 1,
  title: "Arrays & Hashing Fundamentals",
  problemIds: [1, 2, 3],
};

const STARTER_CODE = {
  java8: `import java.util.Scanner;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        // Enter your code here
    }
}`,
  python: `# Enter your code here
`,
  cpp: `#include <iostream>
using namespace std;

int main() {
    // Enter your code here
    return 0;
}`,
  javascript: `const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on('line', (input) => {
    // Enter your code here
    rl.close();
});`,
};

export default function ProblemView({ onBack, test }) {
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("description");
  const [language, setLanguage] = useState("python");
  const [code, setCode] = useState(STARTER_CODE.python);
  const [consoleOpen, setConsoleOpen] = useState(false);
  const [consoleOutput, setConsoleOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [customInput, setCustomInput] = useState("");
  const [submissionResult, setSubmissionResult] = useState(null);
  const [consoleHeight, setConsoleHeight] = useState(200);
  const [isResizing, setIsResizing] = useState(false);
  const [solvedProblems, setSolvedProblems] = useState(new Set());
  const [showExitWarning, setShowExitWarning] = useState(false);
  
  // Timer state - countdown from 60 minutes (3600 seconds)
  const [timeRemaining, setTimeRemaining] = useState(3600); // 60 minutes in seconds
  const [isTestComplete, setIsTestComplete] = useState(false);

  // Use the passed test or fallback to mock data
  const currentTest = test || MOCK_TEST;

  // Get current problem
  const currentProblemId = currentTest.problemIds[currentProblemIndex];
  const currentProblem = getProblemById(currentProblemId);

  // Timer effect - countdown every second
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          // Time's up! Auto-exit
          clearInterval(timer);
          alert("Time's up! The test will now end.");
          onBack();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onBack]);

  // Check if test is complete (all problems solved)
  useEffect(() => {
    const allSolved = currentTest.problemIds.every(id => solvedProblems.has(id));
    setIsTestComplete(allSolved);
  }, [solvedProblems, currentTest.problemIds]);

  // Format time as HH:MM:SS
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Handle back button with warning if test not complete
  const handleBackClick = () => {
    if (!isTestComplete) {
      setShowExitWarning(true);
    } else {
      onBack();
    }
  };

  // Confirm exit
  const confirmExit = () => {
    setShowExitWarning(false);
    onBack();
  };

  // Cancel exit
  const cancelExit = () => {
    setShowExitWarning(false);
  };

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setLanguage(newLang);
    setCode(STARTER_CODE[newLang]);
  };

  const handleProblemChange = (index) => {
    setCurrentProblemIndex(index);
    setActiveTab("description");
    setSubmissionResult(null);
    setConsoleOutput("");
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    setConsoleOpen(true);
    setConsoleOutput("Running code...\n");

    try {
      const result = await runCode(code, language, customInput);
      
      if (result.success) {
        setConsoleOutput(`Output:\n${result.output || "(no output)"}`);
      } else {
        setConsoleOutput(`${result.error}:\n${result.details || ""}`);
      }
    } catch (error) {
      setConsoleOutput(`Error: ${error.message}`);
    } finally {
      setIsRunning(false);
    }
  };

  const handleSubmitCode = async () => {
    setIsSubmitting(true);
    setConsoleOpen(true);
    setConsoleOutput("Submitting code...\n");

    try {
      const result = await submitCode(code, language, currentProblemId);
      
      if (result.success) {
        setSubmissionResult(result);
        setActiveTab("submissions");
        
        // Mark as solved if all tests pass
        if (result.allPassed) {
          setSolvedProblems(prev => new Set([...prev, currentProblemId]));
          
          // Update backend progress
          try {
            await markProblemSolved(currentProblemId);
            await updateTimeSpent(); // Update time when problem is solved
          } catch (error) {
            console.error("Failed to update progress:", error);
          }
        }
        
        let output = `Submission Result:\n`;
        output += `Passed: ${result.passedCount}/${result.totalCount} test cases\n\n`;
        
        result.results.forEach((r) => {
          output += `Test Case ${r.testCase}: ${r.passed ? "✓ PASSED" : "✗ FAILED"}\n`;
          if (!r.passed) {
            // Only show error message, not the actual input/output to prevent bypassing
            if (r.error) {
              output += `  Error: ${r.error}\n`;
            } else {
              output += `  Your output doesn't match the expected output.\n`;
            }
          }
        });
        
        setConsoleOutput(output);
      } else {
        setConsoleOutput(`Submission failed: ${result.error}`);
      }
    } catch (error) {
      setConsoleOutput(`Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetCode = () => {
    setCode(STARTER_CODE[language]);
    setConsoleOutput("");
    setSubmissionResult(null);
  };

  // Handle console resize
  const handleMouseDown = (e) => {
    setIsResizing(true);
    e.preventDefault();
  };

  // Add/remove mouse event listeners
  useEffect(() => {
    if (isResizing) {
      const handleMove = (e) => {
        const editorPanel = document.querySelector('.problem-right');
        if (!editorPanel) return;
        
        const rect = editorPanel.getBoundingClientRect();
        const newHeight = rect.bottom - e.clientY;
        
        // Constrain between 100px and 500px
        if (newHeight >= 100 && newHeight <= 500) {
          setConsoleHeight(newHeight);
        }
      };

      const handleUp = () => {
        setIsResizing(false);
      };

      document.addEventListener('mousemove', handleMove);
      document.addEventListener('mouseup', handleUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMove);
        document.removeEventListener('mouseup', handleUp);
      };
    }
  }, [isResizing]);

  return (
    <div className="problem-view">
      {/* Exit Warning Modal */}
      {showExitWarning && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <h2>Exit Test?</h2>
            </div>
            <div className="modal-body">
              <p>You haven't completed all problems yet.</p>
              <p>Progress: {solvedProblems.size}/{currentTest.problemIds.length} problems solved</p>
              <p>Time remaining: {formatTime(timeRemaining)}</p>
              <p className="warning-text">Are you sure you want to exit? Your progress will be saved but you won't be able to resume this test.</p>
            </div>
            <div className="modal-actions">
              <button className="btn-secondary" onClick={cancelExit}>
                Continue Test
              </button>
              <button className="btn-danger" onClick={confirmExit}>
                Exit Anyway
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="problem-header">
        <button className="back-btn" onClick={handleBackClick} title={isTestComplete ? "Back to Dashboard" : "Exit Test (Warning)"}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
        </button>
        <h1 className="problem-title">{currentProblem?.title || "Loading..."}</h1>
        
        {/* Timer Display */}
        <div className={`timer-display ${timeRemaining <= 300 ? 'timer-warning' : ''} ${timeRemaining <= 60 ? 'timer-critical' : ''}`}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          <span className="timer-text">{formatTime(timeRemaining)}</span>
        </div>
        
        <div className="problem-meta-badges">
          <span className={`badge ${currentProblem?.difficulty.toLowerCase()}`}>
            {currentProblem?.difficulty}
          </span>
        </div>
      </div>

      {/* Split View */}
      <div className="problem-split">
        {/* Left Panel - Description */}
        <div className="problem-left">
          {/* Q1, Q2, Q3 Navigation */}
          <div className="problem-nav">
            {currentTest.problemIds.map((problemId, index) => {
              const isActive = index === currentProblemIndex;
              const isSolved = solvedProblems.has(problemId);
              
              return (
                <button
                  key={problemId}
                  className={`problem-nav-btn ${isActive ? 'active' : ''} ${isSolved ? 'solved' : ''}`}
                  onClick={() => handleProblemChange(index)}
                >
                  <span className="problem-nav-label">Q{index + 1}</span>
                  {isSolved && (
                    <svg className="solved-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </button>
              );
            })}
          </div>

          <div className="tabs">
            <button
              className={`tab ${activeTab === "description" ? "active" : ""}`}
              onClick={() => setActiveTab("description")}
            >
              Description
            </button>
            <button
              className={`tab ${activeTab === "submissions" ? "active" : ""}`}
              onClick={() => setActiveTab("submissions")}
            >
              Submissions
            </button>
            <button
              className={`tab ${activeTab === "editorial" ? "active" : ""}`}
              onClick={() => setActiveTab("editorial")}
            >
              Editorial
            </button>
          </div>

          <div className="tab-content">
            {activeTab === "description" && currentProblem && (
              <div className="description-content">
                <h2>{currentProblem.title}</h2>
                <p className="problem-desc">{currentProblem.description}</p>

                {currentProblem.constraints && (
                  <div className="constraints-section">
                    <h3>CONSTRAINTS</h3>
                    <ul>
                      {currentProblem.constraints.map((constraint, idx) => (
                        <li key={idx}>{constraint}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {currentProblem.examples && currentProblem.examples.length > 0 && (
                  <div className="examples-section">
                    <h3>EXAMPLES</h3>
                    {currentProblem.examples.map((example, idx) => (
                      <div key={idx} className="example-item">
                        <div className="example-header">Example {idx + 1}:</div>
                        <div className="example-box">
                          <div className="example-label">Input:</div>
                          <code className="example-code">{example.input}</code>
                        </div>
                        <div className="example-box">
                          <div className="example-label">Output:</div>
                          <code className="example-code">{example.output}</code>
                        </div>
                        {example.explanation && (
                          <div className="example-explanation">
                            <strong>Explanation:</strong> {example.explanation}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                <div className="problem-meta-info">
                  <span className="meta-item">
                    <strong>Difficulty:</strong> {currentProblem.difficulty}
                  </span>
                  <span className="meta-item">
                    <strong>Category:</strong> {currentProblem.category}
                  </span>
                  <span className="meta-item">
                    <strong>Topic:</strong> {currentProblem.topic}
                  </span>
                </div>
              </div>
            )}

            {activeTab === "submissions" && (
              <div className="submissions-content">
                {submissionResult ? (
                  <div className="submission-summary">
                    <h2>Latest Submission</h2>
                    <div className={`result-badge ${submissionResult.allPassed ? "success" : "failed"}`}>
                      {submissionResult.allPassed ? "✓ All Tests Passed" : "✗ Some Tests Failed"}
                    </div>
                    <div className="result-stats">
                      <span>Passed: {submissionResult.passedCount}/{submissionResult.totalCount}</span>
                      <span className="hidden-tests-note">
                        (Includes hidden test cases)
                      </span>
                    </div>
                    <div className="test-results">
                      {submissionResult.results.map((result, idx) => (
                        <div key={idx} className={`test-result ${result.passed ? "passed" : "failed"}`}>
                          <div className="test-result-header">
                            <span className="test-number">Test Case {result.testCase}</span>
                            <span className={`test-status ${result.passed ? "passed" : "failed"}`}>
                              {result.passed ? "✓ PASSED" : "✗ FAILED"}
                            </span>
                          </div>
                          {!result.passed && (
                            <div className="test-result-details">
                              {result.error ? (
                                <div className="error-message">
                                  <strong>Error:</strong> <code>{result.error}</code>
                                  {result.details && <div className="error-details">{result.details}</div>}
                                </div>
                              ) : (
                                <div className="failure-message">
                                  <p>❌ Wrong Answer</p>
                                  <p className="hint">
                                    Your output doesn't match the expected output. 
                                    Test cases are hidden to prevent hardcoding solutions.
                                  </p>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="submission-note">
                      <strong>Note:</strong> Your code is tested against multiple test cases, including hidden ones that you cannot see. 
                      This ensures you implement the actual logic rather than hardcoding outputs.
                    </div>
                  </div>
                ) : (
                  <div className="empty-state">
                    <p>No submissions yet. Submit your code to see results here.</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === "editorial" && (
              <div className="empty-state">
                <p>Editorial will be available after you solve the problem.</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Panel - Code Editor */}
        <div className="problem-right">
          <div className="editor-header">
            <select
              className="language-select"
              value={language}
              onChange={handleLanguageChange}
            >
              <option value="java8">Java 8</option>
              <option value="python">Python 3</option>
              <option value="cpp">C++</option>
              <option value="javascript">JavaScript</option>
            </select>
            <button className="settings-btn" aria-label="Settings">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
            </button>
            <button className="reset-btn" onClick={handleResetCode}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="1 4 1 10 7 10" />
                <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
              </svg>
              Reset Code
            </button>
          </div>

          <div className="code-editor">
            <Editor
              height="100%"
              language={language === 'java8' ? 'java' : language}
              value={code}
              onChange={(value) => setCode(value || "")}
              theme="vs-dark"
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: "on",
                roundedSelection: false,
                scrollBeyondLastLine: false,
                automaticLayout: true,
                tabSize: language === 'python' ? 4 : 2,
                insertSpaces: true,
                wordWrap: "on",
                formatOnPaste: true,
                formatOnType: true,
                autoIndent: "full",
                quickSuggestions: true,
                suggestOnTriggerCharacters: true,
                acceptSuggestionOnEnter: "on",
                snippetSuggestions: "inline",
              }}
            />
          </div>

          <div className="editor-footer">
            <button
              className="console-toggle"
              onClick={() => setConsoleOpen(!consoleOpen)}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {consoleOpen ? (
                  <polyline points="18 15 12 9 6 15" />
                ) : (
                  <polyline points="6 9 12 15 18 9" />
                )}
              </svg>
              Console
            </button>
            <div className="editor-actions">
              <button 
                className="run-btn" 
                onClick={handleRunCode}
                disabled={isRunning}
              >
                {isRunning ? "Running..." : "Run Code"}
              </button>
              <button 
                className="submit-btn" 
                onClick={handleSubmitCode}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Code"}
              </button>
            </div>
          </div>

          {consoleOpen && (
            <div className="console-panel" style={{ height: `${consoleHeight}px` }}>
              <div 
                className="console-resize-handle" 
                onMouseDown={handleMouseDown}
                title="Drag to resize"
              >
                <div className="resize-handle-bar"></div>
              </div>
              <div className="console-header">
                <span>Output</span>
                <button 
                  className="console-clear"
                  onClick={() => setConsoleOutput("")}
                >
                  Clear
                </button>
              </div>
              <div className="console-input-section">
                <label>Custom Input (optional):</label>
                <textarea
                  className="console-input"
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                  placeholder="Enter custom input here..."
                  rows="3"
                />
              </div>
              <div className="console-content">
                <pre className="console-output">{consoleOutput || "Output will appear here..."}</pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
