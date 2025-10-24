import { useEffect, useMemo } from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import type { TokenizerAndRendererExtension } from 'marked';

interface MarkdownPageProps {
  raw: string;
  className?: string;
}

// Frontmatter keys we currently support (extendable). All values parsed as strings.
interface Frontmatter {
  title?: string;
  version?: string;
  status?: string;
  lastUpdated?: string;
  description?: string;
  [key: string]: string | undefined;
}

interface MathToken {
  type: 'blockMath' | 'inlineMath';
  raw: string;
  text: string;
}

// Register math extensions once
let mathRegistered = false;
function registerMath() {
  if (mathRegistered) return;
  // Block math $$...$$
  const blockMath: TokenizerAndRendererExtension = {
    name: 'blockMath',
    level: 'block',
    start(src: string) { return src.match(/\$\$/)?.index; },
    tokenizer(src: string) {
      const match = src.match(/^\$\$([\s\S]+?)\$\$/);
      if (match) {
        const token: MathToken = { type: 'blockMath', raw: match[0], text: match[1].trim() };
        return token; // explicit MathToken
      }
    },
    renderer(token: unknown) {
      const t = token as MathToken;
      return `<div class=\"math-block\">${katex.renderToString(t.text, { throwOnError: false, displayMode: true })}</div>`;
    }
  };
  // Inline math $...$
  const inlineMath: TokenizerAndRendererExtension = {
    name: 'inlineMath',
    level: 'inline',
    start(src: string) { return src.match(/\$(?!\$)/)?.index; },
    tokenizer(src: string) {
      const match = src.match(/^\$(.+?)\$/); // non-greedy
      if (match) {
        const token: MathToken = { type: 'inlineMath', raw: match[0], text: match[1].trim() };
        return token;
      }
    },
    renderer(token: unknown) {
      const t = token as MathToken;
      return katex.renderToString(t.text, { throwOnError: false });
    }
  };
  marked.use({ extensions: [blockMath, inlineMath] });
  mathRegistered = true;
}

function parseFrontmatter(raw: string): { data: Frontmatter; content: string } {
  if (!raw.startsWith('---')) return { data: {}, content: raw };
  const end = raw.indexOf('\n---');
  if (end === -1) return { data: {}, content: raw };
  const fmBlock = raw.slice(3, end).trim();
  const content = raw.slice(end + 4).replace(/^\n+/, '');
  const data: Frontmatter = {};
  fmBlock.split(/\n/).forEach(line => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return;
    const idx = trimmed.indexOf(':');
    if (idx === -1) return;
    const key = trimmed.slice(0, idx).trim();
    let value = trimmed.slice(idx + 1).trim();
    // Strip surrounding quotes
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    data[key] = value;
  });
  return { data, content };
}

export function MarkdownPage({ raw, className = 'md' }: MarkdownPageProps) {
  // Parse frontmatter + content once.
  const { data, content } = useMemo(() => parseFrontmatter(raw), [raw]);

  // Render markdown -> HTML then sanitize.
  const html = useMemo(() => {
    registerMath();
    marked.setOptions({ gfm: true, breaks: false });
    const rendered = marked.parse(content) as string;
    return typeof window !== 'undefined'
      ? DOMPurify.sanitize(rendered, { USE_PROFILES: { html: true } })
      : rendered;
  }, [content]);

  // Update document title from frontmatter.
  useEffect(() => {
    if (typeof data.title === 'string' && data.title.trim().length) {
      document.title = `${data.title} – Fialucci`;
    }
  }, [data.title]);

  return (
    <article className={className} aria-labelledby="md-title" data-page="whitepaper">
      {data.title && <h1 id="md-title">{data.title}</h1>}
      {(data.version || data.status) && (
        <p className="md-meta">
          {data.version && <><strong>Version:</strong> {data.version}</>} {data.status && <>• {data.status}</>}
        </p>
      )}
      <div className="md-body" dangerouslySetInnerHTML={{ __html: html }} />
    </article>
  );
}
