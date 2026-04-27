import React from 'react';
import { StatusBar, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const DailyQuoteScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-[#ECEBFA]">
      <StatusBar barStyle="dark-content" backgroundColor="#ECEBFA" />
      <View className="flex-1 items-center justify-center px-6">
        <Text className="text-3xl font-extrabold text-[#29293D]">Daily Quote</Text>
        <Text className="mt-3 text-center text-base text-[#7E7D94]">
          Islamic quotes and hadiths will be displayed here.
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default DailyQuoteScreen;
