<!-- .github/copilot-instructions.md: Guidance for AI coding agents working on this repo -->
# Copilot instructions — chokiHomesSaketSunshineCove

Purpose: Give AI agents immediate, actionable knowledge to work productively on this repository.

Big picture
- This is a tiny single-page static website. The site root is `index.html` and static assets live in `images/`.
- Hosting: the project is deployed to Vercel. The `vercel.json` file configures two static builds and a catch-all route:

```json
{ "builds": [{ "src": "index.html", "use": "@vercel/static" }, { "src": "images/**", "use": "@vercel/static" }], "routes": [{ "src": "/(.*)", "dest": "/index.html" }] }
```

What this implies
- No build toolchain is present. Changes are served as static files. Don't assume a bundler like Webpack/Vite exists.
- All routes are rewritten to `index.html`. Adding server-side routes requires introducing an `api/` directory and updating `vercel.json`.

Key files to inspect
- `index.html` — single source of truth for markup, scripts, and inline styles.
- `vercel.json` — deployment behavior and routing.
- `images/` — static assets; preserve relative paths used by `index.html` when editing.

Local dev & quick checks
- Quick preview (no dependencies):
  - Run: `python -m http.server 8000` and open `http://localhost:8000`.
- If Vercel CLI is available and configured: `vercel dev` to emulate platform behavior, and `vercel --prod` to deploy.

Repository conventions and patterns
- Minimalism: avoid adding heavy frameworks. If you introduce a build step (React/Vite/etc.), also add a `package.json`, `build` script, and update `vercel.json` to include appropriate `builds`.
- Static assets: place images in `images/`, use lowercase + dashes for filenames (`hero-photo.jpg`). Update references in `index.html` using relative paths (e.g., `<img src="images/hero-photo.jpg">`).
- Routing: because `vercel.json` forwards all requests to `index.html`, client-side routing is possible but must be implemented in `index.html` (no server-side routes exist yet).

When changing deployment or adding server logic
- To add serverless functions, create an `api/` folder and add a `vercel.json` build entry for `api/**` (e.g., use `@vercel/node`).
- If you add Node tooling, include `package.json` and a minimal `README` explaining how to install and run the dev server.

Examples (safe, common edits)
- Adding an image: drop `new-photo.jpg` in `images/`, then add `<img src="images/new-photo.jpg" alt="...">` to `index.html` and preview with `python -m http.server`.
- Small HTML tweak: edit `index.html` directly and push. No build step required.

Agent behavior and guidelines
- Non-invasive edits only: prefer small, reviewable PRs that modify `index.html` or assets in `images/`.
- If you must introduce new dependencies or a build system, include a clear rationale in the PR and update `vercel.json` and `README.md` accordingly.
- Avoid renaming or moving `index.html` unless you update `vercel.json` routes.

If something's unclear
- Ask the repo owner for intent before large refactors (e.g., converting to a SPA framework).
- Provide a short PR description listing files changed, local preview steps used, and a screenshot when UI changes are made.

End of file.
