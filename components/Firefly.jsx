import React, { useEffect, useRef } from 'react';
import { Animated, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const FIREFLY_SIZE = width > 375 ? 90 : 75;

export default function Firefly({ 
  id, 
  color, 
  onPress, 
  isActive, 
  disabled 
}) {
  const glowAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (isActive) {
      // Animate glow and scale when active
      Animated.parallel([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1.2,
          friction: 3,
          useNativeDriver: true,
        }),
      ]).start(() => {
        // Animate back to normal
        Animated.parallel([
          Animated.timing(glowAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
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

  const animatedStyle = {
    opacity: interpolatedOpacity,
    transform: [{ scale: scaleAnim }],
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => onPress(id)}
      disabled={disabled}
      style={styles.container}
    >
      <Animated.View
        style={[
          styles.firefly,
          { backgroundColor: color },
          animatedStyle,
          {
            shadowColor: color,
            shadowOpacity: 0.8,
            shadowRadius: isActive ? 30 : 10,
          }
        ]}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  firefly: {
    width: FIREFLY_SIZE,
    height: FIREFLY_SIZE,
    borderRadius: FIREFLY_SIZE / 2,
    shadowOffset: { width: 0, height: 0 },
    elevation: 8,
  },
});
