import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { TasbeehPhrase } from '../data/tasbeehData';

type CounterDisplayProps = {
  phrase: TasbeehPhrase;
  counter: number;
  targetRange: number;
  progressPercentage: number;
  onIncrement: () => void;
  onReset: () => void;
};

const CounterDisplay = ({
  phrase,
  counter,
  targetRange,
  progressPercentage,
  onIncrement,
  onReset,
}: CounterDisplayProps) => {
  const isCompleted = counter >= targetRange;

  return (
    <View className="mb-8 rounded-3xl bg-white p-8">
      {/* Phrase Section */}
      <View className="mb-8 items-center">
        <Text className="mb-2 text-4xl font-bold text-[#29293D]">{phrase.text}</Text>
        <Text className="mb-3 text-lg font-semibold text-[#5548EF]">{phrase.name}</Text>
        <Text className="text-center text-sm text-[#7E7D94]">{phrase.meaning}</Text>
      </View>

      {/* Progress Bar */}
      <View className="mb-6">
        <View className="mb-2 flex-row items-center justify-between">
          <Text className="text-xs font-semibold text-[#7E7D94]">Progress</Text>
          <Text className={`text-xs font-bold ${isCompleted ? 'text-[#4ECDC4]' : 'text-[#5548EF]'}`}>
            {Math.round(progressPercentage)}%
          </Text>
        </View>
        <View className="h-3 overflow-hidden rounded-full bg-[#E7E7F0]">
          <View
            className={`h-full ${isCompleted ? 'bg-[#4ECDC4]' : 'bg-[#5548EF]'}`}
            style={{ width: `${Math.min(progressPercentage, 100)}%` }}
          />
        </View>
      </View>

      {/* Counter Display */}
      <View className="items-center">
        <Text className="text-6xl font-extrabold text-[#5548EF]">{counter}</Text>
        <Text className="mt-2 text-base font-semibold text-[#7E7D94]">
          out of <Text className="font-bold text-[#29293D]">{targetRange}</Text>
        </Text>
      </View>

      {/* Completion Message */}
      {isCompleted && (
        <View className="mt-6 rounded-lg bg-[#E8F5E9] px-4 py-3">
          <Text className="text-center font-semibold text-[#2E7D32]">✓ Completed!</Text>
        </View>
      )}

      <Pressable
        className="mt-6 rounded-2xl bg-[#5548EF] py-4"
        onPress={onIncrement}
        disabled={isCompleted}>
        <Text className="text-center text-base font-bold text-white">
          {isCompleted ? 'Range Complete' : 'Tap to Count'}
        </Text>
      </Pressable>

      <Pressable className="mt-3 rounded-2xl border border-[#E7E7F0] py-4" onPress={onReset}>
        <Text className="text-center text-base font-bold text-[#29293D]">Reset Counter</Text>
      </Pressable>
    </View>
  );
};

export default CounterDisplay;
