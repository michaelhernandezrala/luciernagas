import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from './components/HomeScreen';
import GameScreen from './components/GameScreen';
import GameOverScreen from './components/GameOverScreen';
import audioManager from './utils/audioManager';
import { STORAGE_KEYS, DIFFICULTY_LEVELS } from './utils/constants';

// App navigation states
const SCREENS = {
  HOME: 'HOME',
  GAME: 'GAME',
  GAME_OVER: 'GAME_OVER',
};

export default function App() {
  const [currentScreen, setCurrentScreen] = useState(SCREENS.HOME);
  const [highScores, setHighScores] = useState({
    EASY: 0,
    MEDIUM: 0,
    HARD: 0,
    EXPERT: 0,
  });
  const [currentDifficulty, setCurrentDifficulty] = useState(null);
  const [lastScore, setLastScore] = useState(0);
  const [isNewRecord, setIsNewRecord] = useState(false);

  // Load high score on mount
  useEffect(() => {
    loadHighScores();
    initializeAudio();
  }, []);

  const loadHighScores = async () => {
    try {
      const scores = {};
      for (const [key, storageKey] of Object.entries(STORAGE_KEYS)) {
        if (key.startsWith('HIGH_SCORE')) {
          const savedScore = await AsyncStorage.getItem(storageKey);
          const difficultyKey = key.replace('HIGH_SCORE_', '');
          scores[difficultyKey] = savedScore ? parseInt(savedScore, 10) : 0;
        }
      }
      setHighScores(scores);
    } catch (error) {
      console.error('Error loading high scores:', error);
    }
  };

  const saveHighScore = async (difficulty, newHighScore) => {
    try {
      const storageKey = STORAGE_KEYS[`HIGH_SCORE_${difficulty}`];
      await AsyncStorage.setItem(storageKey, newHighScore.toString());
      setHighScores(prev => ({
        ...prev,
        [difficulty]: newHighScore,
      }));
    } catch (error) {
      console.error('Error saving high score:', error);
    }
  };

  const initializeAudio = async () => {
    await audioManager.initialize();
    // Note: Add sound files to assets/sounds/ and load them here
    // For now, the audio manager will use fallback sounds
  };

  const handleStartGame = (difficulty) => {
    setCurrentDifficulty(difficulty);
    setCurrentScreen(SCREENS.GAME);
  };

  const handleGameOver = (score) => {
    setLastScore(score);
    
    const currentHighScore = highScores[currentDifficulty.id];
    
    // Check if new record
    if (score > currentHighScore) {
      setIsNewRecord(true);
      saveHighScore(currentDifficulty.id, score);
    } else {
      setIsNewRecord(false);
    }
    
    setCurrentScreen(SCREENS.GAME_OVER);
  };

  const handleRestart = () => {
    setCurrentScreen(SCREENS.GAME);
  };

  const handleGoHome = () => {
    setCurrentDifficulty(null);
    setCurrentScreen(SCREENS.HOME);
  };

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <StatusBar style="light" />
        
        {currentScreen === SCREENS.HOME && (
          <HomeScreen 
            onStartGame={handleStartGame}
            highScores={highScores}
          />
        )}
        
        {currentScreen === SCREENS.GAME && currentDifficulty && (
          <GameScreen 
            onGameOver={handleGameOver}
            onQuitToMenu={handleGoHome}
            difficulty={currentDifficulty}
          />
        )}
        
        {currentScreen === SCREENS.GAME_OVER && (
          <GameOverScreen
            score={lastScore}
            highScore={highScores[currentDifficulty?.id] || 0}
            isNewRecord={isNewRecord}
            onRestart={handleRestart}
            onHome={handleGoHome}
            difficulty={currentDifficulty}
          />
        )}
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0e27',
  },
});
