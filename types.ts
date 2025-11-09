
export interface Recipe {
  recipeName: string;
  description: string;
  cookTime: string;
  ingredients: {
    name: string;
    amount: string;
  }[];
  instructions: string[];
}
