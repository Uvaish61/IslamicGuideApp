import React, { useState } from 'react';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';

const App = () => {
  const [screen, setScreen] = useState<'login' | 'signup'>('login');
  const transitionProgress = useSharedValue(1);

  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: transitionProgress.value,
    transform: [{ scale: 0.985 + transitionProgress.value * 0.015 }],
  }));

  const switchScreen = (nextScreen: 'login' | 'signup') => {
    transitionProgress.value = withTiming(0, { duration: 120 }, finished => {
      if (!finished) {
        return;
      }

      runOnJS(setScreen)(nextScreen);
      transitionProgress.value = withTiming(1, { duration: 180 });
    });
  };

  if (screen === 'signup') {
    return (
      <Animated.View className="flex-1" style={containerAnimatedStyle}>
        <SignupScreen onSwitchToLogin={() => switchScreen('login')} />
      </Animated.View>
    );
  }

  return (
    <Animated.View className="flex-1" style={containerAnimatedStyle}>
      <LoginScreen onSwitchToSignup={() => switchScreen('signup')} />
    </Animated.View>
  );
};

export default App;