import Link from 'next/link'
import Image from 'next/image'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'

async function getSolutions() {
  try {
    const payload = await getPayloadHMR({ config: configPromise })
    const solutions = await payload.find({
      collection: 'solutions',
      limit: 100,
      sort: 'title',
    })
    return solutions.docs || []
  } catch (error) {
    console.error('Error fetching solutions:', error)
    return []
  }
}

export default async function Footer() {
  const solutions = await getSolutions()

  // Filter solutions by category and limit to 4 each
  const residential = solutions.filter((s) => s.category === 'residential').slice(0, 4)
  const commercial = solutions.filter((s) => s.category === 'commercial').slice(0, 4)

  const socials = [
    {
      name: 'Facebook',
      icon: '/social/fb.png',
      href: 'https://www.facebook.com/3Dandstlprobables',
    },
    {
      name: 'Instagram',
      icon: '/social/insta.png',
      href: 'https://www.instagram.com/hausbaexperience/',
    },
    { name: 'X', icon: '/social/x.png', href: 'https://x.com/hausba' },
    {
      name: 'LinkedIn',
      icon: '/social/linkedin.png',
      href: 'https://www.linkedin.com/company/hausbaexperience?originalSubdomain=ng',
    },
  ]

  const menu = [
    { label: 'About Us', href: '/about' },
    { label: 'Our Portfolio', href: '/projects' },
    { label: 'Applications', href: '/applications' },
    { label: 'Solutions', href: '/solutions' },
  ]

  const experience = [
    { label: 'Abuja Experience - 49B Agadez Street, Wuse 2 Abuja', href: '/' },
    { label: 'Lagos Experience - 24 Providence Street, Lekki Phase 1, Lagos', href: '/' },
  ]

  return (
    <footer className="bg-gray-100 text-black">
      <div className="max-w-7xl mx-auto px-4">
        {/* NEWSLETTER SECTION */}
        <div className="bg-gray-100 py-20">
          <div className="max-w-7xl mx-auto text-black">
            {/* Heading */}
            <h3 className="text-3xl montserrat-bold mb-4">Stay up to date with our Newsletter</h3>

            {/* Description */}
            <p className="text-sm md:text-sm montserrat-regular mb-8 leading-relaxed lg:w-200">
              Be the first to get informed when we roll out latest products, offers and new
              services.
              <br />
              Your data is kept safe and confidential under our privacy and policy.
              <br />
              <br />
              By subscribing to receive email newsletter, you agree to receive recurring autodialed
              marketing emails to the email address used at opt-in. Email frequency may vary.
            </p>

            {/* Form */}
            <form className="flex flex-col md:flex-row items-center gap-4 md:gap-2">
              {/* Name */}
              <input
                type="text"
                placeholder="Your Name"
                className="flex-1 w-full px-4 py-3 bg-[#E7E6E6] focus:outline-none montserrat-regular"
              />

              {/* Email */}
              <input
                type="email"
                placeholder="Your Email"
                className="flex-1 w-full px-4 py-3 bg-[#E7E6E6] focus:outline-none montserrat-regular"
              />

              {/* Submit Button */}
              <button
                type="submit"
                className="bg-[#FF6F3C] mons text-white font-semibold px-6 montserrat-reular py-3 hover:bg-[#d94d1a] transition"
              >
                SUBSCRIBE
              </button>
            </form>
          </div>
        </div>

        {/* LOGO */}
        <div className="pt-6 pb-8 flex justify-center md:justify-start">
          <Link href="/" className="pb-4">
            <Image
              src="/hausba-logo-bl.png"
              alt="Hausba Logo"
              width={160}
              height={50}
              className="cursor-pointer"
              unoptimized
            />
          </Link>
        </div>

        {/* FOOTER GRID */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-6">
          {/* Menu */}
          <div>
            <h4 className="text-lg montserrat-bold mb-4">Menu</h4>
            <ul className="space-y-2 text-sm">
              {menu.map((item, i) => (
                <li key={i}>
                  <Link href={item.href} className="hover:underline montserrat-regular">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="pt-10">
              <h4 className="text-lg montserrat-bold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="tel:+2348100999555" className="hover:underline montserrat-regular">
                    +234 8100 999 555
                  </Link>
                </li>

                <li>
                  <Link
                    href="mailto:experience@hausba.com"
                    className="hover:underline montserrat-regular"
                  >
                    experience@hausba.com
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Residential Solutions */}
          <div>
            <h4 className="text-lg montserrat-bold mb-4">Residential Solutions</h4>
            <ul className="space-y-2 text-sm">
              {residential.length > 0 ? (
                residential.map((solution) => (
                  <li key={solution.id}>
                    <Link
                      href={`/solutions/${solution.slug}`}
                      className="hover:underline montserrat-regular"
                    >
                      {solution.title}
                    </Link>
                  </li>
                ))
              ) : (
                <li className="text-sm opacity-60 montserrat-regular">No solutions available</li>
              )}
            </ul>
          </div>

          {/* Commercial Solutions */}
          <div>
            <h4 className="text-lg montserrat-bold mb-4">Commercial Solutions</h4>
            <ul className="space-y-2 text-sm">
              {commercial.length > 0 ? (
                commercial.map((solution) => (
                  <li key={solution.id}>
                    <Link
                      href={`/solutions/${solution.slug}`}
                      className="hover:underline montserrat-regular"
                    >
                      {solution.title}
                    </Link>
                  </li>
                ))
              ) : (
                <li className="text-sm opacity-60 montserrat-regular">No solutions available</li>
              )}
            </ul>
          </div>

          {/* Experience Centers */}
          <div>
            <h4 className="text-lg montserrat-bold mb-4">Experience Centers</h4>
            <ul className="space-y-2 text-sm">
              {experience.map((item, i) => (
                <li key={i}>
                  <Link href={item.href} className="hover:underline montserrat-regular">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="lg:flex items-center justify-between max-w-7xl mx-auto pt-2 pb-8">
          {/* Socials */}
          <div className="flex gap-4">
            {socials.map((social) => (
              <Link key={social.name} href={social.href} target="_blank" rel="noopener noreferrer">
                <Image
                  src={social.icon}
                  alt={social.name}
                  width={24}
                  height={24}
                  className="hover:opacity-80 transition-opacity"
                  unoptimized
                />
              </Link>
            ))}
          </div>

          {/* Copyright */}
          <div className="text-sm opacity-60 py-4">
            &copy; {new Date().getFullYear()} Hausba. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}
