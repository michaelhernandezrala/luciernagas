import React from 'react';
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SvgXml } from 'react-native-svg';

// Note: SVG as background - if fondo_inicio.svg is too large, 
// we'll use gradient overlay for better performance
export default function Background({ children }) {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgba(30, 58, 138, 0.85)', 'rgba(124, 58, 237, 0.85)', 'rgba(236, 72, 153, 0.85)']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {children}
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
});
