"""
Vercel serverless entry point.

Vercel routes /api/* to this file. It loads the FastAPI app from
backend/app/main.py using a path-based import so we don't need
to move any backend code.

Key fixes:
1. Add backend/ to sys.path so "from app.models import ..." resolves.
2. Strip the "/api" prefix from request paths, because Vercel sends
   /api/auth/login but our routes are /auth/login.
"""

import sys
from pathlib import Path
import importlib.util

# Resolve the backend directory and its app subdirectory
backend_dir = Path(__file__).resolve().parent.parent / "backend"
backend_app = backend_dir / "app" / "main.py"

# Add backend/ to sys.path so "from app.models import ..." works
if str(backend_dir) not in sys.path:
    sys.path.insert(0, str(backend_dir))

# Load backend/app/main.py
spec = importlib.util.spec_from_file_location("backend_app_main", str(backend_app))
backend_module = importlib.util.module_from_spec(spec)
assert spec.loader is not None
spec.loader.exec_module(backend_module)

# Get the original FastAPI app
_app = backend_module.app


# ASGI middleware: strip "/api" prefix from request paths
# Vercel sends /api/auth/login -> FastAPI expects /auth/login
class StripApiPrefix:
    def __init__(self, app):
        self.app = app

    async def __call__(self, scope, receive, send):
        if scope["type"] in ("http", "websocket"):
            path = scope.get("path", "")
            if path.startswith("/api"):
                scope["path"] = path[4:] or "/"
                raw = scope.get("raw_path", b"")
                if raw.startswith(b"/api"):
                    scope["raw_path"] = raw[4:] or b"/"
        return await self.app(scope, receive, send)


app = StripApiPrefix(_app)
