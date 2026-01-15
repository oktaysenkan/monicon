import { StyleSheet, View } from "react-native";

import ApacheLogo from "@/components/icons/logos/apache";
import BadgeCheckIcon from "@/components/icons/lucide/badge-check";
import CloudDownloadIcon from "@/components/icons/lucide/cloud-download";
import AccountIcon from "@/components/icons/mdi/account";
import HomeIcon from "@/components/icons/mdi/home";
import AtomIcon from "@/components/icons/logos/atom-icon";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <ApacheLogo width={32} height={32} />
      <BadgeCheckIcon color="aqua" width={32} height={32} />
      <CloudDownloadIcon color="aqua" width={32} height={32} />
      <AccountIcon color="aqua" width={32} height={32} />
      <HomeIcon color="aqua" width={32} height={32} />
      <AtomIcon width={32} height={32} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
