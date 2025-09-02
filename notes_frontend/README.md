# Notes Manager (Next.js)

A modern, light-themed Notes Manager frontend built with Next.js App Router.

- Create, view, edit, and delete notes
- Top navigation bar, main content with notes list, and a sidebar to create notes
- Theme colors:
  - Primary: `#1976d2`
  - Secondary: `#424242`
  - Accent: `#ffeb3b`
- Mock HTTP API using localStorage to simulate backend requests

## Getting Started

Install dependencies and run the dev server:

```bash
npm install
npm run dev
```

Open http://localhost:3000 to view the app.

## Project Structure

- `src/lib/api.ts` — Mock API providing CRUD functions with HTTP-like async behavior
- `src/components/*` — UI components (Navbar, Sidebar, NoteList, NoteItem, Button)
- `src/app/page.tsx` — Main page wiring components to the API
- `src/app/layout.tsx` — App shell with top navigation and main layout
- `src/app/globals.css` — Theme variables and base styles

## Static Export

The app is configured for static export (`next.config.ts` sets `output: "export"`).
All browser-only APIs (localStorage, window, crypto) are guarded and used only
from client components, so the app can be fully pre-rendered and exported.

Build a static export:

```bash
# Build and export to the out/ directory
npm run build
# or using the alias script
npm run export
```

The generated static site will be in `out/` (can be served by any static host).

## Mock API

The app uses a localStorage-backed service to simulate HTTP calls:
- `listNotes()`, `createNote()`, `updateNote()`, `deleteNote()`, `getNote()`

These functions are invoked from client components only and are SSR-safe due to
explicit `typeof window` guards.

To integrate a real backend later, replace the implementations in `src/lib/api.ts`
with `fetch()` calls to your API.

## Notes

- This template does not require environment variables.
- All data is stored in the browser. Clearing site data will reset the notes.
