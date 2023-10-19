/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3001',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'sel4c-e2-server-49c8146f2364.herokuapp.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig