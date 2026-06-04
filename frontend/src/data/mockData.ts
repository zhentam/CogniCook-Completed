// ============================================================
// Mock Data Hub
// This file re-exports everything from the separate data files.
// It exists for backward compatibility — all existing imports
// from '../data/mockData' will continue to work.
//
// Architecture:
//   types.ts       → Shared TypeScript interfaces (data contract)
//   recipes.ts     → Recipes collection + recipe functions
//   ingredients.ts → Ingredients collection + ingredient functions
//   users.ts       → User preferences (saved recipes, etc.)
//   mockData.ts    → This file (re-exports everything)
//
// When connecting to a backend:
// 1. Keep types.ts as the data contract
// 2. Replace functions in recipes.ts/ingredients.ts/users.ts
//    with fetch() calls to your API
// 3. Components won't need to change their imports
// ============================================================

// Re-export types
export type { Recipe, Ingredient, UserPreferences, QuadLockSelections } from './types';

// Re-export recipes data + functions
export {
  recipes,
  getRecipeById,
  getSavedRecipes,
  toggleRecipeSaved,
  filterRecipes
} from './recipes';

// Re-export ingredients data + functions
export {
  masterIngredients,
  ingredients,
  addIngredient,
  removeIngredient,
  removeAllIngredients,
  updateIngredientAmount,
  getMasterIngredientById,
  quickAddAll
} from './ingredients';

// Re-export user preferences + functions
export {
  userPreferences,
  getSavedRecipeIds,
  toggleSavedRecipeId
} from './users';

// Re-export constants
export const cookingMethods = [
  'Baking',
  'Frying',
  'Grilling',
  'Steaming',
  'Boiling',
  'Roasting',
  'Slow Cooking',
  'Stir-Frying',
  'Raw/No Cook',
  'Pressure Cooking'
];

export const timeOptions = {
  min: 0,
  max: 30,
  defaultMin: 10,
  defaultMax: 30
};

export const dinerOptions = {
  daily: [
    { label: '1 person', value: 1 },
    { label: '2 people', value: 2 }
  ],
  social: [
    { label: '4 people', value: 4 },
    { label: '6 people', value: 6 },
    { label: '8+ people', value: 8 }
  ]
};