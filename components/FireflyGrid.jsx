import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Firefly from './Firefly';

const { width } = Dimensions.get('window');

// Default firefly colors (warm night colors)
const DEFAULT_COLORS = [
  '#FFD700', // Gold
  '#FFA500', // Orange
  '#FF6347', // Tomato
  '#FF69B4', // Hot Pink
];

export default function FireflyGrid({ 
  numberOfFireflies = 4, 
  onFireflyPress, 
  currentlyPlaying,
  disabled,
  colors = DEFAULT_COLORS
}) {
  const fireflies = Array.from({ length: numberOfFireflies }, (_, i) => i);
  
  // Arrange in a grid layout (2x2 for 4 fireflies)
  const columns = Math.ceil(Math.sqrt(numberOfFireflies));

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {fireflies.map((id) => (
          <Firefly
            key={id}
            id={id}
            color={colors[id % colors.length]}
            onPress={onFireflyPress}
            isActive={currentlyPlaying === id}
            disabled={disabled}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: width - 40,
  },
});
