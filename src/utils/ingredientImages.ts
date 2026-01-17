// Utility functions for ingredient images

// Get ingredient image URL based on ingredient name
export function getIngredientImage(ingredient: string): string {
  // Map ingredient names to their image identifiers for Spoonacular API
  // Using verified ingredient names that work with Spoonacular CDN
  const ingredientImageMap: Record<string, string> = {
    // Vegetables
    'tomato': 'tomato',
    'lettuce': 'iceberg-lettuce',
    'avocado': 'avocado',
    'onion': 'onion',
    'vegetables': 'mixed-vegetables',
    'cucumber': 'cucumber',
    'peppers': 'bell-pepper',
    'bell pepper': 'bell-pepper',
    'bell peppers': 'bell-pepper',
    'red bell pepper': 'bell-pepper',
    'green bell pepper': 'bell-pepper',
    'yellow bell pepper': 'bell-pepper',
    'carrots': 'carrots',
    'carrot': 'carrots',
    'celery': 'celery',
    'cabbage': 'cabbage',
    'mushrooms': 'mushrooms',
    'mushroom': 'mushrooms',
    // Try alternative names
    'button mushrooms': 'mushrooms',
    'white mushrooms': 'mushrooms',
    'bean sprouts': 'bean-sprouts',
    'potatoes': 'potato',
    'potato': 'potato',
    'russet potatoes': 'potato',
    'yukon potatoes': 'potato',
    
    // Dairy & Cheese
    'mozzarella': 'mozzarella',
    'parmesan': 'parmesan',
    'milk': 'milk',
    'butter': 'butter',
    'ricotta': 'ricotta',
    'cheddar cheese': 'cheddar-cheese',
    'cream cheese': 'cream-cheese',
    'sour cream': 'sour-cream',
    'mascarpone': 'mascarpone',
    'cream': 'heavy-cream',
    'feta cheese': 'feta-cheese',
    
    // Proteins
    'eggs': 'eggs',
    'egg': 'eggs',
    'bacon': 'bacon',
    'chicken': 'chicken-breast',
    'ground beef': 'ground-beef',
    'beef': 'beef',
    'shrimp': 'shrimp',
    'white fish': 'white-fish',
    'salmon': 'salmon',
    'tofu': 'tofu',
    
    // Carbs & Grains
    'pasta': 'pasta',
    'bread': 'bread',
    'flour': 'flour',
    'rice': 'rice',
    'croutons': 'croutons',
    'rice noodles': 'rice-noodles',
    'arborio rice': 'arborio-rice',
    'sushi rice': 'sushi-rice',
    'noodles': 'egg-noodles',
    'egg noodles': 'egg-noodles',
    'ramen noodles': 'egg-noodles',
    'nori': 'nori',
    'tortillas': 'flour-tortilla',
    'buns': 'hamburger-buns',
    'ladyfingers': 'ladyfingers',
    'graham crackers': 'graham-crackers',
    
    // Baking & Sweets
    'sugar': 'sugar',
    'brown sugar': 'brown-sugar',
    'cocoa': 'cocoa-powder',
    'vanilla': 'vanilla-extract',
    'cinnamon': 'cinnamon',
    'chocolate chips': 'chocolate-chips',
    'baking soda': 'baking-soda',
    'baking powder': 'baking-powder',
    
    // Herbs & Spices
    'basil': 'basil',
    'cilantro': 'cilantro',
    'garlic': 'garlic',
    'ginger': 'ginger',
    'black pepper': 'black-pepper',
    'curry powder': 'curry-powder',
    'cumin': 'cumin',
    'thyme': 'thyme',
    'oregano': 'oregano',
    'parsley': 'parsley',
    'jalapeño': 'jalapeno-pepper',
    
    // Citrus & Fruits
    'lemon': 'lemon',
    'lime': 'lime',
    'apples': 'apples',
    'apple': 'apples',
    'bananas': 'bananas',
    'banana': 'bananas',
    
    // Oils & Liquids
    'olive oil': 'olive-oil',
    'soy sauce': 'soy-sauce',
    'balsamic vinegar': 'balsamic-vinegar',
    'white wine': 'white-wine',
    'vegetable broth': 'vegetable-broth',
    'chicken broth': 'chicken-broth',
    'beef broth': 'beef-broth',
    'coconut milk': 'coconut-milk',
    'coffee': 'coffee',
    'dashi': 'dashi',
    'miso paste': 'miso',
    'sesame oil': 'sesame-oil',
    
    // Other
    'pickles': 'dill-pickles',
    'dill pickles': 'dill-pickles',
    'pickle': 'dill-pickles',
    'ketchup': 'ketchup',
    'peanuts': 'peanuts',
    'pine nuts': 'pine-nuts',
    'seaweed': 'seaweed',
    'chickpeas': 'chickpeas',
    'tahini': 'tahini',
    'olives': 'black-olives',
    'black olives': 'black-olives',
    'green olives': 'green-olives',
    'kalamata olives': 'black-olives',
    'wasabi': 'wasabi',
    'salt': 'salt',
    'oil': 'vegetable-oil',
  };
  
  const normalizedIngredient = ingredient.toLowerCase().trim();
  let imageId = ingredientImageMap[normalizedIngredient];
  
  // If not in map, try to generate a reasonable ID
  if (!imageId) {
    // Try singular form for plural ingredients
    if (normalizedIngredient.endsWith('s') && normalizedIngredient.length > 1) {
      const singular = normalizedIngredient.slice(0, -1);
      imageId = ingredientImageMap[singular] || singular.replace(/\s+/g, '-');
    } else {
      imageId = normalizedIngredient.replace(/\s+/g, '-');
    }
  }
  
  // Use Spoonacular's ingredient image API
  return `https://spoonacular.com/cdn/ingredients_100x100/${imageId}.jpg`;
}

// Fallback emoji for when image fails to load
export function getIngredientEmoji(ingredient: string): string {
  const emojiMap: Record<string, string> = {
    'tomato': '🍅',
    'lettuce': '🥬',
    'avocado': '🥑',
    'onion': '🧅',
    'vegetables': '🥦',
    'mozzarella': '🧀',
    'parmesan': '🧀',
    'milk': '🥛',
    'butter': '🧈',
    'eggs': '🥚',
    'bacon': '🥓',
    'chicken': '🍗',
    'pasta': '🍝',
    'bread': '🍞',
    'flour': '🌾',
    'rice': '🍚',
    'croutons': '🥖',
    'sugar': '🧂',
    'cocoa': '🍫',
    'vanilla': '🌼',
    'cinnamon': '🌰',
    'basil': '🌿',
    'cilantro': '🌿',
    'garlic': '🧄',
    'ginger': '🫚',
    'black pepper': '🧂',
    'lemon': '🍋',
    'lime': '🍋',
    'olive oil': '🫒',
    'soy sauce': '🥫',
    'balsamic vinegar': '🍶'
  };
  
  return emojiMap[ingredient.toLowerCase()] || '🍴';
}

