"""
Supabase Database helpers — CRUD operations for ingredients & saved recipes.

These functions call Supabase's PostgREST REST API using httpx.
Each request includes the user's access token so Supabase can apply
Row Level Security (RLS) policies.

Supabase REST API docs:
https://supabase.com/docs/guides/api#rest-api
"""

import httpx
from typing import List
from app.config import SUPABASE_URL, SUPABASE_ANON_KEY


# ── Common headers ────────────────────────────────────────────────────

def _db_headers(access_token: str) -> dict:
    """
    Headers for Supabase REST (PostgREST) requests.

    - "apikey"        → identifies the Supabase project
    - "Authorization"  → identifies the user (for RLS)
    - "Content-Type"   → we're sending JSON
    """
    return {
        "apikey": SUPABASE_ANON_KEY,
        "Authorization": f"Bearer {access_token}",
        "Content-Type": "application/json",
    }


# =====================================================================
# INGREDIENTS
# =====================================================================

async def get_ingredients(access_token: str, user_id: str) -> list:
    """
    Fetch all ingredients belonging to the user.

    Calls:  GET  /rest/v1/user_ingredients?user_id=eq.{user_id}

    The "eq." prefix is a PostgREST filter operator meaning "equals".
    """
    url = f"{SUPABASE_URL}/rest/v1/user_ingredients"
    params = {
        "user_id": f"eq.{user_id}",
        "select": "*",               # return all columns
        "order": "added_at.desc",    # newest first
    }

    async with httpx.AsyncClient() as client:
        response = await client.get(
            url, params=params, headers=_db_headers(access_token)
        )

    response.raise_for_status()
    return response.json()


async def add_ingredients(
    access_token: str, user_id: str, ingredients: List[dict]
) -> list:
    """
    Insert one or more ingredients for the user.

    Calls:  POST  /rest/v1/user_ingredients

    Supabase returns the inserted rows when the
    "Prefer: return=representation" header is set.
    """
    url = f"{SUPABASE_URL}/rest/v1/user_ingredients"
    headers = {
        **_db_headers(access_token),
        "Prefer": "return=representation",   # return the inserted rows
    }

    # Attach user_id to each ingredient row
    rows = [{**ing, "user_id": user_id} for ing in ingredients]

    async with httpx.AsyncClient() as client:
        response = await client.post(url, json=rows, headers=headers)

    response.raise_for_status()
    return response.json()


async def delete_ingredient(
    access_token: str, user_id: str, ingredient_id: int
) -> None:
    """
    Delete a single ingredient by ID, but only if it belongs to the user.

    Calls:  DELETE  /rest/v1/user_ingredients?id=eq.{id}&user_id=eq.{user_id}

    The double filter (id + user_id) ensures users can only delete
    their own ingredients.
    """
    url = f"{SUPABASE_URL}/rest/v1/user_ingredients"
    params = {
        "id": f"eq.{ingredient_id}",
        "user_id": f"eq.{user_id}",
    }

    async with httpx.AsyncClient() as client:
        response = await client.delete(
            url, params=params, headers=_db_headers(access_token)
        )

    response.raise_for_status()


async def delete_all_ingredients(access_token: str, user_id: str) -> None:
    """
    Delete ALL ingredients for the user.

    Calls:  DELETE  /rest/v1/user_ingredients?user_id=eq.{user_id}
    """
    url = f"{SUPABASE_URL}/rest/v1/user_ingredients"
    params = {"user_id": f"eq.{user_id}"}

    async with httpx.AsyncClient() as client:
        response = await client.delete(
            url, params=params, headers=_db_headers(access_token)
        )

    response.raise_for_status()


# =====================================================================
# SAVED RECIPES
# =====================================================================

async def get_saved_recipes(access_token: str, user_id: str) -> list:
    """
    Fetch all saved recipe IDs for the user.

    Calls:  GET  /rest/v1/saved_recipes?user_id=eq.{user_id}

    Returns a list of objects like:
      [{"recipe_id": "r1"}, {"recipe_id": "r2"}, ...]
    """
    url = f"{SUPABASE_URL}/rest/v1/saved_recipes"
    params = {
        "user_id": f"eq.{user_id}",
        "select": "recipe_id",
        "order": "saved_at.desc",
    }

    async with httpx.AsyncClient() as client:
        response = await client.get(
            url, params=params, headers=_db_headers(access_token)
        )

    response.raise_for_status()
    return response.json()


async def toggle_saved_recipe(
    access_token: str, user_id: str, recipe_id: str
) -> dict:
    """
    Toggle a recipe's saved state:
      - If already saved  → delete it   (unsave)
      - If not saved      → insert it   (save)

    Returns {"action": "saved"} or {"action": "unsaved"}.
    """
    url = f"{SUPABASE_URL}/rest/v1/saved_recipes"
    headers = _db_headers(access_token)

    # Step 1: Check if the recipe is already saved
    params = {
        "user_id": f"eq.{user_id}",
        "recipe_id": f"eq.{recipe_id}",
        "select": "id",
    }

    async with httpx.AsyncClient() as client:
        check = await client.get(url, params=params, headers=headers)
        check.raise_for_status()
        existing = check.json()

    # Step 2: Toggle
    if existing:
        # Already saved → delete it
        delete_params = {
            "user_id": f"eq.{user_id}",
            "recipe_id": f"eq.{recipe_id}",
        }
        async with httpx.AsyncClient() as client:
            resp = await client.delete(url, params=delete_params, headers=headers)
            resp.raise_for_status()
        return {"action": "unsaved"}
    else:
        # Not saved → insert it
        insert_headers = {**headers, "Prefer": "return=representation"}
        body = {"user_id": user_id, "recipe_id": recipe_id}
        async with httpx.AsyncClient() as client:
            resp = await client.post(url, json=body, headers=insert_headers)
            resp.raise_for_status()
        return {"action": "saved"}