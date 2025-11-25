import { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import IngredientSelector from './components/IngredientSelector';
import CookingBoard from './components/CookingBoard';
import ActionsBar from './components/ActionsBar';
import ResultsPanel from './components/ResultsPanel';
import ChefAI from './components/ChefAI';
import DishModal from './components/DishModal';
import { ALL_INGREDIENTS } from './data/recipes';
import { recommendRecipes, calculateScoreUpdate, getChefFeedback } from './logic/recipeEngine';
import type { RecipeMatch, AIResponse } from './types';
import type { Recipe } from './types';
import { useAuth } from './contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const SCORE_STORAGE_KEY = 'chef_score';

function CookingApp() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  // State management
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [recommendations, setRecommendations] = useState<RecipeMatch[]>([]);
  const [aiResponse, setAiResponse] = useState<AIResponse | null>(null);
  const [score, setScore] = useState<number>(() => {
    // Initialize score from localStorage
    const saved = localStorage.getItem(SCORE_STORAGE_KEY);
    return saved ? parseInt(saved, 10) : 0;
  });
  const [completedDish, setCompletedDish] = useState<Recipe | null>(null);

  // Persist score to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(SCORE_STORAGE_KEY, score.toString());
  }, [score]);

  // Toggle ingredient selection
  const toggleIngredient = (ingredient: string) => {
    setSelectedIngredients(prev => {
      if (prev.includes(ingredient)) {
        return prev.filter(i => i !== ingredient);
      } else {
        return [...prev, ingredient];
      }
    });
  };

  // Remove ingredient
  const removeIngredient = (ingredient: string) => {
    setSelectedIngredients(prev => prev.filter(i => i !== ingredient));
  };

  // Handle Cook action
  const handleCook = () => {
    if (selectedIngredients.length === 0) return;

    // Get recipe recommendations
    const matches = recommendRecipes(selectedIngredients);
    setRecommendations(matches);

    // Calculate and update score
    const pointsEarned = calculateScoreUpdate(matches, selectedIngredients.length);
    setScore(prev => prev + pointsEarned);

    // Get AI feedback
    const feedback = getChefFeedback(selectedIngredients, matches);
    setAiResponse(feedback);

    // Show dish modal if there's a perfect match
    const perfectMatch = matches.find(m => m.isPerfect);
    if (perfectMatch) {
      setTimeout(() => {
        setCompletedDish(perfectMatch.recipe);
      }, 500);
    }
  };

  // Handle Clear action
  const handleClear = () => {
    setSelectedIngredients([]);
    setRecommendations([]);
    setAiResponse(null);
  };

  // Close dish modal
  const closeDishModal = () => {
    setCompletedDish(null);
  };

  // Handle logout
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="app">
      <Header score={score} />
      
      {/* User Info & Logout */}
      <div className="user-bar">
        <span className="user-greeting">👋 Welcome, {user?.displayName}!</span>
        <button className="logout-btn" onClick={handleLogout}>
          🚪 Logout
        </button>
      </div>
      
      <main className="app-main">
        <div className="left-column">
          <IngredientSelector
            allIngredients={ALL_INGREDIENTS}
            selectedIngredients={selectedIngredients}
            onToggle={toggleIngredient}
          />
        </div>

        <div className="middle-column">
          <CookingBoard
            selectedIngredients={selectedIngredients}
            onRemove={removeIngredient}
          />
          <ActionsBar
            onCook={handleCook}
            onClear={handleClear}
            disabled={selectedIngredients.length === 0}
          />
        </div>

        <div className="right-column">
          <ResultsPanel recommendations={recommendations} />
          <ChefAI aiResponse={aiResponse} />
        </div>
      </main>

      <DishModal recipe={completedDish} onClose={closeDishModal} />
    </div>
  );
}

export default CookingApp;
