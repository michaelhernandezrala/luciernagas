import { useState, useRef, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { generateNextSequence } from '../utils/sequenceGenerator';

const HIGH_SCORE_KEY = '@luciernaga_high_score';

export default function useGameEngine(numberOfFireflies = 4) {
  // Game state
  const [sequence, setSequence] = useState([]);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [userSequence, setUserSequence] = useState([]);
  const [isPlayingSequence, setIsPlayingSequence] = useState(false);
  const [isUserTurn, setIsUserTurn] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);

  const userSequenceRef = useRef([]);

  // Load high score from AsyncStorage
  const loadHighScore = useCallback(async () => {
    try {
      const savedHighScore = await AsyncStorage.getItem(HIGH_SCORE_KEY);
      if (savedHighScore !== null) {
        setHighScore(parseInt(savedHighScore, 10));
      }
    } catch (error) {
      console.error('Error loading high score:', error);
    }
  }, []);

  // Save high score to AsyncStorage
  const saveHighScore = useCallback(async (newHighScore) => {
    try {
      await AsyncStorage.setItem(HIGH_SCORE_KEY, newHighScore.toString());
      setHighScore(newHighScore);
    } catch (error) {
      console.error('Error saving high score:', error);
    }
  }, []);

  // Start a new game
  const startGame = useCallback(() => {
    const initialSequence = generateNextSequence([], numberOfFireflies);
    setSequence(initialSequence);
    setCurrentLevel(1);
    setScore(0);
    setUserSequence([]);
    userSequenceRef.current = [];
    setIsPlayingSequence(true);
    setIsUserTurn(false);
    setGameOver(false);
    setCurrentlyPlaying(null);
  }, [numberOfFireflies]);

  // Restart game
  const restartGame = useCallback(() => {
    startGame();
  }, [startGame]);

  // Start next level
  const nextLevel = useCallback(() => {
    const newSequence = generateNextSequence(sequence, numberOfFireflies);
    setSequence(newSequence);
    setCurrentLevel(prev => prev + 1);
    setScore(prev => prev + 1);
    setUserSequence([]);
    userSequenceRef.current = [];
    setIsPlayingSequence(true);
    setIsUserTurn(false);
  }, [sequence, numberOfFireflies]);

  // Finish playing sequence (called from animation controller)
  const finishPlayingSequence = useCallback(() => {
    setIsPlayingSequence(false);
    setIsUserTurn(true);
    setCurrentlyPlaying(null);
  }, []);

  // Handle user input
  const handleUserInput = useCallback((fireflyId) => {
    // Ignore input if not user's turn
    if (!isUserTurn || isPlayingSequence || gameOver) {
      return false;
    }

    // Add to user sequence
    const newUserSequence = [...userSequenceRef.current, fireflyId];
    userSequenceRef.current = newUserSequence;
    setUserSequence(newUserSequence);

    const currentIndex = newUserSequence.length - 1;
    const expectedId = sequence[currentIndex];

    // Check if input is correct
    if (fireflyId !== expectedId) {
      // Wrong input - game over
      setIsUserTurn(false);
      setGameOver(true);
      
      // Update high score if necessary
      if (score > highScore) {
        saveHighScore(score);
      }
      
      return false;
    }

    // Check if user completed the sequence
    if (newUserSequence.length === sequence.length) {
      // Correct sequence completed
      setIsUserTurn(false);
      return true;
    }

    // Continue - input was correct but sequence not complete
    return null;
  }, [isUserTurn, isPlayingSequence, gameOver, sequence, score, highScore, saveHighScore]);

  // Set currently playing firefly (for visual feedback during sequence playback)
  const setCurrentFirefly = useCallback((fireflyId) => {
    setCurrentlyPlaying(fireflyId);
  }, []);

  return {
    // State
    sequence,
    currentLevel,
    score,
    highScore,
    userSequence,
    isPlayingSequence,
    isUserTurn,
    gameOver,
    currentlyPlaying,
    
    // Actions
    startGame,
    restartGame,
    nextLevel,
    handleUserInput,
    finishPlayingSequence,
    setCurrentFirefly,
    loadHighScore,
  };
}
