import React, { useState } from 'react';
import { Pressable, StatusBar, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type TasbeehScreenProps = {
  onBackToHome: () => void;
};

const TasbeehScreen = ({ onBackToHome }: TasbeehScreenProps) => {
  const [selectedRange, setSelectedRange] = useState(33); // Default Tasbeeh range
  const [counter, setCounter] = useState(0);

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
