import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

import ApacheLogo from "~/components/icons/logos/apache";
import BadgeCheckIcon from "~/components/icons/lucide/badge-check";
import CloudDownloadIcon from "~/components/icons/lucide/cloud-download";
import AccountIcon from "~/components/icons/mdi/account";
import HomeIcon from "~/components/icons/mdi/home";
import AtomIcon from "~/components/icons/logos/atom-icon";

export default component$(() => {
  return (
    <div class="home">
      <ApacheLogo color="white" width={50} />
      <BadgeCheckIcon color="white" width={50} />
      <CloudDownloadIcon color="white" width={50} />
      <AccountIcon color="white" width={50} />
      <HomeIcon color="white" width={50} />
      <AtomIcon color="white" width={50} />
    </div>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
