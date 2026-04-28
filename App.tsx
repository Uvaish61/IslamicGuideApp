import React, { useState } from 'react';
import DailyQuoteScreen from './src/screens/DailyQuoteScreen';
import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import SignupScreen from './src/screens/SignupScreen';
import FavoritesScreen from './src/screens/FavoritesScreen';
import BottomNav from './src/components/BottomNav';

const App = () => {
  const [screen, setScreen] = useState<'login' | 'signup' | 'home' | 'profile' | 'settings' | 'daily-quote' | 'favorites'>('login');

  const getActiveTab = () => {
    switch (screen) {
      case 'home':
        return 'home';
      case 'daily-quote':
        return 'daily';
      case 'favorites':
        return 'favorites';
      case 'profile':
        return 'profile';
      case 'settings':
        return 'settings';
      default:
        return 'home';
    }
  };

  const handleTabPress = (tab: 'home' | 'daily' | 'favorites' | 'profile' | 'settings') => {
    switch (tab) {
      case 'home':
        setScreen('home');
        break;
      case 'daily':
        setScreen('daily-quote');
        break;
      case 'favorites':
        setScreen('favorites');
        break;
      case 'profile':
        setScreen('profile');
        break;
      case 'settings':
        setScreen('settings');
        break;
    }
  };

  if (screen === 'signup') {
    return (
      <SignupScreen
        onSwitchToLogin={() => setScreen('login')}
        onSignupSuccess={() => setScreen('home')}
      />
    );
  }

  if (screen === 'login') {
    return (
      <LoginScreen
        onSwitchToSignup={() => setScreen('signup')}
        onLoginSuccess={() => setScreen('home')}
      />
    );
  }

  // screens with bottom nav
  return (
    <>
      {screen === 'home' && (
        <HomeScreen onOpenProfile={() => setScreen('profile')} onOpenDailyQuote={() => setScreen('daily-quote')} onOpenSettings={() => setScreen('settings')} />
      )}
      {screen === 'profile' && <ProfileScreen onBackToHome={() => setScreen('home')} />}
      {screen === 'settings' && <SettingsScreen onBackToHome={() => setScreen('home')} />}
      {screen === 'daily-quote' && <DailyQuoteScreen onBackToHome={() => setScreen('home')} />}
      {screen === 'favorites' && <FavoritesScreen />}

      <BottomNav active={getActiveTab()} onTabPress={handleTabPress} />
    </>
  );
};

export default App;
