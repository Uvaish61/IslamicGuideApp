import React, { useState } from 'react';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';

const App = () => {
  const [screen, setScreen] = useState<'login' | 'signup'>('login');

  if (screen === 'signup') {
    return <SignupScreen onSwitchToLogin={() => setScreen('login')} />;
  }

  return <LoginScreen onSwitchToSignup={() => setScreen('signup')} />;
};

export default App;