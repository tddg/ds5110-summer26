#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

if ! command -v fswatch >/dev/null 2>&1; then
  echo "fswatch is required for automatic rebuilds."
  echo "Install it on macOS with: brew install fswatch"
  exit 1
fi

echo "Watching assignment Markdown and builder files..."
echo "Press Ctrl+C to stop."

python3 scripts/build_assignments.py

fswatch -o assignments/src style.css scripts/build_assignments.py | while read -r _; do
  echo
  echo "Change detected. Rebuilding assignments..."
  python3 scripts/build_assignments.py
done
