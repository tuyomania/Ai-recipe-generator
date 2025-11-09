
import React, { useState, useCallback } from 'react';
import { RecipeForm } from './components/RecipeForm';
import { RecipeList } from './components/RecipeList';
import { generateRecipes } from './services/geminiService';
import type { Recipe } from './types';
import { ChefHatIcon } from './components/icons/ChefHatIcon';

const App: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateRecipes = useCallback(async (ingredients: string[], mealType: string, diet: string) => {
    setIsLoading(true);
    setError(null);
    setRecipes([]);
    try {
      const result = await generateRecipes(ingredients, mealType, diet);
      if (result && result.length > 0) {
        setRecipes(result);
      } else {
        setError("Couldn't find any recipes. Try changing your ingredients or options.");
      }
    } catch (e) {
      console.error(e);
      setError('An error occurred while generating recipes. Please check your API key and try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <main className="container mx-auto px-4 py-8 md:py-12">
        <header className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center justify-center bg-emerald-500 text-white rounded-full p-3 mb-4 shadow-lg">
            <ChefHatIcon className="w-10 h-10" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Gemini Recipe Generator</h1>
          <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">
            Turn your pantry ingredients into delicious meals. Let AI be your sous-chef!
          </p>
        </header>
        
        <div className="max-w-4xl mx-auto bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-gray-200">
          <RecipeForm onGenerate={handleGenerateRecipes} isLoading={isLoading} />
        </div>
        
        <div className="mt-12">
          <RecipeList recipes={recipes} isLoading={isLoading} error={error} />
        </div>
      </main>

      <footer className="text-center py-6 text-gray-500 text-sm">
        <p>Powered by Google's Gemini API. Created with React & Tailwind CSS.</p>
      </footer>
    </div>
  );
};

export default App;
