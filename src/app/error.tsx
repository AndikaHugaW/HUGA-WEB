"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-black text-red-500 mb-4">Error</h1>
        <p className="text-white text-xl mb-8">Something went wrong!</p>
        <button
          onClick={() => reset()}
          className="px-6 py-3 bg-[#00ff88] text-black font-bold rounded-lg hover:opacity-90 transition-opacity"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
