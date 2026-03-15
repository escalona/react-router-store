#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
if command -v git >/dev/null 2>&1; then
  REPO_ROOT="$(git -C "${SCRIPT_DIR}" rev-parse --show-toplevel 2>/dev/null || true)"
fi
REPO_ROOT="${REPO_ROOT:-$(cd "${SCRIPT_DIR}/../../../.." && pwd)}"

cd "${REPO_ROOT}"

commands=(
  "pnpm lint"
  "pnpm typecheck"
  "pnpm test"
  "pnpm build"
)

for command in "${commands[@]}"; do
  echo "Running ${command}..."
  ${command}
done

echo "code-change-verification: all commands passed."
