import React from 'react';
import { Alert, Pressable, StatusBar, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { settingsOptions } from '../data/settingsData';

type SettingsScreenProps = {
  onBackToHome: () => void;
};

const SettingsScreen = ({ onBackToHome }: SettingsScreenProps) => {
  return (
    <SafeAreaView className="flex-1 bg-[#ECEBFA]">
      <StatusBar barStyle="dark-content" backgroundColor="#ECEBFA" />
      <View className="flex-1 px-6 pt-12">
        <View className="items-center">
          <Text className="text-3xl font-extrabold text-[#29293D]">Settings</Text>
          <Text className="mt-3 text-center text-base text-[#7E7D94]">
            Manage app preferences in one place.
          </Text>
        </View>

        <View className="mt-10 rounded-2xl border border-[#E7E7F0] bg-white px-4 py-4">
          <Text className="text-[13px] font-semibold uppercase tracking-[1px] text-[#8D8CA3]">
            Quick Overview
          </Text>
          <Text className="mt-2 text-[17px] font-semibold text-[#29293D]">
            {settingsOptions.length} options available
          </Text>
        </View>

        <View className="mt-4 gap-3">
          {settingsOptions.map(option => (
            <View key={option.id} className="rounded-2xl border border-[#E7E7F0] bg-white px-4 py-4">
              <Text className="text-[13px] font-semibold uppercase tracking-[1px] text-[#8D8CA3]">
                {option.label}
              </Text>
              <Text className="mt-2 text-[17px] font-semibold text-[#29293D]">
                {option.value}
              </Text>
            </View>
          ))}
        </View>

        <Pressable
          className="mt-6 items-center rounded-2xl bg-[#5548EF] py-4"
          onPress={() => Alert.alert('Settings', 'Settings action will be expanded later.')}>
          <Text className="text-[16px] font-semibold text-white">Update Settings</Text>
        </Pressable>

        <Pressable className="mt-4 items-center" onPress={onBackToHome}>
          <Text className="text-[14px] font-semibold text-[#7E7D94]">Back to Home</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default SettingsScreen;