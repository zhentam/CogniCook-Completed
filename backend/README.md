# CogniCook Backend

A minimal FastAPI backend for the CogniCook cooking app.  
Uses Supabase for authentication and database (via REST API).

## Setup

### 1. Create a virtual environment and install dependencies

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate   # macOS / Linux
# .venv\Scripts\activate    # Windows
pip install -r requirements.txt
```

### 2. Set up environment variables

Copy `.env.example` to `.env` and fill in your Supabase credentials:

```bash
cp .env.example .env
# Then edit .env with your Supabase credentials
```

Edit `.env`:

```
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your-supabase-anon-key
DATABASE_URL=postgresql://user:password@host:5432/dbname
APP_BASE_URL=http://localhost:8000
```

### 3. Run the server

```bash
uvicorn app.main:app --reload --port 8000
```

The API will be available at `http://localhost:8000`.  
Interactive docs: `http://localhost:8000/docs`

## Endpoints

### Health check
```
GET /health
→ {"status": "ok"}
```

### Auth
```
POST /auth/signup          # { email, password, name? }
POST /auth/login           # { email, password } → returns tokens
```

### Ingredients (require Authorization header)
```
GET  /ingredients          # list user's ingredients
POST /ingredients          # add one or more ingredients
DELETE /ingredients/{id}   # remove one ingredient
DELETE /ingredients        # remove all ingredients
```

### Saved Recipes (require Authorization header)
```
GET  /saved-recipes        # list saved recipe IDs
POST /saved-recipes        # toggle save/unsave { recipe_id }
```

## Curl examples

### Sign up
```bash
curl -X POST http://localhost:8000/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "password123", "name": "Test User"}'
```

### Log in
```bash
curl -X POST http://localhost:8000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "password123"}'
```

### Add ingredients (replace `<token>` with access_token from login)
```bash
curl -X POST http://localhost:8000/ingredients \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '[{"ingredient_name": "Chicken Breast", "category": "Protein", "amount": 500, "unit": "g", "expiry_days": 3}]'
```

### Get ingredients
```bash
curl http://localhost:8000/ingredients \
  -H "Authorization: Bearer <token>"
```

### Delete one ingredient
```bash
curl -X DELETE http://localhost:8000/ingredients/123 \
  -H "Authorization: Bearer <token>"
```

### Delete all ingredients
```bash
curl -X DELETE http://localhost:8000/ingredients \
  -H "Authorization: Bearer <token>"
```

### Get saved recipes
```bash
curl http://localhost:8000/saved-recipes \
  -H "Authorization: Bearer <token>"
```

### Toggle saved recipe
```bash
curl -X POST http://localhost:8000/saved-recipes \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{"recipe_id": "r1"}'
```

## Notes

- This backend does **not** verify JWT signatures (for learning simplicity).
- Supabase Row Level Security (RLS) must be enabled on the tables for proper data isolation.
- The `user_id` is extracted by calling Supabase's `/auth/v1/user` endpoint with the provided token.
- In production, use Supabase's JWKS to verify tokens locally and avoid extra network calls.

## Project structure

```
backend/
├── app/
│   ├── main.py          # FastAPI app + routes
│   ├── config.py        # loads .env variables
│   ├── supabase_auth.py # helpers for Supabase Auth
│   ├── supabase_db.py   # helpers for Supabase DB (REST)
│   └── models.py        # Pydantic request/response models
├── .env.example
├── requirements.txt
└── README.md
```

## Frontend

The React frontend is in the `frontend/` directory.  
It connects to this backend at `http://localhost:8000`.  
See `frontend/src/lib/backendApi.ts` for the API client.