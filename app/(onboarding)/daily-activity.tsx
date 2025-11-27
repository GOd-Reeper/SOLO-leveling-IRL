import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { CommonStyles, Shadow } from '@/constants/Theme';
import { useOnboarding } from '@/context/OnboardingContext';

export default function DailyActivityScreen() {
  const { data, updateActivityLevel } = useOnboarding();
  const [selected, setSelected] = useState(data.activityLevel);

  const activityOptions = [
    {
      level: 'casual' as const,
      title: 'Casual Hunter',
      description: '3–4 quests per day',
      icon: 'moon',
    },
    {
      level: 'active' as const,
      title: 'Active Hunter',
      description: '5–7 quests per day',
      icon: 'sun',
    },
    {
      level: 'hardcore' as const,
      title: 'Hardcore Hunter',
      description: '10+ quests per day',
      icon: 'zap',
    },
  ];

  const handleSelect = (level: typeof selected) => {
    setSelected(level);
  };

  const handleConfirm = () => {
    updateActivityLevel(selected);
    router.push('/(onboarding)/notifications');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ThemedText style={styles.title}>Set Daily Activity Level</ThemedText>
        <ThemedText style={styles.subtitle}>
          How many quests per day do you want to complete?
        </ThemedText>
      </View>

      <View style={styles.optionsContainer}>
        {activityOptions.map((option) => (
          <TouchableOpacity
            key={option.level}
            style={[
              styles.optionCard,
              selected === option.level && styles.selectedCard,
            ]}
            onPress={() => handleSelect(option.level)}
            activeOpacity={0.8}
          >
            <View 
              style={[
                styles.iconContainer,
                selected === option.level && styles.selectedIconContainer,
              ]}
            >
              <Feather
                name={option.icon as any}
                size={28}
                color={selected === option.level ? Colors.text : Colors.primary}
              />
            </View>
            <View style={styles.optionInfo}>
              <ThemedText style={styles.optionTitle}>{option.title}</ThemedText>
              <ThemedText style={styles.optionDescription}>{option.description}</ThemedText>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.bottomContainer}>
        <TouchableOpacity 
          style={styles.confirmButton} 
          onPress={handleConfirm}
          activeOpacity={0.8}
        >
          <ThemedText style={styles.buttonText}>Continue</ThemedText>
          <Feather name="arrow-right" size={20} color={Colors.text} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 24,
  },
  header: {
    marginTop: 60,
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: `${Colors.text}90`,
  },
  optionsContainer: {
    gap: 16,
  },
  optionCard: {
    ...CommonStyles.glassCard,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
  },
  selectedCard: {
    borderColor: Colors.primary,
    borderWidth: 2,
    backgroundColor: `${Colors.primary}20`,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: `${Colors.primary}20`,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  selectedIconContainer: {
    backgroundColor: Colors.primary,
  },
  optionInfo: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 14,
    color: `${Colors.text}80`,
  },
  bottomContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 32,
    alignItems: 'center',
  },
  confirmButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    ...Shadow.neonGlow,
    minWidth: 200,
    justifyContent: 'center',
  },
  buttonText: {
    color: Colors.text,
    fontSize: 18,
    fontWeight: '600',
  },
}); 