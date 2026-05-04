import React, { useState } from 'react';
import { Pressable, StatusBar, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native';
import { tasbeehPhrases, predefinedRanges } from '../data/tasbeehData';
import RangeSelector from '../componenets/RangeSelector';
import CounterDisplay from '../componenets/CounterDisplay';

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
    setCounter((currentCounter) => (currentCounter < range ? currentCounter + 1 : currentCounter));
  };

  const resetCounter = () => {
    setCounter(0);
  };

  const decreaseRange = () => {
    setCustomRange((currentRange) => {
      const nextRange = Math.max((parseInt(currentRange) || 33) - 1, 1);
      return String(nextRange);
    });
  };

  const increaseRange = () => {
    setCustomRange((currentRange) => {
      const nextRange = Math.max(parseInt(currentRange) || 33, 1) + 1;
      return String(nextRange);
    });
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
          <View>
            <Text className="text-3xl font-extrabold text-[#29293D]">Tasbeeh Counter</Text>
            <Text className="mt-1 text-sm font-medium text-[#7E7D94]">Pick a dhikr, set a target, and tap to count.</Text>
          </View>
          <Pressable onPress={onBackToHome}>
            <Text className="text-base font-semibold text-[#5548EF]">Back</Text>
          </Pressable>
        </View>

        <View className="mb-6 rounded-3xl bg-[#FFFFFF] px-5 py-4">
          <Text className="mb-3 text-sm font-semibold text-[#7E7D94]">Choose Tasbeeh</Text>
          <View className="flex-row flex-wrap gap-2">
            {tasbeehPhrases.map((phrase) => {
              const isSelected = selectedPhrase.id === phrase.id;

              return (
                <Pressable
                  key={phrase.id}
                  className={`rounded-full border px-4 py-2 ${
                    isSelected ? 'bg-[#5548EF]' : 'border-[#E7E7F0] bg-white'
                  }`}
                  onPress={() => {
                    setSelectedPhrase(phrase);
                    setCounter(0);
                  }}>
                  <Text className={`text-sm font-semibold ${isSelected ? 'text-white' : 'text-[#29293D]'}`}>
                    {phrase.name}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* Main content will go here */}
        <RangeSelector
          selectedRange={selectedRange}
          onRangeSelect={setSelectedRange}
          isCustomRange={isCustomRange}
          onToggleCustom={setIsCustomRange}
          customRange={customRange}
          onCustomRangeChange={setCustomRange}
          onDecreaseRange={decreaseRange}
          onIncreaseRange={increaseRange}
        />

        {/* Counter section will be added next */}
        <CounterDisplay
          phrase={selectedPhrase}
          counter={counter}
          targetRange={getActiveRange()}
          progressPercentage={getProgressPercentage()}
          onIncrement={incrementCounter}
          onReset={resetCounter}
        />
      </View>
    </SafeAreaView>
  );
};

export default TasbeehScreen;
