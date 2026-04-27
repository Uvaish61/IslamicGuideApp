import React from 'react';
import { Pressable, StatusBar, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type HomeScreenProps = {
  onOpenProfile: () => void;
};

const HomeScreen = ({ onOpenProfile }: HomeScreenProps) => {
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
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
