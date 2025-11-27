import React, { useRef, useEffect } from 'react';
import { View, Animated, StyleSheet, Text, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/Colors';

interface AnimatedProgressBarProps {
  progress: number; // Progress value from 0 to 1
  label?: string;
  height?: number;
  width?: number | string;
  colors?: string[];
  backgroundColor?: string;
  showLabel?: boolean;
  style?: ViewStyle;
  duration?: number;
  showPercent?: boolean;
  animated?: boolean;
}

export const AnimatedProgressBar: React.FC<AnimatedProgressBarProps> = ({
  progress = 0,
  label = '',
  height = 12,
  width = '100%',
  colors = [Colors.primary, Colors.secondary],
  backgroundColor = `${Colors.background}80`,
  showLabel = true,
  style,
  duration = 800,
  showPercent = true,
  animated = true,
}) => {
  // For animation
  const progressAnim = useRef(new Animated.Value(0)).current;
  const highlightAnim = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    if (animated) {
      // Animate the progress filling
      Animated.timing(progressAnim, {
        toValue: progress,
        duration: duration,
        useNativeDriver: false, // Can't use native driver for width or backgroundColor
      }).start();
      
      // Loop the highlight animation
      Animated.loop(
        Animated.sequence([
          Animated.timing(highlightAnim, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: false,
          }),
          Animated.timing(highlightAnim, {
            toValue: 0,
            duration: 1500,
            useNativeDriver: false,
          })
        ])
      ).start();
    } else {
      progressAnim.setValue(progress);
    }
  }, [progress, animated]);
  
  // Interpolate width from progress
  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
    extrapolate: 'clamp',
  });
  
  // Interpolate the highlight position
  const highlightPosition = highlightAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['-100%', '100%'],
    extrapolate: 'clamp',
  });
  
  return (
    <View style={[styles.container, { width }, style]}>
      {showLabel && (
        <View style={styles.labelContainer}>
          <Text style={styles.label}>{label}</Text>
          {showPercent && (
            <Animated.Text style={styles.percentage}>
              {progressAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '100%'],
              })}
            </Animated.Text>
          )}
        </View>
      )}
      
      <View 
        style={[
          styles.barContainer,
          { 
            height,
            backgroundColor,
            borderRadius: height / 2,
          }
        ]}
      >
        <Animated.View
          style={[
            styles.progressContainer,
            { 
              width: progressWidth,
              height,
              borderRadius: height / 2,
            }
          ]}
        >
          <LinearGradient
            colors={colors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradient}
          >
            <Animated.View 
              style={[
                styles.highlight,
                {
                  transform: [{ translateX: highlightPosition }]
                }
              ]}
            />
          </LinearGradient>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  label: {
    fontSize: 12,
    color: Colors.text,
    fontWeight: '500',
  },
  percentage: {
    fontSize: 12,
    color: Colors.primary,
    fontWeight: '600',
  },
  barContainer: {
    width: '100%',
    overflow: 'hidden',
  },
  progressContainer: {
    overflow: 'hidden',
  },
  gradient: {
    height: '100%',
    width: '100%',
    position: 'relative',
    overflow: 'hidden',
  },
  highlight: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    width: '80%',
  }
}); 