#!/usr/bin/env node
import { promises as fs } from 'fs';
import path from 'path';

async function main() {
  const distDir = path.resolve('dist');
  const indexFile = path.join(distDir, 'index.html');
  const notFoundFile = path.join(distDir, '404.html');
  try {
    await fs.access(indexFile);
  } catch {
    console.error('[copy404] dist/index.html not found. Did you run the build first?');
    process.exit(1);
  }
  const html = await fs.readFile(indexFile, 'utf8');
  // For SPA fallback we can just duplicate index.html as 404.html.
  await fs.writeFile(notFoundFile, html, 'utf8');
  console.log('[copy404] Created 404.html for SPA fallback.');
}

main().catch(err => {
  console.error('[copy404] Failed:', err);
  process.exit(1);
});

