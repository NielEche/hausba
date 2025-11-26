'use client'

import React, { useEffect, useRef } from 'react'

export default function BubbleInvert({ radius = 150 }) {
  const bubbleRef = useRef(null)

  useEffect(() => {
    const bubble = bubbleRef.current
    if (!bubble) return

    let currentX = 0
    let currentY = 0
    let targetX = 0
    let targetY = 0
    let r = 0

    const lerp = (start, end, t) => start + (end - start) * t

    const onMove = (e) => {
      targetX = e.touches ? e.touches[0].clientX : e.clientX
      targetY = e.touches ? e.touches[0].clientY : e.clientY
      r = radius
    }

    const onLeave = () => {
      r = 0
    }

    const animate = () => {
      currentX = lerp(currentX, targetX, 0.15)
      currentY = lerp(currentY, targetY, 0.15)
      bubble.style.clipPath = `circle(${r}px at ${currentX}px ${currentY}px)`
      bubble.style.WebkitClipPath = `circle(${r}px at ${currentX}px ${currentY}px)`
      requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseleave', onLeave)
    window.addEventListener('touchmove', onMove, { passive: true })
    window.addEventListener('touchend', onLeave)

    animate()

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeave)
      window.removeEventListener('touchmove', onMove)
      window.removeEventListener('touchend', onLeave)
    }
  }, [radius])

  return (
    <div
      ref={bubbleRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        mixBlendMode: 'difference',
        zIndex: 9999,
        transition: 'clip-path 0.2s ease-out',
        background: 'white', // this will invert what's underneath due to mix-blend-mode
      }}
    />
  )
}
