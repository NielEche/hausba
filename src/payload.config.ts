import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { uploadthingStorage } from '@payloadcms/storage-uploadthing'
import { buildConfig } from 'payload'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Applications } from './collections/Applications'
import { Awards } from './collections/Awards'
import { Brands } from './collections/Brands'
import { Faqs } from './collections/Faqs'
import { Media } from './collections/Media'
import { Projects } from './collections/Projects'
import { ServicePlans } from './collections/ServicePlans'
import { Solutions } from './collections/Solutions'
import { Testimonials } from './collections/Testimonials'
import { Users } from './collections/Users'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { HomepageSEO } from './globals/HomepageSEO'
import { AboutSEO } from './globals/AboutSEO'
import { MaintenanceSEO } from './globals/MaintenanceSEO'
import { ProjectsSEO } from './globals/ProjectsSEO'
import { SolutionsSEO } from './globals/SolutionsSEO'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    Media,
    Applications,
    Solutions,
    Testimonials,
    Brands,
    Awards,
    Projects,
    ServicePlans,
    Faqs,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
  globals: [HomepageSEO, AboutSEO, MaintenanceSEO, ProjectsSEO, SolutionsSEO],
  plugins: [
    uploadthingStorage({
      collections: {
        media: true,
      },
      options: {
        token: process.env.UPLOADTHING_TOKEN,
        acl: 'public-read',
      },
    }),
   seoPlugin({
  collections: ['projects', 'solutions', 'applications'],
  globals: ['homepage-seo', 'about-seo', 'maintenance-seo', 'projects-seo', 'solutions-seo'],
  uploadsCollection: 'media',
  tabbedUI: false,
  generateTitle: ({ doc }) => `${doc?.title || 'HAUSBA'} | HAUSBA`,
  generateDescription: ({ doc }) => doc?.excerpt || doc?.description || '',
  fields: ({ defaultFields }) => [
    ...defaultFields,
    {
      name: 'primaryKeywords',
      type: 'text',
      label: 'Primary Keywords',
      admin: {
        description: 'Comma-separated main search terms this page should rank for.',
      },
    },
    {
      name: 'secondaryKeywords',
      type: 'text',
      label: 'Secondary Keywords',
      admin: {
        description: 'Comma-separated supporting terms that broaden reach.',
      },
    },
  ],
}),
  ],
  // Debug logging to verify token is loaded — safe to remove once confirmed working.
  onInit: async (payload) => {
    payload.logger.info(`🔍 UploadThing Token Present: ${!!process.env.UPLOADTHING_TOKEN}`)
    payload.logger.info(`🔍 Token Length: ${process.env.UPLOADTHING_TOKEN?.length}`)
    payload.logger.info(
      `🔍 Token First 10 chars: ${process.env.UPLOADTHING_TOKEN?.substring(0, 10)}`,
    )
  },
})
