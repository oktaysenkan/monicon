import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/docs/:path*.mdx",
        destination: "/llms.mdx/docs/:path*",
      },
    ];
  },
  redirects() {
    return [
      {
        source: "/installation/react",
        destination: "/docs/installation/react",
        permanent: true,
      },
      {
        source: "/installation/react-rspack",
        destination: "/docs/installation/rspack",
        permanent: true,
      },
      {
        source: "/installation/react-rollup",
        destination: "/docs/installation/rollup",
        permanent: true,
      },
      {
        source: "/installation/react-esbuild",
        destination: "/docs/installation/esbuild",
        permanent: true,
      },
      {
        source: "/installation/react-webpack",
        destination: "/docs/installation/webpack",
        permanent: true,
      },
      {
        source: "/installation/react-native",
        destination: "/docs/installation/react-native",
        permanent: true,
      },
      {
        source: "/installation/nextjs",
        destination: "/docs/installation/nextjs",
        permanent: true,
      },
      {
        source: "/installation/remix",
        destination: "/docs/installation/remix",
        permanent: true,
      },
      {
        source: "/installation/qwik",
        destination: "/docs/installation/qwik",
        permanent: true,
      },
      {
        source: "/installation/vue",
        destination: "/docs/installation/vue",
        permanent: true,
      },
      {
        source: "/installation/nuxt",
        destination: "/docs/installation/nuxt",
        permanent: true,
      },
      {
        source: "/installation/svelte",
        destination: "/docs/installation/svelte",
        permanent: true,
      },

      {
        source: "/customization/custom-loader",
        destination: "/docs/loaders/custom-loader",
        permanent: true,
      },
      {
        source: "/customization/json-collections",
        destination: "/docs/loaders/json-collections",
        permanent: true,
      },
      {
        source: "/customization/local-collections",
        destination: "/docs/loaders/local-collections",
        permanent: true,
      },
      {
        source: "/customization/remote-collections",
        destination: "/docs/loaders/remote-collections",
        permanent: true,
      },
    ];
  },
};

export default withMDX(config);
