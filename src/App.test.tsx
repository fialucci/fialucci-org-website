import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App landing page layout', () => {
  it('renders the hero heading', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: /trust before transfer/i })).toBeInTheDocument();
  });

  it('renders global nav brand link', () => {
    render(<App />);
    expect(screen.getByRole('link', { name: /fialucci homepage/i })).toBeInTheDocument();
  });
});

describe('Whitepaper route rendering', () => {
  function renderAt(path: string) { window.history.pushState({}, '', path); render(<App />); }
  it('renders whitepaper at /whitepaper', () => { renderAt('/whitepaper'); expect(screen.getByRole('heading', { name: /fialucci whitepaper/i })).toBeInTheDocument(); });
  it('sets document title for whitepaper', () => { renderAt('/whitepaper'); expect(document.title).toMatch(/Fialucci Whitepaper/i); });
});
