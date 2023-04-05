// eslint-disable-next-line @typescript-eslint/no-var-requires
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})
// https://nextjs.org/docs/api-reference/next.config.js/redirects

const environment = process.env.NODE_ENV || 'development'
const isDev = environment === 'development'
const repository = "juny-blog";
module.exports = withBundleAnalyzer({
  staticPageGenerationTimeout: 300,
  // assetPrefix: `/${repo}/`,
  // basePath: `/${repo}`,

  // basePath: !debug ? `/${repository}/` : "",
  assetPrefix: !isDev ? `/${repository}/` : "",
  async redirects () {

    return !isDev
      ? [
        {
          source : "/:path((?!juny-blog/)*)",
          destination : "/juny-blog/:path*",
          permanent : true,

        }
      ]
      : []

  },
  // trailingSlash:true,
  images: {
    domains: [
      'www.notion.so',
      'notion.so',
      'images.unsplash.com',
      'pbs.twimg.com',
      'abs.twimg.com',
      's3.us-west-2.amazonaws.com',
      'transitivebullsh.it'
    ],
    formats: ['image/avif', 'image/webp'],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    unoptimized : true
  }
})
