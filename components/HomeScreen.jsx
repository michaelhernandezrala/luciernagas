import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

export default function HomeScreen({ onStartGame, highScore }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>🔥 Luciérnagas 🔥</Text>
          <Text style={styles.subtitle}>Juego de Memoria</Text>
        </View>

        {/* High Score Display */}
        {highScore > 0 && (
          <View style={styles.highScoreContainer}>
            <Text style={styles.highScoreLabel}>Récord:</Text>
            <Text style={styles.highScoreValue}>{highScore}</Text>
          </View>
        )}

        {/* Instructions */}
        <View style={styles.instructionsContainer}>
          <Text style={styles.instructionText}>
            Observa la secuencia de luciérnagas
          </Text>
          <Text style={styles.instructionText}>
            y repítela en el mismo orden
          </Text>
        </View>

        {/* Start Button */}
        <TouchableOpacity 
          style={styles.startButton}
          onPress={onStartGame}
          activeOpacity={0.8}
        >
          <Text style={styles.startButtonText}>COMENZAR</Text>
        </TouchableOpacity>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Cada nivel añade una nueva luciérnaga
          </Text>
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
    fontSize: width > 375 ? 48 : 40,
    fontWeight: 'bold',
    color: '#ffd700',
    textShadowColor: '#ff6b00',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    color: '#a0a0ff',
    fontWeight: '300',
  },
  highScoreContainer: {
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#ffd700',
    alignItems: 'center',
  },
  highScoreLabel: {
    fontSize: 16,
    color: '#a0a0ff',
    marginBottom: 5,
  },
  highScoreValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffd700',
  },
  instructionsContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  instructionText: {
    fontSize: 16,
    color: '#e0e0e0',
    textAlign: 'center',
    marginVertical: 5,
    lineHeight: 24,
  },
  startButton: {
    backgroundColor: '#ffd700',
    paddingHorizontal: 60,
    paddingVertical: 20,
    borderRadius: 30,
    shadowColor: '#ffd700',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 20,
    elevation: 10,
  },
  startButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0a0e27',
    letterSpacing: 2,
  },
  footer: {
    marginBottom: 20,
  },
  footerText: {
    fontSize: 14,
    color: '#808080',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
