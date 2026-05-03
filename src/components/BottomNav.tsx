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
  { key: 'favorites', label: 'Favorites', Icon: Heart },
  { key: 'profile', label: 'Profile', Icon: User },
  { key: 'settings', label: 'Settings', Icon: SettingsIcon },
];

const BottomNav = ({ active = 'home', onTabPress = () => {} }: Props) => {
  return (
    <View style={styles.container}>
      {TABS.map(({ key, label, Icon }) => {
        const isActive = active === key;
        const color = isActive ? '#5548EF' : '#7E7D94';
        return (
          <TouchableOpacity
            key={key}
            style={styles.tab}
            onPress={() => onTabPress(key)}
            activeOpacity={0.7}
          >
            <Icon color={color} width={20} height={20} />
            <Text style={[styles.label, { color }]}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 64,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#E7E7F0',
    backgroundColor: '#FFFFFF',
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    marginTop: 4,
    fontSize: 12,
  },
});

export default BottomNav;
