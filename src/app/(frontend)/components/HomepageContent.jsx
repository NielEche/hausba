'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const BADGE_CIRCLE_STYLE = `
  .badge-circle .orange-draw {
    stroke: none;
    stroke-dasharray: 604;
    stroke-dashoffset: 604;
    transition: stroke-dashoffset 0.8s cubic-bezier(0.4, 0, 0.2, 1),
                stroke 0s 0.8s;
  }
  .badge-circle:hover .orange-draw {
    stroke: #FF7800;
    stroke-dashoffset: 0;
    transition: stroke-dashoffset 0.8s cubic-bezier(0.4, 0, 0.2, 1),
                stroke 0s 0s;
  }
`

const PROCESS_STEPS = [
  {
    num: '01',
    title: 'Customer Discovery',
    desc: 'Understand how live and work',
  },
  {
    num: '02',
    title: 'Design Thinking',
    desc: 'Shape the experience around you',
  },
  {
    num: '03',
    title: 'Proposal Design',
    desc: 'A clear considered plan',
  },
  {
    num: '04',
    title: 'Engineering Design',
    desc: 'Specified to professional standards',
  },
  {
    num: '05',
    title: 'Project Delivery',
    desc: 'Precise coordinated installation',
  },
  {
    num: '06',
    title: 'Experience Assurance',
    desc: 'Care that lasts beyond handover',
  },
]

function BadgeCircle({ children }) {
  return (
    <div className="badge-circle relative aspect-square flex flex-col items-center justify-center gap-2 cursor-default">
      <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 200 200" fill="none">
        <circle cx="100" cy="100" r="90" stroke="#374151" strokeWidth="1.5" />
        <circle
          className="orange-draw"
          cx="100"
          cy="100"
          r="90"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
      <div className="relative z-10 flex flex-col items-center justify-center gap-2">
        {children}
      </div>
    </div>
  )
}

export default function HomepageContent({
  projects = [],
  solutions = [],
  testimonials = [],
  brands = [],
}) {
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

  const [activeSolTab, setActiveSolTab] = useState(solutionTypes[0] || '')

  const highlightedProject =
    projects.find((p) => p.title?.toLowerCase().includes('gma residence')) || projects[0]

  const groupedProjects = projects.reduce((acc, project) => {
    const type = project.type || 'other'
    if (!acc[type]) acc[type] = []
    acc[type].push(project)
    return acc
  }, {})

  const projectTypes = Object.keys(groupedProjects).sort((a, b) => {
    if (a === 'residential') return -1
    if (b === 'residential') return 1
    return 0
  })

  const [activeProjectTab, setActiveProjectTab] = useState(projectTypes[0] || '')
  const [testimonialIndex, setTestimonialIndex] = useState(0)
  const activeTestimonial = testimonials[testimonialIndex]

  return (
    <div className="text-white bg-white">
      <style>{BADGE_CIRCLE_STYLE}</style>

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="h-screen relative flex items-end justify-start overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="/hero-bg.mp4"
          poster="/heroplace.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
        <div className="absolute inset-0 bg-black opacity-40" />
        <motion.div
          className="relative z-10 w-full text-center pb-16 px-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-xs md:text-base montserrat-bold tracking-[0.2em] uppercase mb-3 text-white">
            INTELLIGENCE DESIGNED <br className="lg:hidden display"></br> INTO EVERY SPACE
          </p>
          <p className="text-xs montserrat-regular text-white/90 max-w-lg mx-auto">
            Bespoke ProAV and automation systems for residential and commerical environments
          </p>
        </motion.div>
      </section>

      {/* ── WHAT WE DO ────────────────────────────────────────────────────── */}
      <section className="bg-white text-black py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.p
            className="text-[11px] montserrat-bold hausba-orange tracking-[0.25em] uppercase mb-4 flex items-center gap-2"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            WHAT WE DO
          </motion.p>

          <motion.h2
            className="text-4xl md:text-5xl montserrat-regular leading-[1.1] mb-6 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Engineering spaces that
            <br />
            respond to you
          </motion.h2>

          <motion.p
            className="text-base montserrat-regular text-gray-600 max-w-xl mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Lighting, sound, security and climate, working as one system
          </motion.p>

          <motion.a
            href="/solutions"
            className="inline-block border border-gray-600 bg-[#CCCCCC] text-black text-xs montserrat-bold px-8 py-4 uppercase tracking-[0.2em] rounded-full hover:bg-black hover:text-white! transition-colors duration-300 mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Explore Our Solutions
          </motion.a>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:gap-8 gap-4 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <BadgeCircle className="border border-gray-300">
                <span className="lg:text-5xl text-4xl montserrat-bold text-gray-400">300+</span>
                <span className="text-[11px] montserrat-regular text-gray-500 uppercase tracking-[0.2em]">
                  Spaces
                </span>
              </BadgeCircle>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <BadgeCircle className="border hausba-orange-border">
                <span className="lg:text-5xl text-4xl montserrat-bold text-gray-400">200+</span>
                <span className="text-[11px] montserrat-regular text-gray-500 uppercase tracking-[0.2em]">
                  Clients
                </span>
              </BadgeCircle>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <BadgeCircle className="border border-gray-300">
                <div className="relative lg:w-30 lg:h-22 w-24 h-16">
                  <Image
                    src="/avixalogo.png"
                    alt="AVIXA Member"
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </div>
                <span className="text-[11px] montserrat-regular text-gray-500 uppercase tracking-[0.2em]">
                  Member
                </span>
              </BadgeCircle>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <BadgeCircle className="border border-gray-300">
                <div className="relative lg:w-30 lg:h-22 w-24 h-16">
                  <Image
                    src="/cedia.png"
                    alt="CEDIA Certified"
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </div>
                <span className="text-[11px] montserrat-regular text-gray-500 uppercase tracking-[0.2em]">
                  Certified
                </span>
              </BadgeCircle>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── HIGHLIGHTED STORY ────────────────────────────────────────────── */}
      {highlightedProject && (
        <section className="relative overflow-hidden" style={{ minHeight: '640px' }}>
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: highlightedProject.image?.url
                ? `url(${highlightedProject.image.url})`
                : "url('/XAMIRAHEIGHTS.webp')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />

          <div
            className="relative z-10 max-w-7xl mx-auto flex items-end justify-end px-6"
            style={{ minHeight: '640px' }}
          >
            <motion.div
              className="max-w-lg text-right pb-20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-[11px] montserrat-bold hausba-orange tracking-[0.25em] uppercase mb-4">
                HIGHLIGHTED STORY
              </p>
              <h2 className="text-4xl md:text-6xl montserrat-bold text-white leading-none mb-4">
                {highlightedProject.title}
              </h2>
              {highlightedProject.description && (
                <p className="text-sm montserrat-bold text-gray-200 leading mb-8">
                  {highlightedProject.description}
                </p>
              )}
              <Link
                href={`/projects/${highlightedProject.slug}`}
                className="inline-block border border-white text-white text-xs montserrat-bold px-8 py-4 uppercase tracking-[0.2em] rounded-full hover:bg-white hover:text-black! transition-colors duration-300"
              >
                View Case Study
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* ── BRAND PARTNERS STRIP ─────────────────────────────────────────── */}
      {brands && brands.length > 0 && (
        <section className="bg-[#0F0F0F] py-2 px-6 overflow-hidden">
          <div className="max-w-7xl mx-auto py-10 mb-6">
            <p className="text-[14px] montserrat-regular hausba-grey text-left uppercase tracking-widest">
              TRUSTED PARTNERS
            </p>
          </div>

          <div
            className="relative mb-10"
            style={{
              maskImage:
                'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
              WebkitMaskImage:
                'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
            }}
          >
            <div className="flex animate-marquee gap-15 w-max">
              {[...brands, ...brands].map((brand, i) => (
                <a
                  key={`${brand.id}-${i}`}
                  href={brand.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-32 h-18 relative flex-shrink-0 flex items-center justify-center"
                >
                  {brand.image?.url ? (
                    <Image
                      src={brand.image.url}
                      alt={brand.image?.alt || brand.name}
                      fill
                      className="object-contain filter brightness-0 invert opacity-50 hover:opacity-90 transition-opacity duration-300"
                      unoptimized
                    />
                  ) : (
                    <span className="text-xs montserrat-bold text-gray-500 uppercase whitespace-nowrap">
                      {brand.name}
                    </span>
                  )}
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── SELECTED WORK ─────────────────────────────────────────────────── */}
      {projects.length > 0 && (
        <section className="bg-black py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <p className="text-[11px] montserrat-bold hausba-orange tracking-[0.25em] uppercase mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FF7800] inline-block" />
              SELECTED WORK
            </p>

            <div className="flex items-end justify-between mb-14 flex-wrap gap-4">
              <h2 className="text-3xl md:text-4xl montserrat-bold">Spaces we've brought to life</h2>
            </div>

            <div className="flex items-end justify-between flex-wrap gap-4">
              <div className="flex gap-3 mb-8 flex-wrap">
                {projectTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setActiveProjectTab(type)}
                    className={`px-5 py-4 rounded-full text-xs montserrat-bold uppercase tracking-widest border transition-all duration-300 cursor-pointer
                    ${
                      activeProjectTab === type
                        ? 'bg-[#FF7800] border-[#FF7800] text-black'
                        : 'border-gray-600 text-gray-400 hover:border-gray-400 hover:text-white'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-4 mb-8">
                <Link
                  href="/projects"
                  className="text-xs montserrat-bold uppercase tracking-widest text-gray-400 hover:text-white transition-colors"
                >
                  View All Projects →
                </Link>
              </div>
            </div>

            {groupedProjects[activeProjectTab] && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {groupedProjects[activeProjectTab][0] && (
                  <Link href={`/projects/${groupedProjects[activeProjectTab][0].slug}`}>
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      transition={{ duration: 0.3 }}
                      className="relative h-[550px] overflow-hidden group cursor-pointer"
                    >
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                        style={{
                          backgroundImage: groupedProjects[activeProjectTab][0].image?.url
                            ? `url(${groupedProjects[activeProjectTab][0].image.url})`
                            : "url('/XAMIRAHEIGHTS.webp')",
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                      <div className="absolute bottom-0 left-0 p-6 z-10">
                        <h3 className="text-xl montserrat-bold">
                          {groupedProjects[activeProjectTab][0].title}
                        </h3>
                        {groupedProjects[activeProjectTab][0].location && (
                          <p className="text-xs montserrat-regular text-gray-300 uppercase tracking-widest mt-1">
                            {groupedProjects[activeProjectTab][0].location}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  </Link>
                )}

                <div className="flex flex-col gap-4">
                  {groupedProjects[activeProjectTab].slice(1, 3).map((project) => (
                    <Link key={project.id} href={`/projects/${project.slug}`}>
                      <motion.div
                        whileHover={{ scale: 1.01 }}
                        transition={{ duration: 0.3 }}
                        className="relative h-[267px] overflow-hidden group cursor-pointer"
                      >
                        <div
                          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                          style={{
                            backgroundImage: project.image?.url
                              ? `url(${project.image.url})`
                              : "url('/XAMIRAHEIGHTS.webp')",
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                        <div className="absolute bottom-0 left-0 p-5 z-10">
                          <h3 className="text-base montserrat-bold">{project.title}</h3>
                          {project.location && (
                            <p className="text-[10px] montserrat-regular text-gray-300 uppercase tracking-widest mt-1">
                              {project.location}
                            </p>
                          )}
                        </div>
                      </motion.div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── HOW WE WORK ──────────────────────────────────────────────────── */}
      <section className="bg-[#111111] py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-[12px] montserrat-bold tracking-widest uppercase text-center hausba-orange mb-4">
            HOW WE WORK
          </p>
          <h2 className="text-3xl md:text-4xl montserrat-bold text-white text-center mb-12">
            A process built with you in mind
          </h2>

          {/* Timeline row */}
          <div className="relative">
            {/* Animated connecting line */}
            <motion.div
              className="hidden lg:block absolute top-[23px] left-[calc(100%/12)] right-[calc(100%/12)] h-[1px] bg-[#FF7800] origin-left"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2.5, ease: 'easeInOut' }}
            />

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-y-12 gap-x-4">
              {PROCESS_STEPS.map((step, i) => (
                <motion.div
                  key={step.num}
                  className="flex flex-col items-center text-center"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5 + i * 0.3, ease: 'easeOut' }}
                >
                  {/* Circle */}
                  <motion.div
                    className="w-12 h-12 rounded-full border-2 border-[#FF7800] bg-[#111111] flex items-center justify-center mb-6 relative z-10"
                    initial={{ scale: 0.6, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 + i * 0.3, ease: 'backOut' }}
                  >
                    <span className="text-lg montserrat-bold text-white">{step.num}</span>
                  </motion.div>
                  <h4 className="text-xs montserrat-bold text-white mb-2 leading-snug">
                    {step.title}
                  </h4>
                  <p className="text-[10px] montserrat-regular text-gray-200 leading-none max-w-[120px]">
                    {step.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── OUR SOLUTIONS ────────────────────────────────────────────────── */}
      {solutionTypes.length > 0 && (
        <section className="bg-white py-20 px-6">
          <div className="max-w-7xl mx-auto">
            {/* Eyebrow */}
            <p className="text-[12px] montserrat-bold tracking-[0.3em] uppercase text-center mb-6 flex items-center justify-center gap-3">
              <span className="hausba-grey">OUR SOLUTIONS</span>
            </p>

            <h2 className="text-3xl md:text-4xl montserrat-bold text-black text-center mb-8">
              Engineered for the extraordinary
            </h2>

            {/* Sliding pill tab switcher */}
            <div className="flex justify-center mb-10">
              <div className="relative flex bg-[#545050] rounded-full p-1">
                {solutionTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setActiveSolTab(type)}
                    className={`relative z-10 px-7 py-2 rounded-full text-[11px] montserrat-bold uppercase tracking-widest transition-colors duration-300 cursor-pointer
                  ${activeSolTab === type ? 'text-black' : 'text-white hover:text-white'}`}
                  >
                    {activeSolTab === type && (
                      <motion.span
                        layoutId="sol-pill"
                        className="absolute inset-0 bg-[#CCCCCC] rounded-full"
                        transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                      />
                    )}
                    <span className="relative z-10">{type}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Cards grid */}
            {groupedSolutions[activeSolTab] && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {groupedSolutions[activeSolTab].map((solution, index) => (
                  <Link key={solution.id} href={`/solutions/${solution.slug}`}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.07 }}
                      className="relative h-86 overflow-hidden group cursor-pointer"
                    >
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                        style={{
                          backgroundImage: solution.image?.url
                            ? `url(${solution.image.url})`
                            : 'linear-gradient(160deg, #5badec 0%, #3a7fc1 50%, #2d3e50 100%)',
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                      {/* Title */}
                      <div className="absolute bottom-0 left-0 p-5 z-10">
                        {/* Number sits just above title */}
                        <span className="text-[11px] montserrat-bold hausba-orange tracking-widest pb-4">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <h3 className="text-lg montserrat-regular text-white">{solution.title}</h3>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── TESTIMONIAL ──────────────────────────────────────────────────── */}
      {testimonials && testimonials.length > 0 && (
        <section className="bg-black py-28 px-6">
          <div className="max-w-4xl mx-auto text-center relative">
            {/* Quote mark */}
            <div className="text-8xl hausba-orange montserrat-bold leading-none select-none">
              &#8221;
            </div>

            {/* Testimony */}
            <motion.p
              key={testimonialIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-2xl md:text-4xl montserrat-bold leading-snug text-white"
            >
              {activeTestimonial?.testimony}
            </motion.p>

            {/* Name */}
            <motion.p
              key={`name-${testimonialIndex}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xs montserrat-bold text-gray-500 uppercase tracking-[0.25em] mt-10"
            >
              {activeTestimonial?.name}
              {activeTestimonial?.company && ` — ${activeTestimonial.company}`}
            </motion.p>

            {/* Navigation arrows — positioned right */}
            {testimonials.length > 1 && (
              <div className="flex items-center justify-center gap-6 mt-12">
                <button
                  onClick={() =>
                    setTestimonialIndex((i) => (i - 1 + testimonials.length) % testimonials.length)
                  }
                  className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-white transition-colors cursor-pointer"
                  aria-label="Previous testimonial"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path
                      d="M15 18l-6-6 6-6"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                {/* Dots */}
                <div className="flex gap-2">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setTestimonialIndex(i)}
                      className={`w-1.5 h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                        i === testimonialIndex ? 'bg-[#FF7800] w-4' : 'bg-gray-600'
                      }`}
                      aria-label={`Go to testimonial ${i + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={() => setTestimonialIndex((i) => (i + 1) % testimonials.length)}
                  className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-white transition-colors cursor-pointer"
                  aria-label="Next testimonial"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path
                      d="M9 18l6-6-6-6"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── READY TO TRANSFORM CTA ───────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ minHeight: '480px' }}>
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/estimate.jpg')" }}
        />
        <div className="absolute inset-0 bg-black/62" />
        <div className="relative z-10 max-w-3xl mx-auto text-center py-32 px-6">
          <p className="text-[12px] montserrat-bold uppercase tracking-[0.35em] hausba-orange mb-5">
            WORK WITH US
          </p>

          <h2 className="text-4xl md:text-6xl montserrat-bold leading-[1.0] mb-10 text-white">
            Ready to transform your space?
          </h2>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="mailto:experience@hausba.com?subject=Book%20a%20Consultation"
              className="px-10 py-4 rounded-full bg-[#ff6f3c] text-black! text-[11px] montserrat-bold uppercase tracking-[0.2em] hover:bg-[#e55f2f] transition-colors duration-300 whitespace-nowrap"
            >
              Book a Consultation
            </a>

            <a
              href="mailto:experience@hausba.com?subject=Book%20an%20Experience%20Centre%20Visit"
              className="px-10 py-4 rounded-full border border-white/50 text-white text-[11px] montserrat-bold uppercase tracking-[0.2em] hover:bg-white/10 transition-colors duration-300 whitespace-nowrap"
            >
              Book an Experience Centre Visit
            </a>
          </div>

          <p className="text-xs montserrat-bold text-white mt-6">
            Our team will be in touch within 24 hours
          </p>
        </div>
      </section>
    </div>
  )
}
