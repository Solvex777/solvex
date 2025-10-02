import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';

import { AuthProvider, useAuth } from './src/contexts/AuthContext';
import MainTabs from './src/navigation/MainTabs';
import LoginScreen from './src/screens/Auth/LoginScreen';


/**
 * Root component that decides which navigator to show based on authentication state.
 */
function RootNavigator() {
  const { user } = useAuth();
  return user ? <MainTabs /> : <LoginScreen />;
}

export default function App() {
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#0066cc',
      accent: '#00b386',
    },
  };
  return (
    <PaperProvider theme={theme}>
      <AuthProvider>
        <NavigationContainer>
          <StatusBar style="auto" />
          <RootNavigator />
        </NavigationContainer>
      </AuthProvider>
    </PaperProvider>
  );
}