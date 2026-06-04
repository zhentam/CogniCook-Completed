"""
Vercel serverless entry point.

Vercel routes /api/* to this file. It loads the FastAPI app from
backend/app/main.py using a path-based import so we don't need
to move any backend code.

Vercel strips the /api prefix before passing the request to this
function, so the FastAPI routes (e.g. GET /health, POST /auth/login)
work without modification.
"""

from pathlib import Path
import importlib.util

# Build the absolute path to backend/app/main.py
backend_main = Path(__file__).resolve().parent.parent / "backend" / "app" / "main.py"

spec = importlib.util.spec_from_file_location("backend_app_main", backend_main)
backend_module = importlib.util.module_from_spec(spec)
assert spec.loader is not None
spec.loader.exec_module(backend_module)

# Expose the FastAPI app so Vercel can serve it
app = backend_module.app