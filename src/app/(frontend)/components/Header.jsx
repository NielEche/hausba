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
    { label: 'MAINTENANCE', href: '/maintenance' },
    { label: 'OUR WORK', href: '/projects' },
  ]

  // Nav list used inside the slide-in menu — HOME added at the top
  const menuItems = [{ label: 'HOME', href: '/' }, ...navItems]

  const socialLinks = [
    {
      href: 'https://www.facebook.com/3Dandstlprobables',
      icon: '/social/fb.png',
      alt: 'Hausba on Facebook',
    },
    {
      href: 'https://www.instagram.com/hausbaexperience/',
      icon: '/social/insta.png',
      alt: 'Hausba on Instagram',
    },
    { href: 'https://x.com/hausba', icon: '/social/x.png', alt: 'Hausba on X' },
    {
      href: 'https://www.linkedin.com/company/hausbaexperience?originalSubdomain=ng',
      icon: '/social/linkedin.png',
      alt: 'Hausba on LinkedIn',
    },
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
              src="/hausba-logo-wh.png"
              alt="Hausba — luxury audiovisual and smart home systems, Nigeria"
              width={160}
              height={50}
              className="cursor-pointer"
              key={logoSrc}
              unoptimized
            />
          </Link>

          {/* HAMBURGER MENU BUTTON — same at every screen size */}
          <button
            className="pr-6 py-4 cursor-pointer"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <div className="flex flex-col gap-2.5">
              <motion.span
                className="block w-10 h-0.5 bg-[#FF7800]"
                animate={open ? { rotate: 45, y: 10 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="block w-10 h-0.5 bg-[#FF7800]"
                animate={open ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="block w-10 h-0.5 bg-[#FF7800]"
                animate={open ? { rotate: -45, y: -10 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </button>
        </div>
      </motion.header>

      {/* SLIDE-IN RIGHT MENU */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              onClick={() => setOpen(false)}
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="fixed top-0 right-0 h-full w-full sm:w-[420px] z-50 bg-black flex flex-col"
            >
              {/* Top bar inside panel */}
              <div className="flex items-center justify-end px-8 pt-8 pb-4">
                <button
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 group cursor-pointer"
                >
                  <span className="text-white text-xs montserrat-regular tracking-wider">
                    CLOSE
                  </span>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    className="text-white"
                  >
                    <path
                      d="M1 1L11 11M1 11L11 1"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="square"
                    />
                  </svg>
                </button>
              </div>

              {/* Nav list */}
              <nav className="flex-1 px-8 pt-8 flex flex-col gap-6">
                {menuItems.map((item, index) => {
                  const isActive = pathname === item.href

                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{
                        duration: 0.35,
                        delay: 0.1 + index * 0.05,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="text-white text-lg montserrat-regular hover:text-[#FF7800] transition-colors duration-300"
                      >
                        {item.label}
                        {isActive && <span className="ml-2 text-[#FF7800]">+</span>}
                      </Link>
                    </motion.div>
                  )
                })}
              </nav>

              {/* GET IN TOUCH — pinned to bottom */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="px-8 pb-10 pt-6"
              >
                <h3 className="text-white text-xs montserrat-regular tracking-wider uppercase mb-4">
                  Get in Touch
                </h3>

                <div className="space-y-2 mb-6">
                  <a
                    href="tel:+2348100999555"
                    className="block text-white text-sm montserrat-regular hover:text-[#FF7800] transition-colors"
                  >
                    +234 8100 999 555
                  </a>
                  <a
                    href="mailto:experience@hausba.com"
                    className="block text-white text-sm montserrat-regular hover:text-[#FF7800] transition-colors"
                  >
                    experience@hausba.com
                  </a>
                </div>

                <div className="flex gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.alt}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                    >
                      <Image
                        src={social.icon}
                        alt={social.alt}
                        width={16}
                        height={16}
                        className="filter invert"
                        unoptimized
                      />
                    </a>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
