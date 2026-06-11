import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import ScoreBoard from './ScoreBoard';
import FireflyGrid from './FireflyGrid';
import PauseModal from './PauseModal';
import Background from './Background';
import { playSequenceAnimation, createShakeAnimation } from '../animations/gameAnimations';
import useGameEngine from '../hooks/useGameEngine';
import audioManager from '../utils/audioManager';
import hapticManager from '../utils/hapticManager';
import { moderateScale, spacing, fontFamily, fontSize } from '../utils/responsive';

export default function GameScreen({ onGameOver, onQuitToMenu, difficulty, highScore = 0 }) {
  const [isPaused, setIsPaused] = useState(false);
  const [selectedAnimalName, setSelectedAnimalName] = useState(null);
  const shakeAnim = useRef(new Animated.Value(0)).current;
  
  // Calculate initial number of fireflies
  const initialFireflies = difficulty.initialButtons;
  
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
  } = useGameEngine(initialFireflies);
  
  // Fixed number of fireflies - no progression
  const numberOfFireflies = difficulty.initialButtons;

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
        difficulty.speed,
        () => {
          // Stop all sounds when animation completes
          audioManager.stopAllSounds();
        }
      );
    }
  }, [isPlayingSequence, sequence, setCurrentFirefly, finishPlayingSequence, difficulty.speed]);

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
    if (!isUserTurn || isPlayingSequence || isPaused) {
      return;
    }

    // Show animal name for educational purposes
    const { COLORS } = require('../utils/constants');
    const animalData = COLORS.fireflies[fireflyId % COLORS.fireflies.length];
    setSelectedAnimalName(animalData.name);
    setTimeout(() => setSelectedAnimalName(null), 1000);

    // Haptic feedback
    hapticManager.fireflyTouch();
    
    // NO sound on user click - only during sequence
    
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

  const handlePause = () => {
    setIsPaused(true);
  };

  const handleContinue = () => {
    setIsPaused(false);
  };

  const handleRestartFromPause = () => {
    setIsPaused(false);
    startGame();
  };

  const handleQuitFromPause = () => {
    setIsPaused(false);
    onQuitToMenu();
  };

  const animatedStyle = {
    transform: [{ translateX: shakeAnim }],
  };

  return (
    <Background>
      <View style={styles.container}>
        <ScoreBoard 
          currentScore={score}
          currentLevel={currentLevel}
          highScore={highScore}
        />

        {/* Menu Burger Button - Below ScoreBoard */}
        <View style={styles.menuButtonContainer}>
          <TouchableOpacity 
            style={styles.menuButton} 
            onPress={handlePause}
            activeOpacity={0.8}
          >
            <View style={styles.burgerLine} />
            <View style={styles.burgerLine} />
            <View style={styles.burgerLine} />
          </TouchableOpacity>
        </View>
      
      <Animated.View style={[styles.gameArea, animatedStyle]}>
        {/* Animal name display - Educational */}
        {selectedAnimalName && (
          <View style={styles.animalNameContainer}>
            <Text style={styles.animalNameText}>{selectedAnimalName}</Text>
          </View>
        )}
        
        <FireflyGrid
          numberOfFireflies={numberOfFireflies}
          onFireflyPress={handleFireflyPress}
          currentlyPlaying={currentlyPlaying}
          disabled={!isUserTurn || isPlayingSequence || isPaused}
        />
      </Animated.View>

      {/* Status indicator - Fixed position */}
      {(isPlayingSequence || isUserTurn) && (
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
      )}

      <PauseModal
        visible={isPaused}
        onContinue={handleContinue}
        onRestart={handleRestartFromPause}
        onQuit={handleQuitFromPause}
      />
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  menuButtonContainer: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    alignItems: 'flex-start',
  },
  menuButton: {
    width: moderateScale(44),
    height: moderateScale(44),
    borderRadius: moderateScale(22),
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  burgerLine: {
    width: moderateScale(20),
    height: moderateScale(3),
    backgroundColor: '#ffffff',
    borderRadius: moderateScale(2),
    marginVertical: moderateScale(2),
  },
  gameArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animalNameContainer: {
    position: 'absolute',
    top: spacing.xl,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 100,
  },
  animalNameText: {
    fontSize: fontSize.xxlarge,
    fontWeight: 'bold',
    color: '#ffffff',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: moderateScale(20),
    borderWidth: 3,
    borderColor: '#ffd700',
    textAlign: 'center',
    fontFamily: fontFamily.title,
    textShadowColor: '#ffd700',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  statusContainer: {
    position: 'absolute',
    bottom: spacing.xxl,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 10,
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
    fontFamily: fontFamily.text,
  },
});
