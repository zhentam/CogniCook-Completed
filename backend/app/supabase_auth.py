"""
Supabase Auth helpers — sign up, log in, and get user info.

These functions call Supabase's Auth REST API using httpx.
We keep them in a separate file so main.py stays clean and easy to read.

NOTE: In production you would verify JWT signatures using Supabase's
      JWKS endpoint.  For this learning backend we simply trust the
      token and pass it through to Supabase.
"""

import httpx
from app.config import SUPABASE_URL, SUPABASE_ANON_KEY


# ── Common headers sent with every Supabase request ───────────────────

def _headers() -> dict:
    """Return the headers required by the Supabase REST API."""
    return {
        "apikey": SUPABASE_ANON_KEY,
        "Content-Type": "application/json",
    }


# ── Sign Up ───────────────────────────────────────────────────────────

async def signup(email: str, password: str, name: str | None = None) -> dict:
    """
    Register a new user via Supabase Auth.

    Calls:  POST  {SUPABASE_URL}/auth/v1/signup
    Docs:   https://supabase.com/docs/guides/auth/passwords

    Returns the JSON response from Supabase (contains user + session).
    """
    url = f"{SUPABASE_URL}/auth/v1/signup"
    body: dict = {"email": email, "password": password}

    # Supabase lets you attach arbitrary metadata to the user
    if name:
        body["data"] = {"name": name}

    async with httpx.AsyncClient() as client:
        response = await client.post(url, json=body, headers=_headers())

    # Raise an error if Supabase returned 4xx / 5xx
    response.raise_for_status()
    return response.json()


# ── Log In ────────────────────────────────────────────────────────────

async def login(email: str, password: str) -> dict:
    """
    Log in an existing user with email + password.

    Calls:  POST  {SUPABASE_URL}/auth/v1/token?grant_type=password
    Docs:   https://supabase.com/docs/guides/auth/passwords

    Returns {access_token, refresh_token, expires_in, token_type, user}.
    """
    url = f"{SUPABASE_URL}/auth/v1/token"
    params = {"grant_type": "password"}
    body = {"email": email, "password": password}

    async with httpx.AsyncClient() as client:
        response = await client.post(
            url, json=body, params=params, headers=_headers()
        )

    response.raise_for_status()
    return response.json()


# ── Get Current User ──────────────────────────────────────────────────

async def get_user(access_token: str) -> dict:
    """
    Retrieve the user object associated with an access token.

    Calls:  GET  {SUPABASE_URL}/auth/v1/user

    This is how we identify *who* is making a request to our API.
    The frontend sends the access_token in the Authorization header,
    and we forward it to Supabase to get the user's ID.

    NOTE: In production, you would verify the JWT signature locally
          instead of calling this endpoint on every request.
    """
    url = f"{SUPABASE_URL}/auth/v1/user"
    headers = {
        **_headers(),
        "Authorization": f"Bearer {access_token}",
    }

    async with httpx.AsyncClient() as client:
        response = await client.get(url, headers=headers)

    response.raise_for_status()
    return response.json()