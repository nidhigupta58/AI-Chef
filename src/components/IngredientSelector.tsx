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
          // Try alternative image source if primary fails
          // Map ingredient names to TheMealDB format for fallback
          const mealDBFallbackMap: Record<string, string> = {
            'baking soda': 'Baking Soda',
            'baking powder': 'Baking Powder',
            'vegetable broth': 'Vegetable Stock',
            'chicken broth': 'Chicken Stock',
            'beef broth': 'Beef Stock',
          };
          const mealDBName = mealDBFallbackMap[ingredient.toLowerCase()] || ingredient;
          const alternativeUrl = `https://www.themealdb.com/images/ingredients/${encodeURIComponent(mealDBName)}.png`;
          
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
                    const target = e.target as HTMLImageElement;
                    // Try alternative source first
                    if (target.src !== alternativeUrl && !target.dataset.triedAlternative) {
                      target.dataset.triedAlternative = 'true';
                      target.src = alternativeUrl;
                      return;
                    }
                    // If alternative also fails, fallback to emoji
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
