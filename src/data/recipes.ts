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
    }
];

// Extract all unique ingredients from recipes and sort alphabetically
export const ALL_INGREDIENTS: string[] = Array.from(
    new Set(RECIPES.flatMap(recipe => recipe.ingredients))
).sort();
