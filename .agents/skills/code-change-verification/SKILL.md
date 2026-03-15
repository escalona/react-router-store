---
name: code-change-verification
description: Run the mandatory verification stack when changes affect runtime code, tests, or build/test behavior.
---

# Code Change Verification

## Overview

Ensure work is only marked complete after installing dependencies, building, linting, type checking (including generated declarations), and tests pass. Use this skill when changes affect runtime code, tests, or build/test configuration.

## Quick start

1. Keep this skill at `./.agents/skills/code-change-verification` so it loads automatically for the repository.
2. macOS/Linux: `bash .agents/skills/code-change-verification/scripts/run.sh`.
3. If any command fails, fix the issue, rerun the script, and report the failing output.
4. Confirm completion only when all commands succeed with no remaining issues.

## Manual workflow

- Run from the repository root in this order: `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build`.
- Do not skip steps; stop and fix issues immediately when a command fails.
- Re-run the full stack after applying fixes so the commands execute in the required order.

## Resources

### scripts/run.sh

- Executes the repository verification stack with fail-fast semantics.
- Prefer this entry point to ensure the commands always run in the correct order from the repo root.
