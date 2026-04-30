import React from 'react';
import { Pressable, StatusBar, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type HomeScreenProps = {
  onOpenProfile: () => void;
  onOpenSettings: () => void;
  onOpenDailyQuote: () => void;
  onOpenTasbeeh: () => void;
};

const HomeScreen = ({ onOpenProfile, onOpenSettings, onOpenDailyQuote, onOpenTasbeeh }: HomeScreenProps) => {
  return (
    <SafeAreaView className="flex-1 bg-[#ECEBFA]">
      <StatusBar barStyle="dark-content" backgroundColor="#ECEBFA" />
      <View className="flex-1 items-center justify-center px-6">
        <Text className="text-3xl font-extrabold text-[#29293D]">Home Screen</Text>
        <Text className="mt-3 text-center text-base text-[#7E7D94]">
          User login successful, now navigated to home screen.
        </Text>

        <Pressable className="mt-6 rounded-2xl bg-[#5548EF] px-5 py-3" onPress={onOpenProfile}>
          <Text className="text-[15px] font-semibold text-white">Open Profile</Text>
        </Pressable>

        <Pressable className="mt-3 rounded-2xl border border-[#E7E7F0] px-5 py-3" onPress={onOpenSettings}>
          <Text className="text-[15px] font-semibold text-[#29293D]">Open Settings</Text>
        </Pressable>

        <Pressable className="mt-3 rounded-2xl border border-[#5548EF] px-5 py-3" onPress={onOpenDailyQuote}>
          <Text className="text-[15px] font-semibold text-[#5548EF]">Daily Quote</Text>
        </Pressable>

        <Pressable className="mt-3 rounded-2xl bg-[#4ECDC4] px-5 py-3" onPress={onOpenTasbeeh}>
          <Text className="text-[15px] font-semibold text-white">Tasbeeh Counter</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
