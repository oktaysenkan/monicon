import React from "react";
import { StyleSheet, View } from "react-native";
import { Monicon } from "@monicon/native";

export default function App() {
  return (
    <View style={styles.container}>
      <Monicon name="mdi:home" />
      <Monicon name="feather:activity" />
      <Monicon name="logos:active-campaign" size={30} />
      <Monicon name="logos:apache-superset-icon" />
      <Monicon name="invalid:icon" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
