import React from 'react';
import { View, StyleSheet } from 'react-native';
import Firefly from './Firefly';
import { COLORS } from '../utils/constants';
import { SCREEN_WIDTH } from '../utils/responsive';

export default function FireflyGrid({ 
  numberOfFireflies = 4, 
  onFireflyPress, 
  currentlyPlaying,
  disabled,
}) {
  // Always ensure luciérnaga (index 9) is included if we have enough buttons
  let fireflies;
  if (numberOfFireflies >= 10) {
    // Ensure index 9 (luciérnaga) is always included
    fireflies = Array.from({ length: numberOfFireflies }, (_, i) => i);
    if (!fireflies.includes(9)) {
      // Replace last item with 9 if not included
      fireflies[fireflies.length - 1] = 9;
    }
  } else {
    fireflies = Array.from({ length: numberOfFireflies }, (_, i) => i);
  }
  
  // Calculate grid layout
  const columns = numberOfFireflies <= 4 ? 2 : numberOfFireflies <= 6 ? 3 : 4;

  return (
    <View style={styles.container}>
      <View style={[styles.grid, { maxWidth: SCREEN_WIDTH - 20 }]}>
        {fireflies.map((id) => {
          const animalData = COLORS.fireflies[id % COLORS.fireflies.length];
          return (
            <Firefly
              key={id}
              id={id}
              color={animalData.color}
              animal={animalData.animal}
              onPress={onFireflyPress}
              isActive={currentlyPlaying === id}
              disabled={disabled}
            />
          );
        })}
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
    maxWidth: SCREEN_WIDTH - 40,
  },
});
