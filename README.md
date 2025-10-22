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

## 🔍 Preview & Base Configuration

The Vite `base` is now set to a relative path (`./`). This means:
- Development (`npm run dev`): served at `http://localhost:5173/`.
- Production build (`npm run build` or `npm run build:pages`): asset references are relative (`./assets/...`).
- Works seamlessly whether hosted at a project subfolder (e.g. `https://fialucci.github.io/`) or a custom/root domain later.

If you rename the repository (e.g. to `fialucci.github.io`) or add a custom domain, you do NOT need to change the base again.

Preview locally:
```bash
npm run build
npm run preview   # opens http://localhost:4173/
```

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

## 🚢 Deployment (GitHub Pages)

Deployment uses `gh-pages` to publish `dist/` to the `gh-pages` branch with a SPA fallback (`404.html`). Because assets are relative, no repository path is hard-coded in the bundles.

Scripts:
| Script | Purpose |
|--------|---------|
| `npm run build:pages` | Build + create `404.html` for SPA routing |
| `npm run deploy` | Build pages (via `predeploy`) and publish to `gh-pages` branch |

To remove the subfolder from the public URL entirely you must either:
1. Rename the repository to `fialucci.github.io` (user page root). OR
2. Configure a custom domain (add a `CNAME` file and DNS records). We can automate this if you provide the domain.

After either change, the relative base continues to work without modification.

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
