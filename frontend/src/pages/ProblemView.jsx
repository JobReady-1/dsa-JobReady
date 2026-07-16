import { useState, useEffect } from "react";
import { runCode, submitCode, markProblemSolved, updateTimeSpent, getProblem, saveDraft, getDraft, getSubmissionStatus } from "../services/api";
import { getProblemById } from "../data/problems";
import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import { javascript } from "@codemirror/lang-javascript";
import { java } from "@codemirror/lang-java";
import { cpp } from "@codemirror/lang-cpp";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";

const EDITOR_LANGS = {
  python: python(),
  javascript: javascript(),
  java8: java(),
  cpp: cpp(),
};

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
  const [pasteWarning, setPasteWarning] = useState(false);
  const [serverProblem, setServerProblem] = useState(null);
  const [revealedHints, setRevealedHints] = useState(0);

  // Use the passed test or fallback to mock data
  const currentTest = test || MOCK_TEST;

  // Get current problem — prefer full server data (hints, editorial, starter code)
  const currentProblemId = currentTest.problemIds[currentProblemIndex];
  const currentProblem = serverProblem?.id === currentProblemId ? serverProblem : getProblemById(currentProblemId);

  const starterFor = (lang) =>
    serverProblem?.id === currentProblemId && serverProblem.starterCode?.[lang]
      ? serverProblem.starterCode[lang]
      : STARTER_CODE[lang];

  // Fetch full problem + saved draft when the problem changes
  useEffect(() => {
    let cancelled = false;
    setRevealedHints(0);
    (async () => {
      try {
        const res = await getProblem(currentProblemId);
        if (!cancelled && res.success) setServerProblem(res.problem);
      } catch {
        /* fall back to local data */
      }
      try {
        const draft = await getDraft(currentProblemId, language);
        if (!cancelled && draft.success && draft.saved?.code) {
          setCode(draft.saved.code);
          return;
        }
      } catch {
        /* no draft */
      }
    })();
    return () => { cancelled = true; };
  }, [currentProblemId]);

  // Apply server starter code once it loads (unless a draft already filled the editor)
  useEffect(() => {
    if (serverProblem?.id === currentProblemId && code === STARTER_CODE[language]) {
      setCode(starterFor(language));
    }
  }, [serverProblem]);

  // Autosave draft (debounced 2s)
  useEffect(() => {
    if (!code || code === starterFor(language)) return;
    const t = setTimeout(() => {
      saveDraft(currentProblemId, language, code).catch(() => {});
    }, 2000);
    return () => clearTimeout(t);
  }, [code, language, currentProblemId]);

  const handleLanguageChange = async (e) => {
    const newLang = e.target.value;
    setLanguage(newLang);
    try {
      const draft = await getDraft(currentProblemId, newLang);
      if (draft.success && draft.saved?.code) {
        setCode(draft.saved.code);
        return;
      }
    } catch { /* no draft */ }
    setCode(starterFor(newLang));
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
    setConsoleOutput("Submitting code to queue...\n");

    try {
      const enqueueResult = await submitCode(code, language, currentProblemId);
      if (!enqueueResult.success || !enqueueResult.submissionId) {
        throw new Error("Failed to enqueue submission");
      }
      
      const submissionId = enqueueResult.submissionId;
      let attempts = 0;
      const maxAttempts = 30;
      
      const pollInterval = setInterval(async () => {
        attempts++;
        try {
          const statusResult = await getSubmissionStatus(submissionId);
          
          if (statusResult.status === "queued") {
            setConsoleOutput(`Submission is in queue... (Waiting for worker)\n`);
          } else if (statusResult.status === "running") {
            const progress =
              statusResult.current !== undefined && statusResult.total !== undefined
                ? `(${statusResult.current}/${statusResult.total})`
                : "";
            setConsoleOutput(`Executing code on Judge0... Running test cases ${progress}\n`);
          } else if (statusResult.status === "completed" || statusResult.status === "failed") {
            clearInterval(pollInterval);
            setIsSubmitting(false);
            
            if (statusResult.status === "completed") {
              const finalResult = {
                success: true,
                allPassed: statusResult.allPassed || false,
                passedCount: statusResult.passedCount || 0,
                totalCount: statusResult.totalCount || 0,
                results: statusResult.results || [],
              };
              
              setSubmissionResult(finalResult);
              setActiveTab("submissions");
              
              // Mark as solved if all tests pass
              if (finalResult.allPassed) {
                setSolvedProblems(prev => new Set([...prev, currentProblemId]));
                
                // Update backend progress
                try {
                  await markProblemSolved(currentProblemId);
                  await updateTimeSpent(); // Update time when problem is solved
                } catch (error) {
                  console.error("Failed to update progress:", error);
                }
              }
              
              let out = `Submission Result:\n`;
              out += `Passed: ${finalResult.passedCount}/${finalResult.totalCount} test cases\n\n`;
              
              if (statusResult.metrics) {
                const m = statusResult.metrics;
                out += `Metrics:\n  - Wait Time in Queue: ${m.queue_wait_time}ms\n  - Execution Time: ${Math.round(m.total_execution_time_ms)}ms\n  - Max Test Run Time: ${m.max_time_seconds}s\n  - Max Memory: ${m.max_memory_kb} KB\n\n`;
              }
              
              finalResult.results.forEach((r) => {
                out += `Test Case ${r.testCase}: ${r.passed ? "✓ PASSED" : "✗ FAILED"}\n`;
                if (!r.passed) {
                  out += `  Input: ${r.input}\n`;
                  out += `  Expected: ${r.expectedOutput}\n`;
                  out += `  Got: ${r.actualOutput || r.error}\n`;
                }
              });
              
              setConsoleOutput(out);
            } else {
              setConsoleOutput(`Submission failed: ${statusResult.error || "Unknown evaluation error"}`);
            }
          }
        } catch (pollErr) {
          console.error("[Polling] Error:", pollErr);
        }
        
        if (attempts >= maxAttempts) {
          clearInterval(pollInterval);
          setIsSubmitting(false);
          setConsoleOutput(
            `⚠ Submission status polling timed out (30s).\n\nYour code is still running in the background. Please wait a moment and refresh your Submissions tab to check the results.`
          );
        }
      }, 1000);
    } catch (error) {
      setConsoleOutput(`Error: ${error.message}`);
      setIsSubmitting(false);
    }
  };

  const handleResetCode = () => {
    setCode(starterFor(language));
    setConsoleOutput("");
    setSubmissionResult(null);
  };

  // Prevent paste from external sources
  const handlePaste = (e) => {
    e.preventDefault();
    setPasteWarning(true);
    
    // Hide warning after 3 seconds
    setTimeout(() => {
      setPasteWarning(false);
    }, 3000);
  };

  // Allow copy within the editor
  const handleCopy = (e) => {
    // Allow normal copy behavior
    return true;
  };

  // Prevent context menu (right-click)
  const handleContextMenu = (e) => {
    e.preventDefault();
  };

  // Prevent keyboard shortcuts for paste
  const handleKeyDown = (e) => {
    // Prevent Ctrl+V (Windows/Linux) and Cmd+V (Mac)
    if ((e.ctrlKey || e.metaKey) && e.key === 'v') {
      e.preventDefault();
      setPasteWarning(true);
      
      setTimeout(() => {
        setPasteWarning(false);
      }, 3000);
    }
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
      {/* Header */}
      <div className="problem-header">
        <button className="back-btn" onClick={onBack}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
        </button>
        <h1 className="problem-title">{currentProblem?.title || "Loading..."}</h1>
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
              const problem = getProblemById(problemId);
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
              className={`tab ${activeTab === "hints" ? "active" : ""}`}
              onClick={() => setActiveTab("hints")}
            >
              Hints
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
                      {submissionResult.verdict
                        ? submissionResult.verdict.replace(/_/g, " ")
                        : submissionResult.allPassed ? "✓ All Tests Passed" : "✗ Some Tests Failed"}
                    </div>
                    <div className="result-stats">
                      <span>Passed: {submissionResult.passedCount}/{submissionResult.totalCount}</span>
                      {submissionResult.avgRuntime_ms != null && (
                        <span> · Avg runtime: {submissionResult.avgRuntime_ms} ms</span>
                      )}
                    </div>
                    <div className="test-results">
                      {submissionResult.results.map((result, idx) => (
                        <div key={idx} className={`test-result ${result.passed ? "passed" : "failed"}`}>
                          <div className="test-result-header">
                            <span className="test-number">
                              Test Case {result.testCase}{result.isHidden ? " (hidden)" : ""}
                            </span>
                            <span className={`test-status ${result.passed ? "passed" : "failed"}`}>
                              {result.passed ? "✓ PASSED" : "✗ FAILED"}
                            </span>
                          </div>
                          {!result.passed && (
                            <div className="test-result-details">
                              <div><strong>Input:</strong> <code>{result.input}</code></div>
                              <div><strong>Expected:</strong> <code>{result.expectedOutput}</code></div>
                              <div><strong>Got:</strong> <code>{result.actualOutput || result.error}</code></div>
                              {result.normalizedExpected && result.normalizedActual && (
                                <div className="normalized-comparison">
                                  <div><strong>Expected (normalized):</strong> <code>"{result.normalizedExpected}"</code></div>
                                  <div><strong>Got (normalized):</strong> <code>"{result.normalizedActual}"</code></div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="empty-state">
                    <p>No submissions yet. Submit your code to see results here.</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === "hints" && (
              <div className="hints-content">
                {currentProblem?.hints?.length ? (
                  <>
                    {currentProblem.hints.slice(0, revealedHints).map((hint, idx) => (
                      <div key={idx} className="hint-item">
                        <strong>Hint {idx + 1}:</strong> {hint}
                      </div>
                    ))}
                    {revealedHints < currentProblem.hints.length && (
                      <button
                        className="reveal-hint-btn"
                        onClick={() => setRevealedHints((n) => n + 1)}
                      >
                        Reveal hint {revealedHints + 1} of {currentProblem.hints.length}
                      </button>
                    )}
                  </>
                ) : (
                  <div className="empty-state"><p>No hints available for this problem.</p></div>
                )}
              </div>
            )}

            {activeTab === "editorial" && (
              solvedProblems.has(currentProblemId) && currentProblem?.editorial ? (
                <div className="editorial-content">
                  <h2>Editorial</h2>
                  <h3>APPROACH</h3>
                  <p className="problem-desc">{currentProblem.editorial.approach}</p>
                  <div className="problem-meta-info">
                    <span className="meta-item">
                      <strong>Time:</strong> {currentProblem.editorial.timeComplexity}
                    </span>
                    <span className="meta-item">
                      <strong>Space:</strong> {currentProblem.editorial.spaceComplexity}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="empty-state">
                  <p>🔒 Editorial unlocks after you solve this problem.</p>
                </div>
              )
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
            {pasteWarning && (
              <div className="paste-warning">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <span>Pasting from external sources is disabled. Please type your solution.</span>
              </div>
            )}
            <div
              className="codemirror-wrapper"
              onPasteCapture={handlePaste}
              onContextMenu={handleContextMenu}
              onKeyDownCapture={handleKeyDown}
            >
              <CodeMirror
                value={code}
                height="100%"
                theme={vscodeDark}
                extensions={[EDITOR_LANGS[language] ?? python()]}
                onChange={(value) => setCode(value)}
                basicSetup={{
                  lineNumbers: true,
                  highlightActiveLine: true,
                  highlightActiveLineGutter: true,
                  foldGutter: true,
                  autocompletion: true,
                  bracketMatching: true,
                  closeBrackets: true,
                  indentOnInput: true,
                }}
              />
            </div>
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
