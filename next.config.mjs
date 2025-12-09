import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // ... (existing webpack config) ...
  webpack: (webpackConfig) => {
    // ... (existing extensionAlias config) ...
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },

  // 👇 KEEP THIS AS IT IS 👇
  serverExternalPackages: ['pino', 'thread-stream'],

  // 👇 ADD THIS BLOCK 👇
  images: {
    unoptimized: false, // enables normal Next.js image optimization
  },
  // 👆 END OF IMAGE FIX 👆
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
