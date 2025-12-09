import { withPayload } from '@payloadcms/next/withPayload';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // ... (existing webpack config) ...
  webpack: (webpackConfig) => {
    // ... (existing extensionAlias config) ...
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    };

    return webpackConfig;
  },

  // 👇 UPDATE THIS SECTION 👇
  // Remove the 'experimental' wrapper and use the new top-level key
  serverExternalPackages: ['pino', 'thread-stream'],
  // 👆 UPDATED SECTION 👆
};

export default withPayload(nextConfig, { devBundleServerPackages: false });
