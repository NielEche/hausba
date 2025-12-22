'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [scrollingUp, setScrollingUp] = useState(false)
  const [logoColor, setLogoColor] = useState('white')

  const detectBackground = () => {
    // Check if page has data-header-theme attribute
    const pageElement = document.querySelector('[data-header-theme]')
    if (pageElement) {
      const theme = pageElement.getAttribute('data-header-theme')
      if (theme === 'dark') {
        setLogoColor('white')
        return
      } else if (theme === 'light') {
        setLogoColor('black')
        return
      }
    }

    // Temporarily hide header to detect what's behind it
    const header = document.querySelector('header')
    if (!header) {
      setLogoColor('white') // Default to white if no header found
      return
    }

    const originalPointerEvents = header.style.pointerEvents
    header.style.pointerEvents = 'none'

    // Check center of where logo would be
    const logoX = 100
    const logoY = 40

    const element = document.elementFromPoint(logoX, logoY)

    // Restore header
    header.style.pointerEvents = originalPointerEvents

    if (element) {
      // Get the actual background color by checking element and parents
      let bgColor = null
      let current = element
      let attempts = 0

      while (current && attempts < 15) {
        const styles = window.getComputedStyle(current)
        const bg = styles.backgroundColor

        if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') {
          bgColor = bg
          break
        }

        current = current.parentElement
        attempts++
      }

      if (bgColor) {
        const rgb = bgColor.match(/\d+/g)
        if (rgb && rgb.length >= 3) {
          const r = parseInt(rgb[0])
          const g = parseInt(rgb[1])
          const b = parseInt(rgb[2])

          // Calculate perceived brightness
          const brightness = (r * 299 + g * 587 + b * 114) / 1000

          // If background is dark (brightness < 128), use white logo
          // If background is light (brightness >= 128), use black logo
          setLogoColor(brightness < 128 ? 'white' : 'black')
        } else {
          setLogoColor('white') // Default to white if can't parse color
        }
      } else {
        setLogoColor('white') // Default to white if no background color found
      }
    } else {
      setLogoColor('white') // Default to white if no element found
    }
  }

  useEffect(() => {
    // Immediate detection on mount
    detectBackground()

    // Multiple detection attempts to handle async rendering
    const timeouts = [50, 100, 200, 500, 1000].map((delay) => setTimeout(detectBackground, delay))

    const handleScroll = () => {
      const currentScrollY = window.scrollY

      const isScrollingUp = currentScrollY < lastScrollY
      setScrollingUp(isScrollingUp)

      const shouldHideMenu = currentScrollY > window.innerHeight - 100 && !isScrollingUp
      setScrolled(shouldHideMenu)

      detectBackground()
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', detectBackground, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', detectBackground)
      timeouts.forEach((timeout) => clearTimeout(timeout))
    }
  }, [lastScrollY])

  // Additional effect to detect on pathname change
  useEffect(() => {
    detectBackground()

    const timeouts = [50, 100, 200].map((delay) => setTimeout(detectBackground, delay))

    return () => {
      timeouts.forEach((timeout) => clearTimeout(timeout))
    }
  }, [pathname])

  const navItems = [
    { label: 'ABOUT US', href: '/about' },
    { label: 'SOLUTIONS', href: '/solutions' },
    { label: 'OUR WORK', href: '/projects' },
    { label: 'ESTIMATOR', href: '/estimator' },
    { label: 'SCHEDULE CONSULTATION', href: '/schedule' },
  ]

  const logoSrc = logoColor === 'white' ? '/hausba-logo-wh.png' : '/hausba-logo-bl.png'

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full fixed top-0 left-0 z-50"
      >
        <div className="max-w-full mx-auto flex items-center justify-between">
          {/* LOGO */}
          <Link href="/" className="px-6">
            <Image
              src={logoSrc}
              alt="Hausba Logo"
              width={160}
              height={50}
              className="cursor-pointer"
              key={logoSrc}
              unoptimized
            />
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex text-xs bg-black backdrop-blur-md montserrat-regular">
            {navItems.map((item, index) => {
              const isActive = pathname === item.href

              return (
                <motion.div
                  key={item.href}
                  initial={false}
                  animate={
                    scrolled
                      ? {
                          width: 0,
                          opacity: 0,
                          paddingLeft: 0,
                          paddingRight: 0,
                        }
                      : {
                          width: 'auto',
                          opacity: 1,
                        }
                  }
                  transition={{
                    duration: 0.3,
                    delay: scrolled ? (navItems.length - index - 1) * 0.05 : index * 0.05,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                  style={{ overflow: 'hidden' }}
                >
                  <Link
                    href={item.href}
                    className="relative border-r p-6 overflow-hidden group whitespace-nowrap block"
                    style={{ borderColor: '#2B2B2B' }}
                  >
                    <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                      {item.label}
                    </span>

                    {isActive && (
                      <span
                        className="
                          relative z-10 ml-3
                          text-[#9CA3AF]
                          group-hover:text-white
                          transition-colors duration-300
                        "
                      >
                        +
                      </span>
                    )}

                    <div className="absolute inset-0 bg-[#FF7800] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" />
                  </Link>
                </motion.div>
              )
            })}

            {/* HAMBURGER AS LAST NAV ITEM */}
            <button
              onClick={() => setOpen(!open)}
              className="relative p-6 border-r cursor-pointer overflow-hidden group"
              style={{ borderColor: '#2B2B2B' }}
              aria-label="Toggle menu"
            >
              <div className="flex flex-col gap-1 w-10 relative z-10">
                <motion.span
                  className="block w-full h-0.5 bg-white"
                  animate={open ? { rotate: 45, y: 3 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                />
                <motion.span
                  className="block w-full h-0.5 bg-white"
                  animate={open ? { opacity: 0 } : { opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  className="block w-full h-0.5 bg-white"
                  animate={open ? { rotate: -45, y: -3 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                />
              </div>

              <div className="absolute inset-0 bg-[#FF7800] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" />
            </button>
          </nav>

          {/* MOBILE MENU BUTTON */}
          <button className="md:hidden pr-6 py-4 cursor-pointer" onClick={() => setOpen(!open)}>
            <div className="flex flex-col gap-1">
              <motion.span
                className="block w-10 h-0.5 bg-white"
                animate={open ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="block w-10 h-0.5 bg-white"
                animate={open ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="block w-10 h-0.5 bg-white"
                animate={open ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </button>
        </div>
      </motion.header>

      {/* MODERN SLIDE-DOWN MENU */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-40"
              onClick={() => setOpen(false)}
            />

            <motion.div
              initial={{ y: '-100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '-100%', opacity: 0 }}
              transition={{
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="fixed inset-0 z-50 bg-gradient-to-b from-black via-black to-black/95 overflow-y-auto"
            >
              <div className="min-h-full flex flex-col">
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="absolute top-8 left-8"
                >
                  <Link href="/" onClick={() => setOpen(false)}>
                    <Image
                      src="/hausba-logo-wh.png"
                      alt="Hausba Logo"
                      width={160}
                      height={50}
                      className="cursor-pointer"
                      unoptimized
                    />
                  </Link>
                </motion.div>

                <motion.button
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  onClick={() => setOpen(false)}
                  className="absolute top-8 right-8 flex items-center gap-3 group cursor-pointer"
                >
                  <span className="text-white text-xs montserrat-regular tracking-wider">
                    CLOSE
                  </span>
                  <div className="w-8 h-8 transition-colors duration-300 flex items-center justify-center">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      className="text-white transition-colors duration-300"
                    >
                      <path
                        d="M1 1L11 11M1 11L11 1"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="square"
                      />
                    </svg>
                  </div>
                </motion.button>

                <div className="px-12 px-6 pt-32 pb-16 flex-1">
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {navItems.map((item, index) => {
                      const isActive = pathname === item.href

                      return (
                        <motion.div
                          key={item.href}
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 20 }}
                          transition={{
                            duration: 0.4,
                            delay: 0.1 + index * 0.06,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                        >
                          <Link
                            href={item.href}
                            onClick={() => setOpen(false)}
                            className="group block relative overflow-hidden"
                          >
                            <div className="border border-[#2B2B2B] p-8 relative z-10 transition-all duration-300 group-hover:border-[#FF7800]">
                              <span className="text-white text-sm montserrat-regular block mb-2">
                                {item.label}
                              </span>
                              <motion.div
                                className="h-0.5 bg-[#FF7800] origin-left"
                                initial={{ scaleX: 0 }}
                                whileHover={{ scaleX: 1 }}
                                transition={{ duration: 0.3 }}
                              />
                            </div>

                            {isActive && (
                              <span className="absolute right-6 top-6 text-[#FF7800] text-2xl z-20">
                                +
                              </span>
                            )}

                            <motion.div
                              className="absolute inset-0 bg-gradient-to-br from-[#FF7800]/10 to-transparent opacity-0 group-hover:opacity-100"
                              transition={{ duration: 0.4 }}
                            />
                          </Link>
                        </motion.div>
                      )
                    })}

                    {/* CONTACT BOX */}
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{
                        duration: 0.4,
                        delay: 0.1 + navItems.length * 0.06,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="border border-[#2B2B2B] p-8 relative overflow-hidden"
                    >
                      <h3 className="text-white text-sm montserrat-bold mb-6">GET IN TOUCH</h3>

                      {/* Contact Info */}
                      <div className="space-y-4 mb-6">
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

                      {/* Social Media Icons */}
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
                            width={24}
                            height={24}
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
                            width={24}
                            height={24}
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
                            width={24}
                            height={24}
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
                            width={24}
                            height={24}
                            className="filter invert"
                            unoptimized
                          />
                        </a>
                      </div>

                      {/* Decorative gradient */}
                      <div className="absolute inset-0 bg-gradient-to-br from-[#FF7800]/5 to-transparent pointer-events-none" />
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    exit={{ scaleX: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mt-12 h-px bg-gradient-to-r from-transparent via-[#FF7800] to-transparent"
                  />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
