import { getIngredientImage, getIngredientEmoji } from '../utils/ingredientImages';

interface IngredientSelectorProps {
  allIngredients: string[];
  selectedIngredients: string[];
  onToggle: (ingredient: string) => void;
}

export default function IngredientSelector({ 
  allIngredients, 
  selectedIngredients, 
  onToggle 
}: IngredientSelectorProps) {
  return (
    <div className="ingredient-selector">
      <div className="section-header">
        <h2 className="section-title">🥕 Available Ingredients</h2>
        <div className="selection-counter">
          <span className="counter-badge">{selectedIngredients.length} / {allIngredients.length}</span>
          <span className="counter-label">selected</span>
        </div>
      </div>
      <div className="ingredients-grid">
        {allIngredients.map(ingredient => {
          const isSelected = selectedIngredients.includes(ingredient);
          const imageUrl = getIngredientImage(ingredient);
          const fallbackEmoji = getIngredientEmoji(ingredient);
          return (
            <button
              key={ingredient}
              className={`ingredient-chip ${isSelected ? 'selected' : ''}`}
              onClick={() => onToggle(ingredient)}
              title={`Click to ${isSelected ? 'remove' : 'add'} ${ingredient}`}
            >
              <span className="ingredient-image-container">
                <img 
                  src={imageUrl} 
                  alt={ingredient}
                  className="ingredient-image"
                  onError={(e) => {
                    // Fallback to emoji if image fails to load
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const emojiSpan = target.nextElementSibling as HTMLSpanElement;
                    if (emojiSpan) {
                      emojiSpan.style.display = 'inline';
                    }
                  }}
                />
                <span className="ingredient-emoji" style={{ display: 'none' }}>{fallbackEmoji}</span>
              </span>
              {isSelected && <span className="checkmark">✓</span>}
              <span className="ingredient-name">{ingredient}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
