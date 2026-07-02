import { useState, useEffect, useMemo } from "react";
import { getProblems, getProgress } from "../services/api";

const DIFF_ORDER = { Easy: 0, Medium: 1, Hard: 2 };
const DIFF_COLOR = { Easy: "#22c55e", Medium: "#eab308", Hard: "#ef4444" };

export default function ProblemList({ onOpenProblem, initialCategory = "" }) {
  const [problems, setProblems] = useState([]);
  const [solvedIds, setSolvedIds] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [category, setCategory] = useState(initialCategory);
  const [status, setStatus] = useState(""); // "", "solved", "unsolved"

  useEffect(() => {
    (async () => {
      try {
        const probRes = await getProblems();
        if (!probRes.success) throw new Error("Could not load problems");
        setProblems(probRes.problems);
        try {
          const prog = await getProgress();
          if (prog.success && Array.isArray(prog.progress?.solvedProblems)) {
            setSolvedIds(new Set(prog.progress.solvedProblems.map(Number)));
          }
        } catch {
          /* progress optional */
        }
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const categories = useMemo(
    () => [...new Set(problems.map((p) => p.category))].sort(),
    [problems]
  );

  const filtered = useMemo(() => {
    return problems
      .filter((p) => {
        if (search && !p.title.toLowerCase().includes(search.toLowerCase())) return false;
        if (difficulty && p.difficulty !== difficulty) return false;
        if (category && p.category !== category) return false;
        if (status === "solved" && !solvedIds.has(p.id)) return false;
        if (status === "unsolved" && solvedIds.has(p.id)) return false;
        return true;
      })
      .sort((a, b) => a.id - b.id);
  }, [problems, search, difficulty, category, status, solvedIds]);

  if (loading) return <div className="problem-list-page"><p>Loading problems…</p></div>;
  if (error) return <div className="problem-list-page"><p className="error-text">{error}</p></div>;

  return (
    <div className="problem-list-page">
      <div className="problem-list-header">
        <h1>Problems</h1>
        <span className="problem-list-count">
          {solvedIds.size}/{problems.length} solved
        </span>
      </div>

      <div className="problem-filters">
        <input
          type="text"
          className="filter-search"
          placeholder="Search problems…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className="filter-select">
          <option value="">All difficulties</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="filter-select">
          <option value="">All categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="filter-select">
          <option value="">All statuses</option>
          <option value="solved">Solved</option>
          <option value="unsolved">Unsolved</option>
        </select>
      </div>

      <table className="problem-table">
        <thead>
          <tr>
            <th style={{ width: 40 }}></th>
            <th style={{ width: 50 }}>#</th>
            <th>Title</th>
            <th style={{ width: 160 }}>Category</th>
            <th style={{ width: 100 }}>Difficulty</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((p) => (
            <tr key={p.id} className="problem-row" onClick={() => onOpenProblem(p)}>
              <td>
                {solvedIds.has(p.id) && (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </td>
              <td className="problem-id">{p.id}</td>
              <td className="problem-title">{p.title}</td>
              <td className="problem-category">{p.category}</td>
              <td>
                <span className="difficulty-badge" style={{ color: DIFF_COLOR[p.difficulty] }}>
                  {p.difficulty}
                </span>
              </td>
            </tr>
          ))}
          {filtered.length === 0 && (
            <tr>
              <td colSpan={5} className="empty-row">No problems match your filters.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
