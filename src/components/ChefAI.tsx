import type { AIResponse } from '../types';

interface ChefAIProps {
  aiResponse: AIResponse | null;
}

export default function ChefAI({ aiResponse }: ChefAIProps) {
  if (!aiResponse) {
    return null;
  }

  return (
    <div className="chef-ai">
      <h2 className="section-title">👨‍🍳 Chef AI Feedback</h2>
      
      <div className="ai-card">
        <div className="ai-header">
          <h3 className="ai-guess">Best Guess: {aiResponse.bestGuess}</h3>
          <div className="ai-score-badge">
            {aiResponse.score}/100
          </div>
        </div>

        <div className="ai-score-visual">
          <div className="score-bar-container">
            <div 
              className="score-bar-fill ai-score" 
              style={{ width: `${aiResponse.score}%` }}
            />
          </div>
        </div>

        <div className="ai-description">
          <p>{aiResponse.description}</p>
        </div>

        {aiResponse.suggestedIngredient && aiResponse.suggestedIngredient !== 'none' && (
          <div className="ai-suggestion">
            <span className="suggestion-label">💡 Try adding:</span>
            <span className="suggestion-value">{aiResponse.suggestedIngredient}</span>
          </div>
        )}
      </div>
    </div>
  );
}
