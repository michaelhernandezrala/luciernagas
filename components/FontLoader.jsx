import React, { useEffect } from 'react';
import { useFonts } from 'expo-font';
import { Fredoka_700Bold } from '@expo-google-fonts/fredoka';
import { Inter_400Regular, Inter_600SemiBold } from '@expo-google-fonts/inter';
import * as SplashScreen from 'expo-splash-screen';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function FontLoader({ children }) {
  const [fontsLoaded] = useFonts({
    Fredoka_700Bold,
    Inter_400Regular,
    Inter_600SemiBold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return <>{children}</>;
}
