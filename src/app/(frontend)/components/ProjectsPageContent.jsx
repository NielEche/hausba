'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function ProjectsPageContent({ projects = [] }) {
  const [activeTab, setActiveTab] = useState('all')

  // Filter projects by type
  const filteredProjects =
    activeTab === 'all' ? projects : projects.filter((project) => project.type === activeTab)

  return (
    <div className="min-h-screen bg-white">
      {/* HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/home1.jpg"
            alt="Our Projects"
            fill
            className="object-cover"
            priority
            unoptimized
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/60" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center text-white px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl lg:text-5xl montserrat-bold leading-tight mb-4">
              Some of Our Works
              <br />
              and Case Studies for
              <br />
              Clients
            </h1>
          </motion.div>
        </div>
      </section>

      {/* TABS SECTION */}
      <section className="bg-white px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center gap-4 flex-wrap">
            <button
              onClick={() => setActiveTab('all')}
              className={`
                px-8 py-3 text-sm montserrat-regular border transition-all duration-300 cursor-pointer
                ${
                  activeTab === 'all'
                    ? 'hausba-orange-bg hausba-orange-border text-white'
                    : 'border-gray-300 text-gray-700 hover:border-[#ff6f3c]'
                }
              `}
            >
              ALL
            </button>
            <button
              onClick={() => setActiveTab('residential')}
              className={`
                px-8 py-3 text-sm montserrat-regular border transition-all duration-300 cursor-pointer
                ${
                  activeTab === 'residential'
                    ? 'hausba-orange-bg hausba-orange-border text-white'
                    : 'border-gray-300 text-gray-700 hover:border-[#ff6f3c]'
                }
              `}
            >
              Residential
            </button>
            <button
              onClick={() => setActiveTab('commercial')}
              className={`
                px-8 py-3 text-sm montserrat-regular border transition-all duration-300 cursor-pointer
                ${
                  activeTab === 'commercial'
                    ? 'hausba-orange-bg hausba-orange-border text-white'
                    : 'border-gray-300 text-gray-700 hover:border-[#ff6f3c]'
                }
              `}
            >
              Commercial
            </button>
          </div>
        </div>
      </section>

      {/* PROJECTS GRID */}
      <section className="bg-white px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <Link key={project.id} href={`/projects/${project.slug}`}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8 }}
                  className="relative h-[400px] overflow-hidden group cursor-pointer"
                >
                  {/* Background Image */}
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{
                      backgroundImage: project.coverImage?.url
                        ? `url(${project.coverImage.url})`
                        : "url('/home1.jpg')",
                    }}
                  />

                  {/* Dark Overlay */}
                  <div className="absolute inset-0 bg-black/40 transition-opacity duration-300" />

                  {/* Orange Gradient on Hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: 'linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, transparent 60%)',
                    }}
                  />

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-10 text-white">
                    {/* Tags */}
                    {project.tags && project.tags.length > 0 && (
                      <div className="flex gap-2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-xs montserrat-regular uppercase tracking-wider bg-white/20 px-2 py-1">
                          [ {project.tags[0].tag} ]
                        </span>
                      </div>
                    )}

                    <h3 className="text-xl montserrat-bold mb-2">{project.title}</h3>

                    {project.location && (
                      <p className="text-sm montserrat-regular opacity-90">{project.location}</p>
                    )}
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>

          {/* No Projects Message */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500 montserrat-regular">
                No projects found in this category.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
