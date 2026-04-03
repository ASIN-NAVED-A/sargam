import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '50px', background: 'black', color: 'white', minHeight: '100vh', zIndex: 99999, position: 'relative' }}>
          <h1 style={{ color: '#ff4444' }}>Component Error Triggered</h1>
          <p>{this.state.error && this.state.error.toString()}</p>
          <pre style={{ color: 'gray', whiteSpace: 'pre-wrap', marginTop: '20px' }}>{this.state.error && this.state.error.stack}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
