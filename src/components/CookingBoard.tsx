import { getIngredientImage, getIngredientEmoji } from '../utils/ingredientImages';

interface CookingBoardProps {
  selectedIngredients: string[];
  onRemove: (ingredient: string) => void;
}

export default function CookingBoard({ 
  selectedIngredients, 
  onRemove 
}: CookingBoardProps) {
  const hints = [
    "💡 Try combining tomato, mozzarella, and basil!",
    "💡 Mix 5 ingredients for best results!",
    "💡 Each ingredient matters - choose wisely!",
    "💡 Discover 48 unique recipes!"
  ];
  
  const randomHint = hints[Math.floor(Math.random() * hints.length)];

  return (
    <div className="cooking-board">
      <div className="section-header">
        <h2 className="section-title">🍳 Your Cooking Board</h2>
        {selectedIngredients.length > 0 && (
          <span className="ingredient-count-badge">{selectedIngredients.length} items</span>
        )}
      </div>
      <div className="board-content">
        {selectedIngredients.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🍽️</div>
            <p className="empty-message">Select ingredients to start cooking!</p>
            <p className="empty-hint">{randomHint}</p>
          </div>
        ) : (
          <div className="selected-ingredients">
            {selectedIngredients.map(ingredient => {
              const imageUrl = getIngredientImage(ingredient);
              const fallbackEmoji = getIngredientEmoji(ingredient);
              return (
              <div key={ingredient} className="selected-ingredient">
                  <span className="ingredient-image-container-small">
                    <img 
                      src={imageUrl} 
                      alt={ingredient}
                      className="ingredient-image-small"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const emojiSpan = target.nextElementSibling as HTMLSpanElement;
                        if (emojiSpan) {
                          emojiSpan.style.display = 'inline';
                        }
                      }}
                    />
                    <span className="ingredient-emoji-small" style={{ display: 'none' }}>{fallbackEmoji}</span>
                  </span>
                <span className="ingredient-text">{ingredient}</span>
                <button
                  className="remove-btn"
                  onClick={() => onRemove(ingredient)}
                  aria-label={`Remove ${ingredient}`}
                  title={`Remove ${ingredient}`}
                >
                  ❌
                </button>
              </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
