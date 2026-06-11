import { Audio } from 'expo-audio';

class AudioManager {
  constructor() {
    this.sounds = [];
    this.isInitialized = false;
  }

  /**
   * Initialize audio system
   */
  async initialize() {
    try {
      // expo-audio handles audio mode automatically
      this.isInitialized = true;
    } catch (error) {
      console.error('Error initializing audio:', error);
    }
  }

  /**
   * Load sound files for each firefly
   * @param {Array} soundFiles - Array of sound file URIs or require() paths
   */
  async loadSounds(soundFiles) {
    try {
      this.sounds = [];
      
      for (const soundFile of soundFiles) {
        // expo-audio uses Audio.Sound.create instead of createAsync
        const sound = await Audio.Sound.create(soundFile);
        this.sounds.push(sound);
      }
    } catch (error) {
      console.error('Error loading sounds:', error);
    }
  }

  /**
   * Play sound for a specific firefly
   * @param {number} fireflyId - ID of the firefly
   */
  async playSound(fireflyId) {
    if (!this.isInitialized || !this.sounds[fireflyId]) {
      return;
    }

    try {
      const sound = this.sounds[fireflyId];
      // expo-audio uses replay() method
      await sound.replayAsync();
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  }

  /**
   * Play a generic beep sound (fallback when no sounds loaded)
   * Uses simple tone generation or a default sound
   */
  async playBeep(frequency = 440, duration = 200) {
    // This is a placeholder - in a real implementation, you would:
    // 1. Generate a tone programmatically, or
    // 2. Use pre-recorded beep files
    // For now, we'll just use the first loaded sound if available
    if (this.sounds.length > 0) {
      await this.playSound(0);
    }
  }

  /**
   * Play error sound
   */
  async playErrorSound() {
    // Play a lower frequency or specific error sound
    await this.playBeep(200, 500);
  }

  /**
   * Play success sound
   */
  async playSuccessSound() {
    // Play a higher frequency or specific success sound
    await this.playBeep(800, 300);
  }

  /**
   * Cleanup and unload all sounds
   */
  async unloadSounds() {
    try {
      for (const sound of this.sounds) {
        await sound.unloadAsync();
      }
      this.sounds = [];
    } catch (error) {
      console.error('Error unloading sounds:', error);
    }
  }
}

// Export singleton instance
const audioManager = new AudioManager();
export default audioManager;
