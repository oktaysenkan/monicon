import React from "react";

import "./App.css";

import BadgeCheckIcon from "./components/icons/lucide/badge-check";
import CloudDownloadIcon from "./components/icons/lucide/cloud-download";
import AccountIcon from "./components/icons/mdi/account";
import HomeIcon from "./components/icons/mdi/home";
import AtomIcon from "./components/icons/logos/atom-icon";
import ApacheLogo from "./components/icons/logos/apache";

function App() {
  return (
    <div className="App">
      <ApacheLogo color="white" width={50} />
      <BadgeCheckIcon color="white" width={50} />
      <CloudDownloadIcon color="white" width={50} />
      <AccountIcon color="white" width={50} />
      <HomeIcon color="white" width={50} />
      <AtomIcon color="white" width={50} />
    </div>
  );
}

export default App;
