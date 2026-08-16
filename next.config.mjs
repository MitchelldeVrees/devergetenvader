/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // The site only has a few kilobytes of CSS. Inlining it removes two
    // render-blocking round trips on a cold mobile connection.
    inlineCss: true,
  },
};

export default nextConfig;
