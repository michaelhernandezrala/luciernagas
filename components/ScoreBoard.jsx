import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fontSize, spacing, moderateScale, fontFamily } from '../utils/responsive';

export default function ScoreBoard({ currentScore, currentLevel, highScore }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Left: Current Score */}
        <View style={styles.statContainer}>
          <Text style={styles.statLabel}>Puntos</Text>
          <Text style={styles.statValue}>{currentScore}</Text>
        </View>

        {/* Center: Level */}
        <View style={[styles.statContainer, styles.centerStat]}>
          <Text style={styles.statLabel}>Nivel</Text>
          <Text style={[styles.statValue, styles.levelValue]}>{currentLevel}</Text>
        </View>

        {/* Right: High Score */}
        <View style={styles.statContainer}>
          <Text style={styles.statLabel}>Récord</Text>
          <Text style={[styles.statValue, styles.highScoreValue]}>{highScore}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.2)',
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  statContainer: {
    alignItems: 'center',
    flex: 1,
  },
  centerStat: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  statLabel: {
    fontSize: fontSize.small,
    color: 'rgba(255, 255, 255, 0.8)',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: spacing.xs,
    fontWeight: '600',
    fontFamily: fontFamily.text,
  },
  statValue: {
    fontSize: fontSize.xlarge,
    fontWeight: 'bold',
    color: '#ffffff',
    fontFamily: fontFamily.title,
  },
  levelValue: {
    fontSize: fontSize.xxlarge,
    textShadowColor: 'rgba(255, 255, 255, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  highScoreValue: {
    color: 'rgba(255, 215, 0, 0.9)',
  },
});
