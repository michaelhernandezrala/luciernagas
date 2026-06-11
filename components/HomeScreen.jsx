import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DIFFICULTY_LEVELS } from '../utils/constants';
import { fontSize, spacing, moderateScale, SCREEN_WIDTH, fontFamily } from '../utils/responsive';
import Background from './Background';

export default function HomeScreen({ onStartGame, highScores }) {
  const handleDifficultySelect = (difficulty) => {
    console.log('Difficulty selected:', difficulty.name);
    // Auto-start game when selecting difficulty
    onStartGame(difficulty);
  };

  return (
    <Background>
      <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>✨ FlashFly ✨</Text>
          <Text style={styles.subtitle}>Juego de Memoria</Text>
        </View>

        {/* Difficulty Selector */}
        <View style={styles.difficultyContainer}>
          <Text style={styles.sectionTitle}>Selecciona Dificultad</Text>
          <View style={styles.difficultyGrid}>
            {Object.values(DIFFICULTY_LEVELS).map((difficulty) => {
              const highScore = highScores[difficulty.id] || 0;
              
              return (
                <TouchableOpacity
                  key={difficulty.id}
                  style={[
                    styles.difficultyCard,
                    { borderColor: difficulty.color }
                  ]}
                  onPress={() => handleDifficultySelect(difficulty)}
                  activeOpacity={0.7}
                  accessible={true}
                  accessibilityLabel={`Seleccionar dificultad ${difficulty.name}`}
                >
                  <Text style={styles.difficultyEmoji}>{difficulty.emoji}</Text>
                  <Text style={styles.difficultyName}>
                    {difficulty.name}
                  </Text>
                  <Text style={styles.difficultyInfo}>
                    {difficulty.initialButtons}-{difficulty.maxButtons} botones
                  </Text>
                  {highScore > 0 && (
                    <View style={styles.miniScore}>
                      <Text style={styles.miniScoreText}>🏆 {highScore}</Text>
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Instructions */}
        <View style={styles.instructionsContainer}>
          <Text style={styles.instructionText}>
            Observa la secuencia de luciérnagas
          </Text>
          <Text style={styles.instructionText}>
            y repítela en el mismo orden
          </Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Cada nivel añade una nueva luciérnaga
          </Text>
        </View>
      </View>
    </SafeAreaView>
    </Background>
  );
}

const cardWidth = (SCREEN_WIDTH - spacing.xl * 3) / 2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
  },
  header: {
    alignItems: 'center',
  },
  title: {
    fontSize: fontSize.huge,
    fontWeight: 'bold',
    color: '#ffd700',
    textShadowColor: '#ff6b00',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
    marginBottom: spacing.sm,
    fontFamily: fontFamily.title,
  },
  subtitle: {
    fontSize: fontSize.large,
    color: '#a0a0ff',
    fontWeight: '300',
    fontFamily: fontFamily.text,
  },
  sectionTitle: {
    fontSize: fontSize.medium,
    color: '#a0a0ff',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: spacing.md,
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontFamily: fontFamily.text,
  },
  difficultyContainer: {
    width: '100%',
  },
  difficultyGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  difficultyCard: {
    width: cardWidth,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: moderateScale(15),
    borderWidth: 3,
    padding: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: moderateScale(140),
    margin: spacing.xs,
  },
  difficultyEmoji: {
    fontSize: fontSize.xxlarge,
    marginBottom: spacing.xs,
    fontFamily: fontFamily.regular,
  },
  difficultyName: {
    fontSize: fontSize.large,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: spacing.xs,
    fontFamily: fontFamily.title,
  },
  difficultyInfo: {
    fontSize: fontSize.small,
    color: '#a0a0ff',
    fontFamily: fontFamily.text,
  },
  miniScore: {
    marginTop: spacing.xs,
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: moderateScale(10),
  },
  miniScoreText: {
    fontSize: fontSize.small,
    color: '#ffd700',
    fontWeight: 'bold',
    fontFamily: fontFamily.title,
  },
  instructionsContainer: {
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  instructionText: {
    fontSize: fontSize.medium,
    color: '#e0e0e0',
    textAlign: 'center',
    marginVertical: spacing.xs,
    lineHeight: moderateScale(24),
    fontFamily: fontFamily.text,
  },
  footer: {
    marginBottom: spacing.md,
  },
  footerText: {
    fontSize: fontSize.regular,
    color: '#808080',
    textAlign: 'center',
    fontStyle: 'italic',
    fontFamily: fontFamily.text,
  },
});
