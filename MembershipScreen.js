import React from 'react';
import { View, Text, StyleSheet,AppRegistry } from 'react-native';
import { name as appName } from './app.json';
export default function MembershipScreen() {
  return (
    <View style={styles.container}>
      <Text>Membership Screen</Text>
    </View>
  );
}

AppRegistry.registerComponent(appName, () => MembershipScreen);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
