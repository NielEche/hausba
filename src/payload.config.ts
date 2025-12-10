import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Applications } from './collections/Applications'
import { Solutions } from './collections/Solutions'
import { Testimonials } from './collections/Testimonials'
import { Brands } from './collections/Brands'
import { Awards } from './collections/Awards'

import { uploadthingStorage } from '@payloadcms/storage-uploadthing'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Applications, Solutions, Testimonials, Brands, Awards],
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
  ],
  // Debug logging to verify token is loaded
  onInit: async (payload) => {
    payload.logger.info('🔍 UploadThing Token Present:', !!process.env.UPLOADTHING_TOKEN)
    payload.logger.info('🔍 Token Length:', process.env.UPLOADTHING_TOKEN?.length)
    payload.logger.info('🔍 Token First 10 chars:', process.env.UPLOADTHING_TOKEN?.substring(0, 10))
  },
})
