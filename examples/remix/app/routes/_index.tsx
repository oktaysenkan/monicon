import type { MetaFunction } from "@remix-run/node";

import HomeIcon from "~/components/icons/mdi/home";
import BadgeCheckIcon from "~/components/icons/lucide/badge-check";
import CloudDownloadIcon from "~/components/icons/lucide/cloud-download";
import AccountIcon from "~/components/icons/mdi/account";
import ApacheLogo from "~/components/icons/logos/apache";
import AtomIcon from "~/components/icons/logos/atom-icon";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="flex h-screen items-center justify-center gap-4">
      <ApacheLogo className="size-10" />
      <BadgeCheckIcon className="size-10" />
      <CloudDownloadIcon className="size-10" />
      <AccountIcon className="size-10" />
      <HomeIcon className="size-10" />
      <AtomIcon className="size-10" />
    </div>
  );
}
