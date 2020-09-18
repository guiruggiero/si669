import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  console.log("Hey I'm logging!");
  return (
    <View style={styles.container}>
      <Text style={styles.helloLabel}>Hello, World!</Text>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00274C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  helloLabel: {
    fontSize: 120,
    fontWeight: 'bold',
    color: '#FFCB05',
    textAlign: 'center'
  }
});