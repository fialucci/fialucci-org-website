import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MarkdownPage } from './components/MarkdownPage';
import whitepaperRaw from './content/whitepaper/index.md?raw';

describe('MarkdownPage (whitepaper)', () => {
  it('renders frontmatter title', () => {
    render(<MarkdownPage raw={whitepaperRaw} />);
    expect(screen.getByRole('heading', { name: /fialucci whitepaper \(temp\)/i })).toBeInTheDocument();
  });
  it('renders version meta', () => {
    render(<MarkdownPage raw={whitepaperRaw} />);
    expect(screen.getByText(/Version:/i)).toBeInTheDocument();
  });
  it('contains Abstract section heading', () => {
    render(<MarkdownPage raw={whitepaperRaw} />);
    expect(screen.getByRole('heading', { name: /abstract/i })).toBeInTheDocument();
  });
});
