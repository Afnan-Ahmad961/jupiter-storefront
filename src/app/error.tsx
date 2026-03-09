"use client"

import { useEffect } from "react"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] px-4 py-16">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">
        Something went wrong
      </h2>
      <p className="text-gray-500 mb-8 text-center max-w-md">
        We encountered an unexpected error. Please try again or return to the
        homepage.
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => reset()}
          className="px-6 py-3 border border-gray-200 text-black text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-colors duration-300"
        >
          Try Again
        </button>
        <a
          href="/"
          className="px-6 py-3 bg-black text-white text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors duration-300"
        >
          Go Home
        </a>
      </div>
    </div>
  )
}
