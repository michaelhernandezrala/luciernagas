import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

export default function GameOverScreen({ score, highScore, isNewRecord, onRestart, onHome, difficulty }) {
  return (
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0e27',
  },
  content: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  header: {
    alignItems: 'center',
    marginTop: 20,
  },
  title: {
    fontSize: width > 375 ? 36 : 30,
    fontWeight: 'bold',
    color: '#a0a0ff',
    textAlign: 'center',
  },
  difficultyBadge: {
    fontSize: 16,
    color: '#a0a0ff',
    textAlign: 'center',
    marginTop: 10,
    fontWeight: '600',
  },
  scoreContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  scoreLabel: {
    fontSize: 18,
    color: '#e0e0e0',
    marginBottom: 10,
  },
  scoreValue: {
    fontSize: 72,
    fontWeight: 'bold',
    color: '#ffd700',
    textShadowColor: '#ff6b00',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },
  newRecordBadge: {
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 15,
    borderWidth: 2,
    borderColor: '#ffd700',
  },
  newRecordText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffd700',
    textAlign: 'center',
  },
  highScoreContainer: {
    alignItems: 'center',
  },
  highScoreLabel: {
    fontSize: 14,
    color: '#a0a0ff',
    marginBottom: 5,
  },
  highScoreValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#a0a0ff',
  },
  messageContainer: {
    paddingHorizontal: 30,
  },
  messageText: {
    fontSize: 18,
    color: '#e0e0e0',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  buttonsContainer: {
    width: '100%',
    alignItems: 'center',
    gap: 15,
  },
  restartButton: {
    backgroundColor: '#ffd700',
    paddingHorizontal: 40,
    paddingVertical: 18,
    borderRadius: 30,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#ffd700',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 15,
    elevation: 10,
  },
  restartButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0a0e27',
    letterSpacing: 1,
  },
  homeButton: {
    backgroundColor: 'transparent',
    paddingHorizontal: 40,
    paddingVertical: 18,
    borderRadius: 30,
    width: '80%',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#a0a0ff',
  },
  homeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#a0a0ff',
    letterSpacing: 1,
  },
});
