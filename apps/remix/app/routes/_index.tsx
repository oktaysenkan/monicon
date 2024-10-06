import Monicon from "@monicon/react";
import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="flex h-screen items-center justify-center">
          <Monicon name="mdi:home" size={32} />
          <Monicon name="mdi:account" />
    </div>
  );
}

