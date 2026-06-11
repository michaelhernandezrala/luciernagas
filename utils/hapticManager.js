import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

class HapticManager {
  constructor() {
    this.isEnabled = true;
    this.isAvailable = true;
    this.checkAvailability();
  }

  /**
   * Check if haptics are available on this device
   */
  async checkAvailability() {
    try {
      // On iOS, haptics require device support
      if (Platform.OS === 'ios') {
        // Try a light haptic to test availability
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
      this.isAvailable = true;
    } catch (error) {
      console.warn('Haptic feedback not available on this device');
      this.isAvailable = false;
    }
  }

  /**
   * Enable or disable haptic feedback
   * @param {boolean} enabled 
   */
  setEnabled(enabled) {
    this.isEnabled = enabled;
  }

  /**
   * Light haptic feedback for regular touches
   */
  async light() {
    if (!this.isEnabled || !this.isAvailable) return;
    
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch (error) {
      console.error('Error with haptic feedback:', error);
    }
  }

  /**
   * Medium haptic feedback
   */
  async medium() {
    if (!this.isEnabled || !this.isAvailable) return;
    
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } catch (error) {
      console.error('Error with haptic feedback:', error);
    }
  }

  /**
   * Heavy haptic feedback for important events
   */
  async heavy() {
    if (!this.isEnabled || !this.isAvailable) return;
    
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    } catch (error) {
      console.error('Error with haptic feedback:', error);
    }
  }

  /**
   * Success notification haptic
   */
  async success() {
    if (!this.isEnabled || !this.isAvailable) return;
    
    try {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch (error) {
      console.error('Error with haptic feedback:', error);
    }
  }

  /**
   * Warning notification haptic
   */
  async warning() {
    if (!this.isEnabled || !this.isAvailable) return;
    
    try {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    } catch (error) {
      console.error('Error with haptic feedback:', error);
    }
  }

  /**
   * Error notification haptic (strong vibration)
   */
  async error() {
    if (!this.isEnabled || !this.isAvailable) return;
    
    try {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    } catch (error) {
      console.error('Error with haptic feedback:', error);
    }
  }

  /**
   * Selection haptic for UI interactions
   */
  async selection() {
    if (!this.isEnabled || !this.isAvailable) return;
    
    try {
      await Haptics.selectionAsync();
    } catch (error) {
      console.error('Error with haptic feedback:', error);
    }
  }

  /**
   * Haptic for firefly touch
   */
  async fireflyTouch() {
    await this.light();
  }

  /**
   * Haptic for correct input
   */
  async correctInput() {
    await this.medium();
  }

  /**
   * Haptic for wrong input
   */
  async wrongInput() {
    await this.error();
  }

  /**
   * Haptic for level up
   */
  async levelUp() {
    await this.success();
  }

  /**
   * Haptic for game start
   */
  async gameStart() {
    await this.selection();
  }
}

// Export singleton instance
const hapticManager = new HapticManager();
export default hapticManager;
