'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

export default function ApplicationDetailContent({ application }) {
  return (
    <div className="min-h-screen bg-white" data-header-theme="dark">
      {/* HERO SECTION */}
      <section className="relative h-[70vh] flex items-center justify-start">
        <div className="absolute inset-0">
          <Image
            src={application.image?.url || '/home1.jpg'}
            alt={application.title}
            fill
            className="object-cover"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      </section>

      {/* TITLE & DESCRIPTION */}
      <section className="bg-black px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12"
          >
            <h1 className="text-4xl lg:text-5xl montserrat-bold text-white">{application.title}</h1>

            {application.description && (
              <p className="text-base montserrat-regular text-white opacity-90">
                {application.description}
              </p>
            )}
          </motion.div>
        </div>
      </section>

      {/* CASE STUDY SECTIONS */}
      {application.caseStudy && application.caseStudy.length > 0 && (
        <section className="bg-white">
          {application.caseStudy.map((section, index) => {
            const isLeft = index % 2 === 0

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="relative min-h-[500px] lg:min-h-[600px] flex items-center"
              >
                <div className="absolute inset-0">
                  {section.backgroundImage?.url && (
                    <Image
                      src={section.backgroundImage.url}
                      alt={section.sectionTitle}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  )}
                  <div className="absolute inset-0 bg-black/50" />
                </div>

                <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
                  <div
                    className={`grid grid-cols-1 lg:grid-cols-2 gap-12 ${
                      isLeft ? '' : 'lg:grid-flow-dense'
                    }`}
                  >
                    <div className={`text-white ${isLeft ? 'lg:col-start-1' : 'lg:col-start-2'}`}>
                      <h2 className="text-3xl lg:text-4xl montserrat-bold mb-6">
                        {section.header}
                      </h2>
                      <p className="text-sm montserrat-regular opacity-90 whitespace-pre-line">
                        {section.sectionDescription}
                      </p>
                    </div>

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
    </div>
  )
}
