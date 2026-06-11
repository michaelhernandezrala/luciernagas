import React, { useEffect, useRef } from 'react';
import { Animated, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { moderateScale, fontSize, fontFamily } from '../utils/responsive';

const FIREFLY_SIZE = moderateScale(85);
const BORDER_RADIUS = moderateScale(8);

export default function Firefly({ 
  id, 
  color, 
  animal,
  onPress, 
  isActive, 
  disabled 
}) {
  const glowAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const pressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isActive) {
      // Animate glow and scale when active
      Animated.parallel([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: false, // opacity and shadowRadius require false
        }),
        Animated.spring(scaleAnim, {
          toValue: 1.15,
          friction: 3,
          useNativeDriver: true,
        }),
      ]).start(() => {
        // Animate back to normal
        Animated.parallel([
          Animated.timing(glowAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false, // opacity and shadowRadius require false
          }),
          Animated.spring(scaleAnim, {
            toValue: 1,
            friction: 3,
            useNativeDriver: true,
          }),
        ]).start();
      });
    }
  }, [isActive, glowAnim, scaleAnim]);

  const interpolatedOpacity = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.4, 1],
  });

  const interpolatedShadowRadius = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [5, 30],
  });

  // Separate styles to avoid mixing native and JS driver
  const scaleStyle = {
    transform: [{ scale: scaleAnim }],
  };

  const glowStyle = {
    opacity: interpolatedOpacity,
    shadowRadius: interpolatedShadowRadius,
  };

  const handlePress = () => {
    if (!disabled) {
      // Visual feedback on press
      Animated.sequence([
        Animated.timing(pressAnim, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(pressAnim, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();
      onPress(id);
    }
  };

  const pressScale = pressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.9],
  });

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={handlePress}
      disabled={disabled}
      style={styles.container}
      pointerEvents={disabled ? 'none' : 'auto'}
    >
      <Animated.View style={scaleStyle}>
        <Animated.View
          style={[
            styles.firefly,
            { backgroundColor: color },
            glowStyle,
            {
              shadowColor: color,
              shadowOpacity: 0.8,
            }
          ]}
        >
          <Text style={styles.animalEmoji}>{animal}</Text>
        </Animated.View>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: moderateScale(8),
  },
  firefly: {
    width: FIREFLY_SIZE,
    height: FIREFLY_SIZE,
    borderRadius: BORDER_RADIUS,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 12,
    elevation: 12,
    justifyContent: 'center',
    alignItems: 'center',
    // 3D effect with border
    borderWidth: 3,
    borderTopColor: 'rgba(255, 255, 255, 0.4)',
    borderLeftColor: 'rgba(255, 255, 255, 0.3)',
    borderRightColor: 'rgba(0, 0, 0, 0.2)',
    borderBottomColor: 'rgba(0, 0, 0, 0.3)',
  },
  innerShadow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: BORDER_RADIUS,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  animalEmoji: {
    fontSize: fontSize.xxlarge,
    fontFamily: fontFamily.regular,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 2,
  },
});
