import BadgeCheckIcon from "./components/icons/lucide/badge-check";
import CloudDownloadIcon from "./components/icons/lucide/cloud-download";
import AccountIcon from "./components/icons/mdi/account";
import HomeIcon from "./components/icons/mdi/home";
import ActiveCampaignLogo from "./components/icons/logos/active-campaign";
import AtomIcon from "./components/icons/logos/atom-icon";
import ApacheLogo from "./components/icons/logos/apache";

function App() {
  return (
    <main className="flex flex-col gap-4 items-center justify-center min-h-screen bg-gray-900">
      <ApacheLogo className="bg-red-500" color="white" width={50} />
      <BadgeCheckIcon className="bg-red-500" color="white" width={50} />
      <CloudDownloadIcon className="bg-red-500" color="white" width={50} />
      <AccountIcon className="bg-red-500" color="white" width={50} />
      <HomeIcon className="bg-red-500" color="white" width={50} />
      <ActiveCampaignLogo className="bg-red-500" color="white" width={50} />
      <AtomIcon className="bg-red-500" color="white" width={50} />
    </main>
  );
}

export default App;
