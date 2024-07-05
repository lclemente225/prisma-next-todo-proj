/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental:{
        serverActions: true
    },
   /*  async rewrites() {
        return [
          {
            source: '/lib/:path*',
            destination: '/api/:path*', // Proxy requests to /api
          },
        ]
      }, */
}

module.exports = nextConfig
