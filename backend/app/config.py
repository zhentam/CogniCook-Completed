"""
Configuration — loads environment variables from .env file.

In production, you would use a secrets manager (e.g. AWS Secrets Manager,
HashiCorp Vault) instead of a plain .env file.  For a learning project,
.env is perfectly fine.
"""

import os
from dotenv import load_dotenv

# Load .env from the backend/ directory
load_dotenv(os.path.join(os.path.dirname(os.path.dirname(__file__)), ".env"))

# Supabase project URL (e.g. https://xxxx.supabase.co)
SUPABASE_URL: str = os.getenv("SUPABASE_URL", "")

# Supabase "anon" / publishable key — safe to use in client-side code
SUPABASE_ANON_KEY: str = os.getenv("SUPABASE_ANON_KEY", "")

# PostgreSQL connection string (used for reference, not directly in this app)
DATABASE_URL: str = os.getenv("DATABASE_URL", "")

# Where this API is running
APP_BASE_URL: str = os.getenv("APP_BASE_URL", "http://localhost:8000")