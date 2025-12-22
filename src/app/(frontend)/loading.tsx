'use client'

import { useEffect, useState } from 'react'

export default function Loading() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 1
      })
    }, 20)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
      {/* Minimalist animated bars */}
      <div className="flex gap-2 mb-16">
        <div className="w-1 h-12 bg-[#ff6f3c] animate-pulse" style={{ animationDelay: '0ms' }} />
        <div className="w-1 h-12 bg-[#ff6f3c] animate-pulse" style={{ animationDelay: '150ms' }} />
        <div className="w-1 h-12 bg-[#ff6f3c] animate-pulse" style={{ animationDelay: '300ms' }} />
      </div>

      {/* Progress bar at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-100">
        <div
          className="h-full bg-[#ff6f3c] transition-all duration-75 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}
