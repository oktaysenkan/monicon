import React from "react";
import { Button, StyleSheet, View } from "react-native";
import { Monicon } from "@monicon/native";

export default function App() {
  const [size, setSize] = React.useState(32);
  return (
    <View style={styles.container}>
      <Button title="Press me" onPress={(s) => setSize((s) => s + 2)} />
      <Monicon name="mdi:home" color="red" size={size} />
      <Monicon name="feather:activity" />
      <Monicon name="logos:active-campaign" size={30} />
      <Monicon name="logos:apache-superset-icon" />
      <Monicon name="invalid:icon" />
      <Monicon name="lucide:trash" />
      <Monicon
        size={24}
        name="icon-park-outline:arrow-circle-right"
        color="red"
      />
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
