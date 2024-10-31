import React from "react";
import { DocsThemeConfig, useConfig } from "nextra-theme-docs";
import { useRouter } from "next/router";

const config: DocsThemeConfig = {
  head() {
    const config = useConfig();
    const { route, basePath } = useRouter();

    const site = basePath ?? "https://monicon.vercel.app";

    const description =
      config.frontMatter.description ??
      "Monicon is a icon library for Modern Frameworks";

    const title = config.title + (route === "/" ? "" : " - Monicon");

    const ogImage = `${site}/api/og?text=${config.title}`;

    return (
      <>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://monicon.vercel.app" />
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
        <meta property="twitter:domain" content="monicon.vercel.app" />
        <meta property="twitter:url" content="https://monicon.vercel.app" />
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
