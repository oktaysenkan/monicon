import React from "react";
import { DocsThemeConfig, useConfig } from "nextra-theme-docs";
import { useRouter } from "next/router";

const config: DocsThemeConfig = {
  head() {
    const config = useConfig();
    const { route } = useRouter();

    const description =
      config.frontMatter.description ||
      "Monicon is a icon library for Modern Frameworks";

    const title = config.title + (route === "/" ? "" : " - Monicon");

    return (
      <>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta name="description" content={description} />
        <meta property="og:description" content={description} />
        <meta
          name="google-site-verification"
          content="NB5Gz6YQzn4N-x--CS5dS4h0MsbnRgSfrekYnuv9gQs"
        />
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
