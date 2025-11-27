import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Animated, Easing } from 'react-native';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { CommonStyles, Shadow } from '@/constants/Theme';

// Constants for storage keys
const ONBOARDING_COMPLETE_KEY = 'onboarding_complete';

export default function AwakeningScreen() {
  const [showButton, setShowButton] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  
  // Animation values
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const scaleAnim = React.useRef(new Animated.Value(0.5)).current;
  const glitchXAnim = React.useRef(new Animated.Value(0)).current;
  const glitchYAnim = React.useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    // Start the animation sequence
    setTimeout(() => {
      // First animate fade and scale
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
        }),
      ]).start(() => {
        // Then trigger glitch effect (now with native driver)
        Animated.sequence([
          // X movement
          Animated.timing(glitchXAnim, {
            toValue: -10,
            duration: 100,
            useNativeDriver: true,
          }),
          Animated.timing(glitchXAnim, {
            toValue: 5,
            duration: 100,
            useNativeDriver: true,
          }),
          Animated.timing(glitchXAnim, {
            toValue: -5,
            duration: 100,
            useNativeDriver: true,
          }),
          Animated.timing(glitchXAnim, {
            toValue: 2,
            duration: 100,
            useNativeDriver: true,
          }),
          Animated.timing(glitchXAnim, {
            toValue: 0,
            duration: 100,
            useNativeDriver: true,
          }),
          // Y movement
          Animated.timing(glitchYAnim, {
            toValue: 5,
            duration: 100,
            useNativeDriver: true,
          }),
          Animated.timing(glitchYAnim, {
            toValue: -10,
            duration: 100,
            useNativeDriver: true,
          }),
          Animated.timing(glitchYAnim, {
            toValue: 7,
            duration: 100,
            useNativeDriver: true,
          }),
          Animated.timing(glitchYAnim, {
            toValue: -2,
            duration: 100,
            useNativeDriver: true,
          }),
          Animated.timing(glitchYAnim, {
            toValue: 0,
            duration: 100,
            useNativeDriver: true,
          }),
        ]).start(() => {
          setAnimationComplete(true);
          setTimeout(() => {
            setShowButton(true);
          }, 800);
        });
      });
    }, 500);
  }, []);

  const handleEnterSystem = async () => {
    try {
      // Save that onboarding is complete
      await AsyncStorage.setItem(ONBOARDING_COMPLETE_KEY, 'true');
      
      // Navigate to the main app
      router.replace('/(tabs)');
    } catch (error) {
      console.log('Error saving onboarding status:', error);
      // Navigate anyway even if saving failed
      router.replace('/(tabs)');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Animated.View 
          style={[
            styles.awakeningContainer,
            {
              opacity: fadeAnim,
              transform: [
                { scale: scaleAnim },
                { translateX: glitchXAnim },
                { translateY: glitchYAnim },
              ],
            },
          ]}
        >
          <LinearGradient
            colors={['rgba(60, 145, 230, 0.8)', 'rgba(161, 92, 255, 0.8)']}
            style={styles.gradientBackground}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          />
          
          <ThemedText style={styles.awakeningText}>
            {animationComplete ? 'HUNTER AWAKENED' : 'HUNTER AWAKENING'}
          </ThemedText>
          
          {animationComplete && (
            <View style={styles.rankContainer}>
              <ThemedText style={styles.rankLabel}>INITIAL RANK</ThemedText>
              <ThemedText style={styles.rankText}>E</ThemedText>
            </View>
          )}
        </Animated.View>

        {showButton && (
          <Animated.View 
            style={{
              opacity: fadeAnim,
            }}
          >
            <TouchableOpacity 
              style={styles.enterButton} 
              onPress={handleEnterSystem}
              activeOpacity={0.8}
            >
              <ThemedText style={styles.buttonText}>Enter the System</ThemedText>
              <Feather name="arrow-right" size={20} color={Colors.text} />
            </TouchableOpacity>
          </Animated.View>
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
    gap: 60,
  },
  awakeningContainer: {
    width: 300,
    height: 300,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: `${Colors.background}90`,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  gradientBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.5,
  },
  awakeningText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: Colors.text,
    textAlign: 'center',
    ...CommonStyles.neonText,
    marginBottom: 30,
  },
  rankContainer: {
    alignItems: 'center',
  },
  rankLabel: {
    fontSize: 16,
    color: Colors.text,
    marginBottom: 10,
  },
  rankText: {
    fontSize: 60,
    fontWeight: 'bold',
    color: Colors.ranks.E,
    textShadowColor: Colors.ranks.E,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  enterButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    ...Shadow.neonGlow,
    minWidth: 220,
    justifyContent: 'center',
  },
  buttonText: {
    color: Colors.text,
    fontSize: 18,
    fontWeight: '600',
  },
}); 