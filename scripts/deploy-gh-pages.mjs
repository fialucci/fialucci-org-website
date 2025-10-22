#!/usr/bin/env node
import { execSync } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import ghpages from 'gh-pages';

function log(msg) { console.log(`[deploy] ${msg}`); }
function fail(msg) { console.error(`[deploy] ERROR: ${msg}`); process.exit(1); }

// 1. Build (includes 404.html via build:pages predeploy or explicit call)
try {
  log('Starting build:pages');
  execSync('npm run build:pages', { stdio: 'inherit' });
} catch (e) {
  fail('Build failed');
}

const distDir = path.resolve('dist');
if (!existsSync(distDir)) fail('dist directory missing after build');

// 2. Compute a JS bundle hash (first main bundle) for metadata
let bundleHash = 'none';
try {
  const files = execSync('ls dist/assets/index-*.js').toString().trim().split(/\s+/).filter(Boolean);
  if (files.length) {
    const content = readFileSync(files[0]);
    bundleHash = crypto.createHash('sha256').update(content).digest('hex').slice(0, 16);
  }
} catch {}

// 3. Derive repo slug
let repoSlug = process.env.GITHUB_REPOSITORY; // owner/repo in CI
if (!repoSlug) {
  try {
    const originUrl = execSync('git config --get remote.origin.url').toString().trim();
    const match = originUrl.match(/github.com[:/](.+?)(\.git)?$/);
    if (match) repoSlug = match[1];
  } catch {}
}
if (!repoSlug) fail('Unable to determine repository slug (owner/repo)');

// 4. Token / repo URL
const token = process.env.GITHUB_TOKEN;
let repoUrl;
if (token) {
  repoUrl = `https://x-access-token:${token}@github.com/${repoSlug}.git`;
  log('Using authenticated repo URL for CI push');
} else {
  log('No GITHUB_TOKEN detected; using existing git credentials');
  if (process.env.CI) log('WARNING: Running in CI without token may fail to push.');
}

// 5. Commit metadata
let headSha = 'unknown-sha';
try { headSha = execSync('git rev-parse --short HEAD').toString().trim(); } catch {}
const timestamp = new Date().toISOString();
let headMsg = '';
try { headMsg = execSync('git log -1 --pretty=%s').toString().trim(); } catch {}
const commitMessage = `deploy: ${timestamp} (${headSha}) hash:${bundleHash} ${headMsg}`.trim();

// 6. Create metadata file to ensure tree changes every deploy
const meta = {
  timestamp,
  sourceCommit: headSha,
  sourceMessage: headMsg,
  bundleHash,
  ci: !!process.env.CI
};
try {
  writeFileSync(path.join(distDir, 'deploy-meta.json'), JSON.stringify(meta, null, 2));
  log('Added deploy-meta.json');
} catch (e) {
  log('Failed to write deploy-meta.json (continuing)');
}

log(`Publishing with message: ${commitMessage}`);

ghpages.publish(distDir, {
  branch: 'gh-pages',
  repo: repoUrl,
  message: commitMessage,
  dotfiles: true,
  history: true,
}, (err) => {
  if (err) fail(err.message || String(err));
  log('Publish complete');
  try {
    // Simple verification: list top-level files
    const topFiles = execSync('ls dist | head -n 10').toString().trim();
    log('Local dist sample:\n' + topFiles);
  } catch {}
});
