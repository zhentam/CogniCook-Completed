// ============================================================
// Shared Type Definitions
// These interfaces define the data contract between frontend
// and backend. When connecting to a real API, the backend
// should return JSON that matches these shapes.
// ============================================================

export interface Recipe {
  id: string;
  name: string;
  description: string;
  ingredients: string[];
  method: string;
  time: number;
  tags: string[];
  isSaved: boolean;
  mealType: 'daily' | 'social';
  imageUrl?: string;
}

export interface Ingredient {
  id: string;
  name: string;
  category: string;
  expiryDays: number;
  amount: number;
  unit: string;
}

export interface UserPreferences {
  savedRecipeIds: string[];
}

export interface QuadLockSelections {
  ingredients: string[];
  method: string[];
  time: number;
  diners: number | null;
  mealType: 'daily' | 'social';
}