import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Home, BookOpen, Heart, User, Settings as SettingsIcon, Compass } from 'lucide-react-native';

type Tab = 'home' | 'daily' | 'favorites' | 'profile' | 'settings' | 'qibla';

type Props = {
  active?: Tab;
  onTabPress?: (tab: Tab) => void;
};

const TABS: { key: Tab; label: string; Icon: any }[] = [
  { key: 'home', label: 'Home', Icon: Home },
  { key: 'daily', label: 'Daily', Icon: BookOpen },
  { key: 'qibla', label: 'Qibla', Icon: Compass },
  { key: 'favorites', label: 'Favorites', Icon: Heart },
  { key: 'profile', label: 'Profile', Icon: User },
];

const BottomNav = ({ active = 'home', onTabPress = () => {} }: Props) => {
  return (
    <View style={styles.outerShell}>
      <View style={styles.container}>
        {TABS.map(({ key, label, Icon }) => {
          const isActive = active === key;
          const color = isActive ? '#5548EF' : '#7E7D94';
          return (
            <TouchableOpacity
              key={key}
              style={[styles.tab, isActive && styles.tabActive]}
              onPress={() => onTabPress(key)}
              activeOpacity={0.7}
            >
              <View style={[styles.iconWrap, isActive && styles.iconWrapActive]}>
                <Icon color={color} width={20} height={20} />
              </View>
              <Text style={[styles.label, { color }]}>{label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerShell: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 14,
    backgroundColor: 'rgba(236, 235, 250, 0.92)',
  },
  container: {
    minHeight: 72,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 28,
    borderWidth: 1,
    borderColor: '#E7E7F0',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 10,
    shadowColor: '#5548EF',
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 18,
  },
  tabActive: {
    backgroundColor: '#F5F4FF',
  },
  iconWrap: {
    height: 30,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 999,
    marginBottom: 4,
  },
  iconWrapActive: {
    backgroundColor: '#E8E4FF',
  },
  label: {
    fontSize: 11,
    fontWeight: '700',
  },
});

export default BottomNav;
