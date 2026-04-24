import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
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
import { Chrome, ChevronLeft, Eye, Facebook, Lock, Mail, User } from 'lucide-react-native';
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withRepeat, withSpring, withTiming } from 'react-native-reanimated';

type SignupScreenProps = {
  onSwitchToLogin: () => void;
};

const SignupScreen = ({ onSwitchToLogin }: SignupScreenProps) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const heroOpacity = useSharedValue(0);
  const heroTranslateY = useSharedValue(-22);
  const cardOpacity = useSharedValue(0);
  const cardTranslateY = useSharedValue(26);
  const emailFieldOpacity = useSharedValue(0);
  const emailFieldTranslateY = useSharedValue(16);
  const nameFieldOpacity = useSharedValue(0);
  const nameFieldTranslateY = useSharedValue(16);
  const passwordFieldOpacity = useSharedValue(0);
  const passwordFieldTranslateY = useSharedValue(16);
  const barOneWidth = useSharedValue(0);
  const barTwoWidth = useSharedValue(0);
  const signupScale = useSharedValue(1);
  const googleScale = useSharedValue(1);
  const facebookScale = useSharedValue(1);

  const heroAnimatedStyle = useAnimatedStyle(() => ({
    opacity: heroOpacity.value,
    transform: [{ translateY: heroTranslateY.value }],
  }));

  const cardAnimatedStyle = useAnimatedStyle(() => ({
    opacity: cardOpacity.value,
    transform: [{ translateY: cardTranslateY.value }],
  }));

  const emailFieldAnimatedStyle = useAnimatedStyle(() => ({
    opacity: emailFieldOpacity.value,
    transform: [{ translateY: emailFieldTranslateY.value }],
  }));

  const nameFieldAnimatedStyle = useAnimatedStyle(() => ({
    opacity: nameFieldOpacity.value,
    transform: [{ translateY: nameFieldTranslateY.value }],
  }));

  const passwordFieldAnimatedStyle = useAnimatedStyle(() => ({
    opacity: passwordFieldOpacity.value,
    transform: [{ translateY: passwordFieldTranslateY.value }],
  }));

  const barOneAnimatedStyle = useAnimatedStyle(() => ({
    width: barOneWidth.value,
  }));

  const barTwoAnimatedStyle = useAnimatedStyle(() => ({
    width: barTwoWidth.value,
  }));

  const signupButtonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: signupScale.value }],
  }));

  const googleButtonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: googleScale.value }],
  }));

  const facebookButtonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: facebookScale.value }],
  }));

  useEffect(() => {
    heroOpacity.value = withTiming(1, { duration: 420 });
    heroTranslateY.value = withTiming(0, { duration: 460 });
    cardOpacity.value = withDelay(170, withTiming(1, { duration: 380 }));
    cardTranslateY.value = withDelay(170, withTiming(0, { duration: 420 }));
    emailFieldOpacity.value = withDelay(310, withTiming(1, { duration: 280 }));
    emailFieldTranslateY.value = withDelay(310, withTiming(0, { duration: 320 }));
    nameFieldOpacity.value = withDelay(390, withTiming(1, { duration: 280 }));
    nameFieldTranslateY.value = withDelay(390, withTiming(0, { duration: 320 }));
    passwordFieldOpacity.value = withDelay(470, withTiming(1, { duration: 280 }));
    passwordFieldTranslateY.value = withDelay(470, withTiming(0, { duration: 320 }));
  }, [
    cardOpacity,
    cardTranslateY,
    emailFieldOpacity,
    emailFieldTranslateY,
    heroOpacity,
    heroTranslateY,
    nameFieldOpacity,
    nameFieldTranslateY,
    passwordFieldOpacity,
    passwordFieldTranslateY,
  ]);

  useEffect(() => {
    const strengthLevel = password.length >= 8 ? 2 : password.length >= 6 ? 1 : 0;
    barOneWidth.value = withTiming(strengthLevel >= 1 ? 20 : 0, { duration: 220 });
    barTwoWidth.value = withTiming(strengthLevel >= 2 ? 20 : 0, { duration: 220 });
  }, [barOneWidth, barTwoWidth, password.length]);

  useEffect(() => {
    if (isSaving) {
      signupScale.value = withRepeat(withTiming(0.97, { duration: 520 }), -1, true);
      return;
    }

    signupScale.value = withTiming(1, { duration: 180 });
  }, [isSaving, signupScale]);

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
      setEmail('');
      setName('');
      setPassword('');
      onSwitchToLogin();
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
            <Animated.View
              className="h-72 overflow-hidden rounded-b-[34px] bg-[#3D3AE0] px-6 pt-5"
              style={heroAnimatedStyle}>
              <View className="absolute -right-16 -top-8 h-56 w-56 rounded-full bg-[#7580FF]/45" />
              <View className="absolute -left-20 top-20 h-64 w-64 rounded-full bg-[#2F2CD0]/60" />

              <View className="flex-row items-center justify-between">
                <Pressable className="h-8 w-8 items-center justify-center rounded-full bg-white/10">
                  <ChevronLeft size={18} color="#FFFFFF" />
                </Pressable>

                <View className="flex-row items-center gap-2">
                  <Text className="text-[13px] text-white/80">Already have an account?</Text>
                  <Pressable className="rounded-lg bg-white/20 px-3 py-1.5" onPress={onSwitchToLogin}>
                    <Text className="text-[12px] font-semibold text-white">Sign in</Text>
                  </Pressable>
                </View>
              </View>

              <Text className="mt-10 text-center text-[44px] font-extrabold tracking-tight text-white">
                Jobsly
              </Text>
            </Animated.View>

            <Animated.View className="-mt-10 flex-1 rounded-t-[34px] bg-white px-6 pt-10 pb-8" style={cardAnimatedStyle}>
              <Text className="text-center text-[44px] font-extrabold tracking-tight text-[#29293D]">
                Get started free.
              </Text>
              <Text className="mt-2 text-center text-[15px] text-[#8D8CA3]">Free forever. No credit card needed.</Text>

              <View className="mt-8 gap-4">
                <Animated.View style={emailFieldAnimatedStyle}>
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
                </Animated.View>

                <Animated.View style={nameFieldAnimatedStyle}>
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
                </Animated.View>

                <Animated.View style={passwordFieldAnimatedStyle}>
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
                      <Animated.View className="h-1.5 rounded-full bg-[#7BD97F]" style={barOneAnimatedStyle} />
                      <Animated.View className="h-1.5 rounded-full bg-[#7BD97F]" style={barTwoAnimatedStyle} />
                      <Text className="text-[12px] font-semibold text-[#64BE67]">Strong</Text>
                    </View>
                  </View>
                </Animated.View>
              </View>

              <Pressable
                onPressIn={() => {
                  signupScale.value = withSpring(0.97, { damping: 14, stiffness: 220 });
                }}
                onPressOut={() => {
                  signupScale.value = withSpring(1, { damping: 12, stiffness: 220 });
                }}>
                <Animated.View style={signupButtonAnimatedStyle}>
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
                </Animated.View>
              </Pressable>

              <View className="mt-8 flex-row items-center">
                <View className="h-[1px] flex-1 bg-[#E7E7F0]" />
                <Text className="mx-3 text-[13px] text-[#A6A6BA]">Or sign up with</Text>
                <View className="h-[1px] flex-1 bg-[#E7E7F0]" />
              </View>

              <View className="mt-6 flex-row gap-3">
                <Pressable
                  className="flex-1"
                  onPressIn={() => {
                    googleScale.value = withSpring(0.97, { damping: 14, stiffness: 220 });
                  }}
                  onPressOut={() => {
                    googleScale.value = withSpring(1, { damping: 12, stiffness: 220 });
                  }}>
                  <Animated.View style={googleButtonAnimatedStyle}>
                    <View className="h-14 flex-row items-center justify-center rounded-2xl border border-[#E7E7F0]">
                      <Chrome size={18} color="#4B4B60" />
                      <Text className="ml-2 text-[15px] font-semibold text-[#3A3A50]">Google</Text>
                    </View>
                  </Animated.View>
                </Pressable>

                <Pressable
                  className="flex-1"
                  onPressIn={() => {
                    facebookScale.value = withSpring(0.97, { damping: 14, stiffness: 220 });
                  }}
                  onPressOut={() => {
                    facebookScale.value = withSpring(1, { damping: 12, stiffness: 220 });
                  }}>
                  <Animated.View style={facebookButtonAnimatedStyle}>
                    <View className="h-14 flex-row items-center justify-center rounded-2xl border border-[#E7E7F0]">
                      <Facebook size={18} color="#3B82F6" />
                      <Text className="ml-2 text-[15px] font-semibold text-[#3A3A50]">Facebook</Text>
                    </View>
                  </Animated.View>
                </Pressable>
              </View>
            </Animated.View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignupScreen;
