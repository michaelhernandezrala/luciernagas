import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Firefly from './Firefly';
import { COLORS } from '../utils/constants';

const { width } = Dimensions.get('window');

export default function FireflyGrid({ 
  numberOfFireflies = 4, 
  onFireflyPress, 
  currentlyPlaying,
  disabled,
}) {
  const fireflies = Array.from({ length: numberOfFireflies }, (_, i) => i);
  
  // Calculate grid layout
  const columns = numberOfFireflies <= 4 ? 2 : numberOfFireflies <= 6 ? 3 : 4;

  return (
    <View style={styles.container}>
      <View style={[styles.grid, { maxWidth: width - 20 }]}>
        {fireflies.map((id) => (
          <Firefly
            key={id}
            id={id}
            color={COLORS.fireflies[id % COLORS.fireflies.length]}
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
