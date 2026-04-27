import React, { useState } from 'react';
import DailyQuoteScreen from './src/screens/DailyQuoteScreen';
import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import SignupScreen from './src/screens/SignupScreen';

const App = () => {
  const [screen, setScreen] = useState<'login' | 'signup' | 'home' | 'profile' | 'settings' | 'daily-quote'>('login');

  if (screen === 'signup') {
    return (
      <SignupScreen
        onSwitchToLogin={() => setScreen('login')}
        onSignupSuccess={() => setScreen('home')}
      />
    );
  }

  if (screen === 'home') {
    return <HomeScreen onOpenProfile={() => setScreen('profile')} onOpenDailyQuote={() => setScreen('daily-quote')} />;
  }

  if (screen === 'profile') {
    return <ProfileScreen onBackToHome={() => setScreen('home')} />;
  }

  if (screen === 'settings') {
    return <SettingsScreen onBackToHome={() => setScreen('home')} />;
  }
  if (screen === 'daily-quote') {
    return <DailyQuoteScreen onBackToHome={() => setScreen('home')} />
  }
  return (
    <LoginScreen
      onSwitchToSignup={() => setScreen('signup')}
      onLoginSuccess={() => setScreen('home')}
    />
  );
};

export default App;
