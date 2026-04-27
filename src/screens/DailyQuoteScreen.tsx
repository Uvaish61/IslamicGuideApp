import React, { useState } from 'react';
import { Pressable, StatusBar, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react-native';
import { dailyQuotes } from '../data/quoteData';

type DailyQuoteScreenProps = {
  onBackToHome: () => void;
};

const DailyQuoteScreen = ({ onBackToHome }: DailyQuoteScreenProps) => {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [savedQuoteIds, setSavedQuoteIds] = useState<number[]>([]);
  const quote = dailyQuotes[currentQuoteIndex];
  const isSaved = savedQuoteIds.includes(quote.id);

  const toggleSaveQuote = () => {
    setSavedQuoteIds((prev) =>
      prev.includes(quote.id) ? prev.filter((id) => id !== quote.id) : [...prev, quote.id]
    );
  };

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

        <Pressable
          className="mt-8 flex-row items-center justify-center gap-2 rounded-2xl bg-[#5548EF] px-6 py-3"
          onPress={toggleSaveQuote}>
          <Heart size={18} color={isSaved ? '#FF6B6B' : '#FFFFFF'} fill={isSaved ? '#FF6B6B' : 'none'} />
          <Text className="text-[14px] font-semibold text-white">
            {isSaved ? 'Saved' : 'Save Quote'}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default DailyQuoteScreen;
