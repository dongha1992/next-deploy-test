/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXT_PUBLIC_JWT_SECRET_KEY: process.env.NEXT_PUBLIC_JWT_SECRET_KEY,
    NAVER_CLIENT_ID: process.env.NAVER_CLIENT_ID,
    NAVER_CLIENT_SECRET: process.env.NAVER_CLIENT_SECRET,
  },
  images: {
    domains: ["lh3.googleusercontent.com", "shopping-phinf.pstatic.net"],
  },
  async rewrites() {
    return [
      {
        destination: "https://openapi.naver.com/v1/search/book.json",
        source: "/v1/search/book.json",
      },
    ];
  },
};

module.exports = nextConfig;
