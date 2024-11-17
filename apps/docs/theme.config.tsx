import React from "react";
import { DocsThemeConfig, useConfig } from "nextra-theme-docs";
import { useRouter } from "next/router";

const config: DocsThemeConfig = {
  head() {
    const config = useConfig();
    const { route, basePath } = useRouter();

    const site = basePath || "https://monicon-docs.vercel.app";

    const description =
      config.frontMatter.description ??
      "Monicon is a icon library for Modern Frameworks";

    const title = config.title + (route === "/" ? "" : " - Monicon");

    const ogImage = `${site}/api/og?text=${title}`;

    return (
      <>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://monicon-docs.vercel.app" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImage} />
        <meta
          name="google-site-verification"
          content="NB5Gz6YQzn4N-x--CS5dS4h0MsbnRgSfrekYnuv9gQs"
        />
        <meta name="twitter:creator" content="@senkanoktay" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />
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
      </>
    );
  },
  logo: <span>Monicon</span>,
  project: {
    link: "https://github.com/oktaysenkan/monicon",
  },
  docsRepositoryBase: "https://github.com/oktaysenkan/monicon",
  footer: {
    content: `MIT ${new Date().getFullYear()} © Monicon`,
  },
};

export default config;
