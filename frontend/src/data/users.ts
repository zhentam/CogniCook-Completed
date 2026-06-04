// ============================================================
// User Preferences
// This file acts as the "user_preferences table" in the database.
// It stores user-specific data like saved recipes.
// When connecting to a backend, replace this with API calls
// like: GET /api/user/preferences, PATCH /api/user/preferences
// ============================================================

import { UserPreferences } from './types';

// Mock user preferences (single user for now)
export const userPreferences: UserPreferences = {
  savedRecipeIds: []
};

// --- User Preferences "API" functions ---
// These simulate backend calls. When connecting to a real API,
// replace the logic inside these functions with fetch() calls.

export const getSavedRecipeIds = (): string[] => {
  // TODO: Replace with GET /api/user/preferences → return savedRecipeIds
  return userPreferences.savedRecipeIds;
};

export const toggleSavedRecipeId = (recipeId: string): boolean => {
  // TODO: Replace with PATCH /api/user/preferences { toggle: recipeId }
  const index = userPreferences.savedRecipeIds.indexOf(recipeId);
  if (index !== -1) {
    userPreferences.savedRecipeIds.splice(index, 1);
    return false; // Removed
  } else {
    userPreferences.savedRecipeIds.push(recipeId);
    return true; // Added
  }
};