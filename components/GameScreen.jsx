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
import { moderateScale, spacing } from '../utils/responsive';

export default function GameScreen({ onGameOver, onQuitToMenu, difficulty }) {
  const [isPaused, setIsPaused] = useState(false);
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
  
  // Calculate current number of fireflies based on level
  const getCurrentFireflyCount = () => {
    const addedButtons = Math.floor((currentLevel - 1) / 5);
    const currentCount = difficulty.initialButtons + addedButtons;
    return Math.min(currentCount, difficulty.maxButtons);
  };

  const numberOfFireflies = getCurrentFireflyCount();

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
        difficulty.speed
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
        {/* Menu Burger Button */}
        <TouchableOpacity 
          style={styles.menuButton} 
          onPress={handlePause}
          activeOpacity={0.8}
        >
          <View style={styles.burgerLine} />
          <View style={styles.burgerLine} />
          <View style={styles.burgerLine} />
        </TouchableOpacity>

        <ScoreBoard 
          currentScore={score}
          currentLevel={currentLevel}
          highScore={0}
        />
      
      <Animated.View style={[styles.gameArea, animatedStyle]}>
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
  menuButton: {
    position: 'absolute',
    top: spacing.xl,
    left: spacing.lg,
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
    zIndex: 100,
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
    fontFamily: fontFamily.regular,
  },
});
