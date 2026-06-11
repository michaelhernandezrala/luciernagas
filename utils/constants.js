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

// Color palette with animals
export const COLORS = {
  background: {
    start: '#0a0e27',
    end: '#1a1d3d',
  },
  fireflies: [
    { color: '#FF6B9D', animal: '🐶', name: 'Perro', sound: 'perro' },
    { color: '#87CEEB', animal: '🐱', name: 'Gato', sound: 'gato' },
    { color: '#98FB98', animal: '🐮', name: 'Vaca', sound: 'vaca' },
    { color: '#FFBF00', animal: '🦉', name: 'Búho', sound: 'buho' },
    { color: '#CCFF00', animal: '🐝', name: 'Abeja', sound: 'abeja' },
    { color: '#FF1493', animal: '🐺', name: 'Lobo', sound: 'lobo' },
    { color: '#00CED1', animal: '🐸', name: 'Rana', sound: 'rana' },
    { color: '#FFB6C1', animal: '🦗', name: 'Grillo', sound: 'grillo' },
    { color: '#9D00FF', animal: '🐥', name: 'Pollito', sound: 'pollito' },
    { color: '#FF8C00', animal: '✨', name: 'Luciérnaga', sound: 'luciernaga', mustHave: true },
    { color: '#00FFFF', animal: '🦉', name: 'Búho 2', sound: 'buho' },
    { color: '#8B4513', animal: '🦗', name: 'Grillo 2', sound: 'grillo' },
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
