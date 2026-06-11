// Game difficulty levels
export const DIFFICULTY_LEVELS = {
  EASY: {
    id: 'EASY',
    name: 'Fácil',
    emoji: '🌱',
    initialButtons: 3,
    maxButtons: 9,
    speed: 800, // ms between fireflies
    color: '#00FF88',
  },
  MEDIUM: {
    id: 'MEDIUM',
    name: 'Medio',
    emoji: '🔥',
    initialButtons: 4,
    maxButtons: 10,
    speed: 600,
    color: '#FFD700',
  },
  HARD: {
    id: 'HARD',
    name: 'Difícil',
    emoji: '⚡',
    initialButtons: 6,
    maxButtons: 12,
    speed: 450,
    color: '#FF6347',
  },
  EXPERT: {
    id: 'EXPERT',
    name: 'Experto',
    emoji: '💀',
    initialButtons: 9,
    maxButtons: 12,
    speed: 350,
    color: '#9D00FF',
  },
};

// Color palette
export const COLORS = {
  background: {
    start: '#0a0e27',
    end: '#1a1d3d',
  },
  fireflies: [
    '#FFD700', // Gold
    '#FFBF00', // Amber
    '#00FFFF', // Cyan
    '#FF1493', // Deep Pink
    '#00FF88', // Spring Green
    '#FF6347', // Tomato
    '#9D00FF', // Purple
    '#CCFF00', // Lime
    '#FF69B4', // Hot Pink
    '#00CED1', // Dark Turquoise
    '#FFB6C1', // Light Pink
    '#98FB98', // Pale Green
  ],
  ui: {
    accent: '#FFD700',
    success: '#00FF88',
    error: '#FF3366',
    warning: '#FFA500',
  },
  text: {
    primary: '#FFFFFF',
    secondary: '#A0A0FF',
    muted: '#606080',
  },
};

// Add new button every X levels
export const NEW_BUTTON_INTERVAL = 5;

// AsyncStorage keys
export const STORAGE_KEYS = {
  HIGH_SCORE_EASY: '@luciernaga_high_score_easy',
  HIGH_SCORE_MEDIUM: '@luciernaga_high_score_medium',
  HIGH_SCORE_HARD: '@luciernaga_high_score_hard',
  HIGH_SCORE_EXPERT: '@luciernaga_high_score_expert',
  STATS: '@luciernaga_stats',
};
