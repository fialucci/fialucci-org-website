import React from 'react';

interface ErrorBoundaryState { error: Error | null }

export class ErrorBoundary extends React.Component<React.PropsWithChildren, ErrorBoundaryState> {
  state: ErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // Log to console for debugging blank page issues.
    console.error('[ErrorBoundary] Caught error:', error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <div role="alert" style={{ padding: '1rem', border: '1px solid #e53e3e', background: '#fff5f5', color: '#c53030', borderRadius: 6 }}>
          <h2 style={{ marginTop: 0 }}>Something went wrong.</h2>
          <pre style={{ whiteSpace: 'pre-wrap', fontSize: '.85rem' }}>{this.state.error.message}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

