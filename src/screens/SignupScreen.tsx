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
import { Globe, ChevronLeft, Eye, Users, Lock, Mail, User } from 'lucide-react-native';

type SignupScreenProps = {
  onSwitchToLogin: () => void;
  onSignupSuccess: () => void;
};

const SignupScreen = ({ onSwitchToLogin, onSignupSuccess }: SignupScreenProps) => {
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
      setEmail('');
      setName('');
      setPassword('');
      onSignupSuccess();
    } catch {
      Alert.alert('Error', 'Could not save account. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const strengthLevel = password.length >= 8 ? 2 : password.length >= 6 ? 1 : 0;

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
                  <Text style={styles.switchHint}>Already have an account?</Text>
                  <Pressable style={styles.switchButton} onPress={onSwitchToLogin}>
                    <Text style={styles.switchButtonText}>Sign in</Text>
                  </Pressable>
                </View>
              </View>

              <Text style={styles.brand}>Jobsly</Text>
            </View>

            <View style={styles.card}>
              <Text style={styles.title}>Get started free.</Text>
              <Text style={styles.subtitle}>Free forever. No credit card needed.</Text>

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

                <View style={styles.inputRow}>
                  <User size={18} color="#9E9EB0" />
                  <TextInput
                    style={styles.input}
                    placeholder="Your name"
                    placeholderTextColor="#B0B0C2"
                    value={name}
                    onChangeText={setName}
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

                  <View style={styles.strengthRow}>
                    <View style={[styles.strengthDot, strengthLevel >= 1 ? styles.strengthDotActive : styles.strengthDotInactive]} />
                    <View style={[styles.strengthDot, strengthLevel >= 2 ? styles.strengthDotActive : styles.strengthDotInactive]} />
                    <Text style={styles.strengthText}>Strong</Text>
                  </View>
                </View>
              </View>

              <Pressable
                style={[styles.signUpButton, isSaving && styles.signUpButtonDisabled]}
                onPress={handleSignup}
                disabled={isSaving}>
                {isSaving ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text style={styles.signUpText}>Sign up</Text>
                )}
              </Pressable>

              <View style={styles.dividerRow}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>Or sign up with</Text>
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
  strengthRow: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 8,
  },
  strengthDot: {
    height: 6,
    width: 20,
    borderRadius: 999,
  },
  strengthDotActive: {
    backgroundColor: '#7BD97F',
  },
  strengthDotInactive: {
    backgroundColor: '#E7E7F0',
  },
  strengthText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64BE67',
  },
  signUpButton: {
    marginTop: 24,
    alignItems: 'center',
    borderRadius: 16,
    backgroundColor: '#5548EF',
    paddingVertical: 16,
  },
  signUpButtonDisabled: {
    opacity: 0.7,
  },
  signUpText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
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

export default SignupScreen;
