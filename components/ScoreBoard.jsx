import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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
    backgroundColor: 'rgba(10, 14, 39, 0.9)',
    borderBottomWidth: 2,
    borderBottomColor: 'rgba(255, 215, 0, 0.3)',
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  statContainer: {
    alignItems: 'center',
    flex: 1,
  },
  centerStat: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.2)',
  },
  statLabel: {
    fontSize: 12,
    color: '#a0a0ff',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffd700',
  },
  levelValue: {
    fontSize: 28,
    textShadowColor: '#ff6b00',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  highScoreValue: {
    color: '#a0a0ff',
  },
});
