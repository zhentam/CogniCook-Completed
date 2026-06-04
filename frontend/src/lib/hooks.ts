/**
 * hooks.ts — Custom React hooks for backend data
 *
 * These hooks replace the old in-memory arrays with per-user
 * data loaded from the Supabase backend via our API.
 *
 * - useIngredients()  → user's kitchen ingredients
 * - useSavedRecipes() → user's saved recipe IDs
 */

import { useState, useEffect, useCallback } from 'react';
import { getAccessToken } from '../utils/auth';
import {
  getIngredients,
  addIngredient as apiAddIngredient,
  removeIngredient as apiRemoveIngredient,
  removeAllIngredients as apiRemoveAllIngredients,
  getSavedRecipes,
  toggleSavedRecipe,
} from './backendApi';
import { masterIngredients, type Ingredient } from '../data/mockData';

// ── Types ─────────────────────────────────────────────────────────

/** Shape of ingredient data returned from the backend */
interface BackendIngredient {
  id: number;
  user_id: string;
  ingredient_name: string;
  category: string;
  amount: number;
  unit: string;
  expiry_days: number;
  added_at: string;
}

// =====================================================================
// useIngredients — loads user's kitchen from backend
// =====================================================================

export function useIngredients() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState(true);

  // Load from backend on mount
  const loadIngredients = useCallback(async () => {
    const token = getAccessToken();
    if (!token) {
      setIngredients([]);
      setLoading(false);
      return;
    }
    try {
      const data: BackendIngredient[] = await getIngredients(token);
      // Map backend shape → frontend Ingredient type
      const mapped: Ingredient[] = data.map((row) => ({
        id: String(row.id),
        name: row.ingredient_name,
        category: row.category,
        amount: row.amount,
        unit: row.unit,
        expiryDays: row.expiry_days,
      }));
      setIngredients(mapped);
    } catch (err) {
      console.error('Failed to load ingredients:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadIngredients();
  }, [loadIngredients]);

  // Add ingredient to backend
  const addIngredient = useCallback(async (masterId: string, amount: number): Promise<boolean> => {
    const token = getAccessToken();
    if (!token) return false;

    const masterItem = masterIngredients.find((m) => m.id === masterId);
    if (!masterItem) return false;

    // Check if already in kitchen
    if (ingredients.some((i) => i.name === masterItem.name)) return false;

    try {
      const result = await apiAddIngredient(token, {
        ingredient_name: masterItem.name,
        category: masterItem.category,
        amount: amount || masterItem.amount,
        unit: masterItem.unit,
        expiry_days: masterItem.expiryDays,
      });
      // Add to local state (map from backend response)
      if (result && result.length > 0) {
        const row = result[0];
        setIngredients((prev) => [
          {
            id: String(row.id),
            name: row.ingredient_name,
            category: row.category,
            amount: row.amount,
            unit: row.unit,
            expiryDays: row.expiry_days,
          },
          ...prev,
        ]);
      }
      return true;
    } catch (err) {
      console.error('Failed to add ingredient:', err);
      return false;
    }
  }, [ingredients]);

  // Remove one ingredient
  const removeIngredient = useCallback(async (id: string) => {
    const token = getAccessToken();
    if (!token) return;
    try {
      await apiRemoveIngredient(token, Number(id));
      setIngredients((prev) => prev.filter((i) => i.id !== id));
    } catch (err) {
      console.error('Failed to remove ingredient:', err);
    }
  }, []);

  // Remove all ingredients
  const removeAllIngredients = useCallback(async () => {
    const token = getAccessToken();
    if (!token) return;
    try {
      await apiRemoveAllIngredients(token);
      setIngredients([]);
    } catch (err) {
      console.error('Failed to remove all ingredients:', err);
    }
  }, []);

  // Update amount (local only — no backend endpoint for this)
  const updateIngredientAmount = useCallback((id: string, newAmount: number) => {
    setIngredients((prev) =>
      prev.map((i) => (i.id === id ? { ...i, amount: newAmount } : i))
    );
  }, []);

  // Quick add all preset ingredients
  const quickAddAll = useCallback(async (): Promise<number> => {
    const token = getAccessToken();
    if (!token) return 0;

    // Import preset from ingredients.ts
    const { masterIngredients: masters } = await import('../data/mockData');

    // Use the same 35 preset items as the original quickAddAll
    const PRESET_NAMES = [
      'Chicken Breast', 'Eggs', 'Milk', 'Butter', 'Onions', 'Garlic',
      'Tomatoes', 'Rice', 'Olive Oil', 'Potatoes', 'Carrots', 'Soy Sauce',
      'Honey', 'Parmesan', 'Bell Peppers', 'Broccoli', 'Lemons', 'Mushrooms',
      'Mozzarella', 'Breadcrumbs', 'Chicken Thighs', 'Ground Beef', 'Spaghetti',
      'Coconut Milk', 'Penne Pasta', 'Fresh Parsley', 'Shrimp', 'Heavy Cream',
      'Canned Tomatoes', 'Oregano', 'Feta Cheese', 'Ginger', 'Cumin', 'Zucchini',
      'Eggplant',
    ];

    const existingNames = new Set(ingredients.map((i) => i.name));
    const toAdd = masters.filter(
      (m) => PRESET_NAMES.includes(m.name) && !existingNames.has(m.name)
    );

    if (toAdd.length === 0) return 0;

    try {
      const rows = toAdd.map((m) => ({
        ingredient_name: m.name,
        category: m.category,
        amount: m.amount,
        unit: m.unit,
        expiry_days: m.expiryDays,
      }));

      // Call backend with array of ingredients
      const result = await fetch(
        (import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000') + '/ingredients',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(rows),
        }
      );

      if (!result.ok) throw new Error('Failed to quick add');
      const data = await result.json();

      // Map and add to local state
      const mapped: Ingredient[] = data.map((row: BackendIngredient) => ({
        id: String(row.id),
        name: row.ingredient_name,
        category: row.category,
        amount: row.amount,
        unit: row.unit,
        expiryDays: row.expiry_days,
      }));

      setIngredients((prev) => [...mapped, ...prev]);
      return mapped.length;
    } catch (err) {
      console.error('Failed to quick add:', err);
      return 0;
    }
  }, [ingredients]);

  return {
    ingredients,
    loading,
    addIngredient,
    removeIngredient,
    removeAllIngredients,
    updateIngredientAmount,
    quickAddAll,
    refresh: loadIngredients,
  };
}

// =====================================================================
// useSavedRecipes — loads saved recipe IDs from backend
// =====================================================================

export function useSavedRecipes() {
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  // Load from backend on mount
  const loadSavedRecipes = useCallback(async () => {
    const token = getAccessToken();
    if (!token) {
      setSavedIds(new Set());
      setLoading(false);
      return;
    }
    try {
      const data = await getSavedRecipes(token);
      const ids = new Set(data.map((r: { recipe_id: string }) => r.recipe_id));
      setSavedIds(ids);
    } catch (err) {
      console.error('Failed to load saved recipes:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSavedRecipes();
  }, [loadSavedRecipes]);

  // Toggle save/unsave
  const toggle = useCallback(async (recipeId: string): Promise<boolean> => {
    const token = getAccessToken();
    if (!token) return false;
    try {
      const result = await toggleSavedRecipe(token, recipeId);
      setSavedIds((prev) => {
        const next = new Set(prev);
        if (result.action === 'saved') {
          next.add(recipeId);
        } else {
          next.delete(recipeId);
        }
        return next;
      });
      return result.action === 'saved';
    } catch (err) {
      console.error('Failed to toggle saved recipe:', err);
      return false;
    }
  }, []);

  const isSaved = useCallback(
    (recipeId: string) => savedIds.has(recipeId),
    [savedIds]
  );

  return {
    savedIds,
    loading,
    toggle,
    isSaved,
    refresh: loadSavedRecipes,
  };
}