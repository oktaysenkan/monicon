import * as React from 'react';
import { SafeAreaView, ViewStyle } from 'react-native';
import { Iconify } from 'react-native-iconify';

export default function App() {
  return (
    <SafeAreaView style={$flex}>
      <Iconify icon="mdi:heart" size={32} color="red" />
      <Iconify icon="mdi:heart" size={32} color="red" />
    </SafeAreaView>
  );
}

const $flex: ViewStyle = {
  flex: 1,
};
