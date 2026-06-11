import { Dimensions, Platform, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Base dimensions (iPhone 11 Pro)
const baseWidth = 375;
const baseHeight = 812;

/**
 * Scale based on screen width
 */
export const scaleWidth = (size) => {
  return (SCREEN_WIDTH / baseWidth) * size;
};

/**
 * Scale based on screen height
 */
export const scaleHeight = (size) => {
  return (SCREEN_HEIGHT / baseHeight) * size;
};

/**
 * Scale with moderation (less aggressive scaling)
 */
export const moderateScale = (size, factor = 0.5) => {
  const newSize = size + (scaleWidth(size) - size) * factor;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

/**
 * Font sizes for different text types
 */
export const fontSize = {
  tiny: moderateScale(10),
  small: moderateScale(12),
  regular: moderateScale(14),
  medium: moderateScale(16),
  large: moderateScale(20),
  xlarge: moderateScale(24),
  xxlarge: moderateScale(32),
  huge: moderateScale(48),
};

/**
 * Font family for the app
 */
export const fontFamily = {
  title: 'Fredoka_700Bold',      // For titles, numbers, scores
  text: 'Inter_400Regular',      // For paragraphs, descriptions
  textBold: 'Inter_600SemiBold', // For emphasized text
};

/**
 * Spacing system
 */
export const spacing = {
  xs: moderateScale(4),
  sm: moderateScale(8),
  md: moderateScale(16),
  lg: moderateScale(24),
  xl: moderateScale(32),
  xxl: moderateScale(48),
};

/**
 * Get device type
 */
export const getDeviceType = () => {
  const ratio = SCREEN_HEIGHT / SCREEN_WIDTH;
  
  if (Platform.OS === 'ios' && Platform.isPad) {
    return 'tablet';
  }
  
  if (SCREEN_WIDTH >= 768) {
    return 'tablet';
  }
  
  if (ratio < 1.6) {
    return 'small_phone';
  }
  
  return 'phone';
};

export const isSmallDevice = SCREEN_WIDTH < 375;
export const isTablet = getDeviceType() === 'tablet';

export { SCREEN_WIDTH, SCREEN_HEIGHT };
