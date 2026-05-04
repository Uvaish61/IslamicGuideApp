import React from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native';

const FavoritesScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#ECEBFA" />
      <View style={styles.container}>
        <Text style={styles.title}>Saved Items</Text>
        <Text style={styles.subtitle}>Your saved quotes and content will appear here.</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ECEBFA',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: '#29293D',
  },
  subtitle: {
    marginTop: 12,
    textAlign: 'center',
    fontSize: 16,
    color: '#7E7D94',
  },
});

export default FavoritesScreen;
