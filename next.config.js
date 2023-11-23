/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
  images: {
    unoptimized: true,
  },
  output: "export",
  reactStrictMode: true,
});

// const withExportImages = require("next-export-optimize-images");
// module.exports = withExportImages({
//   output: "export",
//   reactStrictMode: true,
// });
