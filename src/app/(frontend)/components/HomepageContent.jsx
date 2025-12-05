'use client'

export default function HomepageContent() {
  return (
    <div className="text-white">
      {/* HERO SECTION */}
      <div className="h-screen relative flex items-center justify-center text-center">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/home1.jpg')" }}
        />

        {/* Black Overlay */}
        <div className="absolute inset-0 bg-black opacity-50"></div>

        {/* Centered Content */}
        <div className="relative z-10 px-4">
          <h1 className="text-4xl md:text-5xl montserrat-bold  leading-tight mx-auto max-w-[950px]">
            Crafting personalised luxury experiences
          </h1>

          <h3 className="mt-4 text-lg md:text-xl montserrat-regular opacity-90 font-semibold hausba-orange">
            Since 2010
          </h3>
        </div>
      </div>
    </div>
  )
}
