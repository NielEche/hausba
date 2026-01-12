'use client'

import { motion } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function HomepageContent({
  applications = [],
  solutions = [],
  testimonials = [],
  brands = [],
}) {
  // Group applications by type
  const grouped = applications.reduce((acc, app) => {
    const type = app.type || 'other'
    if (!acc[type]) acc[type] = []
    acc[type].push(app)
    return acc
  }, {})

  // Group solutions by type/category
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

  const [activeTab, setActiveTab] = useState(solutionTypes[0] || '')
  const scrollContainerRef = useRef(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const testimonialRef = useRef(null)

  // Auto-scroll effect for solutions - continuous loop
  useEffect(() => {
    if (!scrollContainerRef.current || isHovering) return

    const container = scrollContainerRef.current
    let animationFrameId

    const scroll = () => {
      if (!container) return

      // Continuous smooth scrolling
      container.scrollLeft += 1 // Adjust speed by changing this value

      const scrollWidth = container.scrollWidth
      const clientWidth = container.clientWidth

      // When we reach halfway (the original content end), reset to start
      // This works because we duplicated the content, so halfway = one full loop
      if (container.scrollLeft >= scrollWidth / 4) {
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
  }, [activeTab, isHovering])

  const scrollTestimonials = (direction) => {
    if (!testimonialRef.current) return
    const scrollAmount = 400
    testimonialRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    })
  }

  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      })
    }
  }

  return (
    <div className="text-white bg-white">
      {/* HERO SECTION */}
      <div className="h-screen relative flex items-center justify-center text-center">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/home1.jpg')" }}
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <motion.div
          className="relative z-10 px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl montserrat-bold leading-tight mx-auto max-w-[950px]">
            Crafting personalised luxury experiences
          </h1>
          <h3 className="mt-4 text-lg md:text-xl montserrat-regular opacity-90 font-semibold hausba-orange">
            Since 2010
          </h3>
        </motion.div>
      </div>
      {/* APPLICATION SECTIONS */}
      <div className="bg-black">
        <div className="max-w-7xl px-4 mx-auto py-26 space-y-24">
          <motion.h2
            className="text-xs montserrat-regular text-left capitalize "
            initial={{ opacity: 0.9 }}
            whileHover={{ opacity: 1 }}
          >
            [ OUR APPLICATIONS ]
          </motion.h2>

          {Object.entries(grouped).map(([type, items], sectionIndex) => {
            const gridCols = type === 'commercial' ? 'md:grid-cols-2' : 'md:grid-cols-3'

            return (
              <motion.section
                key={type}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {/* Section Heading */}
                <h2 className="text-lg montserrat-regular capitalize mb-12"> {type} </h2>

                {/* Grid */}
                <div className={`grid grid-cols-1 ${gridCols} gap-8`}>
                  {items.map((app, index) => (
                    <Link key={app.id} href={`/applications/${app.slug}`}>
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{ y: -8 }}
                        className="relative h-120 overflow-hidden group cursor-pointer"
                      >
                        {/* Background Image */}
                        <div
                          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-500 group-hover:scale-110"
                          style={{
                            backgroundImage: app.image?.url
                              ? `url(${app.image.url})`
                              : "url('/XAMIRAHEIGHTS.webp')",
                          }}
                        />

                        {/* Dark Overlay */}
                        <div className="absolute inset-0 bg-black opacity-40 transition-opacity duration-300"></div>

                        {/* Orange Gradient Overlay on Hover */}
                        <div
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          style={{
                            background:
                              'linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, transparent 60%)',
                          }}
                        ></div>

                        {/* Title at Bottom */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                          <motion.h3
                            className="text-xl montserrat-bold"
                            initial={{ opacity: 0.9 }}
                            whileHover={{ opacity: 1 }}
                          >
                            {app.title}
                          </motion.h3>

                          {app.description && (
                            <motion.p className=" mt-2 text-sm text-gray-200 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              {app.description}
                            </motion.p>
                          )}
                        </div>
                      </motion.div>
                    </Link>
                  ))}
                </div>
              </motion.section>
            )
          })}
        </div>
      </div>
      {/* SOLUTIONS SECTION */}
      {solutionTypes.length > 0 && (
        <div className="bg-black">
          <motion.div
            className="max-w-7xl mx-auto pb-24"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <motion.h2
              className="text-xs montserrat-regular text-left capitalize pt-4 pb-24"
              initial={{ opacity: 0.9 }}
              whileHover={{ opacity: 1 }}
            >
              [ OUR SOLUTIONS ]
            </motion.h2>

            {/* Tabs */}
            <div className="flex justify-start gap-4 mb-12 flex-wrap px-4">
              {solutionTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setActiveTab(type)}
                  className={`
                  px-6 py-3 montserrat-regular text-sm capitalize
                  border transition-all duration-300 cursor-pointer
                  ${
                    activeTab === type
                      ? 'border-[#ff6f3c] bg-[#ff6f3c]/10 hauba-orange'
                      : 'border-[#2B2B2B] text-white hover:border-[#ff6f3c]/50'
                  }
                `}
                >
                  {type}
                </button>
              ))}
            </div>

            {/* Slider Container */}
            <div
              className="relative px-4"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
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

              {/* Slider */}
              <div
                ref={scrollContainerRef}
                className="flex gap-8 overflow-x-auto scroll-smooth hide-scrollbar pr-12"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {/* Duplicate items for seamless loop */}
                {[...groupedSolutions[activeTab], ...groupedSolutions[activeTab]]?.map(
                  (solution, index) => (
                    <Link key={`${solution.id}-${index}`} href={`/solutions/${solution.slug}`}>
                      <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.5,
                          delay: (index % groupedSolutions[activeTab]?.length) * 0.1,
                        }}
                        whileHover={{ y: -8 }}
                        className="relative min-w-[450px] h-[500px] overflow-hidden group cursor-pointer flex-shrink-0"
                      >
                        {/* Background Image */}
                        <div
                          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-500 group-hover:scale-110"
                          style={{
                            backgroundImage: solution.image?.url
                              ? `url(${solution.image.url})`
                              : "url('/XAMIRAHEIGHTS.webp')",
                          }}
                        />

                        {/* Dark Overlay */}
                        <div className="absolute inset-0 bg-black opacity-40 transition-opacity duration-300"></div>

                        {/* Orange Gradient Overlay on Hover */}
                        <div
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          style={{
                            background:
                              'linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, transparent 60%)',
                          }}
                        ></div>

                        {/* Title at Bottom */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                          <h3 className="text-xl montserrat-bold">{solution.title}</h3>
                          {solution.description && (
                            <p className="mt-2 text-sm text-gray-200 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              {solution.description}
                            </p>
                          )}
                        </div>
                      </motion.div>
                    </Link>
                  ),
                )}
              </div>
            </div>

            <style jsx>{`
              .hide-scrollbar::-webkit-scrollbar {
                display: none;
              }
            `}</style>
          </motion.div>
        </div>
      )}
      {/* TESTIMONIALS SECTION */}
      {testimonials && testimonials.length > 0 && (
        <motion.div
          className="max-w-7xl mx-auto py-24"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative px-4 lg:flex justify-between">
            <div className="text-black pr-10 w-80 pb-10">
              <motion.h4
                className="text-xs montserrat-bold text-left capitalize "
                initial={{ opacity: 0.9 }}
                whileHover={{ opacity: 1 }}
              >
                [ TESTIMONIAL ]
              </motion.h4>
              <h4 className="text-3xl my-4 montserrat-regular capitalize">Our Client Quotes</h4>

              <div className="relative flex gap-3 z-20">
                <button
                  onClick={() => scrollTestimonials('left')}
                  className="p-3 bg-black hover:bg-[#ff6f3c] rounded-full text-white cursor-pointer"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path
                      d="M15 18l-6-6 6-6"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                <button
                  onClick={() => scrollTestimonials('right')}
                  className="p-3 bg-black hover:bg-[#ff6f3c] rounded-full text-white cursor-pointer"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path
                      d="M9 18l6-6-6-6"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div
              ref={testimonialRef}
              className="overflow-x-auto flex gap-6 scroll-smooth"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              <style>
                {`
                  div::-webkit-scrollbar {
                    display: none;
                  }
                `}
              </style>

              {testimonials.map((t, index) => (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="min-w-[400px] max-w-[450px] relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 p-8 z-[30] hausba-grey  text-sm montserrat-bold">
                    {String(index + 1).padStart(2, '0')}
                  </div>

                  {t.image?.url && (
                    <div
                      className="absolute inset-0 bg-cover bg-center z-[5]"
                      style={{ backgroundImage: `url(${t.image.url})` }}
                    ></div>
                  )}

                  <div
                    className="absolute inset-0 z-[10] opacity-75"
                    style={{
                      background: `
                    linear-gradient(
                      to bottom right,
                      rgba(0, 0, 0, 1) 0%,
                      rgba(0, 0, 0, 1) 35%,
                      #000000ff 70%,
                      rgba(0, 0, 0, 0.83) 100%
                    )
                  `,
                    }}
                  ></div>

                  <div className="relative z-10 p-8 text-white">
                    <p className="text-sm leading-relaxed opacity-95 montserrat-regular pt-20">
                      "{t.testimony}"
                    </p>

                    <div className="mt-6">
                      <h4 className="text-lg montserrat-bold capitalize">{t.name}</h4>
                      {t.company && <p className="text-sm opacity-80 mt-1">{t.company}</p>}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
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

      {/* BRANDS SECTION */}
      {brands && brands.length > 0 && (
        <div className="bg-black">
          <div className="max-w-7xl mx-auto pb-24 px-4 text-white">
            <h3 className="text-3xl montserrat-bold mb-8 py-6 text-white text-center">
              TRUSTED <br />
              BY THE BEST
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4">
              {brands.map((brand, index) => {
                const total = brands.length
                const colCount = 4
                const rowCount = Math.ceil(total / colCount)

                const row = Math.floor(index / colCount)
                const col = index % colCount

                const borderTop = row === 0 ? '' : 'border-t border-gray-700'
                const borderBottom = row === rowCount - 1 ? '' : 'border-b border-gray-700'
                const borderLeft = col === 0 ? '' : 'border-l border-gray-700'
                const borderRight = col === colCount - 1 ? '' : 'border-r border-gray-700'

                return (
                  <div
                    key={brand.id}
                    className={`flex items-center justify-center p-4 ${borderTop} ${borderBottom} ${borderLeft} ${borderRight}`}
                  >
                    <div className="w-24 h-24 flex items-center justify-center">
                      {brand.website ? (
                        <Link
                          href={brand.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="relative w-full h-full"
                        >
                          {brand.image?.url && (
                            <Image
                              src={brand.image.url}
                              alt={brand.name}
                              fill
                              className="object-contain filter brightness-0 invert"
                            />
                          )}
                        </Link>
                      ) : (
                        brand.image?.url && (
                          <div className="relative w-full h-full">
                            <Image
                              src={brand.image.url}
                              alt={brand.name}
                              fill
                              className="object-contain filter brightness-0 invert"
                            />
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
