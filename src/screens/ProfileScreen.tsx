import React from 'react';
import { Alert, Pressable, StatusBar, Text, View } from 'react-native';
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

        <View className="mt-10 gap-4">
          <View className="rounded-2xl border border-[#E7E7F0] bg-white px-4 py-4">
            <Text className="text-[13px] font-semibold uppercase tracking-[1px] text-[#8D8CA3]">
              Full Name
            </Text>
            <Text className="mt-2 text-[17px] font-semibold text-[#29293D]">
              {profileData.name}
            </Text>
          </View>

          <View className="rounded-2xl border border-[#E7E7F0] bg-white px-4 py-4">
            <Text className="text-[13px] font-semibold uppercase tracking-[1px] text-[#8D8CA3]">
              Email Address
            </Text>
            <Text className="mt-2 text-[17px] font-semibold text-[#29293D]">
              {profileData.email}
            </Text>
          </View>

          <View className="rounded-2xl border border-[#E7E7F0] bg-white px-4 py-4">
            <Text className="text-[13px] font-semibold uppercase tracking-[1px] text-[#8D8CA3]">
              Account Status
            </Text>
            <Text className="mt-2 text-[17px] font-semibold text-[#29293D]">
              {profileData.accountStatus}
            </Text>
          </View>
        </View>

        <Pressable
          className="mt-8 items-center rounded-2xl bg-[#5548EF] py-4"
          onPress={() => Alert.alert('Edit Profile', 'Edit profile flow will be added in the next step.')}>
          <Text className="text-[16px] font-semibold text-white">Edit Profile</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;