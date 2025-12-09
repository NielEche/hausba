import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },

  serverExternalPackages: ['pino', 'thread-stream'],

  // 👇 REQUIRED for Next.js <Image> to work inside Payload apps
  images: {
    loader: 'default', // <— force Next.js to use its real image loader
    unoptimized: false, // <— allow optimization (instead of being disabled by Payload)
  },
}

export default withPayload(nextConfig, {
  devBundleServerPackages: false,

  // 👇 REQUIRED for Payload 2.x — prevents Payload from disabling image optimization
  disableNextImageOptimization: false,
})
