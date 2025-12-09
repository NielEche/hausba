'use client'

import { motion } from 'framer-motion'
import { useState, useRef } from 'react'
import Image from 'next/image'

export default function AboutpageContent({ awards = [], brands = [] }) {
  const [activeTab, setActiveTab] = useState('mission')
  const awardsRef = useRef(null)

  const scrollAwards = (direction) => {
    if (!awardsRef.current) return
    const scrollAmount = 400
    awardsRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    })
  }

  const coreValues = [
    {
      number: '01',
      title: 'Execution',
      description: 'We just do it.',
    },
    {
      number: '02',
      title: 'Leadership',
      description: 'We become the best, to build the rest.',
    },
    {
      number: '03',
      title: 'Excellence',
      description: 'We go above and beyond.',
    },
    {
      number: '04',
      title: 'Care',
      description: 'We show empathy and reward others.',
    },
    {
      number: '05',
      title: 'Think system',
      description: "We solve tomorrow's problems today.",
    },
  ]

  const whyChooseUs = [
    {
      id: 1,
      title: 'Integrated Design Methodology',
      description:
        'The design, configuration and integration of system which consider the dimensions, acoustics, and interior decor of any given space allows HAUSBA to maximize the potential of modern architecture. By working together with trade professionals and/or homeowners, we are able to devise solutions that build upon the aesthetics of a room while still operating flawlessly',
      image: '/home1.jpg',
    },
    {
      id: 2,
      title: 'Dedicated Support Team',
      description:
        'The design, configuration and integration of system which consider the dimensions, acoustics, and interior decor of any given space allows HAUSBA to maximize the potential of modern architecture. By working together with trade professionals and/or homeowners, we are able to devise solutions that build upon the aesthetics of a room while still operating flawlessly',
      image: '/home.jpg',
    },
    {
      id: 3,
      title: 'End-to-End Project Delivery',
      description:
        'Our years of experience in the industry has given us the opportunity to gain in-depth experience and exposure over every stage of the project delivery process from design to planning to installations and equipment programming and finally technical support, we are a one-stop shop for all your systems integration needs.',
      image: '/end.jpg',
    },
    {
      id: 4,
      title: 'Award Winning Certified Team',
      description:
        'Our team have won design awards from D-Tools. We have fully certified CEDIA and AVIXA professionals on team to ensure that our projects are delivered according to industry standards.',
      image: '/team.jpg',
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - White Background */}
      <section className="relative  flex items-center justify-center px-6 py-32">
        <div className="max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:flex justify-between "
          >
            <div>
              <motion.h2
                initial={{ opacity: 0.9 }}
                whileHover={{ opacity: 1 }}
                className="text-7xl md:text-9xl montserrat-bold lg:text-left text-center font-bold text-black mb-12 tracking-tight"
              >
                ABOUT
              </motion.h2>

              {/* Description */}
              <div className="max-w-2xl mx-auto">
                <p className="montserrat-regular text-sm md:text-sm lg:pr-26 lg:text-left text-center pb-8 text-gray-700 leading-relaxed">
                  With over a decade of delivering technology in high-end smart home control
                  projects, HAUSBA is the natural partner for developers, architects, interior
                  designers, and technology providers in this space. Our portfolio includes high-car
                  residences in Lagos and Abuja, where we seamlessly integrate technology with
                  lifestyle.
                </p>
              </div>
            </div>

            <div>
              <h1 className="montserrat-bold text-7xl md:text-9xl font-bold text-black mb-12 tracking-tight text-center">
                HAUSBA
              </h1>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Philosophy Section - Image + Black Overlay */}
      <section className="relative min-h-screen">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image src="/home1.jpg" alt="Hausba Philosophy" fill className="object-cover" priority unoptimized/>
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/70" />
        </div>

        {/* Content */}
        <div className="absolute mx-auto w-full lg:mt-18 mt-4 z-10 min-h-screen flex flex-col justify-center lg:px-6 px-4 py-20">
          {/* Top Section - Tag */}
          <div className="max-w-7xl mx-auto w-full text-center mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="inline-block"
            >
              <span className="text-white text-xs montserrat-regular font-semibold">
                [ HAUSBA PHILOSOPHY ]
              </span>
            </motion.div>
          </div>

          {/* Black Background Container for Tabs */}
          <div className="max-w-7xl mx-auto w-full text-center bg-black">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-black/90 backdrop-blur-sm py-6 mt-10 px-6 inline-flex gap-4 rounded-sm"
            >
              <button
                onClick={() => setActiveTab('mission')}
                className={`
                  px-8 py-3 text-sm montserrat-regular border transition-all duration-300 cursor-pointer
                  ${
                    activeTab === 'mission'
                      ? 'border-[#ff6f3c] bg-[#ff6f3c]/10 text-[#ff6f3c]'
                      : 'border-[#2B2B2B] text-white hover:border-[#ff6f3c]/50'
                  }
                `}
              >
                Our Mission
              </button>
              <button
                onClick={() => setActiveTab('vision')}
                className={`
                  px-8 py-3 text-sm montserrat-regular border transition-all duration-300 cursor-pointer
                  ${
                    activeTab === 'vision'
                      ? 'border-[#ff6f3c] bg-[#ff6f3c]/10 text-[#ff6f3c]'
                      : 'border-[#2B2B2B] text-white hover:border-[#ff6f3c]/50'
                  }
                `}
              >
                Our Vision
              </button>
            </motion.div>
          </div>

          {/* Mission/Vision Content */}
          <div className="max-w-7xl mx-auto text-center bg-black pb-20 w-full">
            {/* Dynamic Tag */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="my-8 "
            >
              <span className="text-white montserrat-regular text-xs font-semibold">
                [ OUR {activeTab.toUpperCase()} ]
              </span>
            </motion.div>

            {/* Dynamic Statement */}
            <motion.h2
              key={`${activeTab}-text`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-3xl pb-20 md:text-4xl lg:text-5xl montserrat-bold text-white leading-tight lg:px-0 px-2"
            >
              {activeTab === 'mission' ? (
                <>
                  Amplifying Living Experiences
                  <br />
                  using innovative technology
                  <br />
                  to transform the way we live.
                </>
              ) : (
                <>
                  To be the leading smart home
                  <br />
                  technology partner in Africa,
                  <br />
                  setting new standards for innovation.
                </>
              )}
            </motion.h2>
          </div>
        </div>
      </section>

      {/* Team Section - White Background */}
      <section className="bg-white px-6 lg:py-32 py-20">
        <div className="max-w-7xl mx-auto">
          {/* Section Tag */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-6"
          >
            <span className="text-black montserrat-bold text-xs">[ THE PROFESSIONALS ]</span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-black mb-8 montserrat-bold"
          >
            Our Skilled Team
          </motion.h2>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="max-w-5xl mb-20"
          >
            <p className="text-sm md:text-base text-gray-700 montserrat-regular leading-relaxed">
              We are systems integrators. Furthermore, we understand that the demand for complex
              system integration will persistently increase. Additionally, today's Millennials
              aspire to embrace the luxuries of smart living. Moreover, individuals seek greater
              safety, intelligence and enjoyment within their dwellings. In light of this,
              governments, developers and forward-thinking individuals seek inner peace of mind. In
              this regard, at HAUSBA, we wholeheartedly commit to addressing these challenges.
              Through the most practical, efficient, and user-friendly home solutions, we pledge
              ourselves to serve you with distinction, guaranteeing your utmost satisfaction, now
              and in the imminent.
            </p>
          </motion.div>

          {/* Core Values Tag */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <span className="text-black text-xs montserrat-bold ">[ CORE VALUES ]</span>
          </motion.div>

          {/* Core Values Grid */}
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {coreValues.map((value, index) => (
              <motion.div
                key={value.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                {/* Number */}
                <div className="text-5xl montserrat-bold text-[#FF7800] mb-4 group-hover:scale-110 transition-transform">
                  {value.number}
                </div>

                {/* Title */}
                <h3 className="text-lg montserrat-bold text-black mb-3">{value.title}</h3>

                {/* Description */}
                <p className="text-sm montserrat-regular text-black leading-tight">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US SECTION */}
      <section className="bg-black px-6 py-32">
        <div className="max-w-7xl mx-auto">
          {/* Section Tag */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className="text-white montserrat-regular text-xs font-semibold tracking-widest">
              [ WHY CHOOSE US ]
            </span>
          </motion.div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((item, index) => {
              // Different gradient directions for each box
              const gradientDirections = [
                'to bottom right',
                'to bottom left',
                'to top right',
                'to top left',
              ]
              const direction = gradientDirections[index % 4]

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative min-h-[400px] overflow-hidden group"
                >
                  {/* Background Image */}
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${item.image})` }}
                  />

                  {/* Gradient Overlay with Dynamic Direction */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `
                        linear-gradient(
                          ${direction},
                          rgba(0, 0, 0, 0.9) 0%,
                          rgba(0, 0, 0, 0.75) 30%,
                          rgba(255, 111, 60, 0.6) 75%,
                          rgba(255, 111, 60, 0.65) 100%
                        )
                      `,
                    }}
                  />

                  {/* Content */}
                  <div className="relative z-10 p-6 text-white h-full flex flex-col justify-between">
                    <h3 className="text-lg montserrat-bold leading-tight">{item.title}</h3>
                    <p className="text-sm montserrat-regular leading-tight">{item.description}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* AWARDS & CERTIFICATION SECTION */}
      <section className="bg-white px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-start  mb-12">
            {/* Left side - Title and Arrows */}
            <div className="mb-8 lg:mb-0">
              <h2 className="text-3xl montserrat-bold text-black mb-6 lg:pr-20">
                Awards &<br />
                Certification
              </h2>

              {/* Navigation Arrows */}
              <div className="flex gap-3">
                <button
                  onClick={() => scrollAwards('left')}
                  className="p-3 bg-black hover:bg-[#ff6f3c] rounded-full text-white cursor-pointer transition-colors duration-300"
                  aria-label="Scroll left"
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
                  onClick={() => scrollAwards('right')}
                  className="p-3 bg-black hover:bg-[#ff6f3c] rounded-full text-white cursor-pointer transition-colors duration-300"
                  aria-label="Scroll right"
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

            {/* Right side - Carousel */}
            <div
              ref={awardsRef}
              className="overflow-x-auto flex gap-8 scroll-smooth w-full lg:w-auto"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              <style jsx>{`
                div::-webkit-scrollbar {
                  display: none;
                }
              `}</style>

              {awards.map((award, index) => (
                <motion.div
                  key={award.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="min-w-[300px] max-w-[300px] flex-shrink-0"
                >
                  {/* Image Container */}
                  <div className="relative w-full h-[200px] mb-6 overflow-hidden">
                    {award.image?.url && (
                      <Image
                        src={award.image.url}
                        alt={award.title}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>

                  {/* Text Content */}
                  <div className="text-black">
                    <span className="text-xs montserrat-bold text-gray-500 py-4 mb-2 block">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3 className="text-sm montserrat-bold leading-tight">{award.title}</h3>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BRANDS SECTION */}
      {brands && brands.length > 0 && (
        <div className="bg-black">
          <div className="max-w-7xl mx-auto py-26 px-4 text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <span className="text-white montserrat-regular text-xs font-semibold tracking-widest">
                [OUR BRANDS ]
              </span>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4">
              {brands.map((brand, index) => {
                const total = brands.length
                const colCount = 4
                const rowCount = Math.ceil(total / colCount)

                const row = Math.floor(index / colCount)
                const col = index % colCount

                // border logic
                const borderTop = row === 0 ? '' : 'border-t border-gray-700'
                const borderBottom = row === rowCount - 1 ? '' : 'border-b border-gray-700'
                const borderLeft = col === 0 ? '' : 'border-l border-gray-700'
                const borderRight = col === colCount - 1 ? '' : 'border-r border-gray-700'

                return (
                  <div
                    key={brand.id}
                    className={`flex items-center justify-center p-4 ${borderTop} ${borderBottom} ${borderLeft} ${borderRight}`}
                  >
                    {/* Fixed square container for consistency */}
                    <div className="w-24 h-24 flex items-center justify-center">
                      {brand.link ? (
                        <a
                          href={brand.link}
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
                        </a>
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
