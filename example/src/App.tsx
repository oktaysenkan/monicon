import * as React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import { Iconify } from 'react-native-iconify';

const icons = ['mdi:home', 'mdi:account', 'feather:activity'];

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>LOADED ICONS</Text>
      <View style={styles.iconsWrapper}>
        {icons.map((icon, index) => (
          <View key={index} style={styles.iconWrapper}>
            <Iconify icon={icon} color="black" />
            <Text style={styles.iconName}>{icon}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 24,
  },
  iconsWrapper: {
    marginTop: 16,
  },
  iconWrapper: {
    gap: 8,
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconName: {
    fontSize: 16,
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
});
