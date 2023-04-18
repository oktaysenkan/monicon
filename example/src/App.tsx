import * as React from 'react';
import { SafeAreaView, ViewStyle } from 'react-native';
import { Icon } from 'react-native-iconify';

export default function App() {
  return (
    <SafeAreaView style={$flex}>
      <Icon icon="mdi:trash" size={32} color="red" />
    </SafeAreaView>
  );
}

const $flex: ViewStyle = {
  flex: 1,
};
