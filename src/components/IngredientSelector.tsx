interface IngredientSelectorProps {
  allIngredients: string[];
  selectedIngredients: string[];
  onToggle: (ingredient: string) => void;
}

// Get ingredient emoji based on type
function getIngredientEmoji(ingredient: string): string {
  const emojiMap: Record<string, string> = {
    // Vegetables
    tomato: '🍅',
    lettuce: '🥬',
    avocado: '🥑',
    onion: '🧅',
    vegetables: '🥦',
    
    // Dairy & Cheese
    mozzarella: '🧀',
    parmesan: '🧀',
    milk: '🥛',
    butter: '🧈',
    
    // Proteins
    eggs: '🥚',
    bacon: '🥓',
    chicken: '🍗',
    
    // Carbs & Grains
    pasta: '🍝',
    bread: '🍞',
    flour: '🌾',
    rice: '🍚',
    croutons: '🥖',
    
    // Baking & Sweets
    sugar: '🧂',
    cocoa: '🍫',
    vanilla: '🌼',
    cinnamon: '🌰',
    
    // Herbs & Spices
    basil: '🌿',
    cilantro: '🌿',
    garlic: '🧄',
    ginger: '🫚',
    'black pepper': '🧂',
    
    // Citrus & Fruits
    lemon: '🍋',
    lime: '🍋',
    
    // Oils & Liquids
    'olive oil': '🫒',
    'soy sauce': '🥫',
    'balsamic vinegar': '🍶'
  };
  
  return emojiMap[ingredient.toLowerCase()] || '🍴';
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
          const emoji = getIngredientEmoji(ingredient);
          return (
            <button
              key={ingredient}
              className={`ingredient-chip ${isSelected ? 'selected' : ''}`}
              onClick={() => onToggle(ingredient)}
              title={`Click to ${isSelected ? 'remove' : 'add'} ${ingredient}`}
            >
              <span className="ingredient-emoji">{emoji}</span>
              {isSelected && <span className="checkmark">✓</span>}
              <span className="ingredient-name">{ingredient}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
