# CogniCook — Frontend Architecture & Backend Integration Guide

> **Last Updated:** June 2026  
> **Stack:** React + TypeScript + Tailwind CSS + Framer Motion + React Router v6  
> **Purpose:** Ready-to-serve frontend with clear backend integration points

---

## 1. Project Overview

CogniCook is an intelligent cooking companion that helps users discover recipes based on ingredients they have at home. The app features a **Quad Lock filter system**, a **personal kitchen inventory**, and a **cookbook** for saving favourite recipes.

### User Journey
```
Login/Register → Home Dashboard → Quad Lock Filters → Recipe Results → Recipe Detail
                       ↕                    ↕
                  My Kitchen           My Cookbook
               (add/remove items)    (save/unsave recipes)
```

---

## 2. Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | React | 18.x |
| Language | TypeScript | 5.x |
| Styling | Tailwind CSS | 3.x |
| Animations | Framer Motion | 11.x |
| Routing | React Router | 6.x |
| Icons | Lucide React | 0.400+ |
| Build Tool | Vite | 5.x |
| Backend (planned) | Supabase (PostgreSQL + Auth + API) | — |

---

## 3. File & Folder Structure

```
cognicook-frontend/
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts
│
└── src/
    ├── main.tsx                    # App entry point
    ├── App.tsx                     # Router + AuthProvider + route guards
    ├── index.css                   # Tailwind imports + global styles
    │
    ├── assets/
    │   └── CogniCook Logo.png
    │
    ├── components/
    │   ├── Header.tsx              # Nav bar (Home, Start Cooking, Kitchen, Cookbook, Logout)
    │   ├── Layout.tsx              # Header + Outlet wrapper
    │   └── QuadLockDial.tsx        # Interactive rotary dial for time/diners selection
    │
    ├── data/
    │   ├── types.ts                # Shared TypeScript interfaces (DATA CONTRACT)
    │   ├── mockData.ts             # Re-export hub (barrel file)
    │   ├── recipes.ts              # 80 recipe definitions + filter logic
    │   ├── ingredients.ts          # 100 master ingredients + kitchen inventory
    │   └── users.ts                # User preferences (saved recipes)
    │
    ├── pages/
    │   ├── Login.tsx               # Login + Register (toggle between modes)
    │   ├── Home.tsx                # Dashboard (stats, quick links, expiring items)
    │   ├── QuadLock.tsx            # Filter selection (ingredients, method, time, diners)
    │   ├── RecipeList.tsx          # Filtered recipe results grid
    │   ├── RecipeDetail.tsx        # Full recipe view (ingredients, steps, save button)
    │   ├── MyKitchen.tsx           # Kitchen inventory management
    │   └── Cookbook.tsx             # Saved recipes collection
    │
    └── utils/
        └── auth.tsx                # AuthContext (AuthProvider + useAuth hook)
```

---

## 4. Pages & Features

### 4.1 Login / Register (`/login`)
- **Register:** Name + Email + Password → saves to localStorage → auto-login
- **Login:** Email + Password → validates against stored data
- **Auth guard:** Unauthenticated users are redirected here
- **Toggle:** "Don't have an account? Register" ↔ "Already have an account? Sign In"

### 4.2 Home Dashboard (`/home`)
- Personalised greeting: "Welcome back, {Name}!"
- Stat cards: Kitchen count, Cookbook count, Expiring items count
- Hero CTA: "Start Cooking Now" → navigates to Quad Lock
- Expiring items strip: horizontally scrollable list of soon-to-expire ingredients

### 4.3 Quad Lock Filters (`/quad-lock`)
- **Ingredient Selection:** Multi-select from user's kitchen inventory
- **Cooking Method:** Multi-select (Grilling, Frying, Baking, etc.)
- **Time Limit:** Dial selector (20, 40, 60, 80+ minutes)
- **Diners:** Dial selector (1, 2, 4, 6, 8+ people)
- **Meal Type:** Daily vs Social toggle
- **Continue** button → navigates to Recipe List with filters applied

### 4.4 Recipe List (`/recipes`)
- Grid of recipe cards matching filter criteria
- Sorted by cooking time (descending)
- Each card shows: image, name, description, time, method, tags
- Click → Recipe Detail page
- "Edit Filters" button → back to Quad Lock (preserves selections)

### 4.5 Recipe Detail (`/recipe/:id`)
- Full recipe view: image, name, description, time, method
- Ingredient list with quantities
- Tags (Quick, Healthy, Italian, etc.)
- **Save/Unsave** button (toggle bookmark)
- **Back** button → returns to recipe list

### 4.6 My Kitchen (`/kitchen`)
- Grid of ingredient cards with: name, category, amount, unit, expiry days
- **Quick Add:** "Add 35 Common Ingredients" button (appears when empty)
- **Add Ingredient:** Modal with search, category filter, amount configuration
- **Remove All:** Confirmation modal before clearing entire kitchen
- **Inline Edit:** Click pencil icon to edit ingredient amount
- **Sort by:** Alphabetical, Expiry Date, Category, Amount, Recently Added
- **Selection Mode:** When navigated from Quad Lock, allows multi-select

### 4.7 Cookbook (`/cookbook`)
- Grid of saved recipe cards
- Click → Recipe Detail
- Empty state with prompt to explore recipes

---

## 5. Data Architecture

### 5.1 Data Flow Pattern
```
┌─────────────────────────────────────────────────────┐
│                    App.tsx                           │
│               (AuthProvider + Router)                │
└──────────────────────┬──────────────────────────────┘
                       │
       ┌───────────────┼───────────────┐
       ▼               ▼               ▼
   Login.tsx      Home.tsx      MyKitchen.tsx
   ┌─────────┐   ┌─────────┐   ┌─────────────┐
   │ useAuth │   │ useAuth │   │ ingredients  │
   │ .login()│   │userName │   │ .add/.remove │
   └─────────┘   └─────────┘   └─────────────┘
                       │               │
                       ▼               ▼
              ┌─────────────────────────────┐
              │    data/ directory          │
              │  (mockData.ts hub)          │
              │                             │
              │  recipes.ts ← 80 recipes   │
              │  ingredients.ts ← inventory│
              │  users.ts ← saved recipes  │
              │  types.ts ← interfaces     │
              └─────────────────────────────┘
```

### 5.2 Current Data Storage
| Data | Where Stored | Backend Replacement |
|------|-------------|-------------------|
| User account | `localStorage` | Supabase Auth |
| Kitchen inventory | In-memory array | Supabase `user_ingredients` table |
| Saved recipes | In-memory array | Supabase `saved_recipes` table |
| Recipe catalog | Hardcoded in `recipes.ts` | Keep in frontend (100 recipes) |
| Ingredient catalog | Hardcoded in `ingredients.ts` | Keep in frontend (100 items) |

---

## 6. TypeScript Interfaces (Data Contract)

These interfaces define the shape of data. Your backend API responses must match these.

### Recipe
```typescript
interface Recipe {
  id: string;                    // e.g. 'r1'
  name: string;                  // e.g. 'Classic Margherita Pizza'
  description: string;           // Short description
  ingredients: string[];         // e.g. ['flour', 'tomatoes', 'mozzarella']
  method: string;                // e.g. 'Baking', 'Grilling', 'Frying'
  time: number;                  // Cooking time in minutes
  tags: string[];                // e.g. ['Quick', 'Italian']
  isSaved: boolean;              // Whether user has bookmarked it
  mealType: 'daily' | 'social'; // Meal category
  imageUrl?: string;             // Optional image URL
}
```

### Ingredient
```typescript
interface Ingredient {
  id: string;        // e.g. 'm1' (master) or 'u1' (user kitchen)
  name: string;      // e.g. 'Chicken Breast'
  category: string;  // e.g. 'Protein', 'Dairy', 'Vegetable', 'Pantry'
  expiryDays: number; // Days until expiry
  amount: number;     // Quantity
  unit: string;       // e.g. 'g', 'ml', 'pieces', 'heads'
}
```

### UserPreferences
```typescript
interface UserPreferences {
  savedRecipeIds: string[];  // Array of recipe IDs
}
```

### QuadLockSelections
```typescript
interface QuadLockSelections {
  ingredients: string[];          // Selected ingredient names
  method: string[];               // Selected cooking methods
  time: number;                   // Max cooking time in minutes
  diners: number | null;          // Number of diners
  mealType: 'daily' | 'social';  // Meal type
}
```

---

## 7. Backend Integration Points

Each file has `TODO` comments marking where to replace mock data with API calls.

### 7.1 Authentication (`src/utils/auth.tsx`)
```
Current:  localStorage (saveUser, getStoredUser, clearUser)
Replace:  supabase.auth.signUp(), supabase.auth.signInWithPassword()
File:     src/utils/auth.tsx → login() and logout() functions
```

### 7.2 Kitchen Inventory (`src/data/ingredients.ts`)
```
Current:  In-memory array (ingredients[])
Replace:  Supabase queries on user_ingredients table
Functions to replace:
  - addIngredient(masterId, amount)    → POST /rest/v1/user_ingredients
  - removeIngredient(id)               → DELETE /rest/v1/user_ingredients?id=eq.{id}
  - updateIngredientAmount(id, amount) → PATCH /rest/v1/user_ingredients?id=eq.{id}
  - quickAddAll()                      → POST /rest/v1/user_ingredients (bulk insert)
  - removeAllIngredients()             → DELETE /rest/v1/user_ingredients?user_id=eq.{uid}
```

### 7.3 Saved Recipes (`src/data/users.ts`)
```
Current:  In-memory array (userPreferences.savedRecipeIds)
Replace:  Supabase queries on saved_recipes table
Functions to replace:
  - getSavedRecipeIds()    → SELECT recipe_id FROM saved_recipes WHERE user_id = auth.uid()
  - toggleSavedRecipeId()  → INSERT/DELETE on saved_recipes
```

### 7.4 Recipe Catalog (`src/data/recipes.ts`)
```
Current:  Hardcoded 80 recipes (KEEP AS-IS for now)
Future:   Could move to Supabase 'recipes' table + admin panel
Note:     filterRecipes() function can stay in frontend
```

---

## 8. Supabase Schema (Ready to Execute)

Run these in Supabase SQL Editor:

```sql
-- Table 1: User's Kitchen Inventory
CREATE TABLE user_ingredients (
    id              BIGSERIAL PRIMARY KEY,
    user_id         UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    ingredient_name TEXT NOT NULL,
    category        TEXT NOT NULL,
    amount          REAL NOT NULL,
    unit            TEXT NOT NULL,
    expiry_days     INTEGER NOT NULL,
    added_at        TIMESTAMPTZ DEFAULT NOW()
);

-- Table 2: User's Saved Recipes (Cookbook)
CREATE TABLE saved_recipes (
    id         BIGSERIAL PRIMARY KEY,
    user_id    UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    recipe_id  TEXT NOT NULL,
    saved_at   TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, recipe_id)
);

-- Row Level Security: Users can only access their own data
ALTER TABLE user_ingredients ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_recipes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own ingredients"
ON user_ingredients FOR ALL
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users manage own saved recipes"
ON saved_recipes FOR ALL
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());
```

---

## 9. Reusable UI Components

### FormSection (if available)
- Wraps groups of related fields
- Shows a small icon on the left of the section title

### Icon Button (`icon-button.tsx`)
- Icon with a right arrow
- Used as **Continue/Next** button on filter pages

### ThreeDButton (`ThreeDButton.tsx`)
- 3D-styled button
- Used **only** for the final **Submit Application** button

### QuadLockDial (`components/QuadLockDial.tsx`)
- Interactive rotary dial component
- Used for time and diner selection in Quad Lock

---

## 10. Styling System

### Tailwind Configuration
- Primary colour: Custom `primary-500` to `primary-700` range (green tones)
- Accent colour: Custom `accent-500` to `accent-700` range
- Font: Inter (Google Fonts)
- Custom animations: fade-in, slide-up

### Design Patterns
- **Cards:** `bg-white rounded-xl shadow-sm border border-gray-100`
- **Buttons:** Gradient backgrounds with hover states
- **Modals:** `AnimatePresence` + `motion.div` with scale transitions
- **Empty states:** Centered icon + message + CTA button

---

## 11. Environment Variables (for Supabase)

Create a `.env` file in the project root:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

These are accessed in code via `import.meta.env.VITE_SUPABASE_URL`.

---

## 12. How to Run

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

The app runs at `http://localhost:5174/` by default.

---

## 13. Checklist: Backend Integration Steps

- [ ] Create Supabase project at https://supabase.com
- [ ] Run the SQL schema (Section 8) in Supabase SQL Editor
- [ ] Install Supabase client: `npm install @supabase/supabase-js`
- [ ] Create `src/lib/supabase.ts` with client initialization
- [ ] Replace auth in `src/utils/auth.tsx` with Supabase Auth
- [ ] Replace kitchen functions in `src/data/ingredients.ts` with Supabase queries
- [ ] Replace saved recipes in `src/data/users.ts` with Supabase queries
- [ ] Add `.env` file with Supabase URL and anon key
- [ ] Test: Register → Login → Add ingredients → Save recipes → Logout → Login again

---

*Document generated from CogniCook Frontend codebase. All data structures and integration points are based on the actual source code.*