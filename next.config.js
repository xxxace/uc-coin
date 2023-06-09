/** @type {import('next').NextConfig} */
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    // If you use remark-gfm, you'll need to use next.config.mjs
    // as the package is ESM only
    // https://github.com/remarkjs/remark-gfm#install
    remarkPlugins: [],
    rehypePlugins: [],
    // If you use `MDXProvider`, uncomment the following line.
    providerImportSource: "@mdx-js/react"
  },
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true
  },
  // Configure pageExtensions to include md and mdx
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  // Optionally, add any other Next.js config below
  reactStrictMode: true,
  // webpack: (config, { dev }) => {
  //   // 将 NODE_TLS_REJECT_UNAUTHORIZED 环境变量设置为 0，以禁用 TLS 验证。
  //   if (dev) {
  //     config.node = {
  //       ...config.node,
  //       tls: 'empty',
  //     };

  //     process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
  //   }
  //   return config;
  // }
}

module.exports = withMDX(nextConfig)
