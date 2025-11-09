
import React, { useState, KeyboardEvent } from 'react';
import { IngredientTag } from './IngredientTag';

interface RecipeFormProps {
  onGenerate: (ingredients: string[], mealType: string, diet: string) => void;
  isLoading: boolean;
}

const mealTypes = ["Any", "Breakfast", "Lunch", "Dinner", "Snack", "Dessert"];
const dietOptions = ["None", "Vegan", "Vegetarian", "Gluten-Free", "Keto", "Paleo"];

export const RecipeForm: React.FC<RecipeFormProps> = ({ onGenerate, isLoading }) => {
  const [ingredients, setIngredients] = useState<string[]>(["chicken breast", "rice", "broccoli"]);
  const [currentIngredient, setCurrentIngredient] = useState<string>('');
  const [mealType, setMealType] = useState<string>('Any');
  const [diet, setDiet] = useState<string>('None');

  const handleAddIngredient = () => {
    if (currentIngredient.trim() && !ingredients.includes(currentIngredient.trim().toLowerCase())) {
      setIngredients([...ingredients, currentIngredient.trim().toLowerCase()]);
      setCurrentIngredient('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      handleAddIngredient();
    }
  };

  const removeIngredient = (ingredientToRemove: string) => {
    setIngredients(ingredients.filter(ing => ing !== ingredientToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (ingredients.length > 0) {
      onGenerate(ingredients, mealType, diet);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="ingredients" className="block text-lg font-semibold mb-2 text-gray-700">
          What ingredients do you have?
        </label>
        <div className="flex flex-wrap items-center gap-2 p-2 border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-emerald-500 focus-within:border-emerald-500">
          {ingredients.map(ing => (
            <IngredientTag key={ing} ingredient={ing} onRemove={removeIngredient} />
          ))}
          <input
            id="ingredients"
            type="text"
            value={currentIngredient}
            onChange={e => setCurrentIngredient(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Add an ingredient and press Enter"
            className="flex-grow p-1 outline-none bg-transparent"
          />
        </div>
        <p className="text-sm text-gray-500 mt-2">Enter an ingredient and press Enter or comma to add it to the list.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="mealType" className="block text-lg font-semibold mb-2 text-gray-700">
            Meal Type
          </label>
          <select
            id="mealType"
            value={mealType}
            onChange={e => setMealType(e.target.value)}
            className="w-full p-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
          >
            {mealTypes.map(type => <option key={type} value={type}>{type}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="diet" className="block text-lg font-semibold mb-2 text-gray-700">
            Dietary Preference
          </label>
          <select
            id="diet"
            value={diet}
            onChange={e => setDiet(e.target.value)}
            className="w-full p-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
          >
            {dietOptions.map(option => <option key={option} value={option}>{option}</option>)}
          </select>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading || ingredients.length === 0}
        className="w-full flex items-center justify-center bg-emerald-500 text-white font-bold py-4 px-6 rounded-lg hover:bg-emerald-600 focus:outline-none focus:ring-4 focus:ring-emerald-300 transition-all duration-300 disabled:bg-emerald-300 disabled:cursor-not-allowed text-lg"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating...
          </>
        ) : (
          'Generate Recipes'
        )}
      </button>
    </form>
  );
};
