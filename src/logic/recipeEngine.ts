import type { RecipeMatch, AIResponse } from '../types';
import { RECIPES } from '../data/recipes';

/**
 * DSA-based recipe recommendation engine
 * Computes match scores and categorizes recipes based on user ingredients
 */
export function recommendRecipes(userIngredients: string[]): RecipeMatch[] {
    const normalizedUserIngredients = userIngredients.map(i => i.toLowerCase());

    const matches: RecipeMatch[] = RECIPES.map(recipe => {
        const normalizedRecipeIngredients = recipe.ingredients.map(i => i.toLowerCase());

        // Compute intersection (ingredients user has)
        const have = normalizedRecipeIngredients.filter(ingredient =>
            normalizedUserIngredients.includes(ingredient)
        );

        // Compute missing ingredients
        const missing = normalizedRecipeIngredients.filter(ingredient =>
            !normalizedUserIngredients.includes(ingredient)
        );

        // Calculate match score (0 to 1)
        const matchScore = recipe.ingredients.length > 0
            ? have.length / recipe.ingredients.length
            : 0;

        // Determine match quality flags
        const isPerfect = missing.length === 0 && have.length > 0;
        const isNear = missing.length === 1 && have.length > 0;

        return {
            recipe,
            have: have.map(i =>
                recipe.ingredients.find(ri => ri.toLowerCase() === i) || i
            ),
            missing: missing.map(i =>
                recipe.ingredients.find(ri => ri.toLowerCase() === i) || i
            ),
            matchScore,
            isPerfect,
            isNear
        };
    });

    // Sort by match score (descending)
    return matches.sort((a, b) => b.matchScore - a.matchScore);
}

/**
 * Calculate score update based on recipe matches
 */
export function calculateScoreUpdate(
    matches: RecipeMatch[],
    selectedCount: number
): number {
    let points = 0;

    // +50 points per perfect recipe
    const perfectCount = matches.filter(m => m.isPerfect).length;
    points += perfectCount * 50;

    // +20 points if there's any near recipe (only count once)
    const hasNearMatch = matches.some(m => m.isNear);
    if (hasNearMatch && perfectCount === 0) {
        points += 20;
    }

    // +10 points for creative attempt (3+ ingredients, no perfect/near matches)
    if (selectedCount >= 3 && perfectCount === 0 && !hasNearMatch) {
        points += 10;
    }

    return points;
}

/**
 * Mock AI Chef feedback generator
 * Returns personalized feedback based on cooking attempt
 */
export function getChefFeedback(
    selectedIngredients: string[],
    topMatches: RecipeMatch[]
): AIResponse {
    if (selectedIngredients.length === 0) {
        return {
            bestGuess: 'Nothing',
            score: 0,
            suggestedIngredient: 'anything',
            description: '🤔 You need to select some ingredients first, chef!'
        };
    }

    const perfectMatches = topMatches.filter(m => m.isPerfect);
    const nearMatches = topMatches.filter(m => m.isNear);
    const topMatch = topMatches[0];

    // Perfect match responses
    if (perfectMatches.length > 0) {
        const recipes = perfectMatches.map(m => m.recipe.name).join(' or ');
        const descriptions = [
            `🎉 Perfection! You've nailed the ingredients for ${recipes}! Time to cook!`,
            `👨‍🍳 Excellent work! That's a perfect ${recipes} you've got there!`,
            `⭐ Amazing! You're a natural chef! Those ingredients make a perfect ${recipes}!`,
            `🔥 Outstanding! ${recipes} is exactly what those ingredients create!`
        ];

        return {
            bestGuess: perfectMatches[0].recipe.name,
            score: 95 + Math.floor(Math.random() * 6),
            suggestedIngredient: 'none',
            description: descriptions[Math.floor(Math.random() * descriptions.length)]
        };
    }

    // Near match responses
    if (nearMatches.length > 0) {
        const recipe = nearMatches[0].recipe.name;
        const missingIng = nearMatches[0].missing[0];
        const descriptions = [
            `🔥 So close! You're just missing ${missingIng} for a perfect ${recipe}!`,
            `💡 Almost there! Add ${missingIng} and you'll have ${recipe}!`,
            `👍 Great start! ${recipe} needs just one more thing: ${missingIng}!`,
            `🎯 You're one ingredient away from ${recipe}! Try adding ${missingIng}!`
        ];

        return {
            bestGuess: recipe,
            score: 70 + Math.floor(Math.random() * 15),
            suggestedIngredient: missingIng,
            description: descriptions[Math.floor(Math.random() * descriptions.length)]
        };
    }

    // Creative attempt with some matches
    if (topMatch.matchScore > 0) {
        const recipe = topMatch.recipe.name;
        const matchPercent = Math.round(topMatch.matchScore * 100);
        const missingIng = topMatch.missing[0] || 'more ingredients';
        const descriptions = [
            `🤔 Interesting combo! It's ${matchPercent}% like ${recipe}. Try adding ${missingIng}!`,
            `💭 Creative thinking! Maybe ${recipe}? You'd need ${missingIng} though.`,
            `🎨 Experimental! This reminds me of ${recipe}, but needs ${missingIng}.`,
            `🌟 Bold choice! Close to ${recipe}, missing ${missingIng}.`
        ];

        return {
            bestGuess: recipe,
            score: 40 + Math.floor(Math.random() * 20),
            suggestedIngredient: missingIng,
            description: descriptions[Math.floor(Math.random() * descriptions.length)]
        };
    }

    // No matches at all
    const randomSuggestion = RECIPES[Math.floor(Math.random() * RECIPES.length)];
    const descriptions = [
        `🎨 Very creative! I haven't seen this combination before. Maybe try a ${randomSuggestion.name}?`,
        `🌈 Unique approach! While unconventional, keep experimenting! How about ${randomSuggestion.name}?`,
        `🔬 Experimental cuisine! The ingredients don't match known recipes, but that's okay!`,
        `💡 Innovative! This is a new flavor profile. Perhaps aim for ${randomSuggestion.name} next?`
    ];

    return {
        bestGuess: 'Mystery Dish',
        score: 15 + Math.floor(Math.random() * 20),
        suggestedIngredient: randomSuggestion.ingredients[0],
        description: descriptions[Math.floor(Math.random() * descriptions.length)]
    };
}
