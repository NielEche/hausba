'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

const FEATURES = [
  {
    title: 'Extend Equipment Lifespan',
    description: 'Scheduled care keeps premium hardware performing for years longer.',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="w-7 h-7"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Prevent Costly Breakdowns',
    description: 'Issues are caught and corrected before they interrupt your life.',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="w-7 h-7"
      >
        <path
          d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Peak System Performance',
    description: 'Firmware, calibration and tuning — always at their best.',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="w-7 h-7"
      >
        <path d="M3 17l4-5 3 3 5-7 6 8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Total Peace of Mind',
    description: 'One team that knows your system, on call when you need them.',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="w-7 h-7"
      >
        <path
          d="M12 20s-7-4.35-9.5-9C1 8 2 5 5 4.3 7.5 3.7 10 4.9 12 7.5 14 4.9 16.5 3.7 19 4.3 22 5 23 8 21.5 11 19 15.65 12 20 12 20Z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
]

function PlusMinusIcon({ open }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      className="w-4 h-4 flex-shrink-0 pointer-events-none"
    >
      <line
        x1="12"
        y1="5"
        x2="12"
        y2="19"
        className={`transition-transform duration-300 origin-center ${open ? 'scale-y-0' : 'scale-y-100'}`}
      />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  )
}

function FaqItem({ faq, isOpen, onToggle }) {
  return (
    <div className="border-b border-gray-800">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-6 text-left cursor-pointer group"
      >
        <span className="text-sm md:text-base montserrat-bold text-white pr-6">{faq.question}</span>
        <span className="text-[#FF7800] group-hover:text-white transition-colors">
          <PlusMinusIcon open={isOpen} />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="text-sm montserrat-regular text-gray-400 leading-relaxed pb-6 pr-10">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function MaintenancePageContent({ plans = [], faqs = [], testimonials = [] }) {
  const [activePlanTab, setActivePlanTab] = useState('residential')
  const [openFaqIndex, setOpenFaqIndex] = useState(0)
  const [testimonialPage, setTestimonialPage] = useState(0)

  const filteredPlans = plans.filter((plan) => plan.planType === activePlanTab)
  const hasBothTypes =
    plans.some((p) => p.planType === 'residential') &&
    plans.some((p) => p.planType === 'commercial')

  const TESTIMONIALS_PER_PAGE = 3
  const totalTestimonialPages = Math.ceil(testimonials.length / TESTIMONIALS_PER_PAGE)
  const currentTestimonials = testimonials.slice(
    testimonialPage * TESTIMONIALS_PER_PAGE,
    testimonialPage * TESTIMONIALS_PER_PAGE + TESTIMONIALS_PER_PAGE,
  )

  return (
    <div className="bg-black text-white">
      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section className="relative min-h-[85vh] flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/home1.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />
        <motion.div
          className="relative z-10 max-w-3xl lg:px-16 px-4 pb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-[11px] montserrat-bold hausba-orange tracking-[0.4em] uppercase mb-4">
            #HausbaCares
          </p>
          <h1 className="text-4xl md:text-5xl montserrat-regular leading-[1.15] mb-2">
            Keep Your Systems
          </h1>
          <h1 className="text-4xl md:text-5xl montserrat-bold leading-[1.15] mb-6">
            Performing at Their Best
          </h1>
          <p className="text-sm montserrat-regular text-gray-300 max-w-md mb-8">
            Hausba's Maintenance Support Plans provide proactive system monitoring, preventive
            routine service, and priority technical support to ensure reliability, efficiency, and
            peace of mind.
          </p>
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
            Send Us a WhatsApp
          </Link>
        </motion.div>
      </section>

      {/* ── INTRO STATEMENT ──────────────────────────────────────────── */}
      <section className="pt-24 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-[11px] montserrat-bold hausba-orange tracking-[0.4em] uppercase mb-6">
            WHY IT MATTERS
          </p>
          <h2 className="text-3xl md:text-4xl montserrat-bold leading-snug text-white">
            AV system is a living
            <br />
            system. It deserves ongoing care.
          </h2>
        </div>
      </section>

      {/* ── FEATURE CARDS ────────────────────────────────────────────── */}
      <section className="pb-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-gray-800">
          {FEATURES.map((feature, i) => (
            <div
              key={feature.title}
              className={`p-8 ${i > 0 ? 'sm:border-l lg:border-l' : ''} ${
                i >= 2 ? 'border-t sm:border-t-0' : ''
              } border-gray-800`}
            >
              <div className="hausba-orange mb-6">{feature.icon}</div>
              <h3 className="text-base montserrat-bold text-white mb-3 leading-snug">
                {feature.title}
              </h3>
              <p className="text-sm montserrat-regular text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── PLANS ────────────────────────────────────────────────────── */}
      <section className="pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between flex-wrap gap-6 mb-12">
            <div>
              <p className="text-[11px] montserrat-bold hausba-orange tracking-[0.25em] uppercase mb-4">
                SERVICE PLANS
              </p>
              <h2 className="text-2xl md:text-3xl montserrat-bold text-white">
                Choose the level of care that fits.
              </h2>
            </div>

            {hasBothTypes && (
              <div className="relative flex border border-gray-700 rounded-full p-1">
                {['residential', 'commercial'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setActivePlanTab(type)}
                    className={`relative z-10 px-6 py-2 rounded-full text-[11px] montserrat-bold uppercase tracking-widest transition-colors duration-300 cursor-pointer
                ${activePlanTab === type ? 'text-white' : 'text-gray-500 hover:text-white'}`}
                  >
                    {activePlanTab === type && (
                      <motion.span
                        layoutId="plan-pill"
                        className="absolute inset-0 bg-[#3A3A3A] rounded-full"
                        transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                      />
                    )}
                    <span className="relative z-10">{type}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 border border-gray-800 rounded-lg overflow-hidden">
            {filteredPlans.map((plan, i) => {
              const CardWrapper = plan.ctaLink ? Link : 'div'
              const wrapperProps = plan.ctaLink
                ? { href: plan.ctaLink, target: '_blank', rel: 'noopener noreferrer' }
                : {}

              return (
                <CardWrapper
                  key={plan.id}
                  {...wrapperProps}
                  className={`relative p-8 flex flex-col ${
                    plan.ctaLink
                      ? 'cursor-pointer transition-colors duration-300 hover:bg-white/5'
                      : ''
                  } ${i > 0 ? 'md:border-l border-gray-800' : ''} ${
                    plan.highlighted ? 'bg-[#2A2A2A] border border-[#FF7800] rounded-lg -m-px' : ''
                  }`}
                >
                  {plan.highlighted && plan.highlightLabel && (
                    <span className="absolute top-6 right-6 text-[9px] montserrat-bold uppercase tracking-widest text-white bg-[#FF7800] px-3 py-1 rounded-md">
                      {plan.highlightLabel}
                    </span>
                  )}

                  {plan.tierLabel && (
                    <p className="text-[10px] montserrat-bold text-gray-500 uppercase tracking-widest mb-3">
                      {plan.tierLabel}
                    </p>
                  )}
                  <h3 className="text-lg montserrat-bold text-white mb-2">{plan.name}</h3>
                  {plan.tagline && (
                    <p className="text-xs montserrat-regular text-gray-400 mb-6">{plan.tagline}</p>
                  )}

                  <div className="border-t border-gray-800 mb-6" />

                  <ul className="space-y-4 flex-1">
                    {plan.features?.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-xs montserrat-regular text-gray-300"
                      >
                        <span className="text-[#FF7800] mt-0.5">✓</span>
                        <span>{feature.text}</span>
                      </li>
                    ))}
                  </ul>
                </CardWrapper>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── MID CTA ──────────────────────────────────────────────────── */}
      <section className="pb-28 px-6 text-center">
        <Link
          href="https://wa.me/+2348100999555"
          target="_blank"
          className="inline-block px-10 py-4 rounded-full bg-white text-black! text-[11px] montserrat-bold uppercase tracking-[0.2em] hover:bg-gray-200 transition-colors duration-300"
        >
          Chat With Us on WhatsApp
        </Link>
        <p className="text-xs montserrat-regular text-gray-100 mt-4">
          Customised plans available on demand.
        </p>
      </section>

      {/* ── #HAUSBACARES ─────────────────────────────────────────────── */}
      <section className="pb-28 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl text-gray-300 md:text-4xl montserrat-bold mb-6">#HausbaCares</h2>
          <p className="text-sm montserrat-regular text-white leading-relaxed">
            Every Hausba space is built to be lived in and looked after. Our care doesn't end at
            handover — it begins there. We stay close, so your home keeps feeling effortless, year
            after year.
          </p>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────── */}
      {testimonials.length > 0 && (
        <section className="pb-28 px-6">
          <div className="max-w-7xl mx-auto text-left">
            <p className="text-[11px] montserrat-bold hausba-orange tracking-[0.25em] uppercase mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FF7800] inline-block" />
              CLIENT WORDS
            </p>
            <h2 className="text-2xl md:text-3xl montserrat-bold mb-12">
              Cared for, long after handover.
            </h2>

            <div className="relative overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={testimonialPage}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="grid grid-cols-1 md:grid-cols-3 gap-4"
                >
                  {currentTestimonials.map((testimonial) => (
                    <div
                      key={testimonial.id}
                      className="border border-gray-800 rounded-lg p-6 flex flex-col"
                    >
                      <p className="text-xs montserrat-regular text-gray-300 leading-relaxed mb-6 flex-1">
                        "{testimonial.testimony}"
                      </p>
                      <p className="text-[10px] montserrat-bold text-white uppercase tracking-widest">
                        {testimonial.name}
                      </p>
                      <p className="text-[10px] montserrat-bold hausba-orange uppercase tracking-widest">
                        {testimonial.company && ` — ${testimonial.company}`}
                      </p>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {totalTestimonialPages > 1 && (
              <div className="flex items-center gap-6 mt-10">
                <button
                  onClick={() =>
                    setTestimonialPage(
                      (p) => (p - 1 + totalTestimonialPages) % totalTestimonialPages,
                    )
                  }
                  className="w-9 h-9 flex items-center justify-center rounded-md border border-gray-700 text-gray-400 hover:text-white hover:border-[#FF7800] transition-colors cursor-pointer"
                  aria-label="Previous testimonials"
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

                <div className="flex gap-2">
                  {Array.from({ length: totalTestimonialPages }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setTestimonialPage(i)}
                      className={`w-1.5 h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                        i === testimonialPage ? 'bg-[#FF7800] w-4' : 'bg-gray-700'
                      }`}
                      aria-label={`Go to testimonials page ${i + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={() => setTestimonialPage((p) => (p + 1) % totalTestimonialPages)}
                  className="w-9 h-9 flex items-center justify-center rounded-md border border-gray-700 text-gray-400 hover:text-white hover:border-[#FF7800] transition-colors cursor-pointer"
                  aria-label="Next testimonials"
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

      {/* ── FAQ ──────────────────────────────────────────────────────── */}
      {faqs.length > 0 && (
        <section className="pb-28 px-6">
          <div className="max-w-3xl mx-auto">
            <p className="text-[11px] montserrat-bold hausba-orange tracking-[0.25em] uppercase mb-4 text-center flex items-center justify-center gap-2">
              FAQ
            </p>
            <h2 className="text-2xl md:text-3xl montserrat-bold text-center mb-12">
              Questions, answered.
            </h2>

            <div>
              {faqs.map((faq, index) => (
                <FaqItem
                  key={faq.id}
                  faq={faq}
                  isOpen={openFaqIndex === index}
                  onToggle={() => setOpenFaqIndex(openFaqIndex === index ? -1 : index)}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
