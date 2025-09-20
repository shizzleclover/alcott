# Contributing Guide

## Branching
- main: production-ready
- feat/*: features
- fix/*: bug fixes

## Commit messages
- Use Conventional Commits: `feat:`, `fix:`, `docs:`, `refactor:`, `chore:`, `test:`

## Code style
- Follow `.editorconfig`
- TypeScript strict mode on (fix types locally even if build ignores)
- Prefer explicit types for exported APIs

## PR checklist
- [ ] Linted locally
- [ ] No unused files or dead code
- [ ] Screenshots for UI changes
- [ ] Updated README if needed

## UI components
- Add reusable primitives under `components/ui/*`
- Use `lib/utils.ts` `cn()` for class merging

## CSS
- Only edit `app/globals.css` for tokens and base layers
- Co-locate component styles with component when needed
