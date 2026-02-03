import Image from 'next/image'

export const revalidate = 60

export default function HomePage() {
  return (
    <main className="bg-black min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-4 py-24 w-full">
        <div
          className="relative border-2 hausba-orange-border overflow-hidden flex items-center justify-center text-center"
          style={{ minHeight: '320px' }}
        >
          {/* Background image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('/estimate.jpg')` }}
          />

          {/* Overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to bottom, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.85) 60%, rgba(0,0,0,0.9) 100%)',
            }}
          />

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center gap-6 px-6 py-16 w-full">
            <div>
              <Image
                src="/hausba-logo-wh.png"
                alt="Hausba Logo"
                width={160}
                height={50}
                className="cursor-pointer"
                unoptimized
              />
            </div>
            <h1 className="text-2xl md:text-4xl montserrat-bold">
              We’re building something great 🚧
            </h1>

            <p className="text-white/80 max-w-xl text-sm md:text-base montserrat-regular">
              Our website is currently under construction. We’re working behind the scenes to
              deliver a premium digital experience.
            </p>

            <p className="text-white/60 text-sm montserrat-regular">
              In the meantime, you can reach us via:
            </p>

            {/* Contact info */}
            <div className="space-y-3">
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

            {/* Social links */}
            <div className="flex gap-4 mt-6">
              <a
                href="https://www.facebook.com/3Dandstlprobables"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-70 transition-opacity"
              >
                <Image
                  src="/social/fb.png"
                  alt="Facebook"
                  width={32}
                  height={32}
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
                  width={32}
                  height={32}
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
                  width={32}
                  height={32}
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
                  width={32}
                  height={32}
                  className="filter invert"
                  unoptimized
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
