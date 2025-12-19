// app/solutions/[slug]/SolutionDetailContent.tsx
'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function SolutionDetailContent({ solution }) {
  return (
    <div className="min-h-screen bg-white" data-header-theme="dark">
      {/* HERO SECTION */}
      <section className="relative h-[70vh] flex items-center justify-start">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={solution.image?.url || '/home1.jpg'}
            alt="Solutions"
            fill
            className="object-cover"
            priority
            unoptimized
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/40" />
        </div>
      </section>

      {/* TITLE & DESCRIPTION SECTION - Below Image on Black BG */}
      <section className="bg-black px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start"
          >
            {/* LEFT: Title */}
            <div className="text-white">
              <h1 className="text-4xl lg:text-5xl montserrat-bold leading-tight">
                {solution.title}
              </h1>
            </div>

            {/* RIGHT: Description */}
            {solution.description && (
              <div className="text-white">
                <p className="text-base montserrat-regular leading-relaxed opacity-90">
                  {solution.description}
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* CONTENT SECTIONS - Alternating Left/Right */}
      {solution.sections && solution.sections.length > 0 && (
        <section className="bg-white">
          {solution.sections.map((section, index) => {
            const isLeft = index % 2 === 0

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="relative min-h-[500px] lg:min-h-[600px] flex items-center"
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  {section.icon?.url && (
                    <Image
                      src={section.icon.url}
                      alt={section.sectionTitle}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  )}
                  {/* Dark Overlay */}
                  <div className="absolute inset-0 bg-black/50" />
                </div>

                {/* Content Container */}
                <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-6">
                  <div
                    className={`grid grid-cols-1 lg:grid-cols-2 gap-12 ${
                      isLeft ? '' : 'lg:grid-flow-dense'
                    }`}
                  >
                    {/* Text Content */}
                    <div className={`text-white ${isLeft ? 'lg:col-start-1' : 'lg:col-start-2'}`}>
                      {/* Section Title */}
                      <h2 className="text-3xl lg:text-4xl montserrat-bold mb-6 leading-tight">
                        {section.sectionTitle}
                      </h2>

                      {/* Section Content */}
                      <p className="text-sm montserrat-regular leading-relaxed opacity-90 whitespace-pre-line">
                        {section.content}
                      </p>
                    </div>

                    {/* Empty column for spacing (text on one side, image fills background) */}
                    <div
                      className={`hidden lg:block ${isLeft ? 'lg:col-start-2' : 'lg:col-start-1'}`}
                    />
                  </div>
                </div>
              </motion.div>
            )
          })}
        </section>
      )}

      {/* GET ESTIMATE SECTION */}
      <div className="bg-black">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div
            className="relative border-2 hausba-orange-border overflow-hidden flex items-center"
            style={{ minHeight: '220px' }}
          >
            {/* BACKGROUND IMAGE */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('/estimate.jpg')` }}
            ></div>

            {/* DARK LEFT OVERLAY */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.7) 60%, rgba(0,0,0,0) 100%)',
              }}
            ></div>

            {/* CONTENT */}
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full px-8 py-16">
              {/* TEXT */}
              <div className="text-white max-w-lg lg:px-10">
                <h3 className="text-xl md:text-2xl montserrat-bold mb-2">
                  Get an instant estimate for your project
                </h3>
                <p className="text-sm md:text-base montserrat-regular opacity-90">
                  Use our smart home estimator to get an estimate for your smart home project. It'll
                  only take 5 minutes.
                </p>
              </div>

              {/* BUTTON */}
              <div className="mt-4 md:mt-0 flex justify-start md:justify-center w-full lg:pl-26 py-4">
                <button className="hausba-orange-bg cursor-pointer hover:bg-[#d94d1a] text-white font-semibold py-3 px-6 montserrat-regular transition">
                  Get an Estimate
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
