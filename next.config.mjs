import path from "node:path";
import { fileURLToPath } from "node:url";

const longCache = [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }];

/** @type {import('next').NextConfig} */
export default {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  turbopack: { root: path.dirname(fileURLToPath(import.meta.url)) },
  images: { formats: ["image/avif", "image/webp"], minimumCacheTTL: 31536000 },
  async headers() {
    return [
      { source: "/projects/:path*", headers: longCache },
      { source: "/cv/:path*", headers: [{ key: "Cache-Control", value: "public, max-age=86400" }] },
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },
};
