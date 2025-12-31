'use client'

import { motion } from 'framer-motion'
import { useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function SolutionpageContent({ solutions = [] }) {
  const [activeCategory, setActiveCategory] = useState('all')
  const scrollContainerRef = useRef(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(false)

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
        'Using remote monitoring tools, our dedicated support teams ensure the experiences we promised you are maintained for life. We are the best at smart home automation in Nigeria.',
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

  return (
    <div className="min-h-screen bg-white">
      {/* HERO SECTION */}
      <section className="relative h-screen flex items-center justify-start">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/home1.jpg"
            alt="Solutions"
            fill
            className="object-cover"
            priority
            unoptimized
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/60" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl lg:px-16 px-4 text-left text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-xs montserrat-regular mb-6 block">[ WHAT WE DO ]</span>
            <h1 className="text-3xl lg:text-4xl montserrat-bold leading-tight my-12">
              We deliver premium
              <br />
              home automation and
              <br />
              home cinema solutions
            </h1>
            <Link
              href="/projects"
              className="hausba-orange-bg hover:bg-[#ff8a1a] text-white px-8 py-3  montserrat-regular text-sm transition-colors duration-300 cursor-pointer mt-4"
            >
              VIEW PROJECTS
            </Link>
          </motion.div>
        </div>
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
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-start gap-4 flex-wrap">
            <button
              onClick={() => setActiveCategory('all')}
              className={`
                px-8 py-3 text-sm montserrat-regular border transition-all duration-300 cursor-pointer
                ${
                  activeCategory === 'all'
                    ? 'border-[#ff6f3c] bg-[#ff6f3c]/10 text-[#ff6f3c]'
                    : 'border-[#2B2B2B] text-white hover:border-[#ff6f3c]/50'
                }
              `}
            >
              All Solutions
            </button>
            <button
              onClick={() => setActiveCategory('residential')}
              className={`
                px-8 py-3 text-sm montserrat-regular border transition-all duration-300 cursor-pointer
                ${
                  activeCategory === 'residential'
                    ? 'border-[#ff6f3c] bg-[#ff6f3c]/10 text-[#ff6f3c]'
                    : 'border-[#2B2B2B] text-white hover:border-[#ff6f3c]/50'
                }
              `}
            >
              Residential
            </button>
            <button
              onClick={() => setActiveCategory('commercial')}
              className={`
                px-8 py-3 text-sm montserrat-regular border transition-all duration-300 cursor-pointer
                ${
                  activeCategory === 'commercial'
                    ? 'border-[#ff6f3c] bg-[#ff6f3c]/10 text-[#ff6f3c]'
                    : 'border-[#2B2B2B] text-white hover:border-[#ff6f3c]/50'
                }
              `}
            >
              Commercial
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
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect()
              const x = e.clientX - rect.left
              const width = rect.width

              setShowLeftArrow(x < width * 0.2)
              setShowRightArrow(x > width * 0.8)
            }}
            onMouseLeave={() => {
              setShowLeftArrow(false)
              setShowRightArrow(false)
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
              {filteredSolutions.map((solution, index) => (
                <Link key={solution.id} href={`/solutions/${solution.slug}`} className="block">
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
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

      {/* CONTACT US SECTION */}
      <div className="bg-black">
        <div className="max-w-7xl mx-auto px-4 py-20 ">
          <div
            className="relative border-2 hausba-orange-border overflow-hidden flex items-center"
            style={{ minHeight: '220px' }}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('/estimate.jpg')` }}
            ></div>

            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.7) 60%, rgba(0,0,0,0) 100%)',
              }}
            ></div>

            <div className="relative z-10  flex flex-col md:flex-row items-center justify-between w-full px-8 py-16">
              <div className=" flex justify-center md:justify-center w-full  py-2">
                <h3 className="text-xl md:text-2xl montserrat-bold mb-2">Contact us today</h3>
              </div>

              <div className=" flex justify-center md:justify-center w-full  py-2">
                <div className="space-y-4">
                  <a
                    href="tel:+2348100999555"
                    className="block text-white/80 hover:text-[#FF7800] transition-colors text-sm montserrat-regular"
                  >
                    +234 8100 999 555
                  </a>
                  <a
                    href="mailto:experience@hausba.com"
                    className="block text-white/80 hover:text-[#FF7800] transition-colors text-sm montserrat-regular"
                  >
                    experience@hausba.com
                  </a>
                </div>
              </div>

              <div className="mt-4 md:mt-0 flex justify-center md:justify-center w-full  py-4">
                <div className="flex gap-4">
                  <a
                    href="https://www.facebook.com/3Dandstlprobables"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-70 transition-opacity"
                  >
                    <Image
                      src="/social/fb.png"
                      alt="Facebook"
                      width={35}
                      height={35}
                      className="filter invert"
                      unoptimized
                    />
                  </a>
                  <a
                    href="https://www.instagram.com/hausbaexperience/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-70 transition-opacity"
                  >
                    <Image
                      src="/social/insta.png"
                      alt="Instagram"
                      width={35}
                      height={35}
                      className="filter invert"
                      unoptimized
                    />
                  </a>
                  <a
                    href="https://x.com/hausba"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-70 transition-opacity"
                  >
                    <Image
                      src="/social/x.png"
                      alt="X"
                      width={35}
                      height={35}
                      className="filter invert"
                      unoptimized
                    />
                  </a>
                  <a
                    href="https://www.linkedin.com/company/hausbaexperience?originalSubdomain=ng"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-70 transition-opacity"
                  >
                    <Image
                      src="/social/linkedin.png"
                      alt="LinkedIn"
                      width={35}
                      height={35}
                      className="filter invert"
                      unoptimized
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
