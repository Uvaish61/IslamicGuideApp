import React, { useState } from 'react';
import { Pressable, StatusBar, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { tasbeehPhrases, predefinedRanges } from '../data/tasbeehData';

type TasbeehScreenProps = {
  onBackToHome: () => void;
};

const TasbeehScreen = ({ onBackToHome }: TasbeehScreenProps) => {
  const [selectedPhrase, setSelectedPhrase] = useState(tasbeehPhrases[0]); // Default first phrase
  const [selectedRange, setSelectedRange] = useState(predefinedRanges[0].value); // Default 33
  const [counter, setCounter] = useState(0);
  const [isCustomRange, setIsCustomRange] = useState(false);
  const [customRange, setCustomRange] = useState('33');

  // Helper functions
  const getActiveRange = () => (isCustomRange ? parseInt(customRange) || 33 : selectedRange);

  const incrementCounter = () => {
    const range = getActiveRange();
    if (counter < range) {
      setCounter(counter + 1);
    }
  };

  const resetCounter = () => {
    setCounter(0);
  };

  const getProgressPercentage = () => {
    const range = getActiveRange();
    return (counter / range) * 100;
  };

  return (
    <SafeAreaView className="flex-1 bg-[#ECEBFA]">
      <StatusBar barStyle="dark-content" backgroundColor="#ECEBFA" />
      
      <View className="flex-1 px-6 py-6">
        {/* Header with back button */}
        <View className="mb-8 flex-row items-center justify-between">
          <Text className="text-3xl font-extrabold text-[#29293D]">Tasbeeh Counter</Text>
          <Pressable onPress={onBackToHome}>
            <Text className="text-base font-semibold text-[#5548EF]">Back</Text>
          </Pressable>
        </View>

        {/* Main content will go here */}
        <View className="flex-1 items-center justify-center">
          <Text className="text-base text-[#7E7D94]">Tasbeeh Counter Screen</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default TasbeehScreen;
