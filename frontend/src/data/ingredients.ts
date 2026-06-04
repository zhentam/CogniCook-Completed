// ============================================================
// Ingredients Collection
//
// This file contains TWO data sets:
// 1. masterIngredients — The full catalog of 50 ingredients
//    (used for the "Add Ingredient" dropdown — never empty)
// 2. ingredients — The user's kitchen inventory
//    (starts empty for a new user)
//
// Each ingredient has:
// - amount: numeric value (user inputs this)
// - unit: measurement unit (fixed per ingredient)
//
// When connecting to a backend:
// - masterIngredients → GET /api/ingredients/catalog
// - ingredients → GET /api/user/ingredients
// ============================================================

import { Ingredient } from './types';

// --- Master Ingredient Catalog ---
export const masterIngredients: Ingredient[] = [
  { id: 'm1', name: 'Chicken Breast', category: 'Protein', expiryDays: 3, amount: 500, unit: 'g' },
  { id: 'm2', name: 'Fresh Salmon', category: 'Seafood', expiryDays: 2, amount: 400, unit: 'g' },
  { id: 'm3', name: 'Ground Beef', category: 'Protein', expiryDays: 4, amount: 500, unit: 'g' },
  { id: 'm4', name: 'Eggs', category: 'Dairy', expiryDays: 14, amount: 12, unit: 'pieces' },
  { id: 'm5', name: 'Milk', category: 'Dairy', expiryDays: 7, amount: 1, unit: 'L' },
  { id: 'm6', name: 'Butter', category: 'Dairy', expiryDays: 21, amount: 250, unit: 'g' },
  { id: 'm7', name: 'Broccoli', category: 'Vegetable', expiryDays: 5, amount: 2, unit: 'heads' },
  { id: 'm8', name: 'Carrots', category: 'Vegetable', expiryDays: 10, amount: 500, unit: 'g' },
  { id: 'm9', name: 'Bell Peppers', category: 'Vegetable', expiryDays: 6, amount: 3, unit: 'pieces' },
  { id: 'm10', name: 'Tomatoes', category: 'Vegetable', expiryDays: 4, amount: 6, unit: 'pieces' },
  { id: 'm11', name: 'Onions', category: 'Vegetable', expiryDays: 14, amount: 4, unit: 'pieces' },
  { id: 'm12', name: 'Garlic', category: 'Vegetable', expiryDays: 30, amount: 1, unit: 'bulb' },
  { id: 'm13', name: 'Spaghetti', category: 'Pantry', expiryDays: 365, amount: 500, unit: 'g' },
  { id: 'm14', name: 'Rice', category: 'Pantry', expiryDays: 365, amount: 1, unit: 'kg' },
  { id: 'm15', name: 'Olive Oil', category: 'Pantry', expiryDays: 180, amount: 500, unit: 'ml' },
  { id: 'm16', name: 'Shrimp', category: 'Seafood', expiryDays: 2, amount: 300, unit: 'g' },
  { id: 'm17', name: 'Mushrooms', category: 'Vegetable', expiryDays: 5, amount: 250, unit: 'g' },
  { id: 'm18', name: 'Potatoes', category: 'Vegetable', expiryDays: 14, amount: 1, unit: 'kg' },
  { id: 'm19', name: 'Zucchini', category: 'Vegetable', expiryDays: 7, amount: 2, unit: 'pieces' },
  { id: 'm20', name: 'Eggplant', category: 'Vegetable', expiryDays: 7, amount: 1, unit: 'piece' },
  { id: 'm21', name: 'Asparagus', category: 'Vegetable', expiryDays: 5, amount: 1, unit: 'bunch' },
  { id: 'm22', name: 'Peas', category: 'Frozen', expiryDays: 365, amount: 300, unit: 'g' },
  { id: 'm23', name: 'Lemons', category: 'Fruit', expiryDays: 14, amount: 4, unit: 'pieces' },
  { id: 'm24', name: 'Mozzarella', category: 'Dairy', expiryDays: 14, amount: 200, unit: 'g' },
  { id: 'm25', name: 'Parmesan', category: 'Dairy', expiryDays: 30, amount: 100, unit: 'g' },
  { id: 'm26', name: 'Heavy Cream', category: 'Dairy', expiryDays: 7, amount: 200, unit: 'ml' },
  { id: 'm27', name: 'Fresh Basil', category: 'Herb', expiryDays: 5, amount: 1, unit: 'bunch' },
  { id: 'm28', name: 'Fresh Parsley', category: 'Herb', expiryDays: 5, amount: 1, unit: 'bunch' },
  { id: 'm29', name: 'Soy Sauce', category: 'Pantry', expiryDays: 365, amount: 250, unit: 'ml' },
  { id: 'm30', name: 'White Wine', category: 'Pantry', expiryDays: 365, amount: 1, unit: 'bottle' },
  { id: 'm31', name: 'Coconut Milk', category: 'Pantry', expiryDays: 365, amount: 400, unit: 'ml' },
  { id: 'm32', name: 'Penne Pasta', category: 'Pantry', expiryDays: 365, amount: 500, unit: 'g' },
  { id: 'm33', name: 'Breadcrumbs', category: 'Pantry', expiryDays: 180, amount: 200, unit: 'g' },
  { id: 'm34', name: 'Curry Powder', category: 'Pantry', expiryDays: 365, amount: 50, unit: 'g' },
  { id: 'm35', name: 'Romaine Lettuce', category: 'Vegetable', expiryDays: 5, amount: 1, unit: 'head' },
  { id: 'm36', name: 'Leeks', category: 'Vegetable', expiryDays: 7, amount: 2, unit: 'pieces' },
  { id: 'm37', name: 'Ground Turkey', category: 'Protein', expiryDays: 3, amount: 500, unit: 'g' },
  { id: 'm38', name: 'Dumpling Wrappers', category: 'Pantry', expiryDays: 14, amount: 1, unit: 'pack' },
  { id: 'm39', name: 'Chicken Thighs', category: 'Protein', expiryDays: 3, amount: 800, unit: 'g' },
  { id: 'm40', name: 'Kidney Beans', category: 'Pantry', expiryDays: 365, amount: 400, unit: 'g' },
  { id: 'm41', name: 'Canned Tomatoes', category: 'Pantry', expiryDays: 365, amount: 400, unit: 'g' },
  { id: 'm42', name: 'Pine Nuts', category: 'Pantry', expiryDays: 180, amount: 50, unit: 'g' },
  { id: 'm43', name: 'Salmon Fillets', category: 'Seafood', expiryDays: 2, amount: 400, unit: 'g' },
  { id: 'm44', name: 'Honey', category: 'Pantry', expiryDays: 365, amount: 250, unit: 'ml' },
  { id: 'm45', name: 'Tortillas', category: 'Pantry', expiryDays: 14, amount: 8, unit: 'pieces' },
  { id: 'm46', name: 'Cabbage', category: 'Vegetable', expiryDays: 7, amount: 1, unit: 'head' },
  { id: 'm47', name: 'Bok Choy', category: 'Vegetable', expiryDays: 5, amount: 2, unit: 'pieces' },
  { id: 'm48', name: 'Cucumber', category: 'Vegetable', expiryDays: 7, amount: 2, unit: 'pieces' },
  { id: 'm49', name: 'Feta Cheese', category: 'Dairy', expiryDays: 14, amount: 150, unit: 'g' },
  { id: 'm50', name: 'Oregano', category: 'Herb', expiryDays: 5, amount: 1, unit: 'bunch' },
  { id: 'm51', name: 'Avocado', category: 'Vegetable', expiryDays: 4, amount: 2, unit: 'pieces' },
  { id: 'm52', name: 'Sourdough Bread', category: 'Bakery', expiryDays: 5, amount: 1, unit: 'loaf' },
  { id: 'm53', name: 'Cherry Tomatoes', category: 'Vegetable', expiryDays: 5, amount: 250, unit: 'g' },
  { id: 'm54', name: 'Spinach', category: 'Vegetable', expiryDays: 5, amount: 200, unit: 'g' },
  { id: 'm55', name: 'Ginger', category: 'Vegetable', expiryDays: 14, amount: 1, unit: 'piece' },
  { id: 'm56', name: 'Cumin', category: 'Pantry', expiryDays: 365, amount: 50, unit: 'g' },
  { id: 'm57', name: 'Lamb', category: 'Protein', expiryDays: 3, amount: 500, unit: 'g' },
  { id: 'm58', name: 'Chickpeas', category: 'Pantry', expiryDays: 365, amount: 400, unit: 'g' },
  { id: 'm59', name: 'Pumpkin', category: 'Vegetable', expiryDays: 14, amount: 1, unit: 'kg' },
  { id: 'm60', name: 'Gnocchi', category: 'Pantry', expiryDays: 14, amount: 500, unit: 'g' },
  { id: 'm61', name: 'Mascarpone', category: 'Dairy', expiryDays: 7, amount: 250, unit: 'g' },
  { id: 'm62', name: 'Arborio Rice', category: 'Pantry', expiryDays: 365, amount: 500, unit: 'g' },
  { id: 'm63', name: 'Sesame Seeds', category: 'Pantry', expiryDays: 365, amount: 100, unit: 'g' },
  { id: 'm64', name: 'Rice Noodles', category: 'Pantry', expiryDays: 365, amount: 250, unit: 'g' },
  { id: 'm65', name: 'Linguine', category: 'Pantry', expiryDays: 365, amount: 500, unit: 'g' },
  { id: 'm66', name: 'Barramundi', category: 'Seafood', expiryDays: 2, amount: 400, unit: 'g' },
  { id: 'm67', name: 'Pancetta', category: 'Protein', expiryDays: 14, amount: 150, unit: 'g' },
  { id: 'm68', name: 'Rosemary', category: 'Herb', expiryDays: 7, amount: 1, unit: 'bunch' },
  { id: 'm69', name: 'Beef Sirloin', category: 'Protein', expiryDays: 3, amount: 500, unit: 'g' },
  { id: 'm70', name: 'Chili', category: 'Vegetable', expiryDays: 7, amount: 3, unit: 'pieces' },
  { id: 'm71', name: 'Oats', category: 'Pantry', expiryDays: 365, amount: 500, unit: 'g' },
  { id: 'm72', name: 'Blueberries', category: 'Fruit', expiryDays: 5, amount: 200, unit: 'g' },
  { id: 'm73', name: 'Strawberries', category: 'Fruit', expiryDays: 5, amount: 250, unit: 'g' },
  { id: 'm74', name: 'Lime', category: 'Fruit', expiryDays: 14, amount: 4, unit: 'pieces' },
  { id: 'm75', name: 'Ricotta', category: 'Dairy', expiryDays: 7, amount: 250, unit: 'g' },
  { id: 'm76', name: 'Thyme', category: 'Herb', expiryDays: 7, amount: 1, unit: 'bunch' },
  { id: 'm77', name: 'Tomato Paste', category: 'Pantry', expiryDays: 365, amount: 200, unit: 'g' },
  { id: 'm78', name: 'Vegetable Broth', category: 'Pantry', expiryDays: 365, amount: 1, unit: 'L' },
  { id: 'm79', name: 'Beef Broth', category: 'Pantry', expiryDays: 365, amount: 1, unit: 'L' },
  { id: 'm80', name: 'Walnuts', category: 'Pantry', expiryDays: 180, amount: 150, unit: 'g' },
  { id: 'm81', name: 'Peanuts', category: 'Pantry', expiryDays: 180, amount: 200, unit: 'g' },
  { id: 'm82', name: 'Bean Sprouts', category: 'Vegetable', expiryDays: 3, amount: 200, unit: 'g' },
  { id: 'm83', name: 'Goat Cheese', category: 'Dairy', expiryDays: 14, amount: 150, unit: 'g' },
  { id: 'm84', name: 'Teriyaki Sauce', category: 'Pantry', expiryDays: 365, amount: 250, unit: 'ml' },
  { id: 'm85', name: 'Tofu', category: 'Protein', expiryDays: 7, amount: 300, unit: 'g' },
  { id: 'm86', name: 'Sausages', category: 'Protein', expiryDays: 5, amount: 6, unit: 'pieces' },
  { id: 'm87', name: 'Cheddar Cheese', category: 'Dairy', expiryDays: 30, amount: 200, unit: 'g' },
  { id: 'm88', name: 'Greek Yoghurt', category: 'Dairy', expiryDays: 10, amount: 500, unit: 'g' },
  { id: 'm89', name: 'Sour Cream', category: 'Dairy', expiryDays: 14, amount: 200, unit: 'g' },
  { id: 'm90', name: 'Coriander', category: 'Herb', expiryDays: 5, amount: 1, unit: 'bunch' },
  { id: 'm91', name: 'Mint', category: 'Herb', expiryDays: 5, amount: 1, unit: 'bunch' },
  { id: 'm92', name: 'Sesame Oil', category: 'Pantry', expiryDays: 365, amount: 250, unit: 'ml' },
  { id: 'm93', name: 'Vinegar', category: 'Pantry', expiryDays: 365, amount: 500, unit: 'ml' },
  { id: 'm94', name: 'Balsamic Vinaigrette', category: 'Pantry', expiryDays: 365, amount: 250, unit: 'ml' },
  { id: 'm95', name: 'Taco Shells', category: 'Pantry', expiryDays: 14, amount: 12, unit: 'pieces' },
  { id: 'm96', name: 'Pizza Dough', category: 'Bakery', expiryDays: 5, amount: 1, unit: 'pack' },
  { id: 'm97', name: 'Mixed Greens', category: 'Vegetable', expiryDays: 5, amount: 200, unit: 'g' },
  { id: 'm98', name: 'Espresso', category: 'Pantry', expiryDays: 365, amount: 250, unit: 'ml' },
  { id: 'm99', name: 'Cocoa Powder', category: 'Pantry', expiryDays: 365, amount: 100, unit: 'g' },
  { id: 'm100', name: 'Ladyfingers', category: 'Bakery', expiryDays: 14, amount: 200, unit: 'g' }
];

// --- User's Kitchen Inventory ---
// Starts empty for new users. Use quickAddAll() to populate with 35 common ingredients.
export const ingredients: Ingredient[] = [];

// --- Quick Add Preset ---
// 35 of the most recipe-relevant ingredients for one-click setup.
const QUICK_ADD_PRESET: Omit<Ingredient, 'id'>[] = [
  { name: 'Chicken Breast', category: 'Protein', expiryDays: 3, amount: 500, unit: 'g' },
  { name: 'Eggs', category: 'Dairy', expiryDays: 14, amount: 12, unit: 'pieces' },
  { name: 'Milk', category: 'Dairy', expiryDays: 7, amount: 1, unit: 'L' },
  { name: 'Butter', category: 'Dairy', expiryDays: 21, amount: 250, unit: 'g' },
  { name: 'Onions', category: 'Vegetable', expiryDays: 14, amount: 4, unit: 'pieces' },
  { name: 'Garlic', category: 'Vegetable', expiryDays: 30, amount: 1, unit: 'bulb' },
  { name: 'Tomatoes', category: 'Vegetable', expiryDays: 4, amount: 6, unit: 'pieces' },
  { name: 'Rice', category: 'Pantry', expiryDays: 365, amount: 1, unit: 'kg' },
  { name: 'Olive Oil', category: 'Pantry', expiryDays: 180, amount: 500, unit: 'ml' },
  { name: 'Potatoes', category: 'Vegetable', expiryDays: 14, amount: 1, unit: 'kg' },
  { name: 'Carrots', category: 'Vegetable', expiryDays: 10, amount: 500, unit: 'g' },
  { name: 'Soy Sauce', category: 'Pantry', expiryDays: 365, amount: 250, unit: 'ml' },
  { name: 'Honey', category: 'Pantry', expiryDays: 365, amount: 250, unit: 'ml' },
  { name: 'Parmesan', category: 'Dairy', expiryDays: 30, amount: 100, unit: 'g' },
  { name: 'Bell Peppers', category: 'Vegetable', expiryDays: 6, amount: 3, unit: 'pieces' },
  { name: 'Broccoli', category: 'Vegetable', expiryDays: 5, amount: 2, unit: 'heads' },
  { name: 'Lemons', category: 'Fruit', expiryDays: 14, amount: 4, unit: 'pieces' },
  { name: 'Mushrooms', category: 'Vegetable', expiryDays: 5, amount: 250, unit: 'g' },
  { name: 'Mozzarella', category: 'Dairy', expiryDays: 14, amount: 200, unit: 'g' },
  { name: 'Breadcrumbs', category: 'Pantry', expiryDays: 180, amount: 200, unit: 'g' },
  { name: 'Chicken Thighs', category: 'Protein', expiryDays: 3, amount: 800, unit: 'g' },
  { name: 'Ground Beef', category: 'Protein', expiryDays: 4, amount: 500, unit: 'g' },
  { name: 'Spaghetti', category: 'Pantry', expiryDays: 365, amount: 500, unit: 'g' },
  { name: 'Coconut Milk', category: 'Pantry', expiryDays: 365, amount: 400, unit: 'ml' },
  { name: 'Penne Pasta', category: 'Pantry', expiryDays: 365, amount: 500, unit: 'g' },
  { name: 'Fresh Parsley', category: 'Herb', expiryDays: 5, amount: 1, unit: 'bunch' },
  { name: 'Shrimp', category: 'Seafood', expiryDays: 2, amount: 300, unit: 'g' },
  { name: 'Heavy Cream', category: 'Dairy', expiryDays: 7, amount: 200, unit: 'ml' },
  { name: 'Canned Tomatoes', category: 'Pantry', expiryDays: 365, amount: 400, unit: 'g' },
  { name: 'Oregano', category: 'Herb', expiryDays: 5, amount: 1, unit: 'bunch' },
  { name: 'Feta Cheese', category: 'Dairy', expiryDays: 14, amount: 150, unit: 'g' },
  { name: 'Ginger', category: 'Vegetable', expiryDays: 14, amount: 1, unit: 'piece' },
  { name: 'Cumin', category: 'Pantry', expiryDays: 365, amount: 50, unit: 'g' },
  { name: 'Zucchini', category: 'Vegetable', expiryDays: 7, amount: 2, unit: 'pieces' },
  { name: 'Eggplant', category: 'Vegetable', expiryDays: 7, amount: 1, unit: 'piece' },
];

/**
 * Quick-adds all 35 preset ingredients to the user's kitchen.
 * Skips any that are already present (by name).
 */
export const quickAddAll = (): number => {
  let added = 0;
  QUICK_ADD_PRESET.forEach(item => {
    const existing = ingredients.find(i => i.name === item.name);
    if (!existing) {
      ingredients.push({
        id: `u${Date.now()}_${added}`,
        ...item
      });
      added++;
    }
  });
  return added;
};

// --- Ingredient "API" functions ---

export const addIngredient = (masterId: string, amount: number): boolean => {
  // TODO: Replace with POST /api/user/ingredients { masterId, amount }
  const masterItem = masterIngredients.find(m => m.id === masterId);
  if (!masterItem) return false;

  // Check if already in kitchen
  const existing = ingredients.find(i => i.name === masterItem.name);
  if (existing) return false;

  ingredients.push({
    id: `u${ingredients.length + 1}`,
    name: masterItem.name,
    category: masterItem.category,
    expiryDays: masterItem.expiryDays,
    amount: amount || masterItem.amount,
    unit: masterItem.unit
  });
  return true;
};

export const removeIngredient = (id: string): void => {
  // TODO: Replace with DELETE /api/user/ingredients/:id
  const index = ingredients.findIndex(i => i.id === id);
  if (index !== -1) {
    ingredients.splice(index, 1);
  }
};

export const removeAllIngredients = (): void => {
  // TODO: Replace with DELETE /api/user/ingredients
  ingredients.splice(0, ingredients.length);
};

export const updateIngredientAmount = (id: string, newAmount: number): boolean => {
  // TODO: Replace with PATCH /api/user/ingredients/:id { amount: newAmount }
  const ingredient = ingredients.find(i => i.id === id);
  if (ingredient) {
    ingredient.amount = newAmount;
    return true;
  }
  return false;
};

export const getMasterIngredientById = (id: string): Ingredient | undefined => {
  return masterIngredients.find(m => m.id === id);
};