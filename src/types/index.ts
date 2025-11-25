// Core type definitions for the AI Cooking Simulator

export interface Recipe {
  name: string;
  ingredients: string[];
  difficulty: 'Easy' | 'Medium' | 'Hard';
  tags?: string[];
}

export interface RecipeMatch {
  recipe: Recipe;
  have: string[];
  missing: string[];
  matchScore: number;
  isPerfect: boolean;
  isNear: boolean;
}

export interface AIResponse {
  bestGuess: string;
  score: number;
  suggestedIngredient: string;
  description: string;
}
