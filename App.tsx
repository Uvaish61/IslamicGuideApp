import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, Mail } from 'lucide-react-native';

const App = () => {
  const [email, setEmail] = useState('');

  return (
    <SafeAreaView className="flex-1 bg-[#ECEBFA]">
      <StatusBar barStyle="light-content" backgroundColor="#3D3AE0" />

      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}>
          <View className="min-h-full bg-[#ECEBFA]">
            <View className="h-72 overflow-hidden rounded-b-[34px] bg-[#3D3AE0] px-6 pt-5">
              <View className="absolute -right-16 -top-8 h-56 w-56 rounded-full bg-[#7580FF]/45" />
              <View className="absolute -left-20 top-20 h-64 w-64 rounded-full bg-[#2F2CD0]/60" />

              <View className="flex-row items-center justify-between">
                <Pressable className="h-8 w-8 items-center justify-center rounded-full bg-white/10">
                  <ChevronLeft size={18} color="#FFFFFF" />
                </Pressable>

                <View className="flex-row items-center gap-2">
                  <Text className="text-[13px] text-white/80">Don't have an account?</Text>
                  <Pressable className="rounded-lg bg-white/20 px-3 py-1.5">
                    <Text className="text-[12px] font-semibold text-white">Get Started</Text>
                  </Pressable>
                </View>
              </View>

              <Text className="mt-10 text-center text-[44px] font-extrabold tracking-tight text-white">
                Jobsly
              </Text>
            </View>

            <View className="-mt-10 flex-1 rounded-t-[34px] bg-white px-6 pt-10 pb-8">
              <Text className="text-center text-[44px] font-extrabold tracking-tight text-[#29293D]">Welcome Back</Text>
              <Text className="mt-2 text-center text-[15px] text-[#8D8CA3]">
                Enter your details below
              </Text>

              <View className="mt-8 gap-4">
                <View className="flex-row items-center rounded-2xl border border-[#E8E8F0] bg-white px-4 py-3">
                  <Mail size={18} color="#9E9EB0" />
                  <TextInput
                    className="ml-3 flex-1 text-[15px] text-[#2C2C3E]"
                    placeholder="Email Address"
                    placeholderTextColor="#B0B0C2"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                  />
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default App;