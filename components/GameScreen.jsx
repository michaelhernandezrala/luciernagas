import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import ScoreBoard from './ScoreBoard';
import FireflyGrid from './FireflyGrid';
import { playSequenceAnimation, createShakeAnimation } from '../animations/gameAnimations';
import useGameEngine from '../hooks/useGameEngine';
import audioManager from '../utils/audioManager';
import hapticManager from '../utils/hapticManager';

const NUMBER_OF_FIREFLIES = 4;

export default function GameScreen({ onGameOver, highScore }) {
  const shakeAnim = useRef(new Animated.Value(0)).current;
  
  const {
    sequence,
    currentLevel,
    score,
    isPlayingSequence,
    isUserTurn,
    gameOver,
    currentlyPlaying,
    startGame,
    nextLevel,
    handleUserInput,
    finishPlayingSequence,
    setCurrentFirefly,
  } = useGameEngine(NUMBER_OF_FIREFLIES);

  // Start game on mount
  useEffect(() => {
    hapticManager.gameStart();
    startGame();
  }, [startGame]);

  // Play sequence when it changes
  useEffect(() => {
    if (isPlayingSequence && sequence.length > 0) {
      playSequenceAnimation(
        sequence,
        setCurrentFirefly,
        finishPlayingSequence,
        (fireflyId) => {
          audioManager.playSound(fireflyId);
        },
        600 // delay between fireflies
      );
    }
  }, [isPlayingSequence, sequence, setCurrentFirefly, finishPlayingSequence]);

  // Handle game over
  useEffect(() => {
    if (gameOver) {
      hapticManager.wrongInput();
      
      // Shake animation
      createShakeAnimation(shakeAnim).start();

      // Navigate to game over screen after a short delay
      setTimeout(() => {
        onGameOver(score);
      }, 1000);
    }
  }, [gameOver, score, onGameOver, shakeAnim]);

  // Handle firefly press
  const handleFireflyPress = (fireflyId) => {
    if (!isUserTurn || isPlayingSequence) {
      return;
    }

    // Haptic feedback
    hapticManager.fireflyTouch();
    
    // Play sound
    audioManager.playSound(fireflyId);
    
    // Process input
    const result = handleUserInput(fireflyId);

    if (result === true) {
      // Correct sequence completed!
      hapticManager.levelUp();
      audioManager.playSuccessSound();
      
      // Move to next level after a short delay
      setTimeout(() => {
        nextLevel();
      }, 1000);
    } else if (result === false) {
      // Wrong input - game will end via gameOver effect
      audioManager.playErrorSound();
    }
  };

  const animatedStyle = {
    transform: [{ translateX: shakeAnim }],
  };

  return (
    <View style={styles.container}>
      <ScoreBoard 
        currentScore={score}
        currentLevel={currentLevel}
        highScore={highScore}
      />
      
      <Animated.View style={[styles.gameArea, animatedStyle]}>
        <FireflyGrid
          numberOfFireflies={NUMBER_OF_FIREFLIES}
          onFireflyPress={handleFireflyPress}
          currentlyPlaying={currentlyPlaying}
          disabled={!isUserTurn || isPlayingSequence}
        />
      </Animated.View>

      {/* Status indicator */}
      <View style={styles.statusContainer}>
        {isPlayingSequence && (
          <View style={styles.statusBadge}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>Observa la secuencia...</Text>
          </View>
        )}
        {isUserTurn && (
          <View style={[styles.statusBadge, styles.statusBadgeActive]}>
            <View style={[styles.statusDot, styles.statusDotActive]} />
            <Text style={styles.statusText}>¡Tu turno!</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0e27',
  },
  gameArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusContainer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(160, 160, 255, 0.2)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(160, 160, 255, 0.4)',
  },
  statusBadgeActive: {
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
    borderColor: 'rgba(255, 215, 0, 0.4)',
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#a0a0ff',
    marginRight: 10,
  },
  statusDotActive: {
    backgroundColor: '#ffd700',
  },
  statusText: {
    fontSize: 16,
    color: '#e0e0e0',
    fontWeight: '600',
  },
});
