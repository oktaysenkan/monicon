import React from "react";
import { DocsThemeConfig, useConfig, useTheme } from "nextra-theme-docs";
import { useRouter } from "next/router";

const config: DocsThemeConfig = {
  banner: {
    key: "v2-release",
    content: (
      <a href="https://monicon.dev" target="_blank" rel="noopener noreferrer">
        🎉 Monicon v2 is now available! Check out the new documentation →
      </a>
    ),
  },
  head() {
    const config = useConfig();
    const { route } = useRouter();

    const description =
      config.frontMatter.description ??
      "Monicon is a icon library for Modern Frameworks";

    const title = config.title + (route === "/" ? "" : " - Monicon");

    return (
      <>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://monicon-docs.vercel.app" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta
          property="og:image"
          content="https://monicon-docs.vercel.app/og-image.png"
        />
        <meta property="og:locale" content="en" />
        <meta
          property="og:logo"
          content="https://monicon-docs.vercel.app/apple-icon-180x180.png"
        />
        <meta name="twitter:creator" content="@senkanoktay" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta
          name="twitter:image"
          content="https://monicon-docs.vercel.app/og-image-twitter.png"
        />
        <meta property="twitter:domain" content="monicon-docs.vercel.app" />
        <meta
          property="twitter:url"
          content="https://monicon-docs.vercel.app"
        />
        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="/apple-icon-57x57.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="/apple-icon-60x60.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="/apple-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/apple-icon-76x76.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="/apple-icon-114x114.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/apple-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="/apple-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/apple-icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-icon-180x180.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/android-icon-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/favicon-96x96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/manifest.json" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="google-site-verification"
          content="NB5Gz6YQzn4N-x--CS5dS4h0MsbnRgSfrekYnuv9gQs"
        />
        <script
          async
          src="https://cdn.seline.so/seline.js"
          data-token="1c09c6616a10952"
        />
      </>
    );
  },
  logo: () => {
    const { resolvedTheme } = useTheme();

    return (
      <svg
        width="48"
        height="48"
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M44 128C62.3333 124 78.8333 122 93.5 122C108.167 122 120.333 122.333 130 123V148C138 141.333 148 135.667 160 131C172 126.333 182.833 124 192.5 124C230.5 124 255.833 133.5 268.5 152.5C276.833 144.5 287.833 137.833 301.5 132.5C315.167 126.833 327.833 124 339.5 124C376.167 124 400.833 132.333 413.5 149C426.167 165.333 432.5 196.167 432.5 241.5V322.5C445.5 327.5 454.667 333.167 460 339.5L455 378H340L335 339.5C339.667 333.167 348.833 327.5 362.5 322.5V223.5C362.5 205.167 360 193 355 187C350 181 340 178 325 178C310.333 178 296.333 183.5 283 194.5C284.667 205.833 285.5 221.5 285.5 241.5V322.5C298.5 327.5 307.667 333.167 313 339.5L308 378H193L188 339.5C192.667 333.167 201.833 327.5 215.5 322.5V223.5C215.5 205.167 213 193 208 187C203 181 193.167 178 178.5 178C163.833 178 149.833 183.333 136.5 194V322.5C149.5 327.5 158.667 333.167 164 339.5L159 378H44L39 339.5C43.6667 333.167 52.8333 327.5 66.5 322.5V183.5C54.8333 179.5 45.6667 173.833 39 166.5L44 128Z"
          fill={resolvedTheme === "dark" ? "#fff" : "#000"}
        />
      </svg>
    );
  },
  project: {
    link: "https://github.com/oktaysenkan/monicon",
  },
  // TODO: Change this after v2 release
  docsRepositoryBase:
    "https://github.com/oktaysenkan/monicon/tree/main/apps/docs",
  footer: {
    content: <p>MIT {new Date().getFullYear()} © Monicon</p>,
  },
};

export default config;
