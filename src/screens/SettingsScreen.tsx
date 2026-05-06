import React from 'react';
import { Alert, Pressable, StatusBar, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native';
import { settingsOptions } from '../data/settingsData';

type SettingsScreenProps = {
  onBackToHome: () => void;
};

const SettingsScreen = ({ onBackToHome }: SettingsScreenProps) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#ECEBFA" />
      <View style={styles.container}>
        <View style={styles.headerCard}>
          <View style={styles.headerAccent} />
          <View style={styles.header}>
            <Text style={styles.title}>Settings</Text>
            <Text style={styles.subtitle}>Manage app preferences in one place.</Text>
          </View>

          <View style={styles.overviewCard}>
            <Text style={styles.overviewLabel}>Quick Overview</Text>
            <Text style={styles.overviewValue}>{settingsOptions.length} options available</Text>
          </View>
        </View>

        <View style={styles.optionsList}>
          {settingsOptions.map(option => (
            <View key={option.id} style={styles.optionCard}>
              <Text style={styles.optionLabel}>{option.label}</Text>
              <Text style={styles.optionValue}>{option.value}</Text>
            </View>
          ))}
        </View>

        <Pressable
          style={styles.updateButton}
          onPress={() => Alert.alert('Settings', 'Settings action will be expanded later.')}>
          <Text style={styles.updateButtonText}>Update Settings</Text>
        </Pressable>

        <Pressable style={styles.backButton} onPress={onBackToHome}>
          <Text style={styles.backButtonText}>Back to Home</Text>
        </Pressable>
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
    paddingHorizontal: 24,
    paddingTop: 48,
  },
  headerCard: {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: 28,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 18,
    paddingVertical: 18,
  },
  headerAccent: {
    position: 'absolute',
    right: -24,
    top: -24,
    height: 120,
    width: 120,
    borderRadius: 999,
    backgroundColor: 'rgba(84, 72, 239, 0.08)',
  },
  header: {
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#29293D',
  },
  subtitle: {
    marginTop: 12,
    textAlign: 'center',
    fontSize: 16,
    color: '#7E7D94',
  },
  overviewCard: {
    marginTop: 18,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E7E7F0',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  overviewLabel: {
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: '#8D8CA3',
  },
  overviewValue: {
    marginTop: 8,
    fontSize: 17,
    fontWeight: '700',
    color: '#29293D',
  },
  optionsList: {
    marginTop: 16,
    gap: 12,
  },
  optionCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E7E7F0',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  optionLabel: {
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: '#8D8CA3',
  },
  optionValue: {
    marginTop: 8,
    fontSize: 17,
    fontWeight: '700',
    color: '#29293D',
  },
  updateButton: {
    marginTop: 24,
    alignItems: 'center',
    borderRadius: 16,
    backgroundColor: '#5548EF',
    paddingVertical: 16,
  },
  updateButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  backButton: {
    marginTop: 16,
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#7E7D94',
  },
});

export default SettingsScreen;