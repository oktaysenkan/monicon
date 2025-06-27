import React from "react";
import { StyleSheet, View } from "react-native";

import ApacheLogo from "./src/components/icons/logos/apache";
import BadgeCheckIcon from "./src/components/icons/lucide/badge-check";
import CloudDownloadIcon from "./src/components/icons/lucide/cloud-download";
import AccountIcon from "./src/components/icons/mdi/account";
import HomeIcon from "./src/components/icons/mdi/home";
import AtomIcon from "./src/components/icons/logos/atom-icon";

export default function App() {
  return (
    <View style={styles.container}>
      <ApacheLogo color="red" width={32} height={32} />
      <BadgeCheckIcon color="red" width={32} height={32} />
      <CloudDownloadIcon color="red" width={32} height={32} />
      <AccountIcon color="red" width={32} height={32} />
      <HomeIcon color="red" width={32} height={32} />
      <AtomIcon color="red" width={32} height={32} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
});
