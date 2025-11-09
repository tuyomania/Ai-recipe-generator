
import { GoogleGenAI, Type } from "@google/genai";
import type { Recipe } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const recipeSchema = {
  type: Type.OBJECT,
  properties: {
    recipeName: {
      type: Type.STRING,
      description: "The creative and appealing name of the recipe.",
    },
    description: {
      type: Type.STRING,
      description: "A short, enticing description of the dish, around 1-2 sentences.",
    },
    cookTime: {
        type: Type.STRING,
        description: "Estimated total cooking and prep time, e.g., '45 minutes'."
    },
    ingredients: {
      type: Type.ARRAY,
      description: "All ingredients needed for the recipe.",
      items: {
        type: Type.OBJECT,
        properties: {
          name: {
            type: Type.STRING,
            description: "Name of the ingredient.",
          },
          amount: {
            type: Type.STRING,
            description: "Quantity and unit of the ingredient, e.g., '2 cups' or '1 tbsp'.",
          },
        },
        required: ['name', 'amount'],
      },
    },
    instructions: {
      type: Type.ARRAY,
      description: "Step-by-step instructions to prepare the dish.",
      items: {
        type: Type.STRING,
        description: "A single step in the cooking instructions.",
      },
    },
  },
  required: ['recipeName', 'description', 'cookTime', 'ingredients', 'instructions'],
};

const responseSchema = {
    type: Type.ARRAY,
    items: recipeSchema,
};


export const generateRecipes = async (
  ingredients: string[],
  mealType: string,
  diet: string
): Promise<Recipe[]> => {
  const ingredientsString = ingredients.join(', ');
  
  let prompt = `Generate 3 unique recipe ideas`;
  if (mealType.toLowerCase() !== 'any') {
    prompt += ` for a ${mealType}`;
  }
  prompt += `. The recipes must primarily use the following ingredients: ${ingredientsString}.`;
  if (diet.toLowerCase() !== 'none') {
    prompt += ` The recipes must be strictly ${diet}.`;
  }
  prompt += ` For each recipe, provide a catchy name, a brief description, total cook time, a list of all required ingredients with amounts, and step-by-step instructions.`;


  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.7,
      }
    });
    
    const jsonText = response.text.trim();
    const recipes = JSON.parse(jsonText) as Recipe[];
    return recipes;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to generate recipes from the API.");
  }
};
