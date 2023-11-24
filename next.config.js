/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:3000/:path*',
      },
    ]
  },
  redirects() {
    return [
      {
        source: '/',
        destination: '/work-place',
        permanent: true,
      },
    ]
  },
  images: {
    remotePatterns: [
      // Local url
      {
        protocol: 'http',
        hostname: '192.168.0.245',
      },

      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
}

module.exports = nextConfig
