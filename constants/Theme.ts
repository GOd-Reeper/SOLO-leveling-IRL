import { StyleSheet } from 'react-native';
import { Colors } from './Colors';

export const FontFamilies = {
  primary: 'Exo2', // Will be replaced with the actual font after installation
  secondary: 'Orbitron', // Will be replaced with the actual font after installation
};

export const FontSizes = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 30,
  '4xl': 36,
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
  '3xl': 64,
};

export const Borders = {
  radius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999,
  },
  width: {
    thin: StyleSheet.hairlineWidth,
    base: 1,
    thick: 2,
    extraThick: 4,
  },
};

export const Shadow = {
  neonGlow: {
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 10,
  },
  purpleGlow: {
    shadowColor: Colors.secondary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 10,
  },
  card: {
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
};

export const CommonStyles = StyleSheet.create({
  glassCard: {
    backgroundColor: Colors.cardBackground,
    borderRadius: Borders.radius.lg,
    padding: Spacing.md,
    borderWidth: Borders.width.thin,
    borderColor: `${Colors.primary}50`, // 50% opacity
  },
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: Spacing.md,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flexColumn: {
    flexDirection: 'column',
  },
  flexCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    color: Colors.text,
    fontSize: FontSizes['2xl'],
    fontWeight: 'bold',
  },
  subtitleText: {
    color: Colors.text,
    fontSize: FontSizes.lg,
    fontWeight: '600',
  },
  bodyText: {
    color: Colors.text,
    fontSize: FontSizes.md,
  },
  neonText: {
    color: Colors.primary,
    textShadowColor: Colors.primary,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  purpleText: {
    color: Colors.secondary,
    textShadowColor: Colors.secondary,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
}); 