import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { CommonStyles, Shadow } from '@/constants/Theme';
import { useOnboarding } from '@/context/OnboardingContext';

export default function SetStatsScreen() {
  const { data, updateStats } = useOnboarding();
  const [stats, setStats] = useState(data.stats);
  const [useDefault, setUseDefault] = useState(true);

  const handleStatChange = (stat: keyof typeof stats, value: number) => {
    setUseDefault(false);
    setStats(prev => ({ ...prev, [stat]: value }));
  };

  const handleUseDefault = () => {
    setUseDefault(true);
    setStats({
      strength: 5,
      intelligence: 5,
      charisma: 5,
      discipline: 5,
    });
  };

  const handleConfirm = () => {
    updateStats(stats);
    router.push('/(onboarding)/daily-activity');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <ThemedText style={styles.title}>Set Starting Stats</ThemedText>
        <ThemedText style={styles.subtitle}>
          Customize your initial abilities or use the default E-Rank stats
        </ThemedText>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statRow}>
          <ThemedText style={styles.statLabel}>Strength</ThemedText>
          <View style={styles.sliderContainer}>
            <Slider
              style={styles.slider}
              minimumValue={1}
              maximumValue={10}
              step={1}
              value={stats.strength}
              onValueChange={(value) => handleStatChange('strength', value)}
              minimumTrackTintColor={Colors.statBars.strength}
              maximumTrackTintColor={`${Colors.statBars.strength}40`}
              thumbTintColor={Colors.statBars.strength}
            />
            <View style={styles.sliderValues}>
              <ThemedText style={styles.sliderMin}>1</ThemedText>
              <ThemedText style={[styles.sliderCurrent, { color: Colors.statBars.strength }]}>
                {stats.strength}
              </ThemedText>
              <ThemedText style={styles.sliderMax}>10</ThemedText>
            </View>
          </View>
        </View>

        <View style={styles.statRow}>
          <ThemedText style={styles.statLabel}>Intelligence</ThemedText>
          <View style={styles.sliderContainer}>
            <Slider
              style={styles.slider}
              minimumValue={1}
              maximumValue={10}
              step={1}
              value={stats.intelligence}
              onValueChange={(value) => handleStatChange('intelligence', value)}
              minimumTrackTintColor={Colors.statBars.intelligence}
              maximumTrackTintColor={`${Colors.statBars.intelligence}40`}
              thumbTintColor={Colors.statBars.intelligence}
            />
            <View style={styles.sliderValues}>
              <ThemedText style={styles.sliderMin}>1</ThemedText>
              <ThemedText style={[styles.sliderCurrent, { color: Colors.statBars.intelligence }]}>
                {stats.intelligence}
              </ThemedText>
              <ThemedText style={styles.sliderMax}>10</ThemedText>
            </View>
          </View>
        </View>

        <View style={styles.statRow}>
          <ThemedText style={styles.statLabel}>Charisma</ThemedText>
          <View style={styles.sliderContainer}>
            <Slider
              style={styles.slider}
              minimumValue={1}
              maximumValue={10}
              step={1}
              value={stats.charisma}
              onValueChange={(value) => handleStatChange('charisma', value)}
              minimumTrackTintColor={Colors.statBars.charisma}
              maximumTrackTintColor={`${Colors.statBars.charisma}40`}
              thumbTintColor={Colors.statBars.charisma}
            />
            <View style={styles.sliderValues}>
              <ThemedText style={styles.sliderMin}>1</ThemedText>
              <ThemedText style={[styles.sliderCurrent, { color: Colors.statBars.charisma }]}>
                {stats.charisma}
              </ThemedText>
              <ThemedText style={styles.sliderMax}>10</ThemedText>
            </View>
          </View>
        </View>

        <View style={styles.statRow}>
          <ThemedText style={styles.statLabel}>Discipline</ThemedText>
          <View style={styles.sliderContainer}>
            <Slider
              style={styles.slider}
              minimumValue={1}
              maximumValue={10}
              step={1}
              value={stats.discipline}
              onValueChange={(value) => handleStatChange('discipline', value)}
              minimumTrackTintColor={Colors.statBars.discipline}
              maximumTrackTintColor={`${Colors.statBars.discipline}40`}
              thumbTintColor={Colors.statBars.discipline}
            />
            <View style={styles.sliderValues}>
              <ThemedText style={styles.sliderMin}>1</ThemedText>
              <ThemedText style={[styles.sliderCurrent, { color: Colors.statBars.discipline }]}>
                {stats.discipline}
              </ThemedText>
              <ThemedText style={styles.sliderMax}>10</ThemedText>
            </View>
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.defaultButton, useDefault && styles.defaultButtonActive]}
        onPress={handleUseDefault}
      >
        <Feather
          name={useDefault ? 'check-circle' : 'circle'}
          size={20}
          color={useDefault ? Colors.primary : Colors.text}
        />
        <ThemedText style={styles.defaultText}>Start as E-Rank (balanced base stats)</ThemedText>
      </TouchableOpacity>

      <View style={styles.bottomContainer}>
        <TouchableOpacity 
          style={styles.confirmButton} 
          onPress={handleConfirm}
          activeOpacity={0.8}
        >
          <ThemedText style={styles.buttonText}>Confirm</ThemedText>
          <Feather name="arrow-right" size={20} color={Colors.text} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  contentContainer: {
    padding: 24,
    paddingBottom: 40,
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
  statsContainer: {
    ...CommonStyles.glassCard,
    gap: 24,
  },
  statRow: {
    gap: 12,
  },
  statLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 8,
  },
  sliderContainer: {
    width: '100%',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  sliderValues: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  sliderMin: {
    fontSize: 14,
    color: `${Colors.text}70`,
  },
  sliderCurrent: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  sliderMax: {
    fontSize: 14,
    color: `${Colors.text}70`,
  },
  defaultButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 16,
    paddingHorizontal: 4,
    marginTop: 24,
  },
  defaultButtonActive: {
    opacity: 1,
  },
  defaultText: {
    fontSize: 16,
    color: Colors.text,
  },
  bottomContainer: {
    marginTop: 40,
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