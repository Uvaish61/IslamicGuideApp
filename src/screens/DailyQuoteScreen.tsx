import React, { useState } from 'react';
import { StatusBar, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { dailyQuotes } from '../data/quoteData';

const DailyQuoteScreen = () => {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const quote = dailyQuotes[currentQuoteIndex];

  return (
    <SafeAreaView className="flex-1 bg-[#ECEBFA]">
      <StatusBar barStyle="dark-content" backgroundColor="#ECEBFA" />
      <View className="flex-1 items-center justify-center px-6">
        <Text className="text-3xl font-extrabold text-[#29293D]">Daily Quote</Text>

        <View className="mt-10 w-full rounded-3xl border-2 border-[#3D3AE0] bg-white px-6 py-8">
          <Text className="text-center text-[18px] font-bold italic text-[#3D3AE0]">
            "{quote.text}"
          </Text>
          <Text className="mt-6 text-center text-[14px] font-semibold text-[#7E7D94]">
            — {quote.source}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DailyQuoteScreen;
