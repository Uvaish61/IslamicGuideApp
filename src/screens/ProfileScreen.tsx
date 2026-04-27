import React from 'react';
import { StatusBar, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { profileData } from '../data/profileData';

const ProfileScreen = () => {
  const initials = profileData.name
    .split(' ')
    .filter(Boolean)
    .map(part => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <SafeAreaView className="flex-1 bg-[#ECEBFA]">
      <StatusBar barStyle="dark-content" backgroundColor="#ECEBFA" />
      <View className="flex-1 px-6 pt-12">
        <View className="items-center">
          <View className="h-24 w-24 items-center justify-center rounded-full bg-[#3D3AE0]">
            <Text className="text-3xl font-extrabold text-white">{initials}</Text>
          </View>
          <Text className="mt-4 text-3xl font-extrabold text-[#29293D]">Profile</Text>
          <Text className="mt-2 text-center text-base text-[#7E7D94]">
            {profileData.name}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;