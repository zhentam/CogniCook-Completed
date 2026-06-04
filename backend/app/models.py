"""
Pydantic models — define the shape of request & response data.

Think of these as "data contracts": they tell FastAPI what JSON fields
to expect in the request body and what to return in the response.
"""

from pydantic import BaseModel
from typing import Optional, List


# ── Auth ──────────────────────────────────────────────────────────────

class SignupRequest(BaseModel):
    """Body for POST /auth/signup"""
    email: str
    password: str
    name: Optional[str] = None          # optional display name


class LoginRequest(BaseModel):
    """Body for POST /auth/login"""
    email: str
    password: str


# ── Ingredients ───────────────────────────────────────────────────────

class IngredientCreate(BaseModel):
    """One ingredient to add to the user's kitchen."""
    ingredient_name: str
    category: str
    amount: float
    unit: str
    expiry_days: int


class IngredientResponse(BaseModel):
    """One ingredient returned from the database."""
    id: int
    user_id: str
    ingredient_name: str
    category: str
    amount: float
    unit: str
    expiry_days: int
    added_at: Optional[str] = None


# ── Saved Recipes ─────────────────────────────────────────────────────

class SavedRecipeToggle(BaseModel):
    """Body for POST /saved-recipes — just the recipe ID to toggle."""
    recipe_id: str