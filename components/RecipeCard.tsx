
import React from 'react';
import type { Recipe } from '../types';

interface RecipeCardProps {
  recipe: Recipe;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-gray-100 overflow-hidden flex flex-col h-full">
      <div className="p-6 flex-grow">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{recipe.recipeName}</h3>
        <p className="text-gray-600 mb-4">{recipe.description}</p>
        
        <div className="flex items-center text-sm text-gray-500 mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-emerald-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.414-1.414L11 9.586V6z" clipRule="evenodd" />
          </svg>
          <span>{recipe.cookTime}</span>
        </div>

        <div className="mb-6">
          <h4 className="text-lg font-semibold mb-3 text-gray-800 border-b pb-2">Ingredients</h4>
          <ul className="space-y-2 list-disc list-inside text-gray-700">
            {recipe.ingredients.map((ing, i) => (
              <li key={i}>
                <span className="font-medium">{ing.amount}</span> {ing.name}
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h4 className="text-lg font-semibold mb-3 text-gray-800 border-b pb-2">Instructions</h4>
          <ol className="space-y-3 list-decimal list-inside text-gray-700">
            {recipe.instructions.map((step, i) => (
              <li key={i} className="leading-relaxed">{step}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};
