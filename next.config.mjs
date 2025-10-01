import { EventEmitter } from 'events'

// Increase the max listeners globally
EventEmitter.defaultMaxListeners = 20 // default 10

/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: true,
  output: 'export', //'standalone', //'export',
  basePath: '/siwi',
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
