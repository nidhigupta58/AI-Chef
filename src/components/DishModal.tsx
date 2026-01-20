import { useState } from 'react';
import type { Recipe } from '../types';
import { getRecipeImageUnsplash, getRecipeEmoji } from '../utils/recipeImages';

interface DishModalProps {
  recipe: Recipe | null;
  onClose: () => void;
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
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  if (!recipe) return null;

  const recipeImage = getRecipeImageUnsplash(recipe.name);
  const fallbackEmoji = getRecipeEmoji(recipe.name);
  const cookingTime = getCookingTime(recipe.difficulty);

  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  return (
    <>
      <div className="modal-overlay" onClick={onClose} />
      <div className="dish-modal">
        <button className="modal-close" onClick={onClose} aria-label="Close" title="Close">
          ×
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
          {/* Recipe Image Display */}
          <div className="dish-image-container">
            {!imageLoaded && !imageError && (
              <div className="dish-image-skeleton">
                <div className="skeleton-shimmer"></div>
              </div>
            )}
            {imageError ? (
              <div className="dish-emoji-large">{fallbackEmoji}</div>
            ) : (
              <img
                src={recipeImage}
                alt={recipe.name}
                className={`dish-image-large ${imageLoaded ? 'loaded' : 'loading'}`}
                onLoad={handleImageLoad}
                onError={handleImageError}
              />
            )}
          </div>
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

