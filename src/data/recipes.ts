import type { Recipe } from '../types';

// Recipe database with diverse dishes
export const RECIPES: Recipe[] = [
    {
        name: 'Margherita Pizza',
        ingredients: ['tomato', 'mozzarella', 'basil', 'flour', 'olive oil'],
        difficulty: 'Medium',
        tags: ['italian', 'vegetarian', 'classic']
    },
    {
        name: 'Caesar Salad',
        ingredients: ['lettuce', 'parmesan', 'croutons', 'lemon', 'garlic'],
        difficulty: 'Easy',
        tags: ['salad', 'vegetarian', 'healthy']
    },
    {
        name: 'Pasta Carbonara',
        ingredients: ['pasta', 'eggs', 'bacon', 'parmesan', 'black pepper'],
        difficulty: 'Medium',
        tags: ['italian', 'comfort food']
    },
    {
        name: 'Chocolate Cake',
        ingredients: ['flour', 'sugar', 'cocoa', 'eggs', 'butter', 'vanilla'],
        difficulty: 'Hard',
        tags: ['dessert', 'baking', 'sweet']
    },
    {
        name: 'Guacamole',
        ingredients: ['avocado', 'lime', 'cilantro', 'onion', 'tomato'],
        difficulty: 'Easy',
        tags: ['mexican', 'dip', 'vegan', 'healthy']
    },
    {
        name: 'Chicken Stir Fry',
        ingredients: ['chicken', 'soy sauce', 'ginger', 'garlic', 'vegetables', 'rice'],
        difficulty: 'Medium',
        tags: ['asian', 'quick', 'protein']
    },
    {
        name: 'Caprese Salad',
        ingredients: ['tomato', 'mozzarella', 'basil', 'olive oil', 'balsamic vinegar'],
        difficulty: 'Easy',
        tags: ['italian', 'vegetarian', 'fresh']
    },
    {
        name: 'French Toast',
        ingredients: ['bread', 'eggs', 'milk', 'cinnamon', 'vanilla', 'butter'],
        difficulty: 'Easy',
        tags: ['breakfast', 'sweet', 'comfort food']
    },
    {
        name: 'Lasagna',
        ingredients: ['pasta', 'ground beef', 'tomato', 'mozzarella', 'ricotta', 'onion', 'garlic', 'basil'],
        difficulty: 'Hard',
        tags: ['italian', 'comfort food', 'baking']
    },
    {
        name: 'Pad Thai',
        ingredients: ['rice noodles', 'shrimp', 'eggs', 'bean sprouts', 'peanuts', 'lime', 'soy sauce', 'ginger'],
        difficulty: 'Medium',
        tags: ['thai', 'asian', 'noodles']
    },
    {
        name: 'Tacos',
        ingredients: ['ground beef', 'tortillas', 'lettuce', 'tomato', 'cheese', 'onion', 'cilantro', 'lime'],
        difficulty: 'Easy',
        tags: ['mexican', 'quick', 'protein']
    },
    {
        name: 'Chicken Curry',
        ingredients: ['chicken', 'curry powder', 'coconut milk', 'onion', 'garlic', 'ginger', 'tomato', 'rice'],
        difficulty: 'Medium',
        tags: ['indian', 'asian', 'spicy', 'protein']
    },
    {
        name: 'Hummus',
        ingredients: ['chickpeas', 'tahini', 'lemon', 'garlic', 'olive oil', 'cumin'],
        difficulty: 'Easy',
        tags: ['mediterranean', 'dip', 'vegan', 'healthy']
    },
    {
        name: 'Mac and Cheese',
        ingredients: ['pasta', 'cheddar cheese', 'milk', 'butter', 'flour', 'breadcrumbs'],
        difficulty: 'Medium',
        tags: ['american', 'comfort food', 'vegetarian']
    },
    {
        name: 'Tiramisu',
        ingredients: ['ladyfingers', 'mascarpone', 'coffee', 'cocoa', 'eggs', 'sugar', 'vanilla'],
        difficulty: 'Hard',
        tags: ['italian', 'dessert', 'no-bake']
    },
    {
        name: 'Greek Salad',
        ingredients: ['cucumber', 'tomato', 'feta cheese', 'olives', 'onion', 'olive oil', 'lemon', 'oregano'],
        difficulty: 'Easy',
        tags: ['greek', 'mediterranean', 'vegetarian', 'healthy']
    },
    {
        name: 'Pancakes',
        ingredients: ['flour', 'eggs', 'milk', 'sugar', 'baking powder', 'butter', 'vanilla'],
        difficulty: 'Easy',
        tags: ['breakfast', 'american', 'sweet']
    },
    {
        name: 'Beef Burger',
        ingredients: ['ground beef', 'buns', 'lettuce', 'tomato', 'onion', 'pickles', 'cheese', 'ketchup'],
        difficulty: 'Easy',
        tags: ['american', 'protein', 'quick']
    },
    {
        name: 'Ramen',
        ingredients: ['noodles', 'chicken broth', 'eggs', 'green onions', 'soy sauce', 'ginger', 'garlic', 'mushrooms'],
        difficulty: 'Medium',
        tags: ['japanese', 'asian', 'soup', 'comfort food']
    },
    {
        name: 'Brownies',
        ingredients: ['flour', 'sugar', 'cocoa', 'eggs', 'butter', 'vanilla', 'chocolate chips'],
        difficulty: 'Easy',
        tags: ['dessert', 'baking', 'sweet', 'american']
    },
    {
        name: 'Fish Tacos',
        ingredients: ['white fish', 'tortillas', 'cabbage', 'lime', 'cilantro', 'avocado', 'sour cream', 'onion'],
        difficulty: 'Medium',
        tags: ['mexican', 'seafood', 'healthy']
    },
    {
        name: 'Risotto',
        ingredients: ['arborio rice', 'chicken broth', 'parmesan', 'onion', 'white wine', 'butter', 'garlic'],
        difficulty: 'Hard',
        tags: ['italian', 'vegetarian', 'comfort food']
    },
    {
        name: 'Quesadilla',
        ingredients: ['tortillas', 'cheese', 'chicken', 'onion', 'peppers', 'cilantro', 'sour cream'],
        difficulty: 'Easy',
        tags: ['mexican', 'quick', 'protein']
    },
    {
        name: 'Tomato Soup',
        ingredients: ['tomato', 'onion', 'garlic', 'vegetable broth', 'cream', 'basil', 'olive oil', 'black pepper'],
        difficulty: 'Easy',
        tags: ['soup', 'vegetarian', 'comfort food', 'healthy']
    },
    {
        name: 'Sushi Rolls',
        ingredients: ['sushi rice', 'nori', 'salmon', 'cucumber', 'avocado', 'soy sauce', 'wasabi', 'ginger'],
        difficulty: 'Hard',
        tags: ['japanese', 'seafood', 'healthy']
    },
    {
        name: 'Falafel',
        ingredients: ['chickpeas', 'onion', 'garlic', 'cilantro', 'cumin', 'flour', 'baking powder', 'oil'],
        difficulty: 'Medium',
        tags: ['mediterranean', 'vegan', 'healthy', 'middle eastern']
    },
    {
        name: 'Chicken Parmesan',
        ingredients: ['chicken', 'breadcrumbs', 'parmesan', 'mozzarella', 'tomato sauce', 'pasta', 'eggs', 'flour'],
        difficulty: 'Medium',
        tags: ['italian', 'protein', 'comfort food']
    },
    {
        name: 'Fried Rice',
        ingredients: ['rice', 'eggs', 'soy sauce', 'vegetables', 'garlic', 'ginger', 'green onions', 'sesame oil'],
        difficulty: 'Easy',
        tags: ['chinese', 'asian', 'quick', 'comfort food']
    },
    {
        name: 'Cheesecake',
        ingredients: ['cream cheese', 'sugar', 'eggs', 'graham crackers', 'butter', 'vanilla', 'sour cream'],
        difficulty: 'Hard',
        tags: ['dessert', 'baking', 'american', 'sweet']
    },
    {
        name: 'Minestrone Soup',
        ingredients: ['vegetables', 'tomato', 'beans', 'pasta', 'onion', 'garlic', 'vegetable broth', 'basil', 'parmesan'],
        difficulty: 'Medium',
        tags: ['italian', 'soup', 'vegetarian', 'healthy']
    },
    {
        name: 'Shrimp Scampi',
        ingredients: ['shrimp', 'pasta', 'garlic', 'white wine', 'lemon', 'butter', 'parsley', 'olive oil'],
        difficulty: 'Medium',
        tags: ['italian', 'seafood', 'quick']
    },
    {
        name: 'Chocolate Chip Cookies',
        ingredients: ['flour', 'sugar', 'brown sugar', 'butter', 'eggs', 'vanilla', 'chocolate chips', 'baking soda'],
        difficulty: 'Easy',
        tags: ['dessert', 'baking', 'american', 'sweet']
    },
    {
        name: 'Chicken Tikka Masala',
        ingredients: ['chicken', 'tomato', 'cream', 'onion', 'garlic', 'ginger', 'curry powder', 'rice', 'cilantro'],
        difficulty: 'Medium',
        tags: ['indian', 'asian', 'spicy', 'protein']
    },
    {
        name: 'Bruschetta',
        ingredients: ['bread', 'tomato', 'basil', 'garlic', 'olive oil', 'balsamic vinegar', 'mozzarella'],
        difficulty: 'Easy',
        tags: ['italian', 'appetizer', 'vegetarian', 'fresh']
    },
    {
        name: 'Beef Stew',
        ingredients: ['beef', 'potatoes', 'carrots', 'onion', 'garlic', 'beef broth', 'tomato', 'thyme', 'flour'],
        difficulty: 'Medium',
        tags: ['comfort food', 'protein', 'hearty']
    },
    {
        name: 'Miso Soup',
        ingredients: ['miso paste', 'tofu', 'seaweed', 'green onions', 'dashi', 'soy sauce'],
        difficulty: 'Easy',
        tags: ['japanese', 'soup', 'vegan', 'healthy']
    },
    {
        name: 'Chicken Fajitas',
        ingredients: ['chicken', 'peppers', 'onion', 'tortillas', 'lime', 'cilantro', 'cumin', 'garlic', 'sour cream'],
        difficulty: 'Easy',
        tags: ['mexican', 'protein', 'quick']
    },
    {
        name: 'Apple Pie',
        ingredients: ['apples', 'flour', 'sugar', 'butter', 'cinnamon', 'lemon', 'eggs', 'vanilla'],
        difficulty: 'Hard',
        tags: ['dessert', 'baking', 'american', 'sweet']
    },
    {
        name: 'Pesto Pasta',
        ingredients: ['pasta', 'basil', 'pine nuts', 'parmesan', 'garlic', 'olive oil', 'lemon'],
        difficulty: 'Easy',
        tags: ['italian', 'vegetarian', 'quick']
    },
    {
        name: 'Salsa',
        ingredients: ['tomato', 'onion', 'cilantro', 'jalapeño', 'lime', 'garlic', 'salt'],
        difficulty: 'Easy',
        tags: ['mexican', 'dip', 'vegan', 'spicy']
    },
    {
        name: 'Chicken Noodle Soup',
        ingredients: ['chicken', 'noodles', 'carrots', 'celery', 'onion', 'chicken broth', 'thyme', 'garlic'],
        difficulty: 'Easy',
        tags: ['soup', 'comfort food', 'protein', 'healthy']
    },
    {
        name: 'Banana Bread',
        ingredients: ['bananas', 'flour', 'sugar', 'eggs', 'butter', 'baking soda', 'vanilla', 'cinnamon'],
        difficulty: 'Easy',
        tags: ['dessert', 'baking', 'breakfast', 'sweet']
    }
];

// Extract all unique ingredients from recipes and sort alphabetically
export const ALL_INGREDIENTS: string[] = Array.from(
    new Set(RECIPES.flatMap(recipe => recipe.ingredients))
).sort();
