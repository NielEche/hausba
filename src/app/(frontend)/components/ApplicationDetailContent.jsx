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
        <section>
          {application.caseStudy.map((section, index) => {
            const isLeft = index % 2 === 0
            const isThirdItem = index === 2 && application.caseStudy.length > 3

            // Third item with background image treatment
            if (isThirdItem) {
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="relative py-20  min-h-[500px] lg:min-h-[600px] flex items-center"
                >
                  {/* Background */}
                  <div className="absolute inset-0">
                    {section.backgroundImage?.url ? (
                      <>
                        <Image
                          src={section.backgroundImage.url}
                          alt={section.header}
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
                  <div className="relative z-20 w-full max-w-7xl mx-auto px-6 lg:px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                      {/* Text Content */}
                      <div className="text-white lg:col-start-1">
                        {/* Section Header */}
                        <h2 className="text-3xl lg:text-4xl montserrat-bold mb-6 leading-tight">
                          {section.header}
                        </h2>

                        {/* Section Description */}
                        <p className="text-sm montserrat-regular  opacity-90 whitespace-pre-line">
                          {section.sectionDescription}
                        </p>
                      </div>

                      {/* Empty column for spacing */}
                      <div className="hidden lg:block lg:col-start-2" />
                    </div>
                  </div>
                </motion.div>
              )
            }

            // Regular case study items (index 0, 1, and 3+)
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="py-20 flex items-center"
              >
                <div className="w-full max-w-7xl mx-auto px-6">
                  <div
                    className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                      isLeft ? '' : 'lg:grid-flow-dense'
                    }`}
                  >
                    {/* TEXT */}
                    <div className={`${isLeft ? 'lg:col-start-1' : 'lg:col-start-2'}`}>
                      <motion.h2
                        className="text-xs montserrat-regular text-left capitalize "
                        initial={{ opacity: 0.9 }}
                        whileHover={{ opacity: 1 }}
                      >
                        [ {section.title} ]
                      </motion.h2>
                      <h2 className="text-3xl lg:text-4xl montserrat-bold mb-6 text-black">
                        {section.header}
                      </h2>
                      <p className="text-sm montserrat-regular text-black/80 whitespace-pre-line">
                        {section.sectionDescription}
                      </p>
                    </div>

                    {/* IMAGE */}
                    {section.backgroundImage?.url && (
                      <div
                        className={`flex items-center justify-center ${
                          isLeft ? 'lg:col-start-2' : 'lg:col-start-1'
                        }`}
                      >
                        <div className="relative w-full max-w-md aspect-[4/3]">
                          <Image
                            src={section.backgroundImage.url}
                            alt={section.header}
                            fill
                            className="object-cover rounded-lg"
                            unoptimized
                          />
                        </div>
                      </div>
                    )}
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
