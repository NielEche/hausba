import Link from 'next/link'
import Image from 'next/image'

const NAV_LINKS = [
  { label: 'About Us', href: '/about' },
  { label: 'Our Portfolio', href: '/projects' },
  { label: 'Maintenance', href: '/maintenance' },
  { label: 'Solutions', href: '/solutions' },
]

const SOLUTIONS_LINKS = [
  { label: 'Audio', href: '/solutions/Audio' },
  { label: 'Lighting', href: '/solutions/lighting' },
  { label: 'Video', href: '/solutions/Video' },
  { label: 'AV Collaboration', href: '/solutions/AV-Collaboration' },
  { label: 'AV Distribution', href: '/solutions/AV-Distribution' },
  { label: 'Security', href: '/solutions/Security' },
  { label: 'Cinema', href: '/solutions/cinema' },
]

const EXPERIENCE_CENTRES = [
  {
    lines: ['Plot 24 Providence Street,', 'Lekki Phase 1, Lagos'],
  },
  {
    lines: [
      'Experience Center - Soundhous,',
      '17 Adeyemo Alakija street,',
      'Victoria island, Lagos',
    ],
  },
]

const SOCIALS = [
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

function TaglineArrow() {
  return (
    <svg width="28" height="8" viewBox="0 0 28 8" fill="none" className="inline-block mx-2">
      <line x1="0" y1="4" x2="22" y2="4" stroke="#FF7800" strokeWidth="1" />
      <path
        d="M19 1L23 4L19 7"
        stroke="#FF7800"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function Footer() {
  return (
    <footer className="w-full">
      {/* ── NEWSLETTER ───────────────────────────────────────────────────── */}
      <div className="bg-white w-full">
        <div className="text-black max-w-7xl mx-auto px-6 pt-24 pb-26">
          <h3 className="text-4xl md:text-5xl leading-tight mb-6">
            <span className="montserrat-regular">Stay ahead of the standard, </span>
            <br className="hidden sm:block" />
            <span className="montserrat-regular">with our </span>
            <span className="montserrat-bold">Newsletter</span>
          </h3>

          <p className="text-sm montserrat-regular text-black leading-relaxed max-w-2xl mb-8">
            Be the first to get informed when we roll out latest products, offers and new services.
            <br />
            Your data is kept safe and confidential under our privacy and policy.
            <br />
            By subscribing to receive email newsletter, you agree to receive recurring autodialed
            marketing emails to the email address used at opt-in. Email frequency may vary.
          </p>

          <form className="flex flex-col sm:flex-row gap-3 max-w-6xl">
            <input
              type="text"
              placeholder="Your Name"
              className="flex-1 bg-[#CCCCCC] border border-gray-900 rounded text-black text-sm montserrat-bold px-4 py-4 focus:outline-none focus:border-gray-500 placeholder-gray-600"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="flex-1 bg-[#CCCCCC] border border-gray-900 rounded text-black text-sm montserrat-bold px-4 py-4 focus:outline-none focus:border-gray-500 placeholder-gray-600"
            />
            <button
              type="submit"
              className="bg-[#FF7800] rounded text-black text-sm montserrat-bold uppercase tracking-widest px-8 py-4 hover:bg-[#e06800] transition-colors duration-300 whitespace-nowrap cursor-pointer"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* ── LINKS GRID ───────────────────────────────────────────────────── */}
      <div className="bg-black  max-w-7xl mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row md:justify-between gap-12 md:gap-24">
          {/* Logo / tagline / contact */}
          <div className="md:w-1/4 md:flex-shrink-0">
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/hausba-logo-wh.png"
                alt="Hausba — luxury audiovisual and smart home systems, Nigeria"
                width={135}
                height={39}
                className="filter"
                unoptimized
              />
            </Link>

            <p className="text-[10px] montserrat-bold text-gray-400 uppercase tracking-widest mb-8 flex items-center">
              Lifestyle
              <TaglineArrow />
              Experience
              <TaglineArrow />
              Technology
            </p>

            <h4 className="text-[11px] montserrat-bold uppercase tracking-widest text-gray-500 mb-4">
              Contact
            </h4>
            <div className="space-y-2 text-sm montserrat-regular text-gray-300">
              <a
                href="https://wa.me/2348100999555"
                className="block hover:text-white transition-colors"
              >
                +2348100999555
              </a>
              <a
                href="mailto:experience@hausba.com"
                className="block hover:text-white transition-colors"
              >
                experience@hausba.com
              </a>
            </div>
          </div>

          {/* Navigate / Solutions / Technology — grouped tighter together */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 md:gap-16">
            {/* Navigate */}
            <div>
              <h4 className="text-[11px] montserrat-bold uppercase tracking-widest text-gray-500 mb-4">
                Navigate
              </h4>
              <ul className="space-y-3 text-sm montserrat-regular text-gray-300">
                {NAV_LINKS.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="hover:text-white transition-colors">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Solutions */}
            <div>
              <h4 className="text-[11px] montserrat-bold uppercase tracking-widest text-gray-500 mb-4">
                Solutions
              </h4>
              <ul className="space-y-3 text-sm montserrat-regular text-gray-300">
                {SOLUTIONS_LINKS.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="hover:text-white transition-colors">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Experience Centres */}
            <div>
              <h4 className="text-[11px] montserrat-bold uppercase tracking-widest text-gray-500 mb-4">
                Technology
              </h4>
              <ul className="space-y-5 text-sm montserrat-regular text-gray-300">
                {EXPERIENCE_CENTRES.map((centre, i) => (
                  <li key={i}>
                    {centre.lines.map((line, j) => (
                      <p key={j} className={j === 0 ? 'text-white montserrat-bold mb-1' : ''}>
                        {line}
                      </p>
                    ))}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* ── BOTTOM BAR ───────────────────────────────────────────────────── */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex gap-4">
            {SOCIALS.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center hover:bg-white transition-colors"
              >
                <Image src={social.icon} alt={social.name} width={16} height={16} unoptimized />
              </a>
            ))}
          </div>

          <p className="text-[11px] montserrat-regular text-gray-500">
            {new Date().getFullYear()} Hausba. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
