import { useState, useEffect } from "react";
import TestCard from "../components/TestCard";
import { getStriverTests } from "../data/problems";
import { getProgress, startSession, updateTimeSpent, getAnalytics, getProblems } from "../services/api";
import { SkillRadar, HeatmapCalendar, CategoryProgress, WeakAreas } from "../components/Analytics";

export default function Dashboard({ onProblemClick, onBrowseProblems }) {
  const tests = getStriverTests();
  const [progress, setProgress] = useState({
    completionPercentage: 0,
    streak: 0,
    timeSpent: "0.0h",
    solvedProblems: [],
  });
  const [analytics, setAnalytics] = useState(null);
  const [categoryTotals, setCategoryTotals] = useState({});
  const [allCategories, setAllCategories] = useState([]);

  // Fetch progress on mount
  useEffect(() => {
    fetchProgress();
    fetchAnalytics();
    startSession(); // Start tracking time
    
    // Update time spent every 30 seconds
    const timeInterval = setInterval(() => {
      updateTime();
    }, 30000);

    return () => clearInterval(timeInterval);
  }, []);

  const fetchProgress = async () => {
    try {
      const result = await getProgress();
      if (result.success) {
        setProgress(result.progress);
      }
    } catch (error) {
      console.error("Failed to fetch progress:", error);
    }
  };

  const fetchAnalytics = async () => {
    try {
      const [analyticsRes, problemsRes] = await Promise.all([
        getAnalytics(),
        getProblems(),
      ]);
      if (analyticsRes.success) setAnalytics(analyticsRes);
      if (problemsRes.success) {
        const totals = {};
        problemsRes.problems.forEach((p) => {
          totals[p.category] = (totals[p.category] ?? 0) + 1;
        });
        setCategoryTotals(totals);
        setAllCategories(Object.keys(totals).sort());
      }
    } catch (error) {
      console.error("Failed to fetch analytics:", error);
    }
  };

  const updateTime = async () => {
    try {
      const result = await updateTimeSpent();
      if (result.success) {
        setProgress(result.progress);
      }
    } catch (error) {
      console.error("Failed to update time:", error);
    }
  };

  // Calculate topics completed (out of 18 test suites)
  const topicsCompleted = Math.floor((progress.completionPercentage / 100) * 18);

  return (
    <div className="dashboard">
      {/* Welcome */}
      <div className="welcome-section">
        <h1 className="welcome-title">Welcome back, Alex</h1>
        <p className="welcome-sub">
          Pick up where you left off. Complete today's recommended tests to stay on track for your Google technical interview.
        </p>
      </div>

      {/* Stats row */}
      <div className="stats-row">
        <div className="stat-card stat-progress">
          <div className="stat-label">CURRENT PROGRESS</div>
          <div className="stat-heading">Data Structures Mastery</div>
          <div className="progress-meta">
            <span className="progress-pct">{progress.completionPercentage}% Complete</span>
            <span className="progress-count">{topicsCompleted}/18 Topics</span>
          </div>
          <div className="progress-bar-track">
            <div className="progress-bar-fill" style={{ width: `${progress.completionPercentage}%` }} />
          </div>
        </div>

        <div className="stat-card stat-streak">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
          </svg>
          <div className="streak-number">{progress.streak}</div>
          <div className="streak-label">DAY STREAK</div>
        </div>

        <div className="stat-card stat-time">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          <div className="time-number">{progress.timeSpent}</div>
          <div className="time-label">TIME SPENT</div>
        </div>
      </div>

      {/* Performance analytics */}
      {analytics && (
        <>
          <div className="stats-row analytics-summary-row">
            <div className="stat-card">
              <div className="stat-label">INTERVIEW READINESS</div>
              <div className="irs-number">
                {Number(analytics.overview.interview_readiness ?? 0).toFixed(0)}
                <span className="irs-total">/100</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-label">SOLVED</div>
              <div className="solved-breakdown">
                <span className="diff-easy">{analytics.overview.easy_solved} Easy</span>
                <span className="diff-medium">{analytics.overview.medium_solved} Med</span>
                <span className="diff-hard">{analytics.overview.hard_solved} Hard</span>
              </div>
              <div className="stat-sub">{analytics.overview.total_solved} total</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">ACCEPTANCE RATE</div>
              <div className="irs-number">
                {Number(analytics.overview.acceptance_rate ?? 0).toFixed(0)}
                <span className="irs-total">%</span>
              </div>
              <div className="stat-sub">{analytics.overview.total_submissions} submissions</div>
            </div>
          </div>

          <div className="analytics-grid">
            <div className="analytics-card">
              <h3 className="analytics-card-title">Skill Radar</h3>
              <SkillRadar skillScores={analytics.skillScores} />
            </div>
            <div className="analytics-card">
              <h3 className="analytics-card-title">Category Progress</h3>
              <CategoryProgress
                skillScores={analytics.skillScores}
                categoryTotals={categoryTotals}
              />
            </div>
            <div className="analytics-card">
              <h3 className="analytics-card-title">Weak Areas</h3>
              <WeakAreas
                skillScores={analytics.skillScores}
                allCategories={allCategories}
                onPractice={(cat) => onBrowseProblems?.(cat)}
              />
            </div>
          </div>

          <div className="analytics-card heatmap-card">
            <h3 className="analytics-card-title">Activity — last 6 months</h3>
            <HeatmapCalendar heatmap={analytics.heatmap} />
          </div>
        </>
      )}

      {/* Assessments */}
      <div className="assessments-header">
        <h2 className="assessments-title">Recommended Assessments</h2>
        <div className="assessments-actions">
          <button className="icon-btn" aria-label="Filter">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="8" y1="12" x2="16" y2="12" />
              <line x1="11" y1="18" x2="13" y2="18" />
            </svg>
          </button>
          <button className="icon-btn" aria-label="Search">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
        </div>
      </div>

      <div className="card-grid">
        {tests.map((test) => (
          <TestCard key={test.id} test={test} onClick={() => onProblemClick(test)} />
        ))}
      </div>

      {/* FAB */}
      <button className="fab" aria-label="Add">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>
    </div>
  );
}
