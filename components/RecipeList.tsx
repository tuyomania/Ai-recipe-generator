
import React from 'react';
import type { Recipe } from '../types';
import { RecipeCard } from './RecipeCard';

interface RecipeListProps {
  recipes: Recipe[];
  isLoading: boolean;
  error: string | null;
}

const SkeletonCard: React.FC = () => (
  <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 animate-pulse">
    <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
    <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
    <div className="h-4 bg-gray-200 rounded w-5/6 mb-6"></div>
    <div className="h-5 bg-gray-200 rounded w-1/3 mb-4"></div>
    <div className="space-y-2">
      <div className="h-4 bg-gray-200 rounded"></div>
      <div className="h-4 bg-gray-200 rounded"></div>
      <div className="h-4 bg-gray-200 rounded"></div>
    </div>
  </div>
);

export const RecipeList: React.FC<RecipeListProps> = ({ recipes, isLoading, error }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 px-6 bg-red-50 border border-red-200 rounded-lg">
        <h3 className="text-xl font-semibold text-red-700">Oops! Something went wrong.</h3>
        <p className="mt-2 text-red-600">{error}</p>
      </div>
    );
  }

  if (recipes.length === 0) {
    return (
      <div className="text-center py-10 px-6 bg-gray-100 border border-gray-200 rounded-lg">
        <h3 className="text-xl font-semibold text-gray-700">Ready to cook?</h3>
        <p className="mt-2 text-gray-500">Enter some ingredients and let's find your next favorite meal!</p>
      </div>
    );
  }

  return (
    <div>
       <h2 className="text-3xl font-bold text-center mb-8">Your Recipe Suggestions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {recipes.map((recipe, index) => (
          <RecipeCard key={index} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};
