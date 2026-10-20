#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"

REPO_URL="https://github.com/HazratMaghaz/portfolio-website-consulting.git"
BRANCH="master"

if [[ -d .git ]] || git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "STOP: Extract into a standalone directory with no existing .git repository." >&2
  exit 1
fi

command -v git >/dev/null || { echo "Git is required." >&2; exit 1; }
git var GIT_AUTHOR_IDENT >/dev/null 2>&1 || {
  echo "Set your Git name/email with git config --global before running." >&2
  exit 1
}

echo "Checking that the consulting repository is still empty..."
remote_branches="$(git ls-remote --heads "$REPO_URL")" || {
  echo "Cannot access the repository. Check GitHub access/network and authentication." >&2
  exit 1
}
if [[ -n "$remote_branches" ]]; then
  echo "STOP: The consulting repository already has branches. No files were pushed." >&2
  echo "This script only supports a fresh, empty consulting repository." >&2
  exit 1
fi

if grep -R -nE "maaz28608@gmail.com|hazratmaghaz05@gmail.com" \
     --include='*.html' --include='*.js' .; then
  echo "STOP: Outdated contact email detected." >&2; exit 1
fi

git init -b "$BRANCH"
git remote add origin "$REPO_URL"
git add README.md .gitignore index.html contact.html contact.js site.css \
  assets/ embed_portrait.py publish_to_github.sh render.yaml
git commit -m "feat: publish independent computational biology consulting website"
git push -u origin "$BRANCH"
git switch -c design/cinematic-consulting-v2
git push -u origin design/cinematic-consulting-v2

echo ""
echo "SUCCESS: Consulting code and assets published to ${REPO_URL}"
echo "Production branch: master"
echo "Development branch: design/cinematic-consulting-v2"
echo "This script never opens or changes portfolio-website-new."
