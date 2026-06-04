#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
BRANCH="${BRANCH:-gh-pages}"
REMOTE="${REMOTE:-origin}"
TMP_DIR="${TMPDIR:-/tmp}/ds5110-summer26-gh-pages"
BUILD_DIR="${TMPDIR:-/tmp}/ds5110-summer26-gh-pages-build"
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

rm -rf "$BUILD_DIR"
mkdir -p "$BUILD_DIR"

cp index.html "$BUILD_DIR/"
cp style.css "$BUILD_DIR/"
cp app.js "$BUILD_DIR/"

if find assignments -maxdepth 1 -name "*.html" -type f | grep -q .; then
  mkdir -p "$BUILD_DIR/assignments"
  find assignments -maxdepth 1 -name "*.html" -type f -exec cp {} "$BUILD_DIR/assignments/" \;
fi

if [[ -d assets ]]; then
  cp -R assets "$BUILD_DIR/"
  find "$BUILD_DIR/assets" -name ".DS_Store" -type f -delete
fi

if [[ -d "$BUILD_DIR/assets/docs" ]]; then
  if command -v exiftool >/dev/null 2>&1; then
    echo "Setting deployed PDF titles to filenames..."
    while IFS= read -r -d '' pdf; do
      title="$(basename "$pdf")"
      exiftool -Title="$title" "$pdf" >/dev/null
      rm -f "${pdf}_original"
    done < <(find "$BUILD_DIR/assets/docs" -type f -iname "*.pdf" -print0)
  else
    echo "Warning: exiftool not found; deployed PDF browser titles may use stale PDF metadata." >&2
    echo "Install with: brew install exiftool" >&2
  fi
fi

cat > "$BUILD_DIR/.nojekyll" <<'EOF'
EOF

rm -rf "$TMP_DIR"
if git ls-remote --exit-code --heads "$REMOTE_URL" "$BRANCH" >/dev/null 2>&1; then
  git clone -q --single-branch --branch "$BRANCH" "$REMOTE_URL" "$TMP_DIR"
else
  mkdir -p "$TMP_DIR"
  cd "$TMP_DIR"
  git init -q
  git checkout -q -b "$BRANCH"
  git remote add "$REMOTE" "$REMOTE_URL"
  cd "$ROOT"
fi

find "$TMP_DIR" -mindepth 1 -maxdepth 1 ! -name ".git" -exec rm -rf {} +
cp -R "$BUILD_DIR"/. "$TMP_DIR"/

cd "$TMP_DIR"
git add -A
if git diff --cached --quiet; then
  echo "No deploy changes to push."
  exit 0
fi
git commit -q -m "Deploy course website"

echo
echo "About to push generated static site to $REMOTE/$BRANCH."
echo "This updates the GitHub Pages branch only; it does not commit changes on your current branch."
read -r -p "Continue? [y/N] " answer
case "$answer" in
  y|Y|yes|YES)
    for attempt in 1 2 3; do
      if git push "$REMOTE" "$BRANCH"; then
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
