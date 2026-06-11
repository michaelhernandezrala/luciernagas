// Audio Manager - Using expo-av (stable audio library)
import { Audio } from 'expo-av';

// Sound files mapping
const SOUND_FILES = {
  perro: require('../assets/sounds/sonidos_mp3/perro.mp3'),
  gato: require('../assets/sounds/sonidos_mp3/gato.mp3'),
  vaca: require('../assets/sounds/sonidos_mp3/vaca.mp3'),
  buho: require('../assets/sounds/sonidos_mp3/buho.mp3'),
  abeja: require('../assets/sounds/sonidos_mp3/abeja.mp3'),
  lobo: require('../assets/sounds/sonidos_mp3/lobo.mp3'),
  rana: require('../assets/sounds/sonidos_mp3/rana.mp3'),
  grillo: require('../assets/sounds/sonidos_mp3/grillo.mp3'),
  pollito: require('../assets/sounds/sonidos_mp3/pollito.mp3'),
  luciernaga: require('../assets/sounds/sonidos_mp3/luciernaga.mp3'),
  error: require('../assets/sounds/sonidos_mp3/error.mp3'),
  success: require('../assets/sounds/sonidos_mp3/success.mp3'),
};

class AudioManager {
  constructor() {
    this.sounds = {};
    this.isInitialized = false;
    this.isEnabled = true;
  }

  /**
   * Initialize audio system
   */
  async initialize() {
    try {
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        staysActiveInBackground: false,
        shouldDuckAndroid: true,
      });
      
      // Load all sounds
      await this.loadSounds();
      
      this.isInitialized = true;
      console.log('Audio system initialized with expo-av');
    } catch (error) {
      console.error('Error initializing audio:', error);
      this.isEnabled = false;
    }
  }

  /**
   * Load sounds
   */
  async loadSounds() {
    if (!this.isEnabled) return;
    
    try {
      // Load each sound file
      for (const [key, file] of Object.entries(SOUND_FILES)) {
        const { sound } = await Audio.Sound.createAsync(file, { shouldPlay: false });
        this.sounds[key] = sound;
      }
      console.log('All sounds loaded successfully');
    } catch (error) {
      console.error('Error loading sounds:', error);
      this.isEnabled = false;
    }
  }

  /**
   * Play sound for a specific firefly
   */
  async playSound(fireflyId) {
    if (!this.isEnabled || !this.isInitialized) return;
    
    try {
      // Get the sound name from constants
      const soundName = this.getSoundName(fireflyId);
      if (!soundName || !this.sounds[soundName]) {
        return;
      }
      
      const sound = this.sounds[soundName];
      const status = await sound.getStatusAsync();
      
      if (status.isLoaded) {
        await sound.setPositionAsync(0);
        await sound.playAsync();
      }
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  }

  /**
   * Get sound name for a firefly ID
   */
  getSoundName(fireflyId) {
    // Import constants to get firefly data
    const { COLORS } = require('./constants');
    const animalData = COLORS.fireflies[fireflyId % COLORS.fireflies.length];
    return animalData?.sound;
  }

  /**
   * Play error sound
   */
  async playErrorSound() {
    if (!this.isEnabled || !this.isInitialized) return;
    
    try {
      if (!this.sounds.error) return;
      
      const status = await this.sounds.error.getStatusAsync();
      if (status.isLoaded) {
        await this.sounds.error.setPositionAsync(0);
        await this.sounds.error.playAsync();
      }
    } catch (error) {
      console.error('Error playing error sound:', error);
    }
  }

  /**
   * Play success sound
   */
  async playSuccessSound() {
    if (!this.isEnabled || !this.isInitialized) return;
    
    try {
      if (!this.sounds.success) return;
      
      const status = await this.sounds.success.getStatusAsync();
      if (status.isLoaded) {
        await this.sounds.success.setPositionAsync(0);
        await this.sounds.success.playAsync();
      }
    } catch (error) {
      console.error('Error playing success sound:', error);
    }
  }

  /**
   * Play level up sound
   */
  async playLevelUpSound() {
    console.log('Level up sound');
  }

  /**
   * Stop all currently playing sounds
   */
  async stopAllSounds() {
    if (!this.isEnabled || !this.isInitialized) return;
    
    try {
      for (const sound of Object.values(this.sounds)) {
        if (sound) {
          const status = await sound.getStatusAsync();
          if (status.isLoaded && status.isPlaying) {
            await sound.stopAsync();
          }
        }
      }
    } catch (error) {
      console.error('Error stopping sounds:', error);
    }
  }

  /**
   * Cleanup
   */
  async cleanup() {
    try {
      for (const sound of Object.values(this.sounds)) {
        await sound.unloadAsync();
      }
      this.sounds = {};
    } catch (error) {
      console.error('Error cleaning up sounds:', error);
    }
  }
}

// Export singleton instance
const audioManager = new AudioManager();
export default audioManager;
