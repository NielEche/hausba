'use client'

import { motion } from 'framer-motion'
import { useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function ApplicationsPageContent({ applications = [] }) {
  const [activeType, setActiveType] = useState('all')
  const scrollRef = useRef(null)

  const filteredApplications =
    activeType === 'all'
      ? applications
      : applications.filter((a) => a.type === activeType)

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
          <h1 className="text-4xl montserrat-bold">
            Our Applications
          </h1>
        </div>
      </section>

      {/* FILTER TABS */}
      <section className="bg-black px-6 pt-24">
        <div className="flex gap-4">
          <button
            onClick={() => setActiveType('all')}
            className={`px-8 py-3 text-sm border ${
              activeType === 'all'
                ? 'border-[#ff6f3c] text-[#ff6f3c]'
                : 'border-[#2B2B2B] text-white'
            }`}
          >
            All Applications
          </button>

          <button
            onClick={() => setActiveType('residential')}
            className={`px-8 py-3 text-sm border ${
              activeType === 'residential'
                ? 'border-[#ff6f3c] text-[#ff6f3c]'
                : 'border-[#2B2B2B] text-white'
            }`}
          >
            Residential
          </button>

          <button
            onClick={() => setActiveType('commercial')}
            className={`px-8 py-3 text-sm border ${
              activeType === 'commercial'
                ? 'border-[#ff6f3c] text-[#ff6f3c]'
                : 'border-[#2B2B2B] text-white'
            }`}
          >
            Commercial
          </button>
        </div>
      </section>

      {/* APPLICATION CARDS */}
      <section className="bg-black px-6 py-24">
        <div
          ref={scrollRef}
          className="flex gap-8 overflow-x-auto hide-scrollbar"
        >
          {filteredApplications.map((application) => (
            <Link
              key={application.id}
              href={`/applications/${application.slug}`}
              className="block"
            >
              <motion.div
                whileHover={{ y: -8 }}
                className="relative min-w-[350px] md:min-w-[450px] h-[450px] md:h-[500px] overflow-hidden"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 hover:scale-110"
                  style={{
                    backgroundImage: application.image?.url
                      ? `url(${application.image.url})`
                      : "url('/home1.jpg')",
                  }}
                />

                <div className="absolute inset-0 bg-black/40" />

                <div className="absolute bottom-0 p-6 text-white">
                  <h3 className="text-xl montserrat-bold mb-2">
                    {application.title}
                  </h3>

                  {application.description && (
                    <p className="text-sm montserrat-regular opacity-80 line-clamp-3">
                      {application.description}
                    </p>
                  )}
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
