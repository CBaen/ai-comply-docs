import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const withMDX = createMDX({
  // MDX options — remark/rehype plugins can go here later
});

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
};

export default withMDX(nextConfig);
