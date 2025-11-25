import type { Recipe } from '../types';

interface DishModalProps {
  recipe: Recipe | null;
  onClose: () => void;
}

// Get dish emoji/visual for each recipe
function getDishEmoji(recipeName: string): string {
  const dishEmojis: Record<string, string> = {
    'Margherita Pizza': '🍕',
    'Caesar Salad': '🥗',
    'Pasta Carbonara': '🍝',
    'Chocolate Cake': '🍰',
    'Guacamole': '🥑',
    'Chicken Stir Fry': '🍜',
    'Caprese Salad': '🥗',
    'French Toast': '🍞'
  };
  return dishEmojis[recipeName] || '🍽️';
}

// Get cooking time estimate
function getCookingTime(difficulty: string): string {
  const times: Record<string, string> = {
    'Easy': '15-20 min',
    'Medium': '30-40 min',
    'Hard': '60+ min'
  };
  return times[difficulty] || '30 min';
}

export default function DishModal({ recipe, onClose }: DishModalProps) {
  if (!recipe) return null;

  const dishEmoji = getDishEmoji(recipe.name);
  const cookingTime = getCookingTime(recipe.difficulty);

  return (
    <>
      <div className="modal-overlay" onClick={onClose} />
      <div className="dish-modal">
        <button className="modal-close" onClick={onClose} aria-label="Close">
          ✕
        </button>

        <div className="dish-celebration">
          <div className="confetti-container">
            <span className="confetti">🎉</span>
            <span className="confetti">✨</span>
            <span className="confetti">🎊</span>
            <span className="confetti">⭐</span>
            <span className="confetti">🌟</span>
          </div>
        </div>

        <div className="dish-header">
          <div className="dish-emoji-large">{dishEmoji}</div>
          <h2 className="dish-title">Perfect Match!</h2>
          <h3 className="dish-name">{recipe.name}</h3>
        </div>

        <div className="dish-details">
          <div className="detail-card">
            <span className="detail-icon">⏱️</span>
            <div className="detail-content">
              <span className="detail-label">Cooking Time</span>
              <span className="detail-value">{cookingTime}</span>
            </div>
          </div>

          <div className="detail-card">
            <span className="detail-icon">📊</span>
            <div className="detail-content">
              <span className="detail-label">Difficulty</span>
              <span className="detail-value">{recipe.difficulty}</span>
            </div>
          </div>

          <div className="detail-card">
            <span className="detail-icon">🥘</span>
            <div className="detail-content">
              <span className="detail-label">Servings</span>
              <span className="detail-value">2-4 people</span>
            </div>
          </div>
        </div>

        <div className="dish-ingredients">
          <h4 className="ingredients-title">Ingredients Used:</h4>
          <div className="ingredients-list">
            {recipe.ingredients.map((ingredient, idx) => (
              <span key={idx} className="ingredient-tag">
                ✓ {ingredient}
              </span>
            ))}
          </div>
        </div>

        {recipe.tags && recipe.tags.length > 0 && (
          <div className="dish-tags">
            {recipe.tags.map((tag, idx) => (
              <span key={idx} className="tag-badge">
                #{tag}
              </span>
            ))}
          </div>
        )}

        <div className="dish-actions">
          <button className="btn-cook-again" onClick={onClose}>
            🔥 Cook Another Dish
          </button>
        </div>

        <div className="dish-quote">
          <p>"Cooking is like love. It should be entered into with abandon or not at all."</p>
          <span className="quote-author">- Harriet Van Horne</span>
        </div>
      </div>
    </>
  );
}
