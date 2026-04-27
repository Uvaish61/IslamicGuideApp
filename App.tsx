import React, { useState } from 'react';
import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';

const App = () => {
  const [screen, setScreen] = useState<'login' | 'signup' | 'home'>('login');

  if (screen === 'signup') {
    return (
      <SignupScreen
        onSwitchToLogin={() => setScreen('login')}
        onSignupSuccess={() => setScreen('home')}
      />
    );
  }

  if (screen === 'home') {
    return <HomeScreen />;
  }

  return (
    <LoginScreen
      onSwitchToSignup={() => setScreen('signup')}
      onLoginSuccess={() => setScreen('home')}
    />
  );
};

export default App;
