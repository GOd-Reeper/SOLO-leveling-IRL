import { Stack } from 'expo-router';
import { Colors } from '@/constants/Colors';

export default function OnboardingLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: Colors.background },
        animation: 'fade',
      }}
    >
      <Stack.Screen name="welcome" />
      <Stack.Screen name="select-path" />
      <Stack.Screen name="set-stats" />
      <Stack.Screen name="daily-activity" />
      <Stack.Screen name="notifications" />
      <Stack.Screen name="shadow-chest" />
      <Stack.Screen name="awakening" />
    </Stack>
  );
} 