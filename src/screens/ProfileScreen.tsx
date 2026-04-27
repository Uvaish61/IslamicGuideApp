import React from 'react';
import { StatusBar, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ProfileScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-[#ECEBFA]">
      <StatusBar barStyle="dark-content" backgroundColor="#ECEBFA" />
      <View className="flex-1 items-center justify-center px-6">
        <Text className="text-3xl font-extrabold text-[#29293D]">Profile</Text>
        <Text className="mt-3 text-center text-base text-[#7E7D94]">
          User profile layout will be added in the next small step.
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;