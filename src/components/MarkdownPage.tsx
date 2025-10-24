import { useEffect, useMemo } from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

interface MarkdownPageProps {
  raw: string;
  className?: string;
}

// Lightweight frontmatter parser (YAML key: value, single-level) to avoid gray-matter Buffer dependency.
function parseFrontmatter(raw: string): { data: Record<string, any>; content: string } {
  if (!raw.startsWith('---')) return { data: {}, content: raw };
  const end = raw.indexOf('\n---');
  if (end === -1) return { data: {}, content: raw };
  const fmBlock = raw.slice(3, end).trim();
  const content = raw.slice(end + 4).replace(/^\n+/, '');
  const data: Record<string, any> = {};
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
