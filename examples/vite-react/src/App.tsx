import LogosActiveCampaignIcon from "./components/icons/logos/active-campaign";
import LogosAtomIconIcon from "./components/icons/logos/atom-icon";
import LucideBadgeCheckIcon from "./components/icons/lucide/badge-check";
import LucideCloudDownloadIcon from "./components/icons/lucide/cloud-download";
import MdiAccountIcon from "./components/icons/mdi/account";
import MdiHomeIcon from "./components/icons/mdi/home";

function App() {
  return (
    <main className="flex gap-4 items-center justify-center min-h-screen bg-gray-900">
      <LogosActiveCampaignIcon className="size-10" />
      <LucideBadgeCheckIcon className="size-10" />
      <LucideCloudDownloadIcon className="size-10" />
      <MdiAccountIcon className="size-10" />
      <MdiHomeIcon className="size-10" />
      <LogosAtomIconIcon className="size-10" />
    </main>
  );
}

export default App;
