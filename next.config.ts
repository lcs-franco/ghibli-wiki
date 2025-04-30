import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL('https://image.tmdb.org/t/p/**'),
      new URL('https://www.themoviedb.org/t/p/**'),
    ],
  },
  /* config options here */
}

export default nextConfig
