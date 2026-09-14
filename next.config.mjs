/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  distDir:
    process.env.CHECKOUT_LOCAL_TEST === "true" &&
    process.env.NODE_ENV !== "production"
      ? ".next-test"
      : ".next",
  poweredByHeader: false,
  images: {
    formats: ["image/webp"],
    deviceSizes: [320, 375, 430, 640, 768, 1024, 1280],
    imageSizes: [160, 220, 360],
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "devergetenvader.com" }],
        destination: "https://www.devergetenvader.com/:path*",
        statusCode: 301,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
      {
        source: "/bestelling/:path*",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
          { key: "Referrer-Policy", value: "no-referrer" },
          { key: "Cache-Control", value: "private, no-store" },
        ],
      },
      {
        source: "/api/:path*",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
          { key: "Cache-Control", value: "private, no-store" },
        ],
      },
    ];
  },
};
export default nextConfig;
