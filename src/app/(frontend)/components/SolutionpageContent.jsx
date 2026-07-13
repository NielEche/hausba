'use client'

import { motion } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function SolutionpageContent({ solutions = [] }) {
  const [activeCategory, setActiveCategory] = useState('all')
  const scrollContainerRef = useRef(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      })
    }
  }

  const placeholderSolutions = [
    {
      icon: '/icons/isd.png',
      title: 'Integrated Systems Design',
      description:
        'We work closely with trade professionals to design beautiful and smart spaces that deliver luxury experiences to our clients.',
    },
    {
      icon: '/icons/pt.png',
      title: 'Premium Technology',
      description:
        'We install only the most state-of-the-art technology tools from leading manufacturers in the world.',
    },
    {
      icon: '/icons/ppd.png',
      title: 'Professional Project Delivery',
      description:
        'We employ the most talented designers, integrators and programmers in the country to ensure you experience maximum functionality and enjoyment.',
    },
    {
      icon: '/icons/ea.png',
      title: 'Experience Assurance',
      description:
        'Using remote monitoring tools, our dedicated support teams ensure the experiences we promised you are maintained for life. We are committed to maintaining the experiences we create, for life.',
    },
  ]

  // Group solutions by category
  const groupedSolutions = solutions.reduce((acc, solution) => {
    const category = solution.category || 'other'
    if (!acc[category]) acc[category] = []
    acc[category].push(solution)
    return acc
  }, {})

  // Get filtered solutions
  const filteredSolutions =
    activeCategory === 'all' ? solutions : groupedSolutions[activeCategory] || []

  // Featured solutions for the grid (first 4 with sections)
  const featuredSolutions = solutions.filter((s) => s.sections?.length > 0).slice(0, 4)

  // Case study solutions (remaining or all)
  const caseStudySolutions = solutions.slice(4, 7)

  // Auto-scroll effect for solutions - continuous loop
  useEffect(() => {
    if (!scrollContainerRef.current || isHovering || filteredSolutions.length === 0) return

    const container = scrollContainerRef.current
    let animationFrameId

    const scroll = () => {
      if (!container) return

      // Continuous smooth scrolling
      container.scrollLeft += 1 // Adjust speed by changing this value

      const scrollWidth = container.scrollWidth
      const clientWidth = container.clientWidth

      // When we reach the end, instantly reset to start (seamless loop)
      if (container.scrollLeft >= scrollWidth - clientWidth) {
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
  }, [activeCategory, isHovering, filteredSolutions.length])

  return (
    <div className="min-h-screen bg-white">
      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section className="relative min-h-[85vh] flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/home1.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />
        <motion.div
          className="relative z-10 max-w-3xl lg:px-16 px-4 pb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-[11px] montserrat-bold hausba-orange tracking-[0.4em] uppercase mb-4">
            What We Offer
          </p>
          <h1 className="text-4xl md:text-5xl montserrat-regular leading-[1.15] mb-2">
            Solutions Shaped
          </h1>
          <h1 className="text-4xl md:text-5xl montserrat-bold leading-[1.15] mb-6">
            Around Your Space
          </h1>
          <p className="text-sm montserrat-regular text-white max-w-md mb-8">
            Every solution we deliver is built with precision and intent, we design each system
            around the specific needs of your space.
          </p>
          <Link
            href="/projects"
            className="inline-block px-10 py-4 rounded-full hausba-orange-bg text-black! text-[11px] montserrat-bold uppercase tracking-[0.2em] hover:bg-gray-200! transition-colors duration-300"
          >
            View Projects
          </Link>
        </motion.div>
      </section>

      {/* FEATURED SOLUTIONS GRID */}
      <section className="bg-white px-6 py-26">
        <div className="max-w-7xl mx-auto">
          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {placeholderSolutions.map((item, index) => {
              // Border logic for each card
              const borderClasses = [
                'border-r border-b', // 1st card
                'border-l border-b', // 2nd card
                'border-r border-t', // 3rd card
                'border-l border-t', // 4th card
              ]

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`${borderClasses[index]} border-gray-200 p-8 hover:border-[#ff6f3c] transition-colors duration-300 group cursor-pointer`}
                >
                  {/* Icon */}
                  <div className="w-12 h-12 mb-6 relative">
                    <Image
                      src={item.icon}
                      alt={item.title}
                      fill
                      className="object-contain"
                      unoptimized
                    />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl montserrat-bold text-[#ff6f3c] mb-4">{item.title}</h3>

                  {/* Description */}
                  <p className="text-sm montserrat-regular text-gray-700 leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CATEGORY FILTER TABS */}
      <section className="bg-black px-6 pt-24">
        <div className="max-w-7xl mx-auto flex justify-start">
          <div className="relative flex bg-[#545050] rounded-full p-1">
            <button
              onClick={() => setActiveCategory('all')}
              className={`relative z-10 px-7 py-2 rounded-full text-[11px] montserrat-bold uppercase tracking-widest transition-colors duration-300 cursor-pointer
                ${activeCategory === 'all' ? 'text-black' : 'text-white hover:text-white'}`}
            >
              {activeCategory === 'all' && (
                <motion.span
                  layoutId="solutions-page-pill"
                  className="absolute inset-0 bg-[#CCCCCC] rounded-full"
                  transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                />
              )}
              <span className="relative z-10">All Solutions</span>
            </button>

            <button
              onClick={() => setActiveCategory('residential')}
              className={`relative z-10 px-7 py-2 rounded-full text-[11px] montserrat-bold uppercase tracking-widest transition-colors duration-300 cursor-pointer
                ${activeCategory === 'residential' ? 'text-black' : 'text-white hover:text-white'}`}
            >
              {activeCategory === 'residential' && (
                <motion.span
                  layoutId="solutions-page-pill"
                  className="absolute inset-0 bg-[#CCCCCC] rounded-full"
                  transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                />
              )}
              <span className="relative z-10">Residential</span>
            </button>

            <button
              onClick={() => setActiveCategory('commercial')}
              className={`relative z-10 px-7 py-2 rounded-full text-[11px] montserrat-bold uppercase tracking-widest transition-colors duration-300 cursor-pointer
                ${activeCategory === 'commercial' ? 'text-black' : 'text-white hover:text-white'}`}
            >
              {activeCategory === 'commercial' && (
                <motion.span
                  layoutId="solutions-page-pill"
                  className="absolute inset-0 bg-[#CCCCCC] rounded-full"
                  transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                />
              )}
              <span className="relative z-10">Commercial</span>
            </button>
          </div>
        </div>
      </section>

      {/* CASE STUDIES / SOLUTION CARDS */}
      <section className="bg-black px-6 py-24">
        <div className="max-w-7xl mx-auto">
          {/* Slider Container */}
          <div
            className="relative px-4"
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
              <svg width="24" height="24" fill="none" stroke="currentColor">
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
              <svg width="24" height="24" fill="none" stroke="currentColor">
                <path
                  d="M9 18l6-6-6-6"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* Slider */}
            <div
              ref={scrollContainerRef}
              className="flex gap-8 overflow-x-auto scroll-smooth hide-scrollbar pr-12"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {/* Duplicate items for seamless loop */}
              {[...filteredSolutions, ...filteredSolutions].map((solution, index) => (
                <Link
                  key={`${solution.id}-${index}`}
                  href={`/solutions/${solution.slug}`}
                  className="block"
                >
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: (index % filteredSolutions.length) * 0.1 }}
                    whileHover={{ y: -8 }}
                    className="relative min-w-[350px] md:min-w-[450px] h-[450px] md:h-[500px] overflow-hidden group cursor-pointer flex-shrink-0"
                  >
                    {/* Background Image */}
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                      style={{
                        backgroundImage: solution.image?.url
                          ? `url(${solution.image.url})`
                          : "url('/home1.jpg')",
                      }}
                    />

                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-black/40 transition-opacity duration-300" />

                    {/* Orange Gradient on Hover */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background:
                          'linear-gradient(to top, rgba(4, 4, 4, 0.7) 0%, transparent 60%)',
                      }}
                    />

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 z-10 text-white">
                      <h3 className="text-xl montserrat-bold mb-2">{solution.title}</h3>

                      {solution.description && (
                        <p className="text-sm montserrat-regular opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-3">
                          {solution.description}
                        </p>
                      )}
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>

          {/* Hide scrollbar */}
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
