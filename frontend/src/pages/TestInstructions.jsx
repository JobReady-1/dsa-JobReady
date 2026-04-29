export default function TestInstructions({ test, onProceed, onCancel }) {
  return (
    <div className="test-instructions-overlay">
      <div className="test-instructions-container">
        {/* Left Side - Rules */}
        <div className="instructions-left">
          <div className="instructions-header">
            <h1 className="instructions-title">Test Instructions</h1>
            <div className="test-info">
              <h2 className="test-name">{test?.title || "Coding Test"}</h2>
              <div className="test-meta">
                <span className={`badge ${test?.difficulty?.toLowerCase()}`}>
                  {test?.difficulty}
                </span>
                <span className="test-problems">{test?.problemCount || 3} Problems</span>
              </div>
            </div>
          </div>

          <div className="instructions-content">
            <div className="instruction-section">
              <h3 className="section-title">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                Time & Format
              </h3>
              <ul className="instruction-list">
                <li>This test contains <strong>{test?.problemCount || 3} coding problems</strong></li>
                <li>No time limit - solve at your own pace</li>
                <li>Switch between problems using Q1, Q2, Q3 buttons</li>
              </ul>
            </div>

            <div className="instruction-section">
              <h3 className="section-title">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
                Coding Rules
              </h3>
              <ul className="instruction-list">
                <li><strong>Type your own code</strong> - Pasting from external sources is disabled</li>
                <li>Choose from Python, JavaScript, Java, or C++</li>
                <li>Use "Run Code" to test, "Submit Code" to validate</li>
              </ul>
            </div>

            <div className="instruction-section">
              <h3 className="section-title">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 11 12 14 22 4" />
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                </svg>
                Scoring
              </h3>
              <ul className="instruction-list">
                <li>Each problem must pass <strong>all test cases</strong> to be marked solved</li>
                <li>Your progress is tracked and saved automatically</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right Side - Confirmation */}
        <div className="instructions-right">
          <div className="confirmation-box">
            <div className="confirmation-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            
            <h2 className="confirmation-title">Ready to Start?</h2>
            <p className="confirmation-text">
              Make sure you've read the instructions before proceeding.
            </p>

            <div className="test-summary">
              <div className="summary-item">
                <span className="summary-label">Test:</span>
                <span className="summary-value">{test?.title}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Problems:</span>
                <span className="summary-value">{test?.problemCount || 3}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Difficulty:</span>
                <span className="summary-value">{test?.difficulty}</span>
              </div>
            </div>

            <div className="confirmation-question">
              <p className="question-text">Proceed with the test?</p>
              <div className="confirmation-buttons">
                <button className="btn-proceed" onClick={onProceed}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                  Yes, Start Test
                </button>
                <button className="btn-cancel" onClick={onCancel}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                  No, Go Back
                </button>
              </div>
            </div>

            <div className="good-luck">
              <p>Good luck! 🚀</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
