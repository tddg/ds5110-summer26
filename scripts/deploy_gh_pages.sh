#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
BRANCH="${BRANCH:-gh-pages}"
REMOTE="${REMOTE:-origin}"
TMP_DIR="${TMPDIR:-/tmp}/ds5110-summer26-gh-pages"
BUILD_ASSIGNMENTS="${BUILD_ASSIGNMENTS:-0}"

cd "$ROOT"

if ! git remote get-url "$REMOTE" >/dev/null 2>&1; then
  echo "Remote '$REMOTE' does not exist. Set REMOTE=... or add the remote first." >&2
  exit 1
fi

REMOTE_URL="$(git remote get-url "$REMOTE")"

echo "Deploy target: $REMOTE_URL branch $BRANCH"
echo "Build assignment pages before deploy: $BUILD_ASSIGNMENTS"
echo

if [[ "$BUILD_ASSIGNMENTS" == "1" ]]; then
  echo "Building assignment pages from Markdown..."
  python3 scripts/build_assignments.py
fi

rm -rf "$TMP_DIR"
mkdir -p "$TMP_DIR"

cp index.html "$TMP_DIR/"
cp style.css "$TMP_DIR/"
cp app.js "$TMP_DIR/"

if find assignments -maxdepth 1 -name "*.html" -type f | grep -q .; then
  mkdir -p "$TMP_DIR/assignments"
  find assignments -maxdepth 1 -name "*.html" -type f -exec cp {} "$TMP_DIR/assignments/" \;
fi

if [[ -d assets ]]; then
  mkdir -p "$TMP_DIR/assets"
  find assets -mindepth 1 ! -name ".DS_Store" -exec cp -R {} "$TMP_DIR/assets/" \;
fi

if [[ -d "$TMP_DIR/assets/docs" ]]; then
  if command -v exiftool >/dev/null 2>&1; then
    echo "Setting deployed PDF titles to filenames..."
    while IFS= read -r -d '' pdf; do
      title="$(basename "$pdf")"
      exiftool -Title="$title" "$pdf" >/dev/null
      rm -f "${pdf}_original"
    done < <(find "$TMP_DIR/assets/docs" -type f -iname "*.pdf" -print0)
  else
    echo "Warning: exiftool not found; deployed PDF browser titles may use stale PDF metadata." >&2
    echo "Install with: brew install exiftool" >&2
  fi
fi

cat > "$TMP_DIR/.nojekyll" <<'EOF'
EOF

cd "$TMP_DIR"
git init -q
git checkout -q -b "$BRANCH"
git add .
git commit -q -m "Deploy course website"
git remote add "$REMOTE" "$REMOTE_URL"

echo
echo "About to force-push generated static site to $REMOTE/$BRANCH."
echo "This updates the GitHub Pages branch only; it does not commit changes on your current branch."
read -r -p "Continue? [y/N] " answer
case "$answer" in
  y|Y|yes|YES)
    for attempt in 1 2 3; do
      if git push -f "$REMOTE" "$BRANCH"; then
        break
      fi
      if [[ "$attempt" -eq 3 ]]; then
        echo "Push failed after 3 attempts." >&2
        exit 1
      fi
      echo "Push attempt $attempt failed; retrying in 3 seconds..." >&2
      sleep 3
    done
    ;;
  *)
    echo "Deploy cancelled. Generated site remains at $TMP_DIR"
    exit 1
    ;;
esac

echo
echo "Deploy complete."
echo "In GitHub Pages settings, use branch '$BRANCH' and folder '/ (root)'."
