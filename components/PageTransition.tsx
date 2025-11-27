import React, { useRef, useEffect, useState } from 'react';
import { Animated, Dimensions, StyleSheet, ViewStyle } from 'react-native';

type TransitionType = 'fade' | 'slideRight' | 'slideUp' | 'scale' | 'none';

interface PageTransitionProps {
  children: React.ReactNode;
  type?: TransitionType;
  duration?: number;
  delay?: number;
  style?: ViewStyle;
  onAnimationComplete?: () => void;
}

export const PageTransition: React.FC<PageTransitionProps> = ({
  children,
  type = 'fade',
  duration = 300,
  delay = 0,
  style,
  onAnimationComplete,
}) => {
  const [renderContent, setRenderContent] = useState(false);
  const animatedValue = useRef(new Animated.Value(0)).current;
  const { width, height } = Dimensions.get('window');

  useEffect(() => {
    setRenderContent(true);
    
    const animation = Animated.timing(animatedValue, {
      toValue: 1,
      duration,
      delay,
      useNativeDriver: true,
    });
    
    animation.start(({ finished }) => {
      if (finished && onAnimationComplete) {
        onAnimationComplete();
      }
    });
    
    return () => {
      animation.stop();
    };
  }, []);

  if (!renderContent && type !== 'none') return null;

  // Configure animations based on transition type
  const animationStyles = {
    fade: {
      opacity: animatedValue,
    },
    slideRight: {
      opacity: animatedValue,
      transform: [
        {
          translateX: animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [-50, 0],
          }),
        },
      ],
    },
    slideUp: {
      opacity: animatedValue,
      transform: [
        {
          translateY: animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [50, 0],
          }),
        },
      ],
    },
    scale: {
      opacity: animatedValue,
      transform: [
        {
          scale: animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0.9, 1],
          }),
        },
      ],
    },
    none: {},
  };

  return (
    <Animated.View
      style={[
        styles.container,
        animationStyles[type],
        style,
      ]}
    >
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

// Export an animated slide container for custom transitions
export const SlideInView: React.FC<{
  children: React.ReactNode;
  direction?: 'left' | 'right' | 'top' | 'bottom';
  distance?: number;
  duration?: number;
  delay?: number;
  style?: ViewStyle;
}> = ({
  children,
  direction = 'left',
  distance = 100,
  duration = 300,
  delay = 0,
  style,
}) => {
  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 1,
      duration,
      delay,
      useNativeDriver: true,
    }).start();
  }, []);

  const getTransform = () => {
    switch (direction) {
      case 'left':
        return {
          translateX: slideAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [-distance, 0],
          }),
        };
      case 'right':
        return {
          translateX: slideAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [distance, 0],
          }),
        };
      case 'top':
        return {
          translateY: slideAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [-distance, 0],
          }),
        };
      case 'bottom':
        return {
          translateY: slideAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [distance, 0],
          }),
        };
    }
  };

  return (
    <Animated.View
      style={[
        style,
        {
          opacity: slideAnim,
          transform: [getTransform()],
        },
      ]}
    >
      {children}
    </Animated.View>
  );
}; 