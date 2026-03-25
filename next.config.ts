import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const withMDX = createMDX({
  // MDX options — remark/rehype plugins can go here later
});

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com https://www.googletagmanager.com https://www.google-analytics.com",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: blob: https://aicompliancedocuments.com https://www.google-analytics.com",
              "font-src 'self'",
              "connect-src 'self' https://api.stripe.com https://www.google-analytics.com https://analytics.google.com https://region1.google-analytics.com",
              "frame-src https://js.stripe.com",
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join("; "),
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/regulations",
        destination: "/products",
        permanent: true,
      },
      {
        source: "/regulations/:slug",
        destination: "/products/:slug",
        permanent: true,
      },
      {
        source: "/blog/colorado-ai-compliance",
        destination: "/colorado-ai-compliance",
        permanent: true,
      },
    ];
  },
};

export default withMDX(nextConfig);
