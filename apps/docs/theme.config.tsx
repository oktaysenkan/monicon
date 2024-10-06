import React from "react";
import { DocsThemeConfig } from "nextra-theme-docs";

const config: DocsThemeConfig = {
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
