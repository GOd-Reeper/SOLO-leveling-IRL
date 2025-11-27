import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Animated } from 'react-native';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { CommonStyles, Shadow } from '@/constants/Theme';

export default function ShadowChestScreen() {
  const [showButton, setShowButton] = useState(false);
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const glowOpacityAnim = useRef(new Animated.Value(0)).current;
  const glowSizeAnim = useRef(new Animated.Value(100)).current;
  
  useEffect(() => {
    // Animation sequence
    Animated.sequence([
      // Start with the chest scaling up
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      // Then start the glow effect (split into separate animations)
      Animated.parallel([
        Animated.timing(glowOpacityAnim, {
          toValue: 0.8,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(glowSizeAnim, {
          toValue: 130,
          duration: 800,
          useNativeDriver: true,
        })
      ])
    ]).start(() => {
      // Show the button after animations complete
      setShowButton(true);
    });
  }, []);

  const handleContinue = () => {
    router.push('/(onboarding)/awakening');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <ThemedText style={styles.title}>Daily Shadow Chest</ThemedText>
        
        {/* Chest illustration with animation */}
        <View style={styles.chestContainer}>
          <Animated.View
            style={[
              styles.glowEffect,
              {
                opacity: glowOpacityAnim,
                transform: [{ scale: glowSizeAnim.interpolate({
                  inputRange: [100, 130],
                  outputRange: [1, 1.3]
                }) }],
              },
            ]}
          />
          <Animated.View
            style={[
              styles.chestIcon,
              {
                transform: [{ scale: scaleAnim }],
              },
            ]}
          >
            <Feather name="package" size={80} color={Colors.secondary} />
          </Animated.View>
        </View>
        
        <View style={styles.textContainer}>
          <ThemedText style={styles.description}>
            Return daily to claim rewards from your Shadow Chest. Gain XP, titles, and special items to help you on your journey.
          </ThemedText>
        </View>

        {showButton && (
          <TouchableOpacity 
            style={styles.continueButton} 
            onPress={handleContinue}
            activeOpacity={0.8}
          >
            <ThemedText style={styles.buttonText}>Got it</ThemedText>
            <Feather name="arrow-right" size={20} color={Colors.text} />
          </TouchableOpacity>
        )}
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 40,
  },
  chestContainer: {
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    position: 'relative',
  },
  glowEffect: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 75, // Half of width/height
    backgroundColor: Colors.secondary,
    opacity: 0.2,
  },
  chestIcon: {
    ...Shadow.purpleGlow,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  description: {
    fontSize: 16,
    color: `${Colors.text}90`,
    textAlign: 'center',
    lineHeight: 24,
  },
  continueButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    ...Shadow.neonGlow,
  },
  buttonText: {
    color: Colors.text,
    fontSize: 18,
    fontWeight: '600',
  },
}); 