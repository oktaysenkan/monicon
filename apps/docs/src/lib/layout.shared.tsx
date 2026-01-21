import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import Image from "next/image";

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: <Image src="/logo.svg" alt="Monicon" width={30} height={30} />,
    },
    githubUrl: "https://github.com/oktaysenkan/monicon",
  };
}
