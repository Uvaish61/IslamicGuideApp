import React from 'react';
import { Pressable, StatusBar, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bell, MapPin } from 'lucide-react-native';

type HomeScreenProps = {
  onOpenProfile: () => void;
  onOpenSettings: () => void;
  onOpenDailyQuote: () => void;
  onOpenTasbeeh: () => void;
};

const HomeScreen = ({ onOpenProfile, onOpenSettings, onOpenDailyQuote, onOpenTasbeeh }: HomeScreenProps) => {
  return (
    <SafeAreaView className="flex-1 bg-[#ECEBFA]">
      <StatusBar barStyle="dark-content" backgroundColor="#ECEBFA" />
      <View className="flex-1 px-5 pt-3">
        <View className="relative overflow-hidden rounded-[32px] bg-[#F8F6E8] px-5 py-5">
          <View className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#FFE7A7] opacity-80" />
          <View className="absolute -bottom-8 right-8 h-24 w-24 rounded-full bg-[#DDEBC7]" />
          <View className="absolute bottom-8 left-6 h-3 w-3 rounded-full bg-[#8DC47A]" />

          <View className="flex-row items-start justify-between">
            <View className="flex-1 pr-4">
              <View className="flex-row items-center gap-2">
                <MapPin size={14} color="#7E7D94" />
                <Text className="text-[12px] font-medium tracking-[0.4px] text-[#7E7D94]">
                  Mohammadpur, Dhaka, Bangladesh
                </Text>
              </View>
              <Text className="mt-2 text-[26px] font-extrabold leading-8 text-[#29293D]">
                Ramadan Kareem
              </Text>
              <Text className="mt-3 max-w-[260px] text-[13px] leading-5 text-[#7E7D94]">
                A calm space for prayer, reflection, and small daily reminders.
              </Text>
            </View>

            <Pressable
              className="h-11 w-11 items-center justify-center rounded-full bg-white"
              onPress={onOpenSettings}>
              <Bell size={18} color="#29293D" />
            </Pressable>
          </View>

          <View className="mt-5 flex-row items-center gap-3">
            <View className="rounded-full bg-[#EEF4DC] px-3 py-1.5">
              <Text className="text-[11px] font-semibold text-[#6F8B42]">Today</Text>
            </View>
            <View className="rounded-full bg-white/70 px-3 py-1.5">
              <Text className="text-[11px] font-semibold text-[#8C7A42]">Peaceful focus</Text>
            </View>
          </View>
        </View>

        <View className="mt-5 flex-1 items-center justify-center px-1">
          <Text className="text-center text-[17px] font-semibold text-[#29293D]">
            Next we can build the prayer card below this header.
          </Text>
          <Text className="mt-2 text-center text-[13px] leading-5 text-[#7E7D94]">
            The navigation stays the same, and each design slice can be added one at a time.
          </Text>
        </View>

        <View className="mb-4 flex-row flex-wrap justify-center gap-3">
          <Pressable className="rounded-2xl bg-[#5548EF] px-5 py-3" onPress={onOpenProfile}>
            <Text className="text-[15px] font-semibold text-white">Open Profile</Text>
          </Pressable>

          <Pressable className="rounded-2xl border border-[#E7E7F0] bg-white px-5 py-3" onPress={onOpenSettings}>
            <Text className="text-[15px] font-semibold text-[#29293D]">Open Settings</Text>
          </Pressable>

          <Pressable className="rounded-2xl border border-[#5548EF] bg-white px-5 py-3" onPress={onOpenDailyQuote}>
            <Text className="text-[15px] font-semibold text-[#5548EF]">Daily Quote</Text>
          </Pressable>

          <Pressable className="rounded-2xl bg-[#4ECDC4] px-5 py-3" onPress={onOpenTasbeeh}>
            <Text className="text-[15px] font-semibold text-white">Tasbeeh Counter</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
