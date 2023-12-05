/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  rewrites() {
    return [
      {
        source: '/api/:path*',
        destination:
          'http://' +
          process.env.BACKEND_DOMAIN +
          ':' +
          process.env.BACKEND_PORT +
          '/:path*',
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
      {
        protocol: 'http',
        hostname: '192.168.0.245',
      },
    ],
  },
}

module.exports = nextConfig
