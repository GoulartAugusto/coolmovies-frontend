/** @type {import('next').NextConfig} */
module.exports = {
  swcMinify: true,
  compiler: {
    emotion: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'images-na.ssl-images-amazon.com',
        port: '',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/graphql',
        destination: 'http://localhost:5001/graphql',
      },
    ];
  },
  reactStrictMode: true,
};
