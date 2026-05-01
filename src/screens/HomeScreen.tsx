import React from 'react';
import { Pressable, StatusBar, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bell, BookOpen, Heart, Landmark, MapPin, MoonStar, ScrollText, Settings, UserRound } from 'lucide-react-native';

type HomeScreenProps = {
  onOpenProfile: () => void;
  onOpenSettings: () => void;
  onOpenDailyQuote: () => void;
  onOpenTasbeeh: () => void;
};

const HomeScreen = ({ onOpenProfile, onOpenSettings, onOpenDailyQuote, onOpenTasbeeh }: HomeScreenProps) => {
  const quickActions = [
    { id: 'quran', label: 'Quran', Icon: BookOpen, tone: '#EEF4DC' },
    { id: 'duas', label: 'Duas', Icon: MoonStar, tone: '#FDEBD7' },
    { id: 'favorites', label: 'Saved', Icon: Heart, tone: '#F7E1E4' },
    { id: 'profile', label: 'Profile', Icon: UserRound, tone: '#E4E3FB' },
    { id: 'settings', label: 'Tools', Icon: Settings, tone: '#E2F1EE' },
  ] as const;

  const featuredCards = [
    {
      id: 'quran',
      title: 'Quran Companion',
      subtitle: 'Continue reading with a calm focus view.',
      label: 'Read Now',
      Icon: ScrollText,
      tone: '#EAF0C5',
      accent: '#62713F',
    },
    {
      id: 'umrah',
      title: 'Umrah Guide',
      subtitle: 'A clean journey card for planning essentials.',
      label: 'Explore',
      Icon: Landmark,
      tone: '#F7EBD8',
      accent: '#8F5D20',
    },
    {
      id: 'zakat',
      title: 'Zakat Planner',
      subtitle: 'Organize your yearly giving with clarity.',
      label: 'Calculate',
      Icon: Heart,
      tone: '#E4F1EA',
      accent: '#3C7A63',
    },
  ] as const;

  return (
    <SafeAreaView className="flex-1 bg-[#ECEBFA]">
      <StatusBar barStyle="dark-content" backgroundColor="#ECEBFA" />
      <View className="absolute -left-14 top-20 h-36 w-36 rounded-full bg-[#DDEBC7] opacity-50" />
      <View className="absolute -right-16 top-44 h-44 w-44 rounded-full bg-[#FFE7A7] opacity-35" />
      <View className="absolute left-10 top-1/2 h-3 w-3 rounded-full bg-[#8DC47A] opacity-60" />
      <View className="absolute bottom-8 right-10 h-24 w-24 rounded-full bg-[#F2D9A8] opacity-45" />
      <View className="absolute bottom-0 left-0 right-0 h-28 bg-[#F6EFCF] opacity-70" />

      <View className="relative z-10 flex-1 px-5 pt-3">
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
              <Text className="mt-2 text-[28px] font-extrabold leading-9 tracking-[-0.8px] text-[#29293D]">
                Ramadan Kareem
              </Text>
              <Text className="mt-3 max-w-[260px] text-[14px] leading-6 text-[#7E7D94]">
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
              <Text className="text-[11px] font-semibold tracking-[0.2px] text-[#6F8B42]">Today</Text>
            </View>
            <View className="rounded-full bg-white/70 px-3 py-1.5">
              <Text className="text-[11px] font-semibold tracking-[0.2px] text-[#8C7A42]">Peaceful focus</Text>
            </View>
          </View>
        </View>

        <View className="mt-5 flex-1 items-center justify-center px-1">
          <View className="w-full overflow-hidden rounded-[30px] bg-[#E9F0BF] px-5 py-5">
            <View className="flex-row items-start justify-between">
              <View className="flex-1 pr-4">
                <Text className="text-[12px] font-semibold uppercase tracking-[1px] text-[#56643F]">
                  1 Ramadan 1446 Hijria
                </Text>
                <Text className="mt-3 text-[46px] font-extrabold leading-[50px] tracking-[-1.2px] text-[#1F2417]">
                  17:21
                </Text>
                <View className="mt-3 flex-row items-center gap-2">
                  import React from 'react';
                  import { Pressable, StatusBar, Text, View } from 'react-native';
                  import { SafeAreaView } from 'react-native-safe-area-context';
                  import {
                    Bell,
                    BookOpen,
                    Heart,
                    Landmark,
                    MapPin,
                    MoonStar,
                    ScrollText,
                    Settings,
                    UserRound,
                  } from 'lucide-react-native';

                  type HomeScreenProps = {
                    onOpenProfile: () => void;
                    onOpenSettings: () => void;
                    onOpenDailyQuote: () => void;
                    onOpenTasbeeh: () => void;
                  };

                  const HomeScreen = ({ onOpenProfile, onOpenSettings, onOpenDailyQuote, onOpenTasbeeh }: HomeScreenProps) => {
                    const cardShadow = {
                      shadowColor: '#7C7660',
                      shadowOpacity: 0.12,
                      shadowRadius: 18,
                      shadowOffset: { width: 0, height: 8 },
                      elevation: 5,
                    } as const;

                    const quickActions = [
                      { id: 'quran', label: 'Quran', Icon: BookOpen, tone: '#EEF4DC' },
                      { id: 'duas', label: 'Duas', Icon: MoonStar, tone: '#FDEBD7' },
                      { id: 'favorites', label: 'Saved', Icon: Heart, tone: '#F7E1E4' },
                      { id: 'profile', label: 'Profile', Icon: UserRound, tone: '#E4E3FB' },
                      { id: 'settings', label: 'Tools', Icon: Settings, tone: '#E2F1EE' },
                    ] as const;

                    const featuredCards = [
                      {
                        id: 'quran',
                        title: 'Quran Companion',
                        subtitle: 'Continue reading with a calm focus view.',
                        label: 'Read Now',
                        Icon: ScrollText,
                        tone: '#EAF0C5',
                        accent: '#62713F',
                      },
                      {
                        id: 'umrah',
                        title: 'Umrah Guide',
                        subtitle: 'A clean journey card for planning essentials.',
                        label: 'Explore',
                        Icon: Landmark,
                        tone: '#F7EBD8',
                        accent: '#8F5D20',
                      },
                      {
                        id: 'zakat',
                        title: 'Zakat Planner',
                        subtitle: 'Organize your yearly giving with clarity.',
                        label: 'Calculate',
                        Icon: Heart,
                        tone: '#E4F1EA',
                        accent: '#3C7A63',
                      },
                    ] as const;

                    const prayerTimes = [
                      { name: 'Fajr', time: '04:28', active: false },
                      { name: 'Dhuhr', time: '12:13', active: false },
                      { name: 'Asr', time: '04:36', active: false },
                      { name: 'Maghrib', time: '06:15', active: true },
                      { name: 'Isha', time: '07:41', active: false },
                    ] as const;

                    return (
                      <SafeAreaView className="flex-1 bg-[#ECEBFA]">
                        <StatusBar barStyle="dark-content" backgroundColor="#ECEBFA" />

                        <View className="absolute -left-14 top-20 h-36 w-36 rounded-full bg-[#DDEBC7] opacity-50" />
                        <View className="absolute -right-16 top-44 h-44 w-44 rounded-full bg-[#FFE7A7] opacity-35" />
                        <View className="absolute left-10 top-1/2 h-3 w-3 rounded-full bg-[#8DC47A] opacity-60" />
                        <View className="absolute bottom-8 right-10 h-24 w-24 rounded-full bg-[#F2D9A8] opacity-45" />
                        <View className="absolute bottom-0 left-0 right-0 h-28 bg-[#F6EFCF] opacity-70" />

                        <View className="relative z-10 flex-1 px-5 pt-3">
                          <View className="relative overflow-hidden rounded-[32px] bg-[#F8F6E8] px-5 py-5" style={cardShadow}>
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
                                <Text className="mt-2 text-[28px] font-extrabold leading-9 tracking-[-0.8px] text-[#29293D]">
                                  Ramadan Kareem
                                </Text>
                                <Text className="mt-3 max-w-[260px] text-[14px] leading-6 text-[#7E7D94]">
                                  A calm space for prayer, reflection, and small daily reminders.
                                </Text>
                              </View>

                              <Pressable className="h-11 w-11 items-center justify-center rounded-full bg-white" onPress={onOpenSettings}>
                                <Bell size={18} color="#29293D" />
                              </Pressable>
                            </View>

                            <View className="mt-5 flex-row items-center gap-3">
                              <View className="rounded-full bg-[#EEF4DC] px-3 py-1.5">
                                <Text className="text-[11px] font-semibold tracking-[0.2px] text-[#6F8B42]">Today</Text>
                              </View>
                              <View className="rounded-full bg-white/70 px-3 py-1.5">
                                <Text className="text-[11px] font-semibold tracking-[0.2px] text-[#8C7A42]">Peaceful focus</Text>
                              </View>
                            </View>
                          </View>

                          <View className="mt-5 flex-1 items-center justify-center px-1">
                            <View className="w-full overflow-hidden rounded-[30px] bg-[#E9F0BF] px-5 py-5" style={cardShadow}>
                              <View className="flex-row items-start justify-between">
                                <View className="flex-1 pr-4">
                                  <Text className="text-[12px] font-semibold uppercase tracking-[1px] text-[#56643F]">
                                    1 Ramadan 1446 Hijria
                                  </Text>
                                  <Text className="mt-3 text-[46px] font-extrabold leading-[50px] tracking-[-1.2px] text-[#1F2417]">
                                    17:21
                                  </Text>
                                  <View className="mt-3 flex-row items-center gap-2">
                                    <View className="h-8 w-8 items-center justify-center rounded-full border border-[#91A16A] bg-[#F3F7DD]">
                                      <Text className="text-[12px] font-bold text-[#56643F]">◔</Text>
                                    </View>
                                    <View>
                                      <Text className="text-[12px] font-semibold tracking-[0.2px] text-[#56643F]">Next Prayer</Text>
                                      <Text className="text-[11px] tracking-[0.2px] text-[#72814E]">4:30 PM</Text>
                                    </View>
                                  </View>
                                </View>

                                <View className="h-[150px] w-[132px] items-center justify-end overflow-hidden rounded-[26px] bg-[#F6E08C]">
                                  <View className="absolute right-2 top-3 h-10 w-10 rounded-full bg-[#F4B800]" />
                                  <View className="absolute left-4 top-14 h-16 w-16 rounded-t-full border-l-4 border-r-4 border-t-4 border-[#F4E7D0] bg-[#FBE8D0]" />
                                  <View className="absolute bottom-0 left-0 right-0 h-10 rounded-t-[30px] bg-[#F2D1A8]" />
                                  <View className="absolute bottom-0 left-4 h-20 w-4 rounded-t-full bg-[#E68B52]" />
                                  <View className="absolute bottom-0 right-6 h-14 w-3 rounded-t-full bg-[#E68B52]" />
                                  <View className="absolute right-7 top-1 h-4 w-6 rounded-full bg-[#FFF4D3]" />
                                </View>
                              </View>

                              <View className="mt-4 flex-row items-center justify-between rounded-[22px] bg-[#DDE8A1] px-4 py-3">
                                <View>
                                  <Text className="text-[11px] font-semibold uppercase tracking-[1.4px] text-[#647246]">
                                    Focus window
                                  </Text>
                                  <Text className="mt-1 text-[16px] font-bold leading-6 text-[#1F2417]">
                                    Prepare for the next salah
                                  </Text>
                                </View>
                                <View className="rounded-full bg-[#55643E] px-4 py-2">
                                  <Text className="text-[12px] font-semibold tracking-[0.2px] text-white">View times</Text>
                                </View>
                              </View>
                            </View>

                            <View className="mt-4">
                              <Text className="mb-3 text-[11px] font-semibold uppercase tracking-[1.6px] text-[#8C8AA0]">
                                Quick actions
                              </Text>
                              <View className="flex-row flex-wrap justify-between gap-y-3">
                                {quickActions.map(({ id, label, Icon, tone }) => (
                                  <View
                                    key={id}
                                    className="w-[18%] min-w-[58px] items-center rounded-[20px] bg-white px-2 py-3"
                                    style={[{ backgroundColor: tone }, cardShadow]}>
                                    <View className="h-11 w-11 items-center justify-center rounded-full bg-white/80">
                                      <Icon size={18} color="#29293D" />
                                    </View>
                                    <Text className="mt-2 text-[10px] font-semibold tracking-[0.2px] text-[#29293D]">{label}</Text>
                                  </View>
                                ))}
                              </View>
                            </View>
                          </View>

                          <View className="mb-4 flex-row flex-wrap justify-center gap-3">
                            <Pressable className="rounded-2xl bg-[#5548EF] px-5 py-3" onPress={onOpenProfile} style={cardShadow}>
                              <Text className="text-[15px] font-semibold text-white">Open Profile</Text>
                            </Pressable>

                            <Pressable
                              className="rounded-2xl border border-[#E7E7F0] bg-white px-5 py-3"
                              onPress={onOpenSettings}
                              style={cardShadow}>
                              <Text className="text-[15px] font-semibold text-[#29293D]">Open Settings</Text>
                            </Pressable>

                            <Pressable
                              className="rounded-2xl border border-[#5548EF] bg-white px-5 py-3"
                              onPress={onOpenDailyQuote}
                              style={cardShadow}>
                              <Text className="text-[15px] font-semibold text-[#5548EF]">Daily Quote</Text>
                            </Pressable>

                            <Pressable className="rounded-2xl bg-[#4ECDC4] px-5 py-3" onPress={onOpenTasbeeh} style={cardShadow}>
                              <Text className="text-[15px] font-semibold text-white">Tasbeeh Counter</Text>
                            </Pressable>
                          </View>

                          <View className="mb-4">
                            <Text className="mb-3 text-[11px] font-semibold uppercase tracking-[1.6px] text-[#8F6A26]">
                              Featured
                            </Text>
                            <View className="flex-row flex-wrap justify-between gap-y-3">
                              {featuredCards.map(({ id, title, subtitle, label, Icon, tone, accent }) => (
                                <View key={id} className="w-[48%] overflow-hidden rounded-[26px] px-4 py-4" style={[{ backgroundColor: tone }, cardShadow]}>
                                  <View className="mb-10 flex-row items-start justify-between">
                                    <View className="h-10 w-10 items-center justify-center rounded-full bg-white/80">
                                      <Icon size={18} color={accent} />
                                    </View>
                                    <View className="h-5 w-5 rounded-full bg-white/60" />
                                  </View>
                                  <Text className="text-[16px] font-extrabold text-[#29293D]">{title}</Text>
                                  <Text className="mt-2 text-[12px] leading-4 text-[#6F6E84]">{subtitle}</Text>
                                  <View className="mt-4 self-start rounded-full bg-[#29293D] px-4 py-2">
                                    <Text className="text-[11px] font-semibold text-white">{label}</Text>
                                  </View>
                                </View>
                              ))}
                            </View>
                          </View>

                          <View className="mb-2 overflow-hidden rounded-[28px] bg-[#F8F2E2] px-5 py-5" style={cardShadow}>
                            <View className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-[#FFE7B8]" />
                            <View className="absolute bottom-4 right-5 h-2.5 w-2.5 rounded-full bg-[#D7A64D]" />
                            <Text className="text-[11px] font-semibold uppercase tracking-[1.6px] text-[#8F6A26]">
                              Reflection
                            </Text>
                            <Text className="mt-3 text-[19px] font-extrabold leading-8 tracking-[-0.4px] text-[#29293D]">
                              Keep your heart steady, and let the day unfold with quiet intention.
                            </Text>
                            <Text className="mt-3 max-w-[260px] text-[13px] leading-6 text-[#7E7D94]">
                              A minimal reminder card that gives the home screen a calmer, more personal feel.
                            </Text>
                            <View className="mt-4 flex-row items-center gap-2 self-start rounded-full bg-white px-4 py-2">
                              <View className="h-2 w-2 rounded-full bg-[#D7A64D]" />
                              <Text className="text-[12px] font-semibold tracking-[0.2px] text-[#29293D]">Open today&apos;s note</Text>
                            </View>
                          </View>

                          <View className="mb-4 rounded-[28px] bg-white px-5 py-5" style={cardShadow}>
                            <View className="flex-row items-center justify-between">
                              <View>
                                <Text className="text-[11px] font-semibold uppercase tracking-[1.6px] text-[#8C8AA0]">
                                  Prayer timings
                                </Text>
                                <Text className="mt-1 text-[17px] font-extrabold leading-6 text-[#29293D]">
                                  Plan the rest of your day with clarity
                                </Text>
                              </View>
                              <View className="rounded-full bg-[#F1F0FA] px-3 py-1.5">
                                <Text className="text-[11px] font-semibold tracking-[0.2px] text-[#5548EF]">Updated today</Text>
                              </View>
                            </View>

                            <View className="mt-4 flex-row items-end justify-between rounded-[22px] bg-[#F7F7FB] px-3 py-4">
                              {prayerTimes.map((item) => (
                                <View key={item.name} className="items-center">
                                  <View className={`h-2.5 w-2.5 rounded-full ${item.active ? 'bg-[#F0A11A]' : 'bg-[#D7D7E3]'}`} />
                                  <Text className={`mt-2 text-[11px] font-semibold ${item.active ? 'text-[#F0A11A]' : 'text-[#6F6E84]'}`}>
                                    {item.name}
                                  </Text>
                                  <Text className={`mt-1 text-[10px] ${item.active ? 'font-bold text-[#29293D]' : 'text-[#9A98AF]'}`}>
                                    {item.time}
                                  </Text>
                                </View>
                              ))}
                            </View>
                          </View>
                        </View>
                      </SafeAreaView>
                    );
                  };

                  export default HomeScreen;
