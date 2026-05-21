/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
    domains: ['images.unsplash.com', 'upload.wikimedia.org', 'm.media-amazon.com'],
  },
};

module.exports = nextConfig;
