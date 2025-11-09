
import React from 'react';
import { CloseIcon } from './icons/CloseIcon';

interface IngredientTagProps {
  ingredient: string;
  onRemove: (ingredient: string) => void;
}

export const IngredientTag: React.FC<IngredientTagProps> = ({ ingredient, onRemove }) => {
  return (
    <span className="flex items-center bg-emerald-100 text-emerald-800 text-sm font-medium px-3 py-1 rounded-full">
      {ingredient}
      <button
        type="button"
        onClick={() => onRemove(ingredient)}
        className="ml-2 -mr-1 p-0.5 rounded-full hover:bg-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        aria-label={`Remove ${ingredient}`}
      >
        <CloseIcon className="w-3 h-3" />
      </button>
    </span>
  );
};
