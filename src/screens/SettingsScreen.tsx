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

        <View style={styles.optionsSection}>
          <Text style={styles.optionsSectionLabel}>Preferences</Text>
          <View style={styles.optionsList}>
          {settingsOptions.map(option => (
            <View key={option.id} style={styles.optionCard}>
              <View style={styles.optionRow}>
                <View style={styles.optionDot} />
                <View style={styles.optionTextBlock}>
                  <Text style={styles.optionLabel}>{option.label}</Text>
                  <Text style={styles.optionValue}>{option.value}</Text>
                </View>
              </View>
            </View>
          ))}
          </View>
        </View>

        <View style={styles.footerCard}>
          <Text style={styles.footerTitle}>Ready to adjust preferences?</Text>
          <Text style={styles.footerText}>Your current settings are saved locally and can be updated anytime.</Text>

          <Pressable
            style={styles.updateButton}
            onPress={() => Alert.alert('Settings', 'Settings action will be expanded later.')}>
            <Text style={styles.updateButtonText}>Update Settings</Text>
          </Pressable>

          <Pressable style={styles.backButton} onPress={onBackToHome}>
            <Text style={styles.backButtonText}>Back to Home</Text>
          </Pressable>
        </View>
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
    paddingTop: 36,
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
  optionsSection: {
    marginTop: 18,
  },
  optionsSectionLabel: {
    marginBottom: 12,
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    color: '#8D8CA3',
  },
  optionsList: {
    gap: 10,
  },
  optionCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E7E7F0',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  optionDot: {
    height: 12,
    width: 12,
    borderRadius: 999,
    backgroundColor: '#5548EF',
  },
  optionTextBlock: {
    flex: 1,
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
    marginTop: 18,
    alignItems: 'center',
    borderRadius: 16,
    backgroundColor: '#5548EF',
    paddingVertical: 16,
    shadowColor: '#5548EF',
    shadowOpacity: 0.12,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
  footerCard: {
    marginTop: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E7E7F0',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  footerTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#29293D',
  },
  footerText: {
    marginTop: 6,
    fontSize: 13,
    lineHeight: 20,
    color: '#7E7D94',
  },
  updateButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  backButton: {
    marginTop: 12,
    alignItems: 'center',
    borderRadius: 16,
    backgroundColor: '#F5F4FF',
    paddingVertical: 14,
  },
  backButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#7E7D94',
  },
});

export default SettingsScreen;