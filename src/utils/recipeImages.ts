// Utility functions for recipe images
// Uses TheMealDB API (free, no API key required)

// Map recipe names to TheMealDB meal names for image lookup
const recipeToMealDB: Record<string, string> = {
    // Italian
    'Margherita Pizza': 'Margherita',
    'Pasta Carbonara': 'Spaghetti Carbonara',
    'Lasagna': 'Lasagne',
    'Caprese Salad': 'Caprese Salad',
    'Risotto': 'Risotto Bianco',
    'Tiramisu': 'Tiramisu',
    'Bruschetta': 'Bruschetta',
    'Pesto Pasta': 'Pesto',
    'Minestrone Soup': 'Minestra',
    'Shrimp Scampi': 'Shrimp',
    'Chicken Parmesan': 'Chicken Parmesan',

    // Mexican
    'Tacos': 'Tacos',
    'Guacamole': 'Guacamole',
    'Quesadilla': 'Quesadillas',
    'Fish Tacos': 'Fish Tacos',
    'Chicken Fajitas': 'Fajitas',
    'Salsa': 'Salsa',

    // Asian
    'Chicken Stir Fry': 'Stir Fry',
    'Pad Thai': 'Pad Thai',
    'Chicken Curry': 'Chicken Curry',
    'Fried Rice': 'Fried Rice',
    'Ramen': 'Ramen',
    'Sushi Rolls': 'Sushi',
    'Miso Soup': 'Miso Soup',
    'Chicken Tikka Masala': 'Tikka Masala',

    // Salads
    'Caesar Salad': 'Caesar Salad',
    'Greek Salad': 'Greek Salad',

    // American/Comfort Food
    'Mac and Cheese': 'Mac and Cheese',
    'Beef Burger': 'Burger',
    'Pancakes': 'Pancakes',
    'French Toast': 'French Toast',
    'Chocolate Cake': 'Chocolate',
    'Brownies': 'Brownies',
    'Cheesecake': 'Cheesecake',
    'Chocolate Chip Cookies': 'Chocolate Chip Cookies',
    'Apple Pie': 'Apple Pie',
    'Banana Bread': 'Banana Bread',

    // Middle Eastern
    'Hummus': 'Hummus',
    'Falafel': 'Falafel',

    // Soups
    'Tomato Soup': 'Tomato Soup',
    'Chicken Noodle Soup': 'Chicken Noodle Soup',
    'Beef Stew': 'Beef Stew',
};

// Get recipe image URL from TheMealDB
export function getRecipeImage(recipeName: string): string {
    // Try to find a matching meal name
    const mealName = recipeToMealDB[recipeName];

    if (mealName) {
        // TheMealDB preview images 
        return `https://www.themealdb.com/images/media/meals/${formatMealName(mealName)}.jpg`;
    }

    // Fallback: try using the recipe name directly with formatting
    return `https://www.themealdb.com/images/media/meals/${formatMealName(recipeName)}.jpg`;
}

// Format meal name for TheMealDB URL structure
function formatMealName(name: string): string {
    // Convert to lowercase and replace spaces with empty string
    // TheMealDB uses specific naming patterns, we'll generate reasonable guesses
    return name.toLowerCase().replace(/\s+/g, '').substring(0, 10);
}

// Get emoji fallback for recipes (when image fails to load)
export function getRecipeEmoji(recipeName: string): string {
    const dishEmojis: Record<string, string> = {
        'Margherita Pizza': '🍕',
        'Caesar Salad': '🥗',
        'Pasta Carbonara': '🍝',
        'Chocolate Cake': '🍰',
        'Guacamole': '🥑',
        'Chicken Stir Fry': '🍜',
        'Caprese Salad': '🥗',
        'French Toast': '🍞',
        'Lasagna': '🍝',
        'Pad Thai': '🍜',
        'Tacos': '🌮',
        'Chicken Curry': '🍛',
        'Hummus': '🥙',
        'Mac and Cheese': '🧀',
        'Tiramisu': '🍰',
        'Greek Salad': '🥗',
        'Pancakes': '🥞',
        'Beef Burger': '🍔',
        'Ramen': '🍜',
        'Brownies': '🍫',
        'Fish Tacos': '🌮',
        'Risotto': '🍚',
        'Quesadilla': '🌯',
        'Tomato Soup': '🍲',
        'Sushi Rolls': '🍣',
        'Falafel': '🥙',
        'Chicken Parmesan': '🍗',
        'Fried Rice': '🍚',
        'Cheesecake': '🍰',
        'Minestrone Soup': '🍲',
        'Shrimp Scampi': '🍤',
        'Chocolate Chip Cookies': '🍪',
        'Chicken Tikka Masala': '🍛',
        'Bruschetta': '🥖',
        'Beef Stew': '🍲',
        'Miso Soup': '🍲',
        'Chicken Fajitas': '🌯',
        'Apple Pie': '🥧',
        'Pesto Pasta': '🍝',
        'Salsa': '🌶️',
        'Chicken Noodle Soup': '🍲',
        'Banana Bread': '🍌'
    };
    return dishEmojis[recipeName] || '🍽️';
}

// Alternative: Use Unsplash for high-quality food images (fallback)
export function getRecipeImageUnsplash(recipeName: string): string {
    // Unsplash Source API - free, no API key needed for basic usage
    const query = encodeURIComponent(recipeName.toLowerCase() + ' food dish');
    return `https://source.unsplash.com/400x300/?${query}`;
}
