import React, { useRef, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View, Animated, Text, TextStyle, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/Colors';
import { Shadow } from '@/constants/Theme';

interface AnimatedGradientButtonProps {
  title: string;
  onPress: () => void;
  icon?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
  colors?: string[];
  disabled?: boolean;
  glow?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export const AnimatedGradientButton: React.FC<AnimatedGradientButtonProps> = ({
  title,
  onPress,
  icon,
  style,
  textStyle,
  colors = ['rgba(60, 145, 230, 0.8)', 'rgba(161, 92, 255, 0.8)'],
  disabled = false,
  glow = true,
  size = 'medium',
}) => {
  // Animation values
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const pulseAnim = useRef(new Animated.Value(0)).current;
  const pressAnim = useRef(new Animated.Value(0)).current;
  
  // Create pulsing animation
  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    );
    
    if (glow && !disabled) {
      pulse.start();
    }
    
    return () => {
      pulse.stop();
    };
  }, [glow, disabled]);
  
  const handlePressIn = () => {
    if (disabled) return;
    
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
    
    Animated.timing(pressAnim, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };
  
  const handlePressOut = () => {
    if (disabled) return;
    
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      bounciness: 12,
    }).start();
    
    Animated.timing(pressAnim, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };
  
  const buttonSizes = {
    small: {
      paddingVertical: 8,
      paddingHorizontal: 16,
      fontSize: 14,
    },
    medium: {
      paddingVertical: 12,
      paddingHorizontal: 20,
      fontSize: 16,
    },
    large: {
      paddingVertical: 16,
      paddingHorizontal: 28,
      fontSize: 18,
    }
  };
  
  // Animation interpolations
  const glowOpacity = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.5, 0.8],
  });
  
  const pressOpacity = pressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.8],
  });
  
  return (
    <Animated.View 
      style={[
        styles.container,
        {
          opacity: disabled ? 0.6 : pressOpacity,
          transform: [{ scale: scaleAnim }],
        },
        style
      ]}
    >
      {glow && !disabled && (
        <Animated.View 
          style={[
            styles.glow,
            {
              opacity: glowOpacity,
              transform: [
                { 
                  scale: pulseAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 1.2],
                  })
                }
              ],
            }
          ]}
        />
      )}
      
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled}
        style={styles.touchable}
      >
        <LinearGradient
          colors={colors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[
            styles.gradient,
            {
              paddingVertical: buttonSizes[size].paddingVertical,
              paddingHorizontal: buttonSizes[size].paddingHorizontal,
            }
          ]}
        >
          {icon && <View style={styles.iconContainer}>{icon}</View>}
          <Text 
            style={[
              styles.text, 
              {
                fontSize: buttonSizes[size].fontSize,
              },
              textStyle
            ]}
          >
            {title}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 30,
    position: 'relative',
    alignSelf: 'center',
  },
  touchable: {
    borderRadius: 30,
    overflow: 'hidden',
  },
  gradient: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  text: {
    color: 'white',
    fontWeight: '600',
    textAlign: 'center',
  },
  iconContainer: {
    marginRight: 8,
  },
  glow: {
    position: 'absolute',
    top: -10,
    left: -10,
    right: -10,
    bottom: -10,
    backgroundColor: Colors.primary,
    borderRadius: 40,
    zIndex: -1,
  },
}); 