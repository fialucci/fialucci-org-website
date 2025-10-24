import {useEffect} from 'react';
import {Section} from './components/Section';
import {MarkdownPage} from './components/MarkdownPage';
import whitepaperRaw from './content/whitepaper/index.md?raw';

// Simple site metadata (frontmatter analogue)
const SITE_META = {
  title: 'Fialucci',
  description: 'Escrow-first blockchain built on Proof of Escrow (PoE).',
  slug: '/',
};

export default function App() {
  const path = typeof window !== 'undefined' ? window.location.pathname : '/';
  const isWhitepaper = /\/whitepaper(\/|$)?$/.test(path);
  useEffect(() => {
    if (!isWhitepaper) document.title = `${SITE_META.title} – Trust Before Transfer`;
  }, [isWhitepaper]);

  if (isWhitepaper) {
    return (
      <div className="site">
        <a href="#main" className="skip-link">Skip to content</a>
        <nav className="nav" aria-label="Global">
          <div className="nav__inner">
            <a href={SITE_META.slug} className="nav__brand" aria-label="Fialucci homepage"><span>Fialucci</span></a>
            <div className="nav__links">
              <a href="/whitepaper" aria-current="page">Whitepaper</a>
              <a href="/docs">Docs</a>
              <a href="/community">Community</a>
              <a href="https://github.com/fialucci" target="_blank" rel="noopener noreferrer">GitHub</a>
            </div>
          </div>
        </nav>
        <main id="main" className="main">
          <div className="sections">
            <MarkdownPage raw={whitepaperRaw}/>
          </div>
        </main>
        <footer className="footer" role="contentinfo">
          <div className="footer__inner"><p>© Fialucci Foundation.</p></div>
        </footer>
      </div>
    );
  }

  return (
    <div className="site">
      {/* Accessibility skip link */}
      <a href="#main" className="skip-link">Skip to content</a>

      {/* Sticky Protocol Nav */}
      <nav className="nav" aria-label="Global">
        <div className="nav__inner">
          <a href={SITE_META.slug} className="nav__brand" aria-label="Fialucci homepage">
            <span>Fialucci</span>
          </a>
          <div className="nav__links">
            <a href="/whitepaper">Whitepaper</a>
            <a href="/docs">Docs</a>
            <a href="/community">Community</a>
            <a href="https://github.com/fialucci" target="_blank" rel="noopener noreferrer">GitHub</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="hero" role="banner">
        <div className="hero__inner">
          <div>
            <h1 className="hero__title">Trust Before Transfer</h1>
            <p className="hero__tagline">
              <strong>Fialucci</strong> is an <strong>escrow-first blockchain</strong> built on <strong>Proof of Escrow
              (PoE)</strong> — value releases only when verifiable conditions are met.
            </p>
            <div className="hero__cta" aria-label="Primary actions">
              <a href="/whitepaper" className="link-pill">Read the Whitepaper</a>
              <a href="/docs" className="link-pill">Developer Docs</a>
              <a href="https://github.com/fialucci" className="link-pill" target="_blank"
                 rel="noopener noreferrer">GitHub</a>
            </div>
          </div>
        </div>
      </header>

      <main className="main" id="main">
        <div className="sections" role="region" aria-label="Protocol overview sections">
          {/* What */}
          <Section id="what" title="What is Fialucci?">
            <p>Fialucci makes <strong>escrow a native feature of the blockchain itself</strong>. Funds are <strong>locked,
              validated, and released automatically</strong> when verifiable on-chain or off-chain conditions are met.
            </p>
          </Section>

          {/* Principles */}
          <Section id="principles" title="Core Principles" kind="alt">
            <ul className="bullet-list">
              <li><strong>Escrow-First Design</strong> — escrow isn’t an app, it’s the protocol.</li>
              <li><strong>Proof of Escrow (PoE)</strong> — consensus on verified conditions.</li>
              <li><strong>Modular Oracles</strong> — real-world data can trigger releases.</li>
              <li><strong>Automatic Settlement</strong> — the network disburses when proof exists.</li>
            </ul>
          </Section>

          {/* How */}
          <Section id="how" title="How It Works">
            <ol className="steps">
              <li><strong>Oracles</strong> report a real or digital event.</li>
              <li><strong>Validators</strong> verify the data.</li>
              <li><strong>PoE</strong> reaches consensus that conditions are satisfied.</li>
              <li><strong>Settlement</strong> moves value to the recipient.</li>
            </ol>
          </Section>

          {/* Developers */}
          <Section id="developers" title="Built for Developers" kind="alt">
            <p>
              Create apps that depend on <strong>conditional value transfer</strong>: escrow payments, insurance
              payouts, rewards, marketplaces, logistics.
            </p>
            <ul className="inline-links" aria-label="Developer resources">
              <li><a href="docs">Quick Start: Docs</a></li>
              <li><a href="https://github.com/fialucci" target="_blank" rel="noopener noreferrer">Repos: GitHub</a></li>
            </ul>
          </Section>

          {/* Vision */}
          <Section id="vision" title="Vision">
            <p>
              A simple idea: <strong>trust before transfer</strong>. A chain where value moves only when proof exists —
              transparent, fair, and open.
            </p>
          </Section>

          {/* Learn More */}
          <Section id="learn" title="Learn More" kind="alt">
            <ul className="learn-list">
              <li><a href="/whitepaper">Whitepaper</a></li>
              <li><a href="docs/protocol">Protocol Overview</a></li>
              <li><a href="docs/tokenomics">Tokenomics</a></li>
              <li><a href="community">Community</a></li>
              <li><a href="https://github.com/fialucci" target="_blank" rel="noopener noreferrer">GitHub</a></li>
            </ul>
          </Section>
        </div>
      </main>

      <footer className="footer" role="contentinfo">
        <div className="footer__inner">
          <p>© Fialucci Foundation.</p>
        </div>
      </footer>
    </div>
  );
}
