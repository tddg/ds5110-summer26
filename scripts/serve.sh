#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PORT="${PORT:-8080}"
WATCH_PID=""

cd "$ROOT"

cleanup() {
  if [[ -n "$WATCH_PID" ]] && kill -0 "$WATCH_PID" >/dev/null 2>&1; then
    kill "$WATCH_PID" >/dev/null 2>&1 || true
    wait "$WATCH_PID" >/dev/null 2>&1 || true
  fi
}

trap cleanup EXIT INT TERM

if command -v fswatch >/dev/null 2>&1; then
  bash scripts/watch_assignments.sh &
  WATCH_PID="$!"
else
  echo "fswatch not found; doing one assignment build only."
  echo "Install live rebuild support with: brew install fswatch"
  python3 scripts/build_assignments.py
fi

echo
echo "Serving site at http://127.0.0.1:${PORT}"
echo "Press Ctrl+C to stop."
python3 -m http.server "$PORT"
