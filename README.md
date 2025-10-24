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

## 🛠 Scripts

| Command | Description                                          |
|---------|------------------------------------------------------|
| `npm run dev` | Start local dev server with HMR (opens `/`)          |
| `npm run build` | Type-check then build production bundle into `dist/` |
| `npm run build:pages` | Build + create `404.html` (SPA fallback)             |
| `npm run preview` | Preview the production build locally                 |
| `npm run test` | Run test suite once                                  |
| `npm run test:watch` | Run tests in watch mode                              |
| `npm run lint` | Lint all TypeScript/TSX files                        |
| `npm run format` | Format codebase with Prettier                        |
| `npm run typecheck` | Run TypeScript type checking (no emit)               |
| `npm run deploy` | Build and publish `dist/` to GitHub Pages                      |

## 🔎 Base Path & Deployment

This repository is published as a GitHub Pages **project site** at:
```
https://fialucci.github.io/
```
The site’s Vite `base` is set to `/` for local development convenience. On GitHub Pages your content is served **under the repository path** (`/fialucci-org-website/`).

Deep links MUST include the repository segment in production:
```
Production whitepaper: https://fialucci.github.io/whitepaper
```
Visiting `https://fialucci.github.io/whitepaper` will 404 because that path is outside the project scope; the SPA fallback cannot trigger since the bundle is not loaded there.

If you later move to a custom domain or convert this to a user/org page, you can keep `base: '/'` unchanged. For project subfolder hosting this setup still works because all runtime links are absolute from root with the project path included when served by Pages.

### Changing the Base
If you want to force asset URLs to include the repo segment during build, set `base: '/fialucci-org-website/'` in `vite.config.ts`. Otherwise leave it at `/` and let Pages mount the SPA under the subfolder.

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
Open `http://localhost:5173` during development.

## 📄 Whitepaper

The protocol whitepaper is maintained as Markdown (`src/content/whitepaper/index.md`) and rendered at the SPA route:
```
/whitepaper
```
Key points:
- No `.html` extension required; route-based rendering loads markdown dynamically.
- Production deep link: `https://fialucci.github.io/fialucci-org-website/whitepaper`
- If a static file variant (e.g. `whitepaper.html`) appears, it’s legacy and can be removed; current build relies solely on the route.
- Update the markdown file and rebuild to deploy new content.

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
