'use client'

import { motion } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

export default function SolutionpageContent({ solutions = [] }) {
  const searchParams = useSearchParams()

  const groupedSolutions = solutions.reduce((acc, sol) => {
    const type = sol.type || sol.category || 'other'
    if (!acc[type]) acc[type] = []
    acc[type].push(sol)
    return acc
  }, {})

  const solutionTypes = Object.keys(groupedSolutions).sort((a, b) => {
    if (a === 'residential') return -1
    if (b === 'residential') return 1
    return 0
  })

  const requestedType = searchParams.get('type')
  const matchedType = solutionTypes.find((t) => t.toLowerCase() === requestedType?.toLowerCase())

  const [activeSolTab, setActiveSolTab] = useState(matchedType || solutionTypes[0] || '')
  // Keep in sync if the query param changes after mount (e.g. Link navigation
  // to the same route with a different ?type=)
  useEffect(() => {
    if (matchedType) {
      setActiveSolTab(matchedType)
    }
  }, [requestedType]) // eslint-disable-line react-hooks/exhaustive-deps

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

  // Case study solutions (remaining or all)
  const caseStudySolutions = solutions.slice(4, 7)

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
          <h1 className="text-4xl md:text-5xl montserrat-regular leading-[1.15] mb-0">
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
      <section className="hidden bg-white px-6 py-26">
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

      {/* ── OUR SOLUTIONS ────────────────────────────────────────────────── */}
      {solutionTypes.length > 0 && (
        <section className="bg-white py-20 px-6">
          <div className="max-w-7xl mx-auto">
            {/* Eyebrow */}
            <p className="text-[12px] montserrat-bold tracking-[0.3em] uppercase text-center mb-6 flex items-center justify-center gap-3">
              <span className="hausba-grey">OUR SOLUTIONS</span>
            </p>

            <h2 className="text-3xl md:text-4xl montserrat-bold text-black text-center mb-8">
              Engineered for the extraordinary
            </h2>

            {/* Sliding pill tab switcher */}
            <div className="flex justify-center mb-10">
              <div className="relative flex bg-[#545050] rounded-full p-1">
                {solutionTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setActiveSolTab(type)}
                    className={`relative z-10 px-7 py-2 rounded-full lg:text-[11px] text-[8px] montserrat-bold uppercase tracking-widest transition-colors duration-300 cursor-pointer
                  ${activeSolTab === type ? 'text-black' : 'text-white hover:text-white'}`}
                  >
                    {activeSolTab === type && (
                      <motion.span
                        layoutId="sol-pill"
                        className="absolute inset-0 bg-[#CCCCCC] rounded-full"
                        transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                      />
                    )}
                    <span className="relative z-10">{type}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Cards grid */}
            {groupedSolutions[activeSolTab] && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {groupedSolutions[activeSolTab].map((solution, index) => (
                  <Link key={solution.id} href={`/solutions/${solution.slug}`}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.07 }}
                      className="relative h-86 overflow-hidden group cursor-pointer"
                    >
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                        style={{
                          backgroundImage: solution.image?.url
                            ? `url(${solution.image.url})`
                            : 'linear-gradient(160deg, #5badec 0%, #3a7fc1 50%, #2d3e50 100%)',
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                      {/* Title */}
                      <div className="absolute bottom-0 left-0 p-5 z-10">
                        {/* Number sits just above title */}
                        <span className="text-[11px] montserrat-bold hausba-orange tracking-widest pb-4">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <h3 className="text-lg montserrat-regular text-white">{solution.title}</h3>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  )
}
