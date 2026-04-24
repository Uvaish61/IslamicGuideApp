import React, { useState } from 'react';
import {
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, Chrome, Eye, Facebook, Lock, Mail, User } from 'lucide-react-native';

const App = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSignup = async () => {
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedName = name.trim();

    if (!trimmedEmail || !trimmedName || !password) {
      Alert.alert('Missing fields', 'Please fill all signup fields.');
      return;
    }

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail);
    if (!isValidEmail) {
      Alert.alert('Invalid email', 'Please enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Weak password', 'Password should be at least 6 characters.');
      return;
    }

    try {
      setIsSaving(true);
      await AsyncStorage.setItem(
        'auth_user',
        JSON.stringify({
          email: trimmedEmail,
          name: trimmedName,
          password,
          createdAt: new Date().toISOString(),
        }),
      );
      Alert.alert('Success', 'Account saved locally.');
    } catch {
      Alert.alert('Error', 'Could not save account. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

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
                  <Text className="text-[13px] text-white/80">Already have an account?</Text>
                  <Pressable className="rounded-lg bg-white/20 px-3 py-1.5">
                    <Text className="text-[12px] font-semibold text-white">Sign in</Text>
                  </Pressable>
                </View>
              </View>

              <Text className="mt-10 text-center text-[44px] font-extrabold tracking-tight text-white">
                Jobsly
              </Text>
            </View>

            <View className="-mt-10 flex-1 rounded-t-[34px] bg-white px-6 pt-10 pb-8">
              <Text className="text-center text-[44px] font-extrabold tracking-tight text-[#29293D]">Get started free.</Text>
              <Text className="mt-2 text-center text-[15px] text-[#8D8CA3]">
                Free forever. No credit card needed.
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

                <View className="flex-row items-center rounded-2xl border border-[#E8E8F0] bg-white px-4 py-3">
                  <User size={18} color="#9E9EB0" />
                  <TextInput
                    className="ml-3 flex-1 text-[15px] text-[#2C2C3E]"
                    placeholder="Your name"
                    placeholderTextColor="#B0B0C2"
                    value={name}
                    onChangeText={setName}
                  />
                </View>

                <View className="rounded-2xl border border-[#E8E8F0] bg-white px-4 py-3">
                  <View className="flex-row items-center">
                    <Lock size={18} color="#9E9EB0" />
                    <TextInput
                      className="ml-3 flex-1 text-[15px] text-[#2C2C3E]"
                      placeholder="Password"
                      placeholderTextColor="#B0B0C2"
                      secureTextEntry={!showPassword}
                      value={password}
                      onChangeText={setPassword}
                    />
                    <Pressable
                      className="ml-2 h-8 w-8 items-center justify-center rounded-full bg-[#F5F5FA]"
                      onPress={() => setShowPassword(prev => !prev)}>
                      <Eye size={16} color="#9E9EB0" />
                    </Pressable>
                  </View>

                  <View className="mt-2 flex-row items-center justify-end gap-2">
                    <View className="h-1.5 w-5 rounded-full bg-[#7BD97F]" />
                    <View className="h-1.5 w-5 rounded-full bg-[#7BD97F]" />
                    <Text className="text-[12px] font-semibold text-[#64BE67]">Strong</Text>
                  </View>
                </View>
              </View>

              <Pressable
                className="mt-6 items-center rounded-2xl bg-[#5548EF] py-4"
                onPress={handleSignup}
                disabled={isSaving}>
                {isSaving ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text className="text-[16px] font-semibold text-white">Sign up</Text>
                )}
              </Pressable>

              <View className="mt-8 flex-row items-center">
                <View className="h-[1px] flex-1 bg-[#E7E7F0]" />
                <Text className="mx-3 text-[13px] text-[#A6A6BA]">Or sign up with</Text>
                <View className="h-[1px] flex-1 bg-[#E7E7F0]" />
              </View>

              <View className="mt-6 flex-row gap-3">
                <Pressable className="h-14 flex-1 flex-row items-center justify-center rounded-2xl border border-[#E7E7F0]">
                  <Chrome size={18} color="#4B4B60" />
                  <Text className="ml-2 text-[15px] font-semibold text-[#3A3A50]">Google</Text>
                </Pressable>

                <Pressable className="h-14 flex-1 flex-row items-center justify-center rounded-2xl border border-[#E7E7F0]">
                  <Facebook size={18} color="#3B82F6" />
                  <Text className="ml-2 text-[15px] font-semibold text-[#3A3A50]">Facebook</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default App;