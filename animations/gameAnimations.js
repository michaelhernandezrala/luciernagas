import { Animated } from 'react-native';

/**
 * Play the sequence animation by lighting up fireflies one by one
 * @param {Array} sequence - Array of firefly IDs to play
 * @param {Function} setCurrentFirefly - Function to set which firefly is currently active
 * @param {Function} onComplete - Callback when sequence playback is complete
 * @param {Function} playSound - Optional sound callback
 * @param {number} delayBetween - Delay between each firefly in ms (default 600ms)
 */
export function playSequenceAnimation(
  sequence, 
  setCurrentFirefly, 
  onComplete, 
  playSound = null,
  delayBetween = 600
) {
  if (sequence.length === 0) {
    onComplete();
    return;
  }

  let currentIndex = 0;

  const playNext = () => {
    if (currentIndex >= sequence.length) {
      // Sequence complete - wait a bit before finishing
      setTimeout(() => {
        setCurrentFirefly(null);
        setTimeout(() => {
          onComplete();
        }, 500); // Extra delay to ensure last button is visible
      }, 300);
      return;
    }

    const fireflyId = sequence[currentIndex];
    setCurrentFirefly(fireflyId);
    
    // Play sound if provided
    if (playSound) {
      playSound(fireflyId);
    }

    currentIndex++;

    // Wait longer to ensure button light is visible
    setTimeout(() => {
      setCurrentFirefly(null);
      setTimeout(playNext, 300); // Pause between buttons
    }, delayBetween + 100); // Extra time to see each button
  };

  // Small delay before starting
  setTimeout(playNext, 500);
}

/**
 * Create a shake animation for error feedback
 * @param {Animated.Value} shakeAnim - Animated value for shake
 * @returns {Animated.CompositeAnimation} Animation that can be started
 */
export function createShakeAnimation(shakeAnim) {
  return Animated.sequence([
    Animated.timing(shakeAnim, {
      toValue: 10,
      duration: 50,
      useNativeDriver: true,
    }),
    Animated.timing(shakeAnim, {
      toValue: -10,
      duration: 50,
      useNativeDriver: true,
    }),
    Animated.timing(shakeAnim, {
      toValue: 10,
      duration: 50,
      useNativeDriver: true,
    }),
    Animated.timing(shakeAnim, {
      toValue: 0,
      duration: 50,
      useNativeDriver: true,
    }),
  ]);
}

/**
 * Create a flash animation for success feedback
 * @param {Animated.Value} flashAnim - Animated value for flash
 * @returns {Animated.CompositeAnimation} Animation that can be started
 */
export function createFlashAnimation(flashAnim) {
  return Animated.sequence([
    Animated.timing(flashAnim, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
    }),
    Animated.timing(flashAnim, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }),
    Animated.timing(flashAnim, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
    }),
    Animated.timing(flashAnim, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }),
  ]);
}

/**
 * Create a pulse animation for level up
 * @param {Animated.Value} pulseAnim - Animated value for pulse
 * @returns {Animated.CompositeAnimation} Animation that can be started
 */
export function createPulseAnimation(pulseAnim) {
  return Animated.sequence([
    Animated.timing(pulseAnim, {
      toValue: 1.5,
      duration: 200,
      useNativeDriver: true,
    }),
    Animated.spring(pulseAnim, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }),
  ]);
}
