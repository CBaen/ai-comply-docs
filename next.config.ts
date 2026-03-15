import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const withMDX = createMDX({
  // MDX options — remark/rehype plugins can go here later
});

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
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
    ];
  },
};

export default withMDX(nextConfig);
