'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export default function ProjectDetailContent({ project }) {
  const [selectedImage, setSelectedImage] = useState(null)

  return (
    <div className="min-h-screen bg-white" data-header-theme="dark">
      {/* HERO SECTION */}
      <section className="relative h-[70vh] flex items-center justify-start">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={project.coverImage?.url || '/home1.jpg'}
            alt={project.title}
            fill
            className="object-cover"
            priority
            unoptimized
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/30" />
        </div>
      </section>

      {/* PROJECT INFO SECTION - Below Image on Black BG */}
      <section className="bg-black px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start"
          >
            {/* LEFT: Title & Meta */}
            <div className="text-white">
              <span className="text-xs montserrat-regular mb-4 block uppercase text-[#ff6f3c]">
                [ {project.type} Project ]
              </span>
              <h1 className="text-4xl lg:text-5xl montserrat-bold leading-tight mb-6">
                {project.title}
              </h1>

              {/* Meta Info */}
              <div className="space-y-3 text-sm montserrat-regular opacity-90">
                {project.location && (
                  <div className="flex gap-2">
                    <span className="text-[#ff6f3c]">Location:</span>
                    <span>{project.location}</span>
                  </div>
                )}
                {project.clientName && (
                  <div className="flex gap-2">
                    <span className="text-[#ff6f3c]">Client:</span>
                    <span>{project.clientName}</span>
                  </div>
                )}
                {project.projectDate && (
                  <div className="flex gap-2">
                    <span className="text-[#ff6f3c]">Completed:</span>
                    <span>{new Date(project.projectDate).getFullYear()}</span>
                  </div>
                )}
              </div>

              {/* Tags */}
              {project.tags && project.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-6">
                  {project.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="text-xs montserrat-regular uppercase tracking-wider bg-white/10 px-3 py-1 border border-white/20"
                    >
                      {tag.tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* RIGHT: Description */}
            {project.description && (
              <div className="text-white">
                <p className="text-base montserrat-regular leading-relaxed opacity-90">
                  {project.description}
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* PROJECT CONTENT */}
      {project.content && (
        <section className="bg-white px-6 py-16">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="prose prose-lg max-w-none"
            >
              <div
                className="text-gray-700 montserrat-regular leading-relaxed"
                dangerouslySetInnerHTML={{ __html: project.content }}
              />
            </motion.div>
          </div>
        </section>
      )}

      {/* PROJECT GALLERY */}
      {project.gallery && project.gallery.length > 0 && (
        <section className="bg-white px-6 py-16">
          <div className="max-w-7xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-3xl montserrat-bold text-center mb-12 text-gray-900"
            >
              Project Gallery
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.gallery.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8 }}
                  className="relative h-[300px] overflow-hidden group cursor-pointer"
                  onClick={() => setSelectedImage(item.image?.url)}
                >
                  {item.image?.url && (
                    <>
                      <Image
                        src={item.image.url}
                        alt={item.caption || `Gallery image ${index + 1}`}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        unoptimized
                      />
                      {item.caption && (
                        <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-4 text-white text-sm montserrat-regular opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          {item.caption}
                        </div>
                      )}
                    </>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* IMAGE LIGHTBOX */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white text-4xl hover:text-[#ff6f3c] transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            ×
          </button>
          <div className="relative w-full h-full max-w-6xl max-h-[90vh]">
            <Image
              src={selectedImage}
              alt="Gallery image"
              fill
              className="object-contain"
              unoptimized
            />
          </div>
        </div>
      )}

      {/* BACK TO PROJECTS BUTTON */}
      <section className="bg-black px-6 pb-8 pt-20">
        <div className="max-w-7xl mx-auto text-center">
          <Link
            href="/projects"
            className="inline-block border border-white hover:border-[#ff6f3c] text-white hover:text-[#ff6f3c] px-8 py-3 montserrat-regular text-sm transition-colors duration-300"
          >
            ← Back to Projects
          </Link>
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
