# Fialucci Org Website

Modern React + Vite + TypeScript starter for the Fialucci organization website.

![React](https://img.shields.io/badge/React-18-61dafb?logo=react) ![Vite](https://img.shields.io/badge/Vite-5-646cff?logo=vite) ![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript) ![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

- ⚡ Vite 5 for ultra-fast dev & optimized builds
- 🧩 React 18 with modern JSX transform
- 🛡️ TypeScript strict mode
- ✅ Testing with Vitest + Testing Library
- 🔍 ESLint (TypeScript rules) & Prettier formatting
- ♻️ React Refresh (fast HMR)
- 🚀 Deployment script to GitHub Pages (`npm run deploy`)
- 📝 EditorConfig & sensible .gitignore
- 🤖 GitHub Actions CI (lint + test + build)

## 📦 Tech Stack

| Layer        | Tool |
|--------------|------|
| Build / Dev  | Vite |
| Language     | TypeScript (ES2022 modules) |
| UI Library   | React 18 |
| Testing      | Vitest + @testing-library/react |
| Linting      | ESLint (@typescript-eslint) |
| Formatting   | Prettier |
| Deployment   | gh-pages |
| CI           | GitHub Actions |

## 🔧 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start local dev server with HMR |
| `npm run build` | Type-check then build production bundle into `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run test` | Run test suite once |
| `npm run test:watch` | Run tests in watch (interactive) mode |
| `npm run lint` | Lint all TypeScript/TSX files |
| `npm run format` | Format codebase with Prettier |
| `npm run typecheck` | Run TypeScript type checking (no emit) |
| `npm run deploy` | Build and publish `dist/` to GitHub Pages |

## 🔍 Preview Modes

You can preview the production build in two ways:

- Production path (mirrors GitHub Pages):
  ```bash
  npm run build
  npm run preview   # opens /fialucci-org-website/
  ```
  Visit the opened URL (subfolder). The `index.html` only contains `<div id="root"></div>` server-side; React mounts client-side via the generated JS in `dist/assets/*`.

- Local root path (no subfolder):
  ```bash
  npm run build:local   # forces base '/'
  npm run preview:local # opens '/'
  ```
  Use this if you want to test the app exactly at the site root.

If you see only the raw HTML, confirm you opened the correct path matching the build base.

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Run tests
npm test

# Lint & type-check
npm run lint

# Build for production
npm run build

# Deploy to GitHub Pages (ensure repo has pages configured)
npm run deploy
```

Then open `http://localhost:5173` (default Vite port) during development.

## 🌐 GitHub Pages Deployment & Local Base Path

Vite `base` is conditional in `vite.config.ts`:
- Dev (`npm run dev`): `base` is `/` so the app is served at `http://localhost:5173/`.
- Production build (`npm run build`): `base` becomes `/fialucci-org-website/` for GitHub Pages hosting at `https://fialucci.github.io/fialucci-org-website/`.

Therefore during local development do NOT visit `http://localhost:5173/fialucci-org-website/` (it will be blank); use `http://localhost:5173/`.
If you prefer always using the subfolder locally, set a static `base: '/fialucci-org-website/'` in `vite.config.ts`.

## 🗂 Project Structure

```
├── src/
│   ├── App.tsx          # Root component
│   ├── App.test.tsx     # Example test
│   ├── main.tsx         # Entry point
│   ├── index.css        # Global styles
│   └── ...              # Your features/components
├── public/
│   └── favicon.svg      # Favicon asset
├── vite.config.ts       # Vite & Vitest config
├── tsconfig.json        # TypeScript configuration
├── setupTests.ts        # Test environment setup
├── eslint.config.js     # Flat ESLint configuration (ESLint v9+)
├── .prettierrc.json     # Prettier config
├── package.json         # Dependencies & scripts
├── README.md            # Documentation
├── LICENSE              # MIT license
└── .editorconfig        # Editor consistency
```

## 🧪 Testing

Tests use [Vitest](https://vitest.dev) with jsdom and Testing Library for React component assertions.
Write tests alongside components as `ComponentName.test.tsx` inside `src/`.

Example:
```tsx
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders title', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /fialucci org website/i })).toBeVisible();
});
```

Run them:
```bash
npm test
```

## 🧩 Environment Requirements

- Node.js >= 18.18.0 (LTS recommended)
- npm >= 9

## 🛠 Customization Ideas

- Add routing (e.g. `react-router-dom`)
- Add state management (Zustand, Redux Toolkit, Recoil)
- Add CSS framework (Tailwind, Mantine, MUI)
- Configure CI (GitHub Actions for lint/test/build) – already included!
- Add accessibility & performance checks (Lighthouse CI)

## 🤖 Continuous Integration

A GitHub Actions workflow (`.github/workflows/ci.yml`) runs on pushes & PRs:
- Install dependencies
- Lint source
- Run tests
- Build production bundle

Extend it for deployment or additional checks as needed.

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch: `git checkout -b feat/awesome`
3. Commit changes: `git commit -m "feat: add awesome"`
4. Push: `git push origin feat/awesome`
5. Open a Pull Request

### Code Style

- Use TypeScript for new code
- Prefer functional components & hooks
- Keep components small and focused
- Write tests for new features
- Run `npm run lint` and `npm run format` before pushing

### Commit Convention

Follow [Conventional Commits](https://www.conventionalcommits.org/) (e.g. `feat:`, `fix:`, `docs:`).

## 📄 License

Licensed under the MIT License. See [LICENSE](./LICENSE).

## 📣 Acknowledgements

Built with love using React, Vite, and the open source ecosystem.

## 🚢 Deployment (GitHub Pages)

This project uses the `gh-pages` package to publish the `dist/` output to the `gh-pages` branch (configurable) and includes a SPA fallback (`404.html`).

Scripts:

| Script | Purpose |
|--------|---------|
| `npm run build` | Standard production build (outputs `dist/`) |
| `npm run build:pages` | Build + create `404.html` for SPA routing |
| `npm run deploy` | Runs `predeploy` (so `build:pages`) then publishes `dist/` to `gh-pages` branch |
| `npm run deploy:clean` | Delete `dist/` then run deploy |

How it works:
1. `build:pages` runs the Vite build, then `scripts/copy404.mjs` duplicates `index.html` to `404.html`.
2. `gh-pages` CLI force-updates (by default) the target branch with the contents of `dist/`.
3. GitHub Pages (Settings → Pages) should be set to source: `gh-pages` branch / root.
4. Because the build uses a relative base (`./`), assets resolve correctly at the project subpath URL.

Initial setup:
```bash
# Ensure repository is created and remote set
git remote -v
# First deployment
npm run deploy
```

Visit: `https://fialucci.github.io/fialucci-org-website/`

Customizing:
- Change branch: edit `"deploy": "gh-pages -b my-branch -d dist --dotfiles"`.
- Absolute base (optional): set `base: '/fialucci-org-website/'` in `vite.config.ts` if you need asset URLs fixed to the subfolder (then keep `homepage` aligned). Remove relative base if you do this.
- Disable SPA fallback: remove the `build:pages` / `copy404.mjs` step and point GitHub Pages to a multi-page structure.

Troubleshooting:
- White page: open DevTools → Network; if JS bundle 404s, check base configuration.
- 404 on refresh of a client route: ensure `404.html` exists in `gh-pages` branch.
- Stale content: GitHub Pages caching can take up to a minute; hard refresh (Ctrl/Cmd+Shift+R).
- Wrong branch: verify with `git ls-remote --heads origin gh-pages`.

Optional improvements (ask to enable):
- GitHub Actions workflow that runs build & deploy automatically on push to `main`.
- Cache busting badges (commit SHA in footer).
- Bundle analysis (e.g. `rollup-plugin-visualizer`).

