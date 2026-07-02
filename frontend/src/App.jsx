import { useState } from "react";
import Dashboard from "./pages/Dashboard";
import ProblemView from "./pages/ProblemView";
import ProblemList from "./pages/ProblemList";
import TestInstructions from "./pages/TestInstructions";
import "./App.css";

function Navbar({ currentView, onNavigate }) {
  return (
    <header className="navbar">
      <div className="navbar-left">
        <span className="navbar-logo">AlgoPro</span>
        <nav className="navbar-nav">
          <a href="#" className="nav-link active">
            {currentView === "problem" ? "Problems" : "Dashboard"}
          </a>
          <a href="#" className="nav-link">Practice</a>
          <a href="#" className="nav-link">Contests</a>
        </nav>
      </div>
      <div className="navbar-right">
        <button className="nav-icon-btn" aria-label="Notifications">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
        </button>
        <button className="nav-icon-btn" aria-label="History">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="1 4 1 10 7 10" />
            <path d="M3.51 15a9 9 0 1 0 .49-4.95" />
          </svg>
        </button>
        <button className="nav-icon-btn" aria-label="Help">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        </button>
        <div className="avatar">A</div>
      </div>
    </header>
  );
}

function Sidebar({ currentView, onNavigate, onBrowseProblems }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-profile">
        <div className="profile-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </div>
        <div className="profile-info">
          <span className="profile-name">Interview Prep</span>
          <span className="profile-track">TECHNICAL TRACK</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        <a
          href="#"
          className={`sidebar-link ${currentView === "dashboard" ? "active" : ""}`}
          onClick={(e) => { e.preventDefault(); onNavigate("dashboard"); }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
            <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
          </svg>
          Dashboard
        </a>
        <a
          href="#"
          className={`sidebar-link ${currentView === "problems" ? "active" : ""}`}
          onClick={(e) => { e.preventDefault(); onBrowseProblems(""); }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
          </svg>
          Problems
        </a>
        <a href="#" className="sidebar-link">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
          </svg>
          Mock Tests
        </a>
        <a href="#" className="sidebar-link">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
          </svg>
          Study Plan
        </a>
        <a href="#" className="sidebar-link">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" />
            <line x1="6" y1="20" x2="6" y2="14" />
          </svg>
          Leaderboard
        </a>
      </nav>

      <div className="sidebar-bottom">
        <button className="upgrade-btn">UPGRADE TO PRO</button>
        <a href="#" className="sidebar-link">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" />
          </svg>
          Settings
        </a>
        <a href="#" className="sidebar-link">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
          Support
        </a>
      </div>
    </aside>
  );
}

export default function App() {
  const [currentView, setCurrentView] = useState("dashboard"); // "dashboard", "problems", "instructions", or "problem"
  const [selectedTest, setSelectedTest] = useState(null);
  const [problemListCategory, setProblemListCategory] = useState("");

  const handleProblemClick = (test) => {
    setSelectedTest(test);
    setCurrentView("instructions"); // Show instructions first
  };

  const handleBrowseProblems = (category = "") => {
    setProblemListCategory(category);
    setCurrentView("problems");
  };

  // Open a single problem from the Problems list (no instructions screen)
  const handleOpenSingleProblem = (problem) => {
    setSelectedTest({
      id: `single-${problem.id}`,
      title: problem.title,
      problemIds: [problem.id],
    });
    setCurrentView("problem");
  };

  const handleProceedToTest = () => {
    setCurrentView("problem"); // Go to test
  };

  const handleCancelTest = () => {
    setCurrentView("dashboard"); // Go back to dashboard
    setSelectedTest(null);
  };

  const handleBackToDashboard = () => {
    setCurrentView("dashboard");
    setSelectedTest(null);
  };

  return (
    <div className="app-layout">
      <Navbar currentView={currentView} onNavigate={setCurrentView} />
      {currentView === "instructions" ? (
        <TestInstructions 
          test={selectedTest}
          onProceed={handleProceedToTest}
          onCancel={handleCancelTest}
        />
      ) : currentView === "problem" ? (
        <ProblemView 
          onBack={handleBackToDashboard} 
          test={selectedTest}
        />
      ) : (
        <div className="app-body">
          <Sidebar currentView={currentView} onNavigate={setCurrentView} onBrowseProblems={handleBrowseProblems} />
          <main className="main-content">
            {currentView === "problems" ? (
              <ProblemList
                onOpenProblem={handleOpenSingleProblem}
                initialCategory={problemListCategory}
                key={problemListCategory}
              />
            ) : (
              <Dashboard
                onProblemClick={handleProblemClick}
                onBrowseProblems={handleBrowseProblems}
              />
            )}
          </main>
        </div>
      )}
    </div>
  );
}
