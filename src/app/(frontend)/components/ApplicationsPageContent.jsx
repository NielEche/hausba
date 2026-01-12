'use client'

import { motion } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function ApplicationsPageContent({ applications = [] }) {
  const [activeType, setActiveType] = useState('all')
  const scrollRef = useRef(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  const filteredApplications =
    activeType === 'all' ? applications : applications.filter((a) => a.type === activeType)

  // Auto-scroll effect
  useEffect(() => {
    if (!scrollRef.current || isHovering || filteredApplications.length === 0) return

    const container = scrollRef.current
    let animationFrameId

    const scroll = () => {
      if (!container) return

      container.scrollLeft += 1

      const scrollWidth = container.scrollWidth
      const clientWidth = container.clientWidth

      // Reset when reaching halfway (since we duplicate content)
      if (container.scrollLeft >= scrollWidth / 2) {
        container.scrollLeft = 0
      }

      animationFrameId = requestAnimationFrame(scroll)
    }

    animationFrameId = requestAnimationFrame(scroll)

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [activeType, isHovering, filteredApplications])

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 400
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      })
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* HERO */}
      <section className="relative h-screen flex items-center">
        <div className="absolute inset-0">
          <Image
            src="/home1.jpg"
            alt="Applications"
            fill
            className="object-cover"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="relative z-10 max-w-7xl px-6 text-white">
          <h1 className="text-4xl montserrat-bold">Our Applications</h1>
        </div>
      </section>

      {/* FILTER TABS */}
      <section className="bg-black px-6 pt-24">
        <div className="max-w-7xl mx-auto flex gap-4 flex-wrap">
          <button
            onClick={() => setActiveType('all')}
            className={`px-8 py-3 text-sm border montserrat-regular transition-all duration-300 ${
              activeType === 'all'
                ? 'border-[#ff6f3c] text-[#ff6f3c] bg-[#ff6f3c]/10'
                : 'border-[#2B2B2B] text-white hover:border-[#ff6f3c]/50'
            }`}
          >
            All Applications
          </button>

          <button
            onClick={() => setActiveType('residential')}
            className={`px-8 py-3 text-sm border montserrat-regular transition-all duration-300 ${
              activeType === 'residential'
                ? 'border-[#ff6f3c] text-[#ff6f3c] bg-[#ff6f3c]/10'
                : 'border-[#2B2B2B] text-white hover:border-[#ff6f3c]/50'
            }`}
          >
            Residential
          </button>

          <button
            onClick={() => setActiveType('commercial')}
            className={`px-8 py-3 text-sm border montserrat-regular transition-all duration-300 ${
              activeType === 'commercial'
                ? 'border-[#ff6f3c] text-[#ff6f3c] bg-[#ff6f3c]/10'
                : 'border-[#2B2B2B] text-white hover:border-[#ff6f3c]/50'
            }`}
          >
            Commercial
          </button>
        </div>
      </section>

      {/* APPLICATION CARDS WITH AUTO-SCROLL */}
      <section className="bg-black px-6 py-24">
        <div
          className="relative max-w-7xl mx-auto"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => {
            setIsHovering(false)
            setShowLeftArrow(false)
            setShowRightArrow(false)
          }}
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect()
            const x = e.clientX - rect.left
            const width = rect.width
            setShowLeftArrow(x < width * 0.2)
            setShowRightArrow(x > width * 0.8)
          }}
        >
          {/* Left Arrow */}
          <button
            onClick={() => handleScroll('left')}
            className={`absolute rounded-full cursor-pointer left-0 top-1/2 -translate-y-1/2 z-10 bg-black/80 hover:bg-[#ff6f3c] p-3 transition-all duration-300 md:opacity-0 ${
              showLeftArrow ? 'md:opacity-100' : ''
            }`}
            aria-label="Scroll left"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path
                d="M15 18l-6-6 6-6"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* Right Arrow */}
          <button
            onClick={() => handleScroll('right')}
            className={`absolute rounded-full cursor-pointer right-0 top-1/2 -translate-y-1/2 z-10 bg-black/80 hover:bg-[#ff6f3c] p-3 transition-all duration-300 md:opacity-0 ${
              showRightArrow ? 'md:opacity-100' : ''
            }`}
            aria-label="Scroll right"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path
                d="M9 18l6-6-6-6"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* Scrollable Container */}
          <div
            ref={scrollRef}
            className="flex gap-8 overflow-x-auto scroll-smooth hide-scrollbar"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {/* Duplicate items for seamless loop */}
            {[...filteredApplications, ...filteredApplications].map((application, index) => (
              <Link
                key={`${application.id}-${index}`}
                href={`/applications/${application.slug}`}
                className="block"
              >
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: (index % filteredApplications.length) * 0.1,
                  }}
                  whileHover={{ y: -8 }}
                  className="relative min-w-[350px] md:min-w-[450px] h-[450px] md:h-[500px] overflow-hidden group cursor-pointer flex-shrink-0"
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{
                      backgroundImage: application.image?.url
                        ? `url(${application.image.url})`
                        : "url('/home1.jpg')",
                    }}
                  />

                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300" />

                  {/* Orange Gradient Overlay on Hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: 'linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, transparent 60%)',
                    }}
                  ></div>

                  <div className="absolute bottom-0 p-6 text-white z-10">
                    <h3 className="text-xl montserrat-bold mb-2">{application.title}</h3>

                    {application.description && (
                      <p className="text-sm montserrat-regular opacity-0 group-hover:opacity-90 transition-opacity duration-300 line-clamp-3">
                        {application.description}
                      </p>
                    )}
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>

          <style jsx>{`
            .hide-scrollbar::-webkit-scrollbar {
              display: none;
            }
          `}</style>
        </div>
      </section>
    </div>
  )
}
