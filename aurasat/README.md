# AuraSAT

Full‑stack app offering satellite internet plans, rural resources, support, and speed tests.

## Prerequisites
- Node.js 18+ (recommended: Node 20 LTS)
- npm 9+
- Open ports: 4000 (backend), 5173 (frontend)

## Quick start
```bash
# in project root
npm install
npm run dev
```
- Frontend: http://localhost:5173
- Backend API: http://localhost:4000

## Scripts
- Root
  - `npm run dev`: start backend + frontend concurrently
  - `npm run build`: build backend (tsc) and frontend (vite)
  - `npm run start`: start compiled backend only (after build)
- Workspaces
  - Backend: `npm run dev -w backend`, `npm run build -w backend`, `npm run start -w backend`
  - Frontend: `npm run dev -w frontend`, `npm run build -w frontend`, `npm run preview -w frontend`

## Environment (optional)
Create `backend/.env` (copy from `.env.example`) to override defaults:
```
PORT=4000
FRONTEND_ORIGIN=http://localhost:5173
JWT_SECRET=change-me-in-prod
```
Defaults work for local dev.

## Features
- Plans: pricing with monthly/yearly toggle
- Resources: curated government programs
- Auth: register/login with httpOnly cookie (demo in-memory user store)
- Support: options + ticket submission
- Speed test: download stream + upload endpoint
- Coverage checker: mock logic for demo
- Newsletter subscribe: in-memory store

## Troubleshooting
- Port in use: change ports (frontend `vite.config.ts` or backend `PORT`)
- CORS: set `FRONTEND_ORIGIN` to your front-end URL
- Cookies not saved: ensure requests use `credentials: 'include'` where needed
- Windows PowerShell: the provided npm scripts work cross‑platform
- Slow speed test: it downloads ~50MB; network/security tools may throttle

## Production notes
- Use a strong `JWT_SECRET`, set cookie `secure` and a proper domain
- Replace in-memory stores with a database
- Serve the built frontend (`frontend/dist`) from a static host or a CDN