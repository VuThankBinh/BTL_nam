import React from 'react';
import { View, Text, StyleSheet,AppRegistry } from 'react-native';
import { name as appName } from './app.json';

export default function AccountScreen() {
  return (
    <View style={styles.container}>
      <Text>Account Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
