"use client";

import { Component, type ReactNode } from "react";

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<{ children: ReactNode; fallback?: ReactNode }, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#faf7f4]">
          <div className="text-center px-6">
            <h2 className="text-2xl font-bold text-[#1a1a1a] mb-3">页面出了点问题</h2>
            <p className="text-[#1a1a1a]/60 mb-6">{this.state.error?.message || "未知错误"}</p>
            <button
              onClick={() => { this.setState({ hasError: false, error: null }); window.location.reload(); }}
              className="px-6 py-2 bg-[#f97316] text-white rounded-full text-sm hover:bg-[#ea580c]"
            >
              刷新页面
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
