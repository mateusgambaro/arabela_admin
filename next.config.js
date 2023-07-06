/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages: ['@nivo'],
  experimental: { esmExternals: 'loose' }
}

const withImages = require('next-images')

module.exports = withImages({ esModule: true })

module.exports = nextConfig
