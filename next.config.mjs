import { withContentlayer } from 'next-contentlayer'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'en.wikipedia.org',
        // port: '',
        // pathname: '',
        // search: '',
      },
    ],
  },
}

export default withContentlayer(nextConfig)
