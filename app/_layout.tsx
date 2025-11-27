import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Stack, SplashScreen, router } from 'expo-router';
import { useFonts } from 'expo-font';
import { DefaultTheme, DarkTheme, ThemeProvider } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-reanimated';
import { useColorScheme } from 'react-native';

import { OnboardingProvider } from '@/context/OnboardingContext';

// Constants for storage keys
const ONBOARDING_COMPLETE_KEY = 'onboarding_complete';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [initialRoute, setInitialRoute] = useState<string | null>(null);
  const colorScheme = useColorScheme();
  
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    // Add other custom fonts here
  });

  // Check if onboarding has been completed
  useEffect(() => {
    async function checkOnboarding() {
      try {
        const onboardingComplete = await AsyncStorage.getItem(ONBOARDING_COMPLETE_KEY);
        setInitialRoute(onboardingComplete === 'true' ? '/(tabs)' : '/(onboarding)');
      } catch (error) {
        console.log('Error checking onboarding status:', error);
        setInitialRoute('/(onboarding)');
      }
    }

    checkOnboarding();
  }, []);

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded && initialRoute) {
      SplashScreen.hideAsync();
    }
  }, [loaded, initialRoute]);

  if (!loaded || !initialRoute) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <OnboardingProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(onboarding)" options={{ animation: 'fade' }} />
          <Stack.Screen name="(tabs)" options={{ animation: 'fade' }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </OnboardingProvider>
    </ThemeProvider>
  );
}
