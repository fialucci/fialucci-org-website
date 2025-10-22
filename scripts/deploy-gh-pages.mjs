#!/usr/bin/env node
import { execSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import ghpages from 'gh-pages';

function log(msg) { console.log(`[deploy] ${msg}`); }
function fail(msg) { console.error(`[deploy] ERROR: ${msg}`); process.exit(1); }

try {
  log('Starting build:pages');
  execSync('npm run build:pages', { stdio: 'inherit' });
} catch (e) {
  fail('Build failed');
}

const distDir = path.resolve('dist');
if (!existsSync(distDir)) fail('dist directory missing after build');

// Derive repo slug from remote origin URL.
let repoSlug = process.env.GITHUB_REPOSITORY; // e.g. owner/repo in CI
if (!repoSlug) {
  try {
    const originUrl = execSync('git config --get remote.origin.url').toString().trim();
    // Handle SSH or HTTPS forms
    // git@github.com:owner/repo.git or https://github.com/owner/repo.git
    const match = originUrl.match(/github.com[:/](.+?)(\.git)?$/);
    if (match) repoSlug = match[1];
  } catch {}
}
if (!repoSlug) fail('Unable to determine repository slug (owner/repo)');

const token = process.env.GITHUB_TOKEN;
let repoUrl;
if (token) {
  repoUrl = `https://x-access-token:${token}@github.com/${repoSlug}.git`;
  log('Using authenticated repo URL for CI push');
} else {
  // Fallback to default remote.
  repoUrl = undefined; // gh-pages will use origin
  log('No GITHUB_TOKEN detected; using existing git credentials');
}

// Generate commit message components.
let headSha = 'unknown-sha';
try { headSha = execSync('git rev-parse --short HEAD').toString().trim(); } catch {}
const timestamp = new Date().toISOString();
let headMsg = '';
try { headMsg = execSync('git log -1 --pretty=%s').toString().trim(); } catch {}
const commitMessage = `deploy: ${timestamp} (${headSha}) ${headMsg}`.trim();

log(`Publishing with message: ${commitMessage}`);

ghpages.publish(distDir, {
  branch: 'gh-pages',
  repo: repoUrl, // undefined -> default origin
  message: commitMessage,
  dotfiles: true,
  history: true,
}, (err) => {
  if (err) fail(err.message || String(err));
  log('Publish complete');
});

