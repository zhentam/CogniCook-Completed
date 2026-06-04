"""
Vercel serverless entry point.

Vercel routes /api/* to this file. It loads the FastAPI app from
backend/app/main.py using a path-based import so we don't need
to move any backend code.

The key fix: we add backend/ to sys.path BEFORE loading the module,
so that `from app.models import ...` inside main.py resolves correctly.
"""

import sys
from pathlib import Path
import importlib.util

# Resolve the backend directory and its app subdirectory
backend_dir = Path(__file__).resolve().parent.parent / "backend"
backend_app = backend_dir / "app" / "main.py"

# Add backend/ to sys.path so `from app.models import ...` works
# This is needed because on Vercel the working dir is /var/task (repo root),
# not backend/. Without this, Python can't find the "app" package.
if str(backend_dir) not in sys.path:
    sys.path.insert(0, str(backend_dir))

# Load backend/app/main.py
spec = importlib.util.spec_from_file_location("backend_app_main", str(backend_app))
backend_module = importlib.util.module_from_spec(spec)
assert spec.loader is not None
spec.loader.exec_module(backend_module)

# Expose the FastAPI app so Vercel can serve it
app = backend_module.app