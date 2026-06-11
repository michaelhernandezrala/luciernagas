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
  // ALWAYS ensure luciérnaga (index 9) is included - MUST HAVE
  const luciernaganIndex = 9;
  let fireflies = [];
  
  if (numberOfFireflies > luciernaganIndex) {
    // If we have more buttons than luciernaganIndex, include everything up to numberOfFireflies
    fireflies = Array.from({ length: numberOfFireflies }, (_, i) => i);
  } else {
    // If we have fewer buttons, include luciérnaga and fill with others
    fireflies = Array.from({ length: numberOfFireflies - 1 }, (_, i) => i);
    fireflies.push(luciernaganIndex); // Always add luciérnaga
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
              image={animalData.image}
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
