import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  StatusBar,
  Text,
  TextInput,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native';
import { Globe, ChevronLeft, Eye, Users, Lock, Mail } from 'lucide-react-native';

type LoginScreenProps = {
  onSwitchToSignup: () => void;
  onLoginSuccess: () => void;
};

const LoginScreen = ({ onSwitchToSignup, onLoginSuccess }: LoginScreenProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);

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

      Alert.alert('Login successful', `Welcome back, ${savedUser.name || 'User'}!`, [
        {
          text: 'Continue',
          onPress: onLoginSuccess,
        },
      ]);
      setEmail('');
      setPassword('');
    } catch {
      Alert.alert('Error', 'Could not read account data.');
    } finally {
      setIsSigningIn(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#3D3AE0" />

      <KeyboardAvoidingView
        style={styles.flex1}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          style={styles.flex1}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}>
          <View style={styles.screenBg}>
            <View style={styles.topSection}>
              <View style={styles.topBubbleRight} />
              <View style={styles.topBubbleLeft} />

              <View style={styles.topRow}>
                <Pressable style={styles.backButton}>
                  <ChevronLeft size={18} color="#FFFFFF" />
                </Pressable>

                <View style={styles.switchRow}>
                  <Text style={styles.switchHint}>Don't have an account?</Text>
                  <Pressable style={styles.switchButton} onPress={onSwitchToSignup}>
                    <Text style={styles.switchButtonText}>Get Started</Text>
                  </Pressable>
                </View>
              </View>

              <Text style={styles.brand}>Jobsly</Text>
            </View>

            <View style={styles.card}>
              <Text style={styles.title}>Welcome Back</Text>
              <Text style={styles.subtitle}>Enter your details below</Text>

              <View style={styles.formWrap}>
                <View style={styles.inputRow}>
                  <Mail size={18} color="#9E9EB0" />
                  <TextInput
                    style={styles.input}
                    placeholder="Email Address"
                    placeholderTextColor="#B0B0C2"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                  />
                </View>

                <View style={styles.passwordShell}>
                  <View style={styles.inputRowNoBorder}>
                    <Lock size={18} color="#9E9EB0" />
                    <TextInput
                      style={styles.input}
                      placeholder="Password"
                      placeholderTextColor="#B0B0C2"
                      secureTextEntry={!showPassword}
                      value={password}
                      onChangeText={setPassword}
                    />
                    <Pressable
                      style={styles.eyeButton}
                      onPress={() => setShowPassword(prev => !prev)}>
                      <Eye size={16} color="#9E9EB0" />
                    </Pressable>
                  </View>
                </View>
              </View>

              <Pressable
                style={[styles.signInButton, isSigningIn && styles.signInButtonDisabled]}
                onPress={handleSignIn}
                disabled={isSigningIn}>
                {isSigningIn ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text style={styles.signInText}>Sign in</Text>
                )}
              </Pressable>

              <Pressable style={styles.forgotWrap}>
                <Text style={styles.forgotText}>Forgot your password?</Text>
              </Pressable>

              <View style={styles.dividerRow}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>Or sign in with</Text>
                <View style={styles.dividerLine} />
              </View>

              <View style={styles.socialRow}>
                <Pressable style={styles.socialButton}>
                  <Globe size={18} color="#4B4B60" />
                  <Text style={styles.socialText}>Google</Text>
                </Pressable>

                <Pressable style={styles.socialButton}>
                  <Users size={18} color="#3B82F6" />
                  <Text style={styles.socialText}>Facebook</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ECEBFA',
  },
  flex1: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  screenBg: {
    minHeight: '100%',
    backgroundColor: '#ECEBFA',
  },
  topSection: {
    height: 288,
    overflow: 'hidden',
    borderBottomLeftRadius: 34,
    borderBottomRightRadius: 34,
    backgroundColor: '#3D3AE0',
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  topBubbleRight: {
    position: 'absolute',
    right: -68,
    top: -28,
    height: 224,
    width: 224,
    borderRadius: 999,
    backgroundColor: 'rgba(117, 128, 255, 0.45)',
  },
  topBubbleLeft: {
    position: 'absolute',
    left: -82,
    top: 82,
    height: 256,
    width: 256,
    borderRadius: 999,
    backgroundColor: 'rgba(47, 44, 208, 0.6)',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    height: 32,
    width: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  switchHint: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.82)',
  },
  switchButton: {
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.18)',
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  switchButtonText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  brand: {
    marginTop: 40,
    textAlign: 'center',
    fontSize: 44,
    lineHeight: 50,
    fontWeight: '800',
    letterSpacing: -0.8,
    color: '#FFFFFF',
  },
  card: {
    marginTop: -32,
    flex: 1,
    borderTopLeftRadius: 34,
    borderTopRightRadius: 34,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 28,
  },
  title: {
    textAlign: 'center',
    fontSize: 41,
    lineHeight: 46,
    fontWeight: '800',
    letterSpacing: -1,
    color: '#29293D',
  },
  subtitle: {
    marginTop: 8,
    textAlign: 'center',
    fontSize: 15,
    color: '#8D8CA3',
  },
  formWrap: {
    marginTop: 32,
    gap: 14,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E8E8F0',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  passwordShell: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E8E8F0',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  inputRowNoBorder: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    marginLeft: 12,
    flex: 1,
    fontSize: 15,
    color: '#2C2C3E',
  },
  eyeButton: {
    marginLeft: 8,
    height: 32,
    width: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 999,
    backgroundColor: '#F5F5FA',
  },
  signInButton: {
    marginTop: 24,
    alignItems: 'center',
    borderRadius: 16,
    backgroundColor: '#5548EF',
    paddingVertical: 16,
  },
  signInButtonDisabled: {
    opacity: 0.7,
  },
  signInText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  forgotWrap: {
    marginTop: 18,
    alignItems: 'center',
  },
  forgotText: {
    fontSize: 14,
    color: '#7E7D94',
  },
  dividerRow: {
    marginTop: 28,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dividerLine: {
    height: StyleSheet.hairlineWidth,
    flex: 1,
    backgroundColor: '#E7E7F0',
  },
  dividerText: {
    marginHorizontal: 12,
    fontSize: 13,
    color: '#A6A6BA',
  },
  socialRow: {
    marginTop: 20,
    flexDirection: 'row',
    gap: 12,
  },
  socialButton: {
    height: 56,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E7E7F0',
  },
  socialText: {
    marginLeft: 8,
    fontSize: 15,
    fontWeight: '700',
    color: '#3A3A50',
  },
});

export default LoginScreen;
