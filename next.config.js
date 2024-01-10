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
        destination: '/personal-area',
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
  env: {
    GIT_INFO: process.env.GIT_INFO,
    BACKEND_PORT: process.env.BACKEND_PORT,
    BACKEND_DOMAIN: process.env.BACKEND_DOMAIN,
  },
}

module.exports = nextConfig
