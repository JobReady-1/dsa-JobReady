// Analytics widgets: SkillRadar, HeatmapCalendar, CategoryProgress, WeakAreas

// ─── Skill Radar Chart (pure SVG) ────────────────────────────────────────────
export function SkillRadar({ skillScores }) {
  // Take up to 8 categories for readability
  const cats = skillScores.slice(0, 8);
  if (cats.length < 3) {
    return (
      <div className="radar-empty">
        Solve problems in at least 3 categories to unlock your skill radar.
      </div>
    );
  }

  const size = 280;
  const cx = size / 2;
  const cy = size / 2;
  const radius = 95;
  const n = cats.length;

  const point = (i, r) => {
    const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
    return [cx + r * Math.cos(angle), cy + r * Math.sin(angle)];
  };

  const gridLevels = [0.25, 0.5, 0.75, 1];
  const dataPoints = cats
    .map((c, i) => point(i, (Math.min(100, c.score) / 100) * radius).join(","))
    .join(" ");

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="skill-radar">
      {gridLevels.map((lvl) => (
        <polygon
          key={lvl}
          points={cats.map((_, i) => point(i, radius * lvl).join(",")).join(" ")}
          fill="none"
          stroke="#2d3748"
          strokeWidth="1"
        />
      ))}
      {cats.map((_, i) => {
        const [x, y] = point(i, radius);
        return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="#2d3748" strokeWidth="1" />;
      })}
      <polygon points={dataPoints} fill="rgba(34,197,94,0.25)" stroke="#22c55e" strokeWidth="2" />
      {cats.map((c, i) => {
        const [x, y] = point(i, radius + 18);
        return (
          <text
            key={c.category}
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="10"
            fill="#94a3b8"
          >
            {c.category.length > 12 ? c.category.slice(0, 11) + "…" : c.category}
          </text>
        );
      })}
    </svg>
  );
}

// ─── Heatmap Calendar (last ~26 weeks) ───────────────────────────────────────
export function HeatmapCalendar({ heatmap }) {
  const byDate = {};
  heatmap.forEach((d) => {
    const key = new Date(d.activity_date).toISOString().slice(0, 10);
    byDate[key] = d;
  });

  const weeks = 26;
  const today = new Date();
  const cells = [];
  // Start from the Sunday `weeks` weeks ago
  const start = new Date(today);
  start.setDate(start.getDate() - (weeks * 7 - 1) - start.getDay());

  for (let w = 0; w < weeks + 1; w++) {
    const col = [];
    for (let d = 0; d < 7; d++) {
      const day = new Date(start);
      day.setDate(start.getDate() + w * 7 + d);
      if (day > today) break;
      const key = day.toISOString().slice(0, 10);
      const activity = byDate[key];
      const solved = activity ? Number(activity.problems_solved) : 0;
      const subs = activity ? Number(activity.submissions) : 0;
      let level = 0;
      if (solved >= 3) level = 4;
      else if (solved >= 2) level = 3;
      else if (solved >= 1) level = 2;
      else if (subs >= 1) level = 1;
      col.push({ key, level, solved, subs });
    }
    cells.push(col);
  }

  const colors = ["#1e293b", "#14532d", "#166534", "#16a34a", "#4ade80"];

  return (
    <div className="heatmap-scroll">
      <svg
        width={cells.length * 13}
        height={7 * 13 + 4}
        className="heatmap-calendar"
      >
        {cells.map((col, w) =>
          col.map((cell, d) => (
            <rect
              key={cell.key}
              x={w * 13}
              y={d * 13}
              width={11}
              height={11}
              rx={2}
              fill={colors[cell.level]}
            >
              <title>{`${cell.key}: ${cell.solved} solved, ${cell.subs} submissions`}</title>
            </rect>
          ))
        )}
      </svg>
    </div>
  );
}

// ─── Category progress bars ──────────────────────────────────────────────────
export function CategoryProgress({ skillScores, categoryTotals }) {
  if (!skillScores.length) {
    return <div className="radar-empty">No solves yet — your category progress will appear here.</div>;
  }
  return (
    <div className="category-progress-list">
      {skillScores.map((c) => {
        const total = categoryTotals[c.category] ?? 0;
        return (
          <div key={c.category} className="category-progress-item">
            <div className="category-progress-head">
              <span className="category-name">{c.category}</span>
              <span className="category-count">
                {c.problems_solved}{total ? `/${total}` : ""} · {Number(c.score).toFixed(0)}%
              </span>
            </div>
            <div className="progress-bar-track">
              <div
                className="progress-bar-fill"
                style={{ width: `${Math.min(100, Number(c.score))}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Weak areas panel ────────────────────────────────────────────────────────
export function WeakAreas({ skillScores, allCategories, onPractice }) {
  // Weakest = categories with lowest scores, including untouched ones (score 0)
  const scored = {};
  skillScores.forEach((c) => (scored[c.category] = Number(c.score)));
  const ranked = allCategories
    .map((cat) => ({ category: cat, score: scored[cat] ?? 0 }))
    .sort((a, b) => a.score - b.score)
    .slice(0, 3);

  return (
    <div className="weak-areas">
      {ranked.map((c) => (
        <div key={c.category} className="weak-area-item">
          <div>
            <div className="category-name">{c.category}</div>
            <div className="weak-area-score">
              {c.score === 0 ? "Not started" : `Score ${c.score.toFixed(0)}%`}
            </div>
          </div>
          <button className="practice-btn" onClick={() => onPractice?.(c.category)}>
            Practice
          </button>
        </div>
      ))}
    </div>
  );
}
