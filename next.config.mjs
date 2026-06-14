/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/about",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
