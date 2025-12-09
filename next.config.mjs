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

  images: {
    loader: 'imgix', // 👈 force a compatible loader
    path: '/', // 👈 root path
    unoptimized: false, // 👈 keep optimization enabled
  },
}

export default withPayload(nextConfig, {
  devBundleServerPackages: false,
  disableNextImageOptimization: false,
})
