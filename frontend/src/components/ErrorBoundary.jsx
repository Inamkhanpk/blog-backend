import React from "react";

class ErrorBoundaryInner extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 bg-red-100 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-red-600">
            Something went wrong.
          </h2>
          <p className="text-gray-700">{this.state.error?.toString()}</p>
          <details className="text-sm text-gray-500 whitespace-pre-wrap mt-2">
            {this.state.errorInfo?.componentStack}
          </details>
          <button
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg"
            onClick={() => window.location.reload()}
          >
            Reload Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// ✅ Functional wrapper (this is what you’ll import & use)
export default function ErrorBoundary({ children }) {
  return <ErrorBoundaryInner>{children}</ErrorBoundaryInner>;
}
