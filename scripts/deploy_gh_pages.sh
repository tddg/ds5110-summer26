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
mkdir -p "$TMP_DIR/assets/images"

cp index.html "$TMP_DIR/"
cp style.css "$TMP_DIR/"
cp app.js "$TMP_DIR/"

if [[ -f assets/images/uva.ico ]]; then
  cp assets/images/uva.ico "$TMP_DIR/assets/images/"
fi

if find assignments -maxdepth 1 -name "*.html" -type f | grep -q .; then
  mkdir -p "$TMP_DIR/assignments"
  find assignments -maxdepth 1 -name "*.html" -type f -exec cp {} "$TMP_DIR/assignments/" \;
fi

if [[ -d assets/images ]]; then
  mkdir -p "$TMP_DIR/assets/images"
  find assets/images -mindepth 1 ! -name ".DS_Store" -exec cp -R {} "$TMP_DIR/assets/images/" \;
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
    git push -f "$REMOTE" "$BRANCH"
    ;;
  *)
    echo "Deploy cancelled. Generated site remains at $TMP_DIR"
    exit 1
    ;;
esac

echo
echo "Deploy complete."
echo "In GitHub Pages settings, use branch '$BRANCH' and folder '/ (root)'."
