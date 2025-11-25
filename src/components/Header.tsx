import { useEffect, useState } from 'react';

interface HeaderProps {
  score: number;
}

export default function Header({ score }: HeaderProps) {
  const [prevScore, setPrevScore] = useState(score);
  const [scoreChange, setScoreChange] = useState<number | null>(null);

  useEffect(() => {
    if (score !== prevScore) {
      const change = score - prevScore;
      setScoreChange(change);
      setPrevScore(score);
      
      // Clear the score change indicator after animation
      setTimeout(() => setScoreChange(null), 2000);
    }
  }, [score, prevScore]);

  return (
    <header className="app-header">
      <div className="header-content">
        <div className="title-section">
          <h1 className="game-title">
            👨‍🍳 AI Cooking Simulator
          </h1>
          <p className="game-subtitle">Mix ingredients, discover recipes, earn points!</p>
        </div>
        <div className="score-display">
          <span className="score-label">Total Score</span>
          <div className="score-wrapper">
            <span className="score-value">⭐ {score}</span>
            {scoreChange !== null && scoreChange > 0 && (
              <span className="score-change">+{scoreChange}</span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
