import * as React from 'react';
import { SafeAreaView, ViewStyle } from 'react-native';
import { Iconify } from 'react-native-iconify';

export default function App() {
  const icon = 'mdi:heart';

  return (
    <SafeAreaView style={$flex}>
      <Iconify icon={icon} size={32} color="red" />
    </SafeAreaView>
  );
}

const $flex: ViewStyle = {
  flex: 1,
};
