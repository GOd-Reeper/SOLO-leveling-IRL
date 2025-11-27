import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { CommonStyles, Shadow } from '@/constants/Theme';

export default function WelcomeScreen() {
  const [currentText, setCurrentText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [lineIndex, setLineIndex] = useState(0);
  const [showButton, setShowButton] = useState(false);

  const welcomeLines = [
    'System Initializing...',
    'Welcome, New Hunter.',
    'Prepare to Level Up: IRL.',
  ];

  useEffect(() => {
    if (lineIndex >= welcomeLines.length) {
      setShowButton(true);
      return;
    }

    const targetText = welcomeLines[lineIndex];
    
    if (textIndex < targetText.length) {
      const typingTimer = setTimeout(() => {
        setCurrentText(prev => prev + targetText[textIndex]);
        setTextIndex(prev => prev + 1);
      }, 100); // typing speed
      
      return () => clearTimeout(typingTimer);
    } else {
      const lineChangeTimer = setTimeout(() => {
        setLineIndex(prev => prev + 1);
        setTextIndex(0);
        setCurrentText('');
      }, 1000); // pause between lines
      
      return () => clearTimeout(lineChangeTimer);
    }
  }, [textIndex, lineIndex]);

  const handleContinue = () => {
    router.push('/(onboarding)/select-path');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.textContainer}>
          {/* Blinking cursor effect */}
          <ThemedText style={styles.typeText}>
            {currentText}
            <ThemedText style={[styles.cursor, textIndex % 2 === 0 && styles.blinkingCursor]}>|</ThemedText>
          </ThemedText>
        </View>

        {showButton && (
          <TouchableOpacity 
            style={styles.continueButton} 
            onPress={handleContinue}
            activeOpacity={0.8}
          >
            <ThemedText style={styles.buttonText}>Start Your Journey</ThemedText>
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
  textContainer: {
    marginBottom: 60,
    minHeight: 100,
    justifyContent: 'center',
  },
  typeText: {
    ...CommonStyles.neonText,
    fontSize: 26,
    fontWeight: '600',
    textAlign: 'center',
  },
  cursor: {
    color: Colors.primary,
  },
  blinkingCursor: {
    opacity: 0,
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