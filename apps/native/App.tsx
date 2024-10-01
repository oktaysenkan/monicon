import React from "react";
import { StyleSheet, View } from "react-native";
import { Iconify } from "@oktaytest/ui";

export default function App() {
  return (
    <View style={styles.container}>
      <Iconify name="mdi:home" />
      <Iconify name="logos:active-campaign" size={30} />
      <Iconify name="logos:apache-superset-icon" />
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
