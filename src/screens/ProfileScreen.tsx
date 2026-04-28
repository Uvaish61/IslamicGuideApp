import React from 'react';
import { Alert, Pressable, StatusBar, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { profileData } from '../data/profileData';

type ProfileScreenProps = {
  onBackToHome: () => void;
};

const ProfileScreen = ({ onBackToHome }: ProfileScreenProps) => {
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
      <View className="flex-1 overflow-y-auto px-6 pt-8">
        {/* User Info Card */}
        <View className="rounded-3xl border border-[#E7E7F0] bg-white p-6">
          {/* Avatar */}
          <View className="items-center">
            <View className="h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-[#5548EF] to-[#3D3AE0]">
              <Text className="text-4xl font-extrabold text-white">{initials}</Text>
            </View>
          </View>

          {/* Name */}
          <Text className="mt-6 text-center text-2xl font-extrabold text-[#29293D]">
            {profileData.name}
          </Text>

          {/* Email */}
          <Text className="mt-2 text-center text-sm text-[#7E7D94]">
            {profileData.email}
          </Text>

          {/* Account Status Badge */}
          <View className="mt-4 flex-row items-center justify-center">
            <View className="rounded-full bg-[#E8F0FE] px-4 py-2">
              <Text className="text-xs font-semibold text-[#5548EF]">
                {profileData.accountStatus}
              </Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View className="mt-8 gap-3">
          <Pressable
            className="items-center rounded-2xl bg-[#5548EF] py-4"
            onPress={() => Alert.alert('Edit Profile', 'Edit profile flow will be added in the next step.')}>
            <Text className="text-[16px] font-semibold text-white">Edit Profile</Text>
          </Pressable>

          <Pressable className="items-center rounded-2xl border border-[#E7E7F0] bg-white py-4" onPress={onBackToHome}>
            <Text className="text-[16px] font-semibold text-[#29293D]">Back to Home</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;