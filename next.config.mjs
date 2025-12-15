import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Custom webpack aliasing for Payload/TS support
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }
    return webpackConfig
  },

  // Prevent Next.js from bundling these server packages
  serverExternalPackages: ['pino', 'thread-stream'],

  // Standard Next.js image config
  images: {
    loader: 'default',
    unoptimized: false, // Keep optimization enabled (works for remote/CMS images)
    domains: ['utfs.io'],
  },
}

export default withPayload(nextConfig, {
  devBundleServerPackages: false,
  disableNextImageOptimization: false,
})  
