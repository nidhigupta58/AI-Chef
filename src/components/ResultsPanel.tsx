import type { RecipeMatch } from '../types';

interface ResultsPanelProps {
  recommendations: RecipeMatch[];
}

export default function ResultsPanel({ recommendations }: ResultsPanelProps) {
  if (recommendations.length === 0) {
    return null;
  }

  const perfectMatches = recommendations.filter(m => m.isPerfect);
  const nearMatches = recommendations.filter(m => m.isNear);
  const otherMatches = recommendations.filter(m => !m.isPerfect && !m.isNear && m.matchScore > 0);

  return (
    <div className="results-panel">
      <h2 className="section-title">📊 Recipe Recommendations</h2>
      
      {perfectMatches.length > 0 && (
        <div className="match-category perfect">
          <h3 className="category-title">🎯 Perfect Matches - You Can Cook Now!</h3>
          <div className="recipe-list">
            {perfectMatches.map((match, idx) => (
              <RecipeCard key={idx} match={match} />
            ))}
          </div>
        </div>
      )}

      {nearMatches.length > 0 && (
        <div className="match-category near">
          <h3 className="category-title">🔥 Almost There - Just One More!</h3>
          <div className="recipe-list">
            {nearMatches.map((match, idx) => (
              <RecipeCard key={idx} match={match} />
            ))}
          </div>
        </div>
      )}

      {otherMatches.length > 0 && (
        <div className="match-category other">
          <h3 className="category-title">💡 Other Possibilities</h3>
          <div className="recipe-list">
            {otherMatches.slice(0, 3).map((match, idx) => (
              <RecipeCard key={idx} match={match} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function RecipeCard({ match }: { match: RecipeMatch }) {
  const matchPercentage = Math.round(match.matchScore * 100);
  
  const difficultyColors: Record<string, string> = {
    'Easy': 'difficulty-easy',
    'Medium': 'difficulty-medium',
    'Hard': 'difficulty-hard'
  };

  const difficultyIcons: Record<string, string> = {
    'Easy': '⭐',
    'Medium': '⭐⭐',
    'Hard': '⭐⭐⭐'
  };

  return (
    <div className="recipe-card">
      <div className="recipe-header">
        <h4 className="recipe-name">
          🍽️ {match.recipe.name}
        </h4>
        <span className={`difficulty-badge ${difficultyColors[match.recipe.difficulty]}`}>
          <span className="difficulty-stars">{difficultyIcons[match.recipe.difficulty]}</span>
          <span>{match.recipe.difficulty}</span>
        </span>
      </div>
      
      <div className="match-score">
        <div className="score-bar-container">
          <div 
            className="score-bar-fill" 
            style={{ width: `${matchPercentage}%` }}
          />
        </div>
        <span className="score-text">{matchPercentage}% Match</span>
      </div>

      <div className="ingredients-info">
        {match.have.length > 0 && (
          <div className="ingredients-have">
            <span className="label">✅ You have:</span>
            <span className="items">{match.have.join(', ')}</span>
          </div>
        )}
        
        {match.missing.length > 0 && (
          <div className="ingredients-missing">
            <span className="label">❌ Missing:</span>
            <span className="items">{match.missing.join(', ')}</span>
          </div>
        )}
      </div>

      {match.recipe.tags && match.recipe.tags.length > 0 && (
        <div className="recipe-tags">
          {match.recipe.tags.map(tag => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
      )}
    </div>
  );
}
