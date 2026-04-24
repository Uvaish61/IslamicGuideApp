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
import { Chrome, ChevronLeft, Eye, Facebook, Lock, Mail } from 'lucide-react-native';
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withRepeat, withSpring, withTiming } from 'react-native-reanimated';

type LoginScreenProps = {
  onSwitchToSignup: () => void;
};

const LoginScreen = ({ onSwitchToSignup }: LoginScreenProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const heroOpacity = useSharedValue(0);
  const heroTranslateY = useSharedValue(-22);
  const cardOpacity = useSharedValue(0);
  const cardTranslateY = useSharedValue(26);
  const emailFieldOpacity = useSharedValue(0);
  const emailFieldTranslateY = useSharedValue(16);
  const passwordFieldOpacity = useSharedValue(0);
  const passwordFieldTranslateY = useSharedValue(16);
  const signinScale = useSharedValue(1);
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

  const passwordFieldAnimatedStyle = useAnimatedStyle(() => ({
    opacity: passwordFieldOpacity.value,
    transform: [{ translateY: passwordFieldTranslateY.value }],
  }));

  const signinButtonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: signinScale.value }],
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
    passwordFieldOpacity.value = withDelay(390, withTiming(1, { duration: 280 }));
    passwordFieldTranslateY.value = withDelay(390, withTiming(0, { duration: 320 }));
  }, [
    cardOpacity,
    cardTranslateY,
    emailFieldOpacity,
    emailFieldTranslateY,
    heroOpacity,
    heroTranslateY,
    passwordFieldOpacity,
    passwordFieldTranslateY,
  ]);

  useEffect(() => {
    if (isSigningIn) {
      signinScale.value = withRepeat(withTiming(0.97, { duration: 520 }), -1, true);
      return;
    }

    signinScale.value = withTiming(1, { duration: 180 });
  }, [isSigningIn, signinScale]);

  const handleSignIn = async () => {
    const trimmedEmail = email.trim().toLowerCase();

    if (!trimmedEmail || !password) {
      Alert.alert('Missing fields', 'Please enter email and password.');
      return;
    }

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail);
    if (!isValidEmail) {
      Alert.alert('Invalid email', 'Please enter a valid email address.');
      return;
    }

    try {
      setIsSigningIn(true);
      const savedUserRaw = await AsyncStorage.getItem('auth_user');
      if (!savedUserRaw) {
        Alert.alert('No account', 'No account found. Please sign up first.');
        onSwitchToSignup();
        return;
      }

      const savedUser = JSON.parse(savedUserRaw);
      if (!savedUser?.email || !savedUser?.password) {
        Alert.alert('Invalid account data', 'Saved account data is incomplete.');
        return;
      }

      const isEmailMatch = savedUser.email === trimmedEmail;
      const isPasswordMatch = savedUser.password === password;

      if (!isEmailMatch || !isPasswordMatch) {
        Alert.alert('Login failed', 'Email or password is incorrect.');
        return;
      }

      Alert.alert('Login successful', `Welcome back, ${savedUser.name || 'User'}!`);
      setEmail('');
      setPassword('');
    } catch {
      Alert.alert('Error', 'Could not read account data.');
    } finally {
      setIsSigningIn(false);
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
                  <Text className="text-[13px] text-white/80">Don't have an account?</Text>
                  <Pressable className="rounded-lg bg-white/20 px-3 py-1.5" onPress={onSwitchToSignup}>
                    <Text className="text-[12px] font-semibold text-white">Get Started</Text>
                  </Pressable>
                </View>
              </View>

              <Text className="mt-10 text-center text-[44px] font-extrabold tracking-tight text-white">
                Jobsly
              </Text>
            </Animated.View>

            <Animated.View className="-mt-10 flex-1 rounded-t-[34px] bg-white px-6 pt-10 pb-8" style={cardAnimatedStyle}>
              <Text className="text-center text-[44px] font-extrabold tracking-tight text-[#29293D]">
                Welcome Back
              </Text>
              <Text className="mt-2 text-center text-[15px] text-[#8D8CA3]">Enter your details below</Text>

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
                  </View>
                </Animated.View>
              </View>

              <Pressable
                onPressIn={() => {
                  signinScale.value = withSpring(0.97, { damping: 14, stiffness: 220 });
                }}
                onPressOut={() => {
                  signinScale.value = withSpring(1, { damping: 12, stiffness: 220 });
                }}
                onPress={handleSignIn}
                disabled={isSigningIn}>
                <Animated.View className="mt-6 items-center rounded-2xl bg-[#5548EF] py-4" style={signinButtonAnimatedStyle}>
                  {isSigningIn ? (
                    <ActivityIndicator color="#FFFFFF" />
                  ) : (
                    <Text className="text-[16px] font-semibold text-white">Sign in</Text>
                  )}
                </Animated.View>
              </Pressable>

              <Pressable className="mt-5 items-center">
                <Text className="text-[14px] text-[#7E7D94]">Forgot your password?</Text>
              </Pressable>

              <View className="mt-8 flex-row items-center">
                <View className="h-[1px] flex-1 bg-[#E7E7F0]" />
                <Text className="mx-3 text-[13px] text-[#A6A6BA]">Or sign in with</Text>
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
                  <Animated.View className="h-14 flex-row items-center justify-center rounded-2xl border border-[#E7E7F0]" style={googleButtonAnimatedStyle}>
                    <Chrome size={18} color="#4B4B60" />
                    <Text className="ml-2 text-[15px] font-semibold text-[#3A3A50]">Google</Text>
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
                  <Animated.View className="h-14 flex-row items-center justify-center rounded-2xl border border-[#E7E7F0]" style={facebookButtonAnimatedStyle}>
                    <Facebook size={18} color="#3B82F6" />
                    <Text className="ml-2 text-[15px] font-semibold text-[#3A3A50]">Facebook</Text>
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

export default LoginScreen;
