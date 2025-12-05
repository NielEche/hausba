'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export default function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const navItems = [
    { label: 'ABOUT US', href: '/about' },
    { label: 'SOLUTIONS', href: '/services' },
    { label: 'OUR WORK', href: '/contact' },
    { label: 'ESTIMATOR', href: '/estimator' },
    { label: 'SCHEDULE CONSULTATION', href: '/schedule' },
  ]

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
              alt="Hausba Logo"
              width={160}
              height={50}
              className="cursor-pointer"
            />
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex text-xs bg-black backdrop-blur-md montserrat-regular">
            {navItems.map((item) => {
              const isActive = pathname === item.href

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative border-r p-6 overflow-hidden group"
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

                  {/* SLIDE UP BACKGROUND */}
                  <div className="absolute inset-0 bg-[#FF7800] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" />
                </Link>
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

              {/* SLIDE UP BACKGROUND */}
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
            {/* BACKDROP */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-40"
              onClick={() => setOpen(false)}
            />

            {/* MENU PANEL */}
            <motion.div
              initial={{ y: '-100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '-100%', opacity: 0 }}
              transition={{
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="fixed top-0 left-0 w-full z-50 bg-gradient-to-b from-black via-black to-black/95"
            >
              {/* LOGO */}
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
                  />
                </Link>
              </motion.div>

              {/* CLOSE BUTTON */}
              <motion.button
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                onClick={() => setOpen(false)}
                className="absolute top-8 right-8 flex items-center gap-3 group cursor-pointer"
              >
                <span className="text-white text-xs montserrat-regular tracking-wider">CLOSE</span>
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

              <div className="max-w-7xl mx-auto px-6 pt-32 pb-16">
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
                </div>

                {/* DECORATIVE ELEMENT */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  exit={{ scaleX: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="mt-12 h-px bg-gradient-to-r from-transparent via-[#FF7800] to-transparent"
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
