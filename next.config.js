/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "localhost",
      "http2.mlstatic.com",
      "i.zst.com.br",
      "you-easy-buy.up.railway.app",
    ],
  },
  env: {
    API_URL: process.env.API_URL,
  },
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;
