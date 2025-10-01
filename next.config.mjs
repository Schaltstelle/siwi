import { EventEmitter } from 'events'

// Increase the max listeners globally
EventEmitter.defaultMaxListeners = 20 // default 10

const isGH = process.env.GITHUB_ACTIONS === 'true'
const repo = 'siwi'

/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: true,
  output: 'export', //'standalone', //'export',
  // For GH project pages:
  basePath: isGH ? `/${repo}` : '',
  assetPrefix: isGH ? `/${repo}/` : '',
  env: {
    NEXT_PUBLIC_BASE_PATH: isGH ? `/${repo}` : '',
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    unoptimized: true, // GitHub Pages can't optimize images on the fly
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*',
      },
    ],
  },
}
export default nextConfig
