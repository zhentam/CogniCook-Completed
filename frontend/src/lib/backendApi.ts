/**
 * backendApi.ts — Frontend API client for the CogniCook Python backend
 * ====================================================================
 *
 * Every function in this file calls an endpoint on our FastAPI backend
 * (running at http://localhost:8000).
 *
 * The base URL comes from the VITE_API_BASE_URL environment variable,
 * which is set in frontend/.env.local.
 *
 * Usage example:
 *   import { login, getIngredients } from '../lib/backendApi';
 *
 *   const result = await login("test@example.com", "password123");
 *   const token  = result.access_token;
 *   const items  = await getIngredients(token);
 */

// ── Base URL (from .env.local or fallback) ───────────────────────────

const BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";


// ── Helper: make a JSON fetch request ────────────────────────────────

/**
 * Internal helper that wraps fetch() with sensible defaults.
 * Keeps each function below short and focused.
 */
async function apiFetch<T = any>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${BASE}${path}`;

  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  // Parse JSON body (even on errors, so we can show the message)
  const data = await res.json().catch(() => null);

  if (!res.ok) {
    // Try to extract a useful error message from the response
    const msg =
      data?.detail?.message ||
      (typeof data?.detail === "string" ? data.detail : null) ||
      `Request failed (${res.status})`;
    throw new Error(msg);
  }

  return data as T;
}


// ── Helper: build Authorization header ───────────────────────────────

function authHeader(token: string): Record<string, string> {
  return { Authorization: `Bearer ${token}` };
}


// =====================================================================
// AUTH
// =====================================================================

/**
 * Sign up a new user.
 *
 * Calls:  POST /auth/signup
 * Body:   { email, password, name? }
 *
 * Returns the Supabase response (user + session if email confirmation
 * is disabled).
 */
export async function signup(
  email: string,
  password: string,
  name?: string
) {
  return apiFetch("/auth/signup", {
    method: "POST",
    body: JSON.stringify({ email, password, name }),
  });
}


/**
 * Log in an existing user.
 *
 * Calls:  POST /auth/login
 * Body:   { email, password }
 *
 * Returns: { access_token, refresh_token, expires_in, token_type, user }
 */
export async function login(email: string, password: string) {
  return apiFetch<{
    access_token: string;
    refresh_token: string;
    expires_in: number;
    token_type: string;
    user: any;
  }>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}


// =====================================================================
// INGREDIENTS
// =====================================================================

/**
 * Get all ingredients in the user's kitchen.
 *
 * Calls:  GET /ingredients
 * Auth:   Bearer token required
 *
 * Returns an array of ingredient objects.
 */
export async function getIngredients(token: string) {
  return apiFetch<any[]>("/ingredients", {
    method: "GET",
    headers: authHeader(token),
  });
}


/**
 * Add one or more ingredients to the user's kitchen.
 *
 * Calls:  POST /ingredients
 * Auth:   Bearer token required
 * Body:   Array of { ingredient_name, category, amount, unit, expiry_days }
 *
 * Returns the inserted rows.
 */
export async function addIngredient(
  token: string,
  data: {
    ingredient_name: string;
    category: string;
    amount: number;
    unit: string;
    expiry_days: number;
  }
) {
  return apiFetch<any[]>("/ingredients", {
    method: "POST",
    headers: authHeader(token),
    body: JSON.stringify([data]),   // wrap in array (API accepts batch)
  });
}


/**
 * Delete a single ingredient by its database ID.
 *
 * Calls:  DELETE /ingredients/{id}
 * Auth:   Bearer token required
 */
export async function removeIngredient(token: string, id: number) {
  return apiFetch("/ingredients/" + id, {
    method: "DELETE",
    headers: authHeader(token),
  });
}


/**
 * Delete ALL ingredients for the user.
 *
 * Calls:  DELETE /ingredients
 * Auth:   Bearer token required
 */
export async function removeAllIngredients(token: string) {
  return apiFetch("/ingredients", {
    method: "DELETE",
    headers: authHeader(token),
  });
}


// =====================================================================
// SAVED RECIPES
// =====================================================================

/**
 * Get all saved recipe IDs for the user.
 *
 * Calls:  GET /saved-recipes
 * Auth:   Bearer token required
 *
 * Returns: [{ recipe_id: "r1" }, { recipe_id: "r2" }, ...]
 */
export async function getSavedRecipes(token: string) {
  return apiFetch<{ recipe_id: string }[]>("/saved-recipes", {
    method: "GET",
    headers: authHeader(token),
  });
}


/**
 * Toggle save/unsave a recipe.
 *
 * Calls:  POST /saved-recipes
 * Auth:   Bearer token required
 * Body:   { recipe_id }
 *
 * Returns: { action: "saved" } or { action: "unsaved" }
 */
export async function toggleSavedRecipe(token: string, recipeId: string) {
  return apiFetch<{ action: "saved" | "unsaved" }>("/saved-recipes", {
    method: "POST",
    headers: authHeader(token),
    body: JSON.stringify({ recipe_id: recipeId }),
  });
}