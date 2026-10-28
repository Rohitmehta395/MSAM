'use client';

import React, { useEffect } from 'react';
import './globals.css';

export interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error('Critical root layout error:', error);
  }, [error]);

  return (
    <html lang="en">
      <body className="bg-canvas text-navy flex min-h-screen flex-col items-center justify-center p-6 text-center font-sans">
        <div className="max-w-md space-y-4">
          <h1 className="text-2xl font-bold">System Error</h1>
          <p className="text-muted text-sm">
            A critical system error occurred while rendering the site application shell.
          </p>
          <div>
            <button
              onClick={reset}
              className="bg-navy hover:bg-navy/90 rounded-full px-6 py-2.5 text-sm font-semibold text-white transition-colors duration-150"
            >
              Reload application
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
