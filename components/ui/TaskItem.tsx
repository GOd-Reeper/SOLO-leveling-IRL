import React, { useRef, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Animated } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { ThemedText } from '../ThemedText';
import { Colors } from '@/constants/Colors';
import { CommonStyles, Shadow } from '@/constants/Theme';
import { Task, TaskPriority, TaskType } from '@/constants/Models';

interface TaskItemProps extends Omit<Task, 'createdAt'> {
  onPress?: () => void;
  onComplete?: () => void;
  createdAt?: Date;
  index?: number; // For staggered animation
}

export const TaskItem: React.FC<TaskItemProps> = ({
  title,
  description,
  xpReward,
  completed,
  priority,
  type,
  onPress,
  onComplete,
  index = 0,
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    // Entry animation with staggered delay based on index
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        delay: index * 100, // Staggered delay
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 300,
        delay: index * 100,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);
  
  useEffect(() => {
    // Animation when task is completed
    if (completed) {
      Animated.timing(opacityAnim, {
        toValue: 0.7,
        duration: 300,
        useNativeDriver: true,
      }).start();
      Animated.timing(slideAnim, {
        toValue: 10,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [completed]);

  const handleComplete = () => {
    // Animate checkbox press
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
    
    if (onComplete) {
      onComplete();
    }
  };

  const typeIcon = {
    study: 'book',
    strength: 'activity',
    social: 'users',
    discipline: 'clock',
  };

  const typeColor = {
    study: Colors.statBars.intelligence,
    strength: Colors.statBars.strength,
    social: Colors.statBars.charisma,
    discipline: Colors.statBars.discipline,
  };

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [
          { scale: scaleAnim },
          { translateX: slideAnim },
        ],
      }}
    >
      <TouchableOpacity 
        style={[
          styles.container, 
          { borderLeftColor: typeColor[type], opacity: opacityAnim }
        ]} 
        onPress={onPress}
        activeOpacity={0.8}
      >
        <View style={styles.contentContainer}>
          <View style={styles.typeIconContainer}>
            <Feather name={typeIcon[type]} size={18} color={typeColor[type]} />
          </View>
          <View style={styles.textContainer}>
            <ThemedText style={[styles.title, completed && styles.completedText]}>
              {title}
            </ThemedText>
            {description && (
              <ThemedText style={[styles.description, completed && styles.completedText]}>
                {description}
              </ThemedText>
            )}
            <ThemedText style={styles.xpReward}>+{xpReward} XP</ThemedText>
          </View>
          <TouchableOpacity 
            style={[styles.completeButton, completed && styles.completedButton]} 
            onPress={handleComplete}
          >
            <Feather 
              name={completed ? 'check-circle' : 'circle'} 
              size={24} 
              color={completed ? Colors.statBars.intelligence : Colors.text} 
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...CommonStyles.glassCard,
    marginBottom: 12,
    borderLeftWidth: 4,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  typeIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: `${Colors.background}80`,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  description: {
    fontSize: 14,
    color: Colors.light.tabIconDefault,
    marginTop: 4,
  },
  xpReward: {
    fontSize: 12,
    color: Colors.primary,
    marginTop: 4,
    fontWeight: '600',
  },
  completeButton: {
    padding: 8,
  },
  completedButton: {
  },
  completedText: {
    textDecorationLine: 'line-through',
  },
}); 