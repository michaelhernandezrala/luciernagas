import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fontSize, spacing, moderateScale, fontFamily } from '../utils/responsive';
import Background from './Background';

export default function GameOverScreen({ score, highScore, isNewRecord, onRestart, onHome, difficulty }) {
  return (
    <Background>
      <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Game Over Title */}
        <View style={styles.header}>
          <Text style={styles.title}>🌙 Fin del Juego 🌙</Text>
          {difficulty && (
            <Text style={styles.difficultyBadge}>
              {difficulty.emoji} {difficulty.name}
            </Text>
          )}
        </View>

        {/* Score Display */}
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreLabel}>Tu Puntuación</Text>
          <Text style={styles.scoreValue}>{score}</Text>
          
          {isNewRecord && (
            <View style={styles.newRecordBadge}>
              <Text style={styles.newRecordText}>🎉 ¡NUEVO RÉCORD! 🎉</Text>
            </View>
          )}
        </View>

        {/* High Score */}
        <View style={styles.highScoreContainer}>
          <Text style={styles.highScoreLabel}>Récord Anterior:</Text>
          <Text style={styles.highScoreValue}>{highScore}</Text>
        </View>

        {/* Encouragement Message */}
        <View style={styles.messageContainer}>
          <Text style={styles.messageText}>
            {score === 0 
              ? "¡Primera vez! Inténtalo de nuevo"
              : score < 5
              ? "¡Buen intento! Sigue practicando"
              : score < 10
              ? "¡Muy bien! Estás mejorando"
              : score < 15
              ? "¡Excelente! Tienes buena memoria"
              : "¡Increíble! Eres un maestro"
            }
          </Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity 
            style={styles.restartButton}
            onPress={onRestart}
            activeOpacity={0.8}
          >
            <Text style={styles.restartButtonText}>JUGAR DE NUEVO</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.homeButton}
            onPress={onHome}
            activeOpacity={0.8}
          >
            <Text style={styles.homeButtonText}>INICIO</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>    </Background>  );
}

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
    marginTop: spacing.lg,
  },
  title: {
    fontSize: fontSize.xxlarge,
    fontWeight: 'bold',
    color: '#a0a0ff',
    textAlign: 'center',
    fontFamily: fontFamily.regular,
  },
  difficultyBadge: {
    fontSize: fontSize.medium,
    color: '#a0a0ff',
    textAlign: 'center',
    marginTop: spacing.sm,
    fontWeight: '600',
    fontFamily: fontFamily.regular,
  },
  scoreContainer: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
  },
  scoreLabel: {
    fontSize: fontSize.large,
    color: '#e0e0e0',
    marginBottom: spacing.sm,
    fontFamily: fontFamily.regular,
  },
  scoreValue: {
    fontSize: moderateScale(72),
    fontWeight: 'bold',
    color: '#ffd700',
    textShadowColor: '#ff6b00',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
    fontFamily: fontFamily.regular,
  },
  newRecordBadge: {
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: moderateScale(20),
    marginTop: spacing.md,
    borderWidth: 2,
    borderColor: '#ffd700',
  },
  newRecordText: {
    fontSize: fontSize.medium,
    fontWeight: 'bold',
    color: '#ffd700',
    textAlign: 'center',
    fontFamily: fontFamily.regular,
  },
  highScoreContainer: {
    alignItems: 'center',
  },
  highScoreLabel: {
    fontSize: fontSize.regular,
    color: '#a0a0ff',
    marginBottom: spacing.xs,
    fontFamily: fontFamily.regular,
  },
  highScoreValue: {
    fontSize: fontSize.xxlarge,
    fontWeight: 'bold',
    color: '#a0a0ff',
    fontFamily: fontFamily.regular,
  },
  messageContainer: {
    paddingHorizontal: spacing.xl,
  },
  messageText: {
    fontSize: fontSize.large,
    color: '#e0e0e0',
    textAlign: 'center',
    fontStyle: 'italic',
    fontFamily: fontFamily.regular,
  },
  buttonsContainer: {
    width: '100%',
    alignItems: 'center',
  },
  restartButton: {
    backgroundColor: '#ffd700',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
    borderRadius: moderateScale(30),
    width: '80%',
    alignItems: 'center',
    shadowColor: '#ffd700',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 15,
    elevation: 10,
    marginBottom: spacing.md,
  },
  restartButtonText: {
    fontSize: fontSize.large,
    fontWeight: 'bold',
    color: '#0a0e27',
    letterSpacing: 1,
    fontFamily: fontFamily.regular,
  },
  homeButton: {
    backgroundColor: 'transparent',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
    borderRadius: moderateScale(30),
    width: '80%',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#a0a0ff',
  },
  homeButtonText: {
    fontSize: fontSize.large,
    fontWeight: 'bold',
    color: '#a0a0ff',
    letterSpacing: 1,
    fontFamily: fontFamily.regular,
  },
});
