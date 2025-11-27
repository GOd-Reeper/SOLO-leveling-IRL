import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Platform, Image } from 'react-native';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import * as Notifications from 'expo-notifications';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { CommonStyles, Shadow } from '@/constants/Theme';
import { useOnboarding } from '@/context/OnboardingContext';

export default function NotificationsScreen() {
  const { updateNotifications } = useOnboarding();
  const [permissionRequested, setPermissionRequested] = useState(false);

  const requestPermissions = async () => {
    try {
      const { status } = await Notifications.requestPermissionsAsync();
      const allowed = status === 'granted';
      updateNotifications(allowed);
      setPermissionRequested(true);
      
      // Continue regardless of the permission result
      handleContinue();
    } catch (error) {
      console.log('Error requesting notifications permission:', error);
      updateNotifications(false);
      handleContinue();
    }
  };

  const handleContinue = () => {
    router.push('/(onboarding)/shadow-chest');
  };

  const handleSkip = () => {
    updateNotifications(false);
    router.push('/(onboarding)/shadow-chest');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.illustrationContainer}>
          <Feather name="bell" size={80} color={Colors.primary} style={styles.bellIcon} />
          <View style={styles.notificationDot} />
        </View>
        
        <View style={styles.textContainer}>
          <ThemedText style={styles.title}>Allow Notifications</ThemedText>
          <ThemedText style={styles.description}>
            Allow the System to inform you of new quests, rewards, and rank-ups
          </ThemedText>
        </View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity 
            style={styles.allowButton} 
            onPress={requestPermissions}
            activeOpacity={0.8}
          >
            <ThemedText style={styles.allowButtonText}>Allow Notifications</ThemedText>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.skipButton} 
            onPress={handleSkip}
            activeOpacity={0.8}
          >
            <ThemedText style={styles.skipButtonText}>Skip</ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  content: {
    width: '100%',
    alignItems: 'center',
  },
  illustrationContainer: {
    position: 'relative',
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  bellIcon: {
    ...Shadow.neonGlow,
  },
  notificationDot: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Colors.secondary,
    ...Shadow.purpleGlow,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: `${Colors.text}90`,
    textAlign: 'center',
    lineHeight: 24,
  },
  buttonsContainer: {
    width: '100%',
    gap: 16,
  },
  allowButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    ...Shadow.neonGlow,
  },
  allowButtonText: {
    color: Colors.text,
    fontSize: 18,
    fontWeight: '600',
  },
  skipButton: {
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
  },
  skipButtonText: {
    color: `${Colors.text}80`,
    fontSize: 16,
  },
}); 