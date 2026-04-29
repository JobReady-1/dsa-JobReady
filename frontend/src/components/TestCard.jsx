const TOPIC_IMAGES = {
  "Arrays": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&q=80",
  "Linked Lists": "https://images.unsplash.com/photo-1545987796-200677ee1011?w=400&q=80",
  "Dynamic Programming": "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&q=80",
  "Graphs": "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&q=80",
  "Trees": "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=400&q=80",
  "Strings": "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&q=80",
  "default": "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80",
};

export default function TestCard({ test, onClick }) {
  const imgSrc = test.image || TOPIC_IMAGES[test.topic] || TOPIC_IMAGES["default"];
  const difficultyClass = test.difficulty.toLowerCase();

  return (
    <div className="test-card" onClick={onClick}>
      <div className="test-card-image">
        <img src={imgSrc} alt={test.title} />
        <div className="problem-count-badge">{test.problemCount || 3} Problems</div>
      </div>
      <div className="test-card-body">
        <div className="test-card-meta">
          <span className="topic-tag">{test.topic}</span>
          <span className={`badge ${difficultyClass}`}>{test.difficulty}</span>
        </div>
        <h3 className="test-card-title">{test.title}</h3>
        <p className="test-card-desc">{test.description}</p>
      </div>
    </div>
  );
}
