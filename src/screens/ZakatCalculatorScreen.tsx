import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  StatusBar,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Animated, {
  FadeIn,
  FadeOut,
  SlideInDown,
  ZoomIn,
} from 'react-native-reanimated';
import { ArrowLeft, Info } from 'lucide-react-native';

type ZakatCalculatorScreenProps = {
  onGoBack: () => void;
};

const ZakatCalculatorScreen = ({ onGoBack }: ZakatCalculatorScreenProps) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#ECEBFA" />
      <View style={styles.container}>
        <Text>Zakat Calculator Screen</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ECEBFA',
  },
  container: {
    flex: 1,
    padding: 16,
  },
});

export default ZakatCalculatorScreen;
