/**
 * KICKS - GLOBAL THEME (JavaScript Version)
 *
 * Use this file for accessing theme values in JavaScript/React components
 * For SCSS files, use theme.scss
 *
 * IMPORTANT: Only use the values defined here. Do NOT add arbitrary colors or fonts.
 */

export const theme = {
  // ========== COLORS ==========
  colors: {
    // Primary Colors
    primary: '#4a69e2',
    primaryDark: '#3d5bc4',
    primaryLight: '#6b82e9',

    // Neutral Colors
    darkGray: '#232321',
    mediumGray: '#666666',
    lightGray: '#e0e0e0',
    extraLightGray: '#f5f5f5',
    background: '#e7e7e3',
    backgroundLight: '#fafafa',
    white: '#ffffff',
    black: '#000000',

    // Semantic Colors
    success: '#4caf50',
    error: '#ff4444',
    warning: '#ffa52f',
    info: '#2196f3',

    // Border Colors
    border: '#e0e0e0',
    borderDark: '#232321',
    borderLight: '#f5f5f5',

    // Background Colors
    bgCard: '#f9f9f9',
    bgCardHover: '#ffffff',
    bgOverlay: 'rgba(0, 0, 0, 0.5)',

    // Text Colors
    textPrimary: '#232321',
    textSecondary: '#666666',
    textTertiary: '#999999',
    textWhite: '#ffffff',
  },

  // ========== TYPOGRAPHY ==========
  fonts: {
    primary: "'RubikSemiBold', Arial, sans-serif",
    primaryRegular: "'RubikRegular', Arial, sans-serif",
    secondary: "'SansSemiBold', Arial, sans-serif",
    secondaryRegular: "'SansRegular', Arial, sans-serif",
  },

  fontSizes: {
    xs: '10px',
    sm: '12px',
    base: '14px',
    md: '16px',
    lg: '18px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '28px',
    '4xl': '32px',
    '5xl': '36px',
  },

  fontWeights: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  lineHeights: {
    tight: 1.2,
    normal: 1.4,
    relaxed: 1.6,
  },

  // ========== SPACING ==========
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    base: '16px',
    lg: '20px',
    xl: '24px',
    '2xl': '32px',
    '3xl': '40px',
    '4xl': '48px',
  },

  // ========== BORDER RADIUS ==========
  borderRadius: {
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
    round: '50%',
  },

  // ========== SHADOWS ==========
  shadows: {
    sm: '0 1px 3px rgba(0, 0, 0, 0.1)',
    md: '0 4px 6px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 20px rgba(0, 0, 0, 0.15)',
    xl: '0 20px 40px rgba(0, 0, 0, 0.2)',
  },

  // ========== BREAKPOINTS ==========
  breakpoints: {
    xs: '480px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  // ========== TRANSITIONS ==========
  transitions: {
    fast: '0.15s ease',
    base: '0.3s ease',
    slow: '0.5s ease',
  },

  // ========== Z-INDEX ==========
  zIndex: {
    dropdown: 10,
    sticky: 100,
    modal: 1000,
    popover: 1010,
    tooltip: 1020,
  },

  // ========== CONTAINER ==========
  container: {
    maxWidth: '1400px',
    padding: '20px',
    paddingMobile: '16px',
  },
};

// Export individual categories for easier imports
export const colors = theme.colors;
export const fonts = theme.fonts;
export const spacing = theme.spacing;
export const borderRadius = theme.borderRadius;

export default theme;
