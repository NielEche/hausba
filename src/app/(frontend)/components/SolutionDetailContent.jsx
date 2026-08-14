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
            alt={solution.image?.alt || solution.title || 'Hausba solution'}
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
            const isLast = index === solution.sections.length - 1

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className={`relative flex items-center ${
                  isLast ? 'min-h-[350px] lg:min-h-[400px]' : 'min-h-[500px] lg:min-h-[600px]'
                }`}
              >
                {/* Background */}
                <div className="absolute inset-0">
                  {section.icon?.url ? (
                    <>
                      <Image
                        src={section.icon.url}
                        alt={section.icon?.alt || section.sectionTitle || 'Hausba solution section'}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                      {/* Dark overlay on image */}
                      <div className="absolute inset-0 bg-black/70" />
                    </>
                  ) : (
                    /* Solid black background when no image */
                    <div className="absolute inset-0 bg-black" />
                  )}
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

      {/* WHATSAPP CTA SECTION */}
      <section className="bg-black px-6 pb-24">
        <div className="max-w-7xl mx-auto px-6 text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Link
              href="https://wa.me/+2348100999555"
              target="_blank"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full hausba-orange-bg text-black! text-[11px] montserrat-bold uppercase tracking-[0.2em] hover:bg-gray-200! transition-colors duration-300"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4 flex-shrink-0"
                aria-hidden="true"
              >
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.86 9.86 0 0 0 12.04 2Zm0 1.67c2.19 0 4.25.85 5.8 2.4a8.18 8.18 0 0 1 2.41 5.83c0 4.55-3.7 8.24-8.24 8.24a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.18 8.18 0 0 1-1.26-4.37c0-4.55 3.7-8.24 8.27-8.24Zm-4.5 4.5c-.17 0-.45.06-.68.32-.23.25-.89.87-.89 2.12s.91 2.46 1.04 2.63c.13.17 1.77 2.83 4.38 3.85 2.16.85 2.6.68 3.07.64.47-.04 1.5-.61 1.72-1.2.21-.6.21-1.11.15-1.21-.06-.11-.23-.17-.47-.3-.25-.13-1.5-.74-1.73-.82-.23-.09-.4-.13-.57.12-.17.26-.65.82-.8.99-.15.17-.29.19-.55.06-.25-.13-1.06-.39-2.02-1.24-.75-.66-1.25-1.48-1.4-1.73-.15-.25-.02-.39.11-.51.11-.11.25-.29.38-.43.13-.15.17-.26.25-.43.08-.17.04-.32-.02-.45-.06-.13-.57-1.4-.79-1.91-.2-.49-.42-.43-.57-.44-.15-.01-.31-.01-.48-.01Z" />
              </svg>
              Chat With Us
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
