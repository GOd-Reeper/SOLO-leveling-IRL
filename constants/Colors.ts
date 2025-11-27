/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

/**
 * Color theme for the Solo-leveling app based on specification
 */

export const Colors = {
  // Base colors
  background: '#0d0c1d', // Pure black or deep dark navy
  primary: '#3c91e6',    // Neon blue - for highlights, borders, important buttons
  secondary: '#a15cff',  // Electric purple - for rare elements, rank-ups, titles, premium quests
  text: '#f6f6f6',       // Bright white - for text to maintain high contrast
  
  // UI specific colors
  cardBackground: 'rgba(20, 20, 40, 0.7)', // For glassmorphism effect
  statBars: {
    strength: '#ff4757',     // Red-ish
    intelligence: '#2ed573',  // Green-ish
    charisma: '#ffa502',     // Orange-ish
    discipline: '#1e90ff',   // Blue-ish
  },
  ranks: {
    E: '#9ba1a6',  // Gray
    D: '#70a1ff',  // Light blue
    C: '#7bed9f',  // Light green
    B: '#fffa65',  // Yellow
    A: '#ff6b81',  // Pink
    S: '#5352ed',  // Royal blue
    'S+': '#ff9ff3' // Light purple
  },
  
  // Theme colors (for system compatibility)
  light: {
    text: '#f6f6f6',
    background: '#0d0c1d',
    tint: '#3c91e6',
    icon: '#f6f6f6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: '#3c91e6',
  },
  dark: {
    text: '#f6f6f6',
    background: '#0d0c1d',
    tint: '#3c91e6',
    icon: '#f6f6f6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: '#3c91e6',
  },
};
