import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from './components/HomeScreen';
import GameScreen from './components/GameScreen';
import GameOverScreen from './components/GameOverScreen';
import audioManager from './utils/audioManager';

const HIGH_SCORE_KEY = '@luciernaga_high_score';

// App navigation states
const SCREENS = {
  HOME: 'HOME',
  GAME: 'GAME',
  GAME_OVER: 'GAME_OVER',
};

export default function App() {
  const [currentScreen, setCurrentScreen] = useState(SCREENS.HOME);
  const [highScore, setHighScore] = useState(0);
  const [lastScore, setLastScore] = useState(0);
  const [isNewRecord, setIsNewRecord] = useState(false);

  // Load high score on mount
  useEffect(() => {
    loadHighScore();
    initializeAudio();
  }, []);

  const loadHighScore = async () => {
    try {
      const savedHighScore = await AsyncStorage.getItem(HIGH_SCORE_KEY);
      if (savedHighScore !== null) {
        setHighScore(parseInt(savedHighScore, 10));
      }
    } catch (error) {
      console.error('Error loading high score:', error);
    }
  };

  const saveHighScore = async (newHighScore) => {
    try {
      await AsyncStorage.setItem(HIGH_SCORE_KEY, newHighScore.toString());
      setHighScore(newHighScore);
    } catch (error) {
      console.error('Error saving high score:', error);
    }
  };

  const initializeAudio = async () => {
    await audioManager.initialize();
    // Note: Add sound files to assets/sounds/ and load them here
    // For now, the audio manager will use fallback sounds
  };

  const handleStartGame = () => {
    setCurrentScreen(SCREENS.GAME);
  };

  const handleGameOver = (score) => {
    setLastScore(score);
    
    // Check if new record
    if (score > highScore) {
      setIsNewRecord(true);
      saveHighScore(score);
    } else {
      setIsNewRecord(false);
    }
    
    setCurrentScreen(SCREENS.GAME_OVER);
  };

  const handleRestart = () => {
    setCurrentScreen(SCREENS.GAME);
  };

  const handleGoHome = () => {
    setCurrentScreen(SCREENS.HOME);
  };

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <StatusBar style="light" />
        
        {currentScreen === SCREENS.HOME && (
          <HomeScreen 
            onStartGame={handleStartGame}
            highScore={highScore}
          />
        )}
        
        {currentScreen === SCREENS.GAME && (
          <GameScreen 
            onGameOver={handleGameOver}
            highScore={highScore}
          />
        )}
        
        {currentScreen === SCREENS.GAME_OVER && (
          <GameOverScreen
            score={lastScore}
            highScore={highScore}
            isNewRecord={isNewRecord}
            onRestart={handleRestart}
            onHome={handleGoHome}
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
