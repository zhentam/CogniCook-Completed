"""
CogniCook Backend — FastAPI application
=======================================

This is the main entry point.  It defines all the API routes and
delegates the heavy lifting to helper modules:
  - supabase_auth.py  → sign up / log in / get user
  - supabase_db.py    → ingredients & saved-recipes CRUD

Run with:
    uvicorn app.main:app --reload --port 8000
"""

from fastapi import FastAPI, HTTPException, Header
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional, List
import httpx

from app.models import (
    SignupRequest,
    LoginRequest,
    IngredientCreate,
    SavedRecipeToggle,
)
from app import supabase_auth, supabase_db


# ── Create the FastAPI app ────────────────────────────────────────────

app = FastAPI(
    title="CogniCook API",
    description="Minimal backend for the CogniCook cooking app",
    version="0.1.0",
)


# ── CORS (so React frontend at localhost:5174 can call us) ────────────

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5174",     # Vite dev server
        "http://localhost:5173",     # alternate Vite port
        "http://localhost:3000",     # React default
    ],
    allow_credentials=True,
    allow_methods=["*"],             # GET, POST, DELETE, etc.
    allow_headers=["*"],             # Authorization, Content-Type, etc.
)


# ── Helper: extract access token from the Authorization header ────────

def _extract_token(authorization: Optional[str]) -> str:
    """
    Pull the JWT access token from the "Authorization: Bearer <token>"
    header.  Raises 401 if the header is missing or malformed.
    """
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Missing or invalid Authorization header")
    return authorization.split(" ", 1)[1]


async def _get_user_id(access_token: str) -> str:
    """
    Call Supabase to get the user ID from the access token.

    NOTE: In production, you would decode the JWT locally and verify
    its signature using Supabase's JWKS keys.  Calling /auth/v1/user
    on every request is slower but simpler to understand for learning.
    """
    try:
        user_data = await supabase_auth.get_user(access_token)
        return user_data["id"]
    except httpx.HTTPStatusError:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Auth error: {str(e)}")


# =====================================================================
# ROUTES
# =====================================================================


# ── Health Check ──────────────────────────────────────────────────────

@app.get("/health")
def health_check():
    """Simple health check — returns {"status": "ok"}."""
    return {"status": "ok"}


# ── Auth: Sign Up ─────────────────────────────────────────────────────

@app.post("/auth/signup")
async def signup(body: SignupRequest):
    """
    Register a new user.

    Request body:
        { "email": "...", "password": "...", "name": "..." }

    Forwards to Supabase Auth → POST /auth/v1/signup.
    Returns the user object and session (tokens) if email confirmation
    is disabled in your Supabase project settings.
    """
    try:
        result = await supabase_auth.signup(
            email=body.email,
            password=body.password,
            name=body.name,
        )
        return result
    except httpx.HTTPStatusError as e:
        # Supabase returned an error (e.g. email already registered)
        detail = e.response.json() if e.response.content else {"message": str(e)}
        raise HTTPException(status_code=e.response.status_code, detail=detail)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ── Auth: Log In ──────────────────────────────────────────────────────

@app.post("/auth/login")
async def login(body: LoginRequest):
    """
    Log in with email + password.

    Request body:
        { "email": "...", "password": "..." }

    Forwards to Supabase Auth → POST /auth/v1/token?grant_type=password.
    Returns { access_token, refresh_token, expires_in, token_type, user }.
    """
    try:
        result = await supabase_auth.login(
            email=body.email,
            password=body.password,
        )
        return result
    except httpx.HTTPStatusError as e:
        detail = e.response.json() if e.response.content else {"message": str(e)}
        raise HTTPException(status_code=e.response.status_code, detail=detail)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ── Ingredients: Get All ──────────────────────────────────────────────

@app.get("/ingredients")
async def get_ingredients(authorization: Optional[str] = Header(None)):
    """
    Get all ingredients in the logged-in user's kitchen.

    Headers:
        Authorization: Bearer <access_token>

    Returns a JSON array of ingredient objects.
    """
    token = _extract_token(authorization)
    user_id = await _get_user_id(token)
    try:
        return await supabase_db.get_ingredients(token, user_id)
    except httpx.HTTPStatusError as e:
        raise HTTPException(status_code=e.response.status_code, detail=e.response.text)


# ── Ingredients: Add One or More ──────────────────────────────────────

@app.post("/ingredients")
async def add_ingredients(
    ingredients: List[IngredientCreate],
    authorization: Optional[str] = Header(None),
):
    """
    Add ingredient(s) to the user's kitchen.

    Request body (JSON array):
        [
          {
            "ingredient_name": "Chicken Breast",
            "category": "Protein",
            "amount": 500,
            "unit": "g",
            "expiry_days": 3
          }
        ]

    You can send a single ingredient as a one-element array.
    """
    token = _extract_token(authorization)
    user_id = await _get_user_id(token)
    try:
        rows = [ing.model_dump() for ing in ingredients]
        return await supabase_db.add_ingredients(token, user_id, rows)
    except httpx.HTTPStatusError as e:
        raise HTTPException(status_code=e.response.status_code, detail=e.response.text)


# ── Ingredients: Delete One ──────────────────────────────────────────

@app.delete("/ingredients/{ingredient_id}")
async def delete_ingredient(
    ingredient_id: int,
    authorization: Optional[str] = Header(None),
):
    """
    Delete a single ingredient by its ID.

    Only deletes if the ingredient belongs to the authenticated user.
    """
    token = _extract_token(authorization)
    user_id = await _get_user_id(token)
    try:
        await supabase_db.delete_ingredient(token, user_id, ingredient_id)
        return {"detail": "Ingredient deleted"}
    except httpx.HTTPStatusError as e:
        raise HTTPException(status_code=e.response.status_code, detail=e.response.text)


# ── Ingredients: Delete All ──────────────────────────────────────────

@app.delete("/ingredients")
async def delete_all_ingredients(authorization: Optional[str] = Header(None)):
    """
    Delete ALL ingredients for the authenticated user.

    Use with caution — this removes everything from the user's kitchen.
    """
    token = _extract_token(authorization)
    user_id = await _get_user_id(token)
    try:
        await supabase_db.delete_all_ingredients(token, user_id)
        return {"detail": "All ingredients deleted"}
    except httpx.HTTPStatusError as e:
        raise HTTPException(status_code=e.response.status_code, detail=e.response.text)


# ── Saved Recipes: Get All ────────────────────────────────────────────

@app.get("/saved-recipes")
async def get_saved_recipes(authorization: Optional[str] = Header(None)):
    """
    Get all saved recipe IDs for the logged-in user.

    Returns a JSON array like:
        [{"recipe_id": "r1"}, {"recipe_id": "r2"}]
    """
    token = _extract_token(authorization)
    user_id = await _get_user_id(token)
    try:
        return await supabase_db.get_saved_recipes(token, user_id)
    except httpx.HTTPStatusError as e:
        raise HTTPException(status_code=e.response.status_code, detail=e.response.text)


# ── Saved Recipes: Toggle Save/Unsave ─────────────────────────────────

@app.post("/saved-recipes")
async def toggle_saved_recipe(
    body: SavedRecipeToggle,
    authorization: Optional[str] = Header(None),
):
    """
    Toggle a recipe as saved or unsaved.

    Request body:
        { "recipe_id": "r1" }

    If the recipe is already saved, it will be removed (unsaved).
    If it's not saved, it will be added (saved).

    Returns: { "action": "saved" } or { "action": "unsaved" }
    """
    token = _extract_token(authorization)
    user_id = await _get_user_id(token)
    try:
        return await supabase_db.toggle_saved_recipe(token, user_id, body.recipe_id)
    except httpx.HTTPStatusError as e:
        raise HTTPException(status_code=e.response.status_code, detail=e.response.text)