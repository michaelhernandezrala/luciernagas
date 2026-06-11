import React, { useEffect } from 'react';
import { useFonts, BubblegumSans_400Regular } from '@expo-google-fonts/bubblegum-sans';
import * as SplashScreen from 'expo-splash-screen';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function FontLoader({ children }) {
  const [fontsLoaded] = useFonts({
    BubblegumSans_400Regular,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return children;
}
