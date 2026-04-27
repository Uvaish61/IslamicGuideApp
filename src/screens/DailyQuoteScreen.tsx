import React, { useState } from 'react';
import { Pressable, StatusBar, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react-native';
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

        <View className="mt-8 flex-row items-center justify-center gap-4">
          <Pressable
            className="rounded-full bg-[#E7E7F0] p-3"
            onPress={() =>
              setCurrentQuoteIndex((prev) => (prev === 0 ? dailyQuotes.length - 1 : prev - 1))
            }>
            <ChevronLeft size={20} color="#3D3AE0" />
          </Pressable>

          <Text className="text-[14px] font-semibold text-[#7E7D94]">
            {currentQuoteIndex + 1} / {dailyQuotes.length}
          </Text>

          <Pressable
            className="rounded-full bg-[#E7E7F0] p-3"
            onPress={() =>
              setCurrentQuoteIndex((prev) => (prev === dailyQuotes.length - 1 ? 0 : prev + 1))
            }>
            <ChevronRight size={20} color="#3D3AE0" />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DailyQuoteScreen;
