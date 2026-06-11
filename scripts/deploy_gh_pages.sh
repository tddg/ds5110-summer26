#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
BRANCH="${BRANCH:-gh-pages}"
REMOTE="${REMOTE:-origin}"
BUILD_DIR="${TMPDIR:-/tmp}/ds5110-summer26-gh-pages-build"
DEPLOY_INDEX="${TMPDIR:-/tmp}/ds5110-summer26-gh-pages-index"
DEPLOY_OBJECTS="${TMPDIR:-/tmp}/ds5110-summer26-gh-pages-objects"
BUILD_ASSIGNMENTS="${BUILD_ASSIGNMENTS:-0}"
MAX_FILE_BYTES=$((100 * 1024 * 1024))

cd "$ROOT"

if ! git remote get-url "$REMOTE" >/dev/null 2>&1; then
  echo "Remote '$REMOTE' does not exist. Set REMOTE=... or add the remote first." >&2
  exit 1
fi

REMOTE_URL="$(git remote get-url --push "$REMOTE")"
DEPLOY_REMOTE_URL="${DEPLOY_REMOTE_URL:-git@github.com:tddg/ds5110-summer26.git}"

echo "Configured push remote: $REMOTE_URL"
echo "Deploy target: $DEPLOY_REMOTE_URL branch $BRANCH"
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
if [[ -f .gitattributes ]]; then
  cp .gitattributes "$BUILD_DIR/"
fi

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
      echo "  $title"
      exiftool -overwrite_original -Title="$title" "$pdf" >/dev/null
    done < <(find "$BUILD_DIR/assets/docs" -type f -iname "*.pdf" -print0)
  else
    echo "Warning: exiftool not found; deployed PDF browser titles may use stale PDF metadata." >&2
    echo "Install with: brew install exiftool" >&2
  fi
fi

cat > "$BUILD_DIR/.nojekyll" <<'EOF'
EOF

oversized_file=""
while IFS= read -r -d '' file; do
  size="$(stat -f '%z' "$file")"
  if (( size > MAX_FILE_BYTES )); then
    oversized_file="$file"
    break
  fi
done < <(find "$BUILD_DIR" -type f -print0)

if [[ -n "$oversized_file" ]]; then
  echo "Deploy aborted: GitHub rejects files larger than 100 MiB." >&2
  ls -lh "$oversized_file" >&2
  exit 1
fi

echo "Creating $BRANCH commit from the current source commit..."
rm -f "$DEPLOY_INDEX"
rm -rf "$DEPLOY_OBJECTS"
mkdir -p "$DEPLOY_OBJECTS"
export GIT_INDEX_FILE="$DEPLOY_INDEX"
export GIT_OBJECT_DIRECTORY="$DEPLOY_OBJECTS"
export GIT_ALTERNATE_OBJECT_DIRECTORIES="$ROOT/.git/objects"
git read-tree HEAD
git --work-tree="$BUILD_DIR" add -A
DEPLOY_TREE="$(git write-tree)"
DEPLOY_COMMIT="$(printf '%s\n' "Deploy course website" | git commit-tree "$DEPLOY_TREE" -p HEAD)"
unset GIT_INDEX_FILE

echo
echo "About to force-push generated static site to $DEPLOY_REMOTE_URL branch $BRANCH."
echo "This updates the GitHub Pages branch only; it does not commit changes on your current branch."
read -r -p "Continue? [y/N] " answer
case "$answer" in
  y|Y|yes|YES)
    for attempt in 1 2 3; do
      if git push --force "$DEPLOY_REMOTE_URL" "$DEPLOY_COMMIT:refs/heads/$BRANCH"; then
        echo
        echo "Deploy complete."
        echo "In GitHub Pages settings, use branch '$BRANCH' and folder '/ (root)'."
        exit 0
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
    echo "Deploy cancelled. Generated site remains at $BUILD_DIR"
    exit 1
    ;;
esac
