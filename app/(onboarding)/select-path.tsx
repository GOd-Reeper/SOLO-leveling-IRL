import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { CommonStyles, Shadow } from '@/constants/Theme';
import { TaskType } from '@/constants/Models';
import { useOnboarding } from '@/context/OnboardingContext';

export default function SelectPathScreen() {
  const { data, updateSelectedPaths } = useOnboarding();
  const [selected, setSelected] = useState<TaskType[]>(data.selectedPaths);
  const [showConfirmButton, setShowConfirmButton] = useState(false);

  const pathOptions: { type: TaskType; title: string; description: string; icon: string; color: string }[] = [
    {
      type: 'study',
      title: 'Study & Knowledge',
      description: 'Boost Intelligence',
      icon: 'book',
      color: Colors.statBars.intelligence
    },
    {
      type: 'strength',
      title: 'Strength & Physical Health',
      description: 'Boost Strength',
      icon: 'activity',
      color: Colors.statBars.strength
    },
    {
      type: 'social',
      title: 'Social Confidence',
      description: 'Boost Charisma',
      icon: 'users',
      color: Colors.statBars.charisma
    },
    {
      type: 'discipline',
      title: 'Self-Discipline & Habits',
      description: 'Boost Discipline',
      icon: 'clock',
      color: Colors.statBars.discipline
    },
  ];

  useEffect(() => {
    setShowConfirmButton(selected.length > 0);
  }, [selected]);

  const togglePath = (type: TaskType) => {
    setSelected(prev => {
      if (prev.includes(type)) {
        return prev.filter(t => t !== type);
      } else {
        return [...prev, type];
      }
    });
  };

  const handleConfirm = () => {
    updateSelectedPaths(selected);
    router.push('/(onboarding)/set-stats');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ThemedText style={styles.title}>Choose your Primary Path to Level Up</ThemedText>
        <ThemedText style={styles.subtitle}>Select one or more paths that interest you most</ThemedText>
      </View>

      <View style={styles.pathsContainer}>
        {pathOptions.map((path) => (
          <TouchableOpacity
            key={path.type}
            style={[
              styles.pathCard,
              selected.includes(path.type) && { borderColor: path.color, borderWidth: 2 }
            ]}
            onPress={() => togglePath(path.type)}
            activeOpacity={0.8}
          >
            <View style={[styles.iconContainer, { backgroundColor: `${path.color}20` }]}>
              <Feather 
                name={path.icon as any} 
                size={24} 
                color={path.color} 
              />
            </View>
            <View style={styles.pathInfo}>
              <ThemedText style={styles.pathTitle}>{path.title}</ThemedText>
              <ThemedText style={styles.pathDescription}>{path.description}</ThemedText>
            </View>
            <View style={styles.checkboxContainer}>
              {selected.includes(path.type) && (
                <View style={[styles.checkbox, { backgroundColor: path.color }]}>
                  <Feather name="check" size={16} color={Colors.text} />
                </View>
              )}
              {!selected.includes(path.type) && (
                <View style={styles.checkboxEmpty} />
              )}
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {selected.length > 0 && (
        <View style={styles.selectionInfo}>
          <ThemedText style={styles.selectionText}>
            {selected.length} path{selected.length > 1 ? 's' : ''} selected
          </ThemedText>
        </View>
      )}

      <View style={styles.bottomContainer}>
        {showConfirmButton && (
          <TouchableOpacity 
            style={styles.confirmButton} 
            onPress={handleConfirm}
            activeOpacity={0.8}
          >
            <ThemedText style={styles.buttonText}>Confirm Path</ThemedText>
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
  pathsContainer: {
    gap: 16,
  },
  pathCard: {
    ...CommonStyles.glassCard,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 12,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  pathInfo: {
    flex: 1,
  },
  pathTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  pathDescription: {
    fontSize: 14,
    color: `${Colors.text}80`,
    marginTop: 4,
  },
  checkboxContainer: {
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxEmpty: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: `${Colors.text}50`,
  },
  selectionInfo: {
    marginTop: 16,
    alignItems: 'center',
  },
  selectionText: {
    fontSize: 14,
    color: Colors.primary,
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