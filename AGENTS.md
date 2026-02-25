# AGENTS.md

## Cursor Cloud specific instructions

This is a React + TypeScript + Vite single-page application (Valor Estate Limited corporate website). There is no backend server to run — all backends are external services (Supabase, Contentful, AWS S3).

### Key commands

| Task | Command |
|------|---------|
| Dev server | `npm run dev` (Vite on port 5173) |
| Lint | `npm run lint` (ESLint) |
| Build | `npm run build` (tsc -b && vite build) |
| Preview | `npm run preview` |

### Environment variables

A `.env` file with `VITE_*` variables is required. The app starts and renders the UI even with placeholder values — data fetching from Supabase/Contentful will simply fail gracefully. Key vars: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_CONTENTFUL_SPACE_ID`, `VITE_CONTENTFUL_ACCESS_TOKEN`. The CMS dashboard is feature-flagged behind `VITE_CMS_ENABLED=true`.

### Notes

- The codebase has pre-existing ESLint errors (unused imports, `@ts-nocheck` usage, `no-explicit-any`). These are not regressions.
- No automated test suite exists. Validation is through lint, type-check, build, and manual testing.
- The Vite proxy at `/supabase-proxy` rewrites to the Supabase URL configured in `vite.config.ts`.
