import BadgeCheckIcon from "./components/icons/lucide/badge-check";
import CloudDownloadIcon from "./components/icons/lucide/cloud-download";
import AccountIcon from "./components/icons/mdi/account";
import HomeIcon from "./components/icons/mdi/home";
import AtomIcon from "./components/icons/logos/atom-icon";
import ApacheLogo from "./components/icons/logos/apache";

function App() {
  return (
    <main className="flex gap-4 items-center justify-center min-h-screen bg-gray-900">
      <ApacheLogo className="size-10" />
      <BadgeCheckIcon className="size-10" />
      <CloudDownloadIcon className="size-10" />
      <AccountIcon className="size-10" />
      <HomeIcon className="size-10" />
      <AtomIcon className="size-10" />
      <AtomIcon height={40} />
    </main>
  );
}

export default App;
