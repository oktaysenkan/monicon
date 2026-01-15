import React from "react";

import BadgeCheckIcon from "./components/icons/lucide/badge-check";
import CloudDownloadIcon from "./components/icons/lucide/cloud-download";
import AccountIcon from "./components/icons/mdi/account";
import HomeIcon from "./components/icons/mdi/home";
import AtomIcon from "./components/icons/logos/atom-icon";
import ApacheLogo from "./components/icons/logos/apache";

const App = () => {
  return (
    <main
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "black",
        gap: "1rem",
      }}
    >
      <ApacheLogo color="white" width={50} />
      <BadgeCheckIcon color="white" width={50} />
      <CloudDownloadIcon color="white" width={50} />
      <AccountIcon color="white" width={50} />
      <HomeIcon color="white" width={50} />
      <AtomIcon color="white" width={50} />
    </main>
  );
};

export default App;
