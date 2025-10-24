#!/usr/bin/env node
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { marked } from 'marked';
import { JSDOM } from 'jsdom';
import DOMPurify from 'dompurify';

function fail(msg){ console.error('[build-whitepaper] ERROR:', msg); process.exit(1); }
function log(msg){ console.log('[build-whitepaper]', msg); }
function parseFrontmatter(raw){
  if(!raw.startsWith('---')) return {data:{}, content:raw};
  const end = raw.indexOf('\n---');
  if(end === -1) return {data:{}, content:raw};
  const fmBlock = raw.slice(3, end).trim();
  const content = raw.slice(end+4).replace(/^\n+/, '');
  const data = {};
  fmBlock.split(/\n/).forEach(line=>{
    const t = line.trim();
    if(!t || t.startsWith('#')) return;
    const i = t.indexOf(':'); if(i===-1) return;
    const k = t.slice(0,i).trim(); let v = t.slice(i+1).trim();
    if((v.startsWith('"')&&v.endsWith('"'))||(v.startsWith("'")&&v.endsWith("'"))) v = v.slice(1,-1);
    data[k]=v;
  });
  return {data, content};
}

const DIST = path.resolve('dist');
const SOURCE_MD = path.resolve('src/content/whitepaper/index.md');
const FLAT_FILE = path.join(DIST, 'whitepaper.html');

try {
  if(!existsSync(DIST)) fail('dist missing; run build first');
  if(!existsSync(SOURCE_MD)) fail('markdown source missing');

  const indexHtml = readFileSync(path.join(DIST, 'index.html'), 'utf8');
  const mdRaw = readFileSync(SOURCE_MD, 'utf8');
  const { data, content } = parseFrontmatter(mdRaw);

  marked.setOptions({ gfm:true, breaks:false });
  const rendered = marked.parse(content);
  const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
  const purify = DOMPurify(dom.window);
  const safe = purify.sanitize(rendered, { USE_PROFILES:{ html:true } });

  const versionMeta = (data.version || data.status)
    ? `<p class="md-meta">${data.version?`<strong>Version:</strong> ${data.version}`:''} ${data.status?`• ${data.status}`:''}</p>`
    : '';

  const article = `\n    <article class=\"md\" data-page=\"whitepaper\">\n      ${data.title?`<h1>${data.title}</h1>`:''}\n      ${versionMeta}\n      <div class=\"md-body\">${safe}</div>\n    </article>\n  `;

  const site = `\n<div class=\"site\">\n  <a href=\"#main\" class=\"skip-link\">Skip to content</a>\n  <nav class=\"nav\" aria-label=\"Global\">\n    <div class=\"nav__inner\">\n      <a href=\"/\" class=\"nav__brand\" aria-label=\"Fialucci homepage\"><span>Fialucci</span></a>\n      <div class=\"nav__links\">\n        <a href=\"whitepaper.html\" aria-current=\"page\">Whitepaper</a>\n        <a href=\"docs\">Docs</a>\n        <a href=\"community\">Community</a>\n        <a href=\"https://github.com/fialucci\" target=\"_blank\" rel=\"noopener noreferrer\">GitHub</a>\n      </div>\n    </div>\n  </nav>\n  <main id=\"main\" class=\"main\">\n    <div class=\"sections\">${article}</div>\n  </main>\n  <footer class=\"footer\" role=\"contentinfo\">\n    <div class=\"footer__inner\"><p>© Fialucci Foundation.</p></div>\n  </footer>\n</div>\n`;

  const finalHtml = indexHtml
    .replace('<div id="root"></div>', `<div id=\"root\">${site}</div>`)
    .replace('<title>Fialucci Org Website</title>', `<title>${data.title? data.title + ' – Fialucci':'Fialucci Org Website'}</title>`);

  writeFileSync(FLAT_FILE, finalHtml, 'utf8');
  log(`Generated ${path.relative(process.cwd(), FLAT_FILE)}`);
} catch(e){
  fail(e.stack || e.message || String(e));
}
