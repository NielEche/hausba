'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

// Simple rich text serializer for Payload
const serializeRichText = (content) => {
  if (!content) return null

  // Strip characters/markup that can silently break word-wrapping:
  // non-breaking spaces (from Word/Google Docs paste) and any inline
  // style attributes (which can carry white-space: nowrap etc.)
  const sanitize = (str) =>
    typeof str === 'string'
      ? str.replace(/\u00A0|&nbsp;/g, ' ').replace(/\sstyle="[^"]*"/gi, '')
      : str

  if (typeof content === 'string') return sanitize(content)

  const serialize = (node) => {
    if (!node) return ''

    if (node.text !== undefined) {
      let text = sanitize(node.text)
      if (node.bold) text = `<strong>${text}</strong>`
      if (node.italic) text = `<em>${text}</em>`
      if (node.underline) text = `<u>${text}</u>`
      if (node.code) text = `<code>${text}</code>`
      return text
    }

    if (node.children) {
      const children = node.children.map((child) => serialize(child)).join('')

      switch (node.type) {
        case 'h1':
          return `<h1 class="text-3xl montserrat-bold mb-6">${children}</h1>`
        case 'h2':
          return `<h2 class="text-2xl montserrat-bold mb-5">${children}</h2>`
        case 'h3':
          return `<h3 class="text-xl montserrat-bold mb-4">${children}</h3>`
        case 'h4':
          return `<h4 class="text-lg montserrat-bold mb-3">${children}</h4>`
        case 'blockquote':
          return `<blockquote class="border-l-4 border-[#ff6f3c] pl-4 italic my-4">${children}</blockquote>`
        case 'ul':
          return `<ul class="list-disc list-inside mb-4 space-y-2 ml-4">${children}</ul>`
        case 'ol':
          return `<ol class="list-decimal list-inside mb-4 space-y-2 ml-4">${children}</ol>`
        case 'li':
          return `<li class="mb-2">${children}</li>`
        case 'link': {
          const href = node.url || '#'
          const target = node.newTab ? '_blank' : '_self'
          const rel = node.newTab ? 'noopener noreferrer' : ''
          return `<a href="${href}" target="${target}" rel="${rel}" class="text-[#ff6f3c] hover:underline">${children}</a>`
        }
        default:
          return `<p class="mb-4">${children}</p>`
      }
    }

    return ''
  }

  if (Array.isArray(content)) {
    return content.map((node) => serialize(node)).join('')
  }

  if (content.root && Array.isArray(content.root.children)) {
    return content.root.children.map((node) => serialize(node)).join('')
  }

  return serialize(content)
}

export default function ProjectDetailContent({ project }) {
  const [selectedImage, setSelectedImage] = useState(null)

  const brief = project.brief
  const solution = project.solution
  const extraDetails = project.extraDetails

  // Aggregate every image used across sections + the dedicated gallery
  // array into one list for the bottom "Project Gallery" grid
  const allGalleryImages = [
    brief?.image?.url && { image: brief.image, caption: brief.heading || 'The Brief' },
    ...(solution?.images
      ?.filter((item) => item?.image?.url)
      .map((item) => ({ image: item.image, caption: solution.heading || 'The Solution' })) || []),
    extraDetails?.image?.url && {
      image: extraDetails.image,
      caption: extraDetails.heading || '',
    },
    ...(project.gallery || []),
  ].filter(Boolean)

  return (
    <div className="min-h-screen bg-black overflow-x-hidden" data-header-theme="dark">
      {/* HERO SECTION - title overlaid directly on the image */}
      <section className="relative h-[70vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={project.coverImage?.url || '/home1.jpg'}
            alt={project.coverImage?.alt || project.title}
            fill
            className="object-cover"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 px-6 pb-10 max-w-7xl w-full mx-auto"
        >
          <h1 className="text-4xl lg:text-6xl montserrat-bold text-white leading-tight capitalize break-words">
            {project.title}
          </h1>
        </motion.div>
      </section>

      {/* META BAR - Project Type / Systems / Location / Status */}
      <section className="hausba-grey-bg2 border-t border-white/10 border-b border-white/10 px-6 py-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 min-w-0">
          {project.type && (
            <div className="px-6 first:pl-0 border-l border-white/10 first:border-l-0 py-2 min-w-0">
              <span className="text-[10px] uppercase tracking-wider text-white/50 montserrat-regular block mb-1">
                Project Type
              </span>
              <span className="text-white text-base montserrat-regular capitalize py-2 break-words">
                {project.type}
              </span>
            </div>
          )}
          {project.systems && project.systems.length > 0 && (
            <div className="px-6 border-l border-white/10 py-2 min-w-0">
              <span className="text-[10px] uppercase tracking-wider text-white/50 montserrat-regular block mb-1">
                Systems
              </span>
              <span className="text-white text-base montserrat-regular py-2 break-words">
                {project.systems.map((s) => s.system).join(' · ')}
              </span>
            </div>
          )}
          {project.location && (
            <div className="px-6 border-l border-white/10 py-2 min-w-0">
              <span className="text-[10px] uppercase tracking-wider text-white/50 montserrat-regular block mb-1">
                Location
              </span>
              <span className="text-white text-base montserrat-regular py-2 break-words">
                {project.location}
              </span>
            </div>
          )}
          {project.projectDate && (
            <div className="px-6 border-l border-white/10 py-2 min-w-0">
              <span className="text-[10px] uppercase tracking-wider text-white/50 montserrat-regular block mb-1">
                Status
              </span>
              <span className="text-white text-base montserrat-regular break-words">
                Completed {new Date(project.projectDate).getFullYear()}
              </span>
            </div>
          )}
        </div>
      </section>

      {/* DESCRIPTION */}
      {project.description && (
        <section className="hausba-grey-bg2 px-6 py-10">
          <div className="max-w-4xl mx-auto">
            <p className="text-white/80 text-base montserrat-regular leading-relaxed break-words">
              {project.description}
            </p>
          </div>
        </section>
      )}

      {/* THE BRIEF */}
      {brief?.content && (
        <section className="hausba-grey-bg2 px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <span className="text-xs uppercase tracking-wider text-[#ff6f3c] montserrat-regular block mb-4">
                {brief.heading || 'The Brief'}
              </span>
              <div
                className="text-white/80 montserrat-regular leading-relaxed break-words"
                dangerouslySetInnerHTML={{ __html: serializeRichText(brief.content) }}
              />
            </motion.div>
          </div>
        </section>
      )}

      {/* Brief image - single wide image after the brief */}
      {brief?.image?.url && (
        <section className="px-6 ">
          <div className=" mx-auto relative h-[500px] overflow-hidden">
            <Image
              src={brief.image.url}
              alt={brief.heading || 'Brief image'}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        </section>
      )}

      {/* THE SOLUTION + EXTRA DETAILS — 2x2 checkerboard grid */}
      {(solution?.content || extraDetails?.content) && (
        <section className="hausba-grey-bg2">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Top-left: Solution text */}
            {solution?.content && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="px-10 py-16 flex flex-col justify-center min-w-0 w-full max-w-full overflow-hidden"
              >
                <span className="text-xs uppercase tracking-wider text-[#ff6f3c] montserrat-regular block mb-4">
                  {solution.heading || 'The Solution'}
                </span>
                <div
                  className="text-white/70 montserrat-regular leading-relaxed space-y-4 break-normal"
                  dangerouslySetInnerHTML={{ __html: serializeRichText(solution.content) }}
                />
              </motion.div>
            )}

            {/* Top-right: First solution image */}
            {solution?.images?.[0]?.image?.url && (
              <div className="relative min-h-[500px]">
                <Image
                  src={solution.images[0].image.url}
                  alt={solution.heading || 'Solution image'}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            )}

            {/* Bottom-left: Extra details image */}
            {extraDetails?.image?.url && (
              <div className="relative min-h-[500px]">
                <Image
                  src={extraDetails.image.url}
                  alt={extraDetails.heading || 'Extra details image'}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            )}

            {/* Bottom-right: Extra details text */}
            {extraDetails?.content && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="px-10 py-16 flex flex-col justify-center min-w-0 w-full max-w-full overflow-hidden"
              >
                {extraDetails.heading && (
                  <span className="text-xs uppercase tracking-wider text-white/50 montserrat-regular block mb-4">
                    {extraDetails.heading}
                  </span>
                )}
                <div
                  className="text-white/70 montserrat-regular leading-relaxed break-normal"
                  dangerouslySetInnerHTML={{ __html: serializeRichText(extraDetails.content) }}
                />
              </motion.div>
            )}
          </div>
        </section>
      )}

      {/* CRAFT */}
      {project.craft &&
        (() => {
          const craftLines = project.craft.split('\n').filter(Boolean)
          const [craftHeadline, ...craftBody] = craftLines

          return (
            <section className="bg-black px-6 py-20">
              <div className="max-w-5xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <span className="inline-block text-xs uppercase tracking-wider text-[#ff6f3c] montserrat-regular border border-[#ff6f3c] px-4 py-2 mb-8">
                    The Craft
                  </span>

                  {craftHeadline && (
                    <h2 className="text-white/90 text-2xl lg:text-3xl montserrat-regular leading-snug mb-6 pr-20 break-words">
                      {craftHeadline}
                    </h2>
                  )}

                  {craftBody.length > 0 && (
                    <p className="text-white/60 text-base montserrat-regular leading-relaxed max-w-4xl break-words">
                      {craftBody.join(' ')}
                    </p>
                  )}
                </motion.div>
              </div>
            </section>
          )
        })()}

      {/* SPECIFICATION - Brands & Specifications */}
      {project.specification && project.specification.length > 0 && (
        <section className="hausba-grey-bg2 px-6 py-20 border-t border-white/10">
          <div className="max-w-4xl mx-auto">
            <span className="text-xs uppercase tracking-wider text-white/90 montserrat-regular block mb-10">
              Brands & Specifications
            </span>
            <div className="space-y-6">
              {project.specification.map((spec, i) => (
                <div
                  key={i}
                  className="flex items-baseline gap-8 text-sm montserrat-regular min-w-0"
                >
                  <span className="text-white/40 uppercase tracking-wider text-xs w-40 shrink-0">
                    {spec.label}
                  </span>
                  <span className="text-white text-base min-w-0 break-words">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* PROJECT GALLERY - thumbnail grid, aggregated from all sections + gallery array */}
      {allGalleryImages.length > 0 && (
        <section className="hausba-grey-bg2 px-6 py-16 border-t border-white/10">
          <div className="max-w-7xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-xs uppercase tracking-wider montserrat-regular text-left mb-10 text-white/90"
            >
              Gallery
            </motion.h2>

            <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
              {allGalleryImages.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="relative h-[100px] md:h-[230px] overflow-hidden group cursor-pointer"
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
                        <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-2 text-white text-[10px] montserrat-regular opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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

      {/* CONTACT CTA SECTION */}
      <div className="hausba-grey-bg2">
        <div className="max-w-7xl mx-auto px-4 py-32 text-center">
          <h3 className="text-2xl md:text-3xl montserrat-regular text-white mb-10">
            Discuss a project with us
          </h3>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="https://wa.me/2348100999555?text=Hi%20Hausba%2C%20I'd%20like%20to%20book%20a%20consultation"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border border-white/30 hover:border-white text-white px-8 py-3 rounded-full text-xs uppercase tracking-wider montserrat-regular transition-colors duration-300"
            >
              Book a Consultation
            </Link>

            <Link
              href="/projects"
              className="inline-block border border-[#ff6f3c] hover:bg-[#ff6f3c] hover:text-black! text-[#ff6f3c]! px-8 py-3 rounded-full text-xs uppercase tracking-wider montserrat-regular transition-colors duration-300"
            >
              View All Projects
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}