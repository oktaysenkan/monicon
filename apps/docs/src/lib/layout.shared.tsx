import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { BookIcon } from "lucide-react";
import Image from "next/image";

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: <Image src="/logo.svg" alt="Monicon" width={30} height={30} />,
    },
    links: [
      {
        icon: <BookIcon />,
        text: "v1 Documentation",
        url: "https://v1.monicon.dev",
        external: true,
        on: "menu",
        description: "Documentation for Monicon v1",
      },
    ],
    githubUrl: "https://github.com/oktaysenkan/monicon",
  };
}
