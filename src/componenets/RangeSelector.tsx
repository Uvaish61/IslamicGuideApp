import React from 'react';
import { Pressable, TextInput, View, Text } from 'react-native';
import { predefinedRanges } from '../data/tasbeehData';

type RangeSelectorProps = {
  selectedRange: number;
  onRangeSelect: (range: number) => void;
  isCustomRange: boolean;
  onToggleCustom: (isCustom: boolean) => void;
  customRange: string;
  onCustomRangeChange: (value: string) => void;
};

const RangeSelector = ({
  selectedRange,
  onRangeSelect,
  isCustomRange,
  onToggleCustom,
  customRange,
  onCustomRangeChange,
}: RangeSelectorProps) => {
  return (
    <View className="mb-8 rounded-2xl bg-white p-5">
      {/* Range Mode Toggle */}
      <View className="mb-4 flex-row gap-3">
        <Pressable
          className={`flex-1 rounded-xl py-2 ${
            !isCustomRange ? 'bg-[#5548EF]' : 'bg-[#E7E7F0]'
          }`}
          onPress={() => onToggleCustom(false)}>
          <Text
            className={`text-center font-semibold ${
              !isCustomRange ? 'text-white' : 'text-[#29293D]'
            }`}>
            Predefined
          </Text>
        </Pressable>

        <Pressable
          className={`flex-1 rounded-xl py-2 ${
            isCustomRange ? 'bg-[#5548EF]' : 'bg-[#E7E7F0]'
          }`}
          onPress={() => onToggleCustom(true)}>
          <Text
            className={`text-center font-semibold ${
              isCustomRange ? 'text-white' : 'text-[#29293D]'
            }`}>
            Custom
          </Text>
        </Pressable>
      </View>

      {/* Predefined Range Buttons */}
      {!isCustomRange && (
        <View>
          <Text className="mb-3 text-sm font-semibold text-[#7E7D94]">Select Range:</Text>
          <View className="flex-row flex-wrap gap-2">
            {predefinedRanges.map((range) => (
              <Pressable
                key={range.id}
                className={`rounded-lg px-4 py-3 ${
                  selectedRange === range.value
                    ? 'bg-[#5548EF]'
                    : 'border border-[#E7E7F0] bg-white'
                }`}
                onPress={() => onRangeSelect(range.value)}>
                <Text
                  className={`font-semibold ${
                    selectedRange === range.value ? 'text-white' : 'text-[#29293D]'
                  }`}>
                  {range.label}
                </Text>
                <Text
                  className={`text-xs ${
                    selectedRange === range.value ? 'text-[#E0D7FF]' : 'text-[#7E7D94]'
                  }`}>
                  {range.description}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      )}

      {/* Custom Range Input */}
      {isCustomRange && (
        <View>
          <Text className="mb-3 text-sm font-semibold text-[#7E7D94]">Enter Custom Range:</Text>
          <TextInput
            className="rounded-lg border border-[#E7E7F0] bg-white px-4 py-3 text-base text-[#29293D]"
            placeholder="Enter number (e.g., 50, 150)"
            placeholderTextColor="#7E7D94"
            keyboardType="number-pad"
            value={customRange}
            onChangeText={onCustomRangeChange}
          />
        </View>
      )}
    </View>
  );
};

export default RangeSelector;
