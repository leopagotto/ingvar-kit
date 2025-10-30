/**
 * IKEA Design System
 * Custom design tokens and components inspired by IKEA's brand identity
 * Blue and yellow Swedish colors, clean minimalist design
 */

const IKEA_DESIGN_TOKENS = {
  // Official IKEA Brand Colors
  colors: {
    // Primary IKEA Blues
    primary: {
      50: '#f0f4ff',
      100: '#e0eaff',
      200: '#c7d9ff',
      300: '#a5bfff',
      400: '#8099ff',
      500: '#5b75ff',
      600: '#3d52ff',
      700: '#0046be', // Main IKEA Blue
      800: '#003399',
      900: '#002366'
    },

    // IKEA Yellow (Swedish flag complement)
    secondary: {
      50: '#fffdf0',
      100: '#fffae0',
      200: '#fff4c7',
      300: '#ffeca5',
      400: '#ffe380',
      500: '#ffd85b',
      600: '#ffcc3d',
      700: '#fdc935', // IKEA Yellow
      800: '#e6b12d',
      900: '#cc9900'
    },

    // IKEA Wood Tones (Natural materials)
    accent: {
      50: '#faf8f5',
      100: '#f5f0e8',
      200: '#ebe1d2',
      300: '#ddd0b8',
      400: '#c9b895',
      500: '#b5a082',
      600: '#a08968',
      700: '#8b7355', // Light wood
      800: '#6b5940',
      900: '#4a3d2a'
    },

    // Neutral Grays (Clean, minimal)
    neutral: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#e5e5e5',
      300: '#d4d4d4',
      400: '#a3a3a3',
      500: '#737373',
      600: '#525252',
      700: '#404040',
      800: '#262626',
      900: '#171717'
    },

    // Semantic Colors
    success: '#22c55e',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',

    // Background Colors
    background: {
      primary: '#ffffff',
      secondary: '#fafafa',
      tertiary: '#f5f5f5'
    },

    // Text Colors
    text: {
      primary: '#171717',
      secondary: '#525252',
      tertiary: '#737373',
      inverse: '#ffffff'
    }
  },

  // Typography (IKEA uses clean, readable fonts)
  typography: {
    fontFamily: {
      sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      mono: ['JetBrains Mono', 'Monaco', 'Cascadia Code', 'Segoe UI Mono', 'Roboto Mono', 'monospace']
    },
    fontSize: {
      xs: '0.75rem',     // 12px
      sm: '0.875rem',    // 14px
      base: '1rem',      // 16px
      lg: '1.125rem',    // 18px
      xl: '1.25rem',     // 20px
      '2xl': '1.5rem',   // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem',  // 36px
      '5xl': '3rem',     // 48px
      '6xl': '3.75rem'   // 60px
    },
    fontWeight: {
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700'
    },
    lineHeight: {
      tight: '1.25',
      normal: '1.5',
      relaxed: '1.75'
    }
  },

  // Spacing (Consistent 8px grid system)
  spacing: {
    0: '0',
    1: '0.25rem',  // 4px
    2: '0.5rem',   // 8px
    3: '0.75rem',  // 12px
    4: '1rem',     // 16px
    5: '1.25rem',  // 20px
    6: '1.5rem',   // 24px
    8: '2rem',     // 32px
    10: '2.5rem',  // 40px
    12: '3rem',    // 48px
    16: '4rem',    // 64px
    20: '5rem',    // 80px
    24: '6rem',    // 96px
    32: '8rem',    // 128px
    40: '10rem',   // 160px
    48: '12rem',   // 192px
    56: '14rem',   // 224px
    64: '16rem'    // 256px
  },

  // Border Radius (Subtle, modern)
  borderRadius: {
    none: '0',
    sm: '0.125rem',    // 2px
    base: '0.25rem',   // 4px
    md: '0.375rem',    // 6px
    lg: '0.5rem',      // 8px
    xl: '0.75rem',     // 12px
    '2xl': '1rem',     // 16px
    '3xl': '1.5rem',   // 24px
    full: '9999px'
  },

  // Shadows (Soft, natural)
  boxShadow: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    base: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    none: '0 0 #0000'
  },

  // Breakpoints (Mobile-first responsive)
  screens: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px'
  }
};

/**
 * IKEA Component Patterns
 * Design patterns and component guidelines
 */
const IKEA_COMPONENTS = {
  // Button Variants
  button: {
    primary: {
      backgroundColor: IKEA_DESIGN_TOKENS.colors.primary[700],
      color: IKEA_DESIGN_TOKENS.colors.text.inverse,
      padding: `${IKEA_DESIGN_TOKENS.spacing[3]} ${IKEA_DESIGN_TOKENS.spacing[6]}`,
      borderRadius: IKEA_DESIGN_TOKENS.borderRadius.md,
      fontWeight: IKEA_DESIGN_TOKENS.typography.fontWeight.medium,
      fontSize: IKEA_DESIGN_TOKENS.typography.fontSize.base,
      border: 'none',
      boxShadow: IKEA_DESIGN_TOKENS.boxShadow.sm,
      transition: 'all 0.2s ease'
    },
    secondary: {
      backgroundColor: IKEA_DESIGN_TOKENS.colors.secondary[600],
      color: IKEA_DESIGN_TOKENS.colors.text.primary,
      padding: `${IKEA_DESIGN_TOKENS.spacing[3]} ${IKEA_DESIGN_TOKENS.spacing[6]}`,
      borderRadius: IKEA_DESIGN_TOKENS.borderRadius.md,
      fontWeight: IKEA_DESIGN_TOKENS.typography.fontWeight.medium,
      fontSize: IKEA_DESIGN_TOKENS.typography.fontSize.base,
      border: 'none',
      boxShadow: IKEA_DESIGN_TOKENS.boxShadow.sm,
      transition: 'all 0.2s ease'
    },
    outline: {
      backgroundColor: 'transparent',
      color: IKEA_DESIGN_TOKENS.colors.primary[700],
      padding: `${IKEA_DESIGN_TOKENS.spacing[3]} ${IKEA_DESIGN_TOKENS.spacing[6]}`,
      borderRadius: IKEA_DESIGN_TOKENS.borderRadius.md,
      fontWeight: IKEA_DESIGN_TOKENS.typography.fontWeight.medium,
      fontSize: IKEA_DESIGN_TOKENS.typography.fontSize.base,
      border: `2px solid ${IKEA_DESIGN_TOKENS.colors.primary[700]}`,
      transition: 'all 0.2s ease'
    }
  },

  // Card Styles
  card: {
    default: {
      backgroundColor: IKEA_DESIGN_TOKENS.colors.background.primary,
      borderRadius: IKEA_DESIGN_TOKENS.borderRadius.lg,
      boxShadow: IKEA_DESIGN_TOKENS.boxShadow.md,
      padding: IKEA_DESIGN_TOKENS.spacing[6],
      border: `1px solid ${IKEA_DESIGN_TOKENS.colors.neutral[200]}`
    },
    elevated: {
      backgroundColor: IKEA_DESIGN_TOKENS.colors.background.primary,
      borderRadius: IKEA_DESIGN_TOKENS.borderRadius.lg,
      boxShadow: IKEA_DESIGN_TOKENS.boxShadow.xl,
      padding: IKEA_DESIGN_TOKENS.spacing[8],
      border: 'none'
    }
  },

  // Input Styles
  input: {
    default: {
      backgroundColor: IKEA_DESIGN_TOKENS.colors.background.primary,
      border: `2px solid ${IKEA_DESIGN_TOKENS.colors.neutral[300]}`,
      borderRadius: IKEA_DESIGN_TOKENS.borderRadius.md,
      padding: `${IKEA_DESIGN_TOKENS.spacing[3]} ${IKEA_DESIGN_TOKENS.spacing[4]}`,
      fontSize: IKEA_DESIGN_TOKENS.typography.fontSize.base,
      lineHeight: IKEA_DESIGN_TOKENS.typography.lineHeight.normal,
      transition: 'border-color 0.2s ease',
      outline: 'none'
    }
  }
};

/**
 * Generate Tailwind CSS configuration for IKEA design system
 */
function generateIkeaTailwindConfig() {
  const config = {
    theme: {
      extend: {
        colors: {
          ikea: IKEA_DESIGN_TOKENS.colors.primary,
          'ikea-yellow': IKEA_DESIGN_TOKENS.colors.secondary,
          'ikea-wood': IKEA_DESIGN_TOKENS.colors.accent,
          primary: IKEA_DESIGN_TOKENS.colors.primary,
          secondary: IKEA_DESIGN_TOKENS.colors.secondary,
          accent: IKEA_DESIGN_TOKENS.colors.accent,
          neutral: IKEA_DESIGN_TOKENS.colors.neutral
        },
        fontFamily: IKEA_DESIGN_TOKENS.typography.fontFamily,
        fontSize: IKEA_DESIGN_TOKENS.typography.fontSize,
        fontWeight: IKEA_DESIGN_TOKENS.typography.fontWeight,
        lineHeight: IKEA_DESIGN_TOKENS.typography.lineHeight,
        spacing: IKEA_DESIGN_TOKENS.spacing,
        borderRadius: IKEA_DESIGN_TOKENS.borderRadius,
        boxShadow: IKEA_DESIGN_TOKENS.boxShadow,
        screens: IKEA_DESIGN_TOKENS.screens
      }
    }
  };

  return `/** @type {import('tailwindcss').Config} */
export default ${JSON.stringify(config, null, 2)}
`;
}

/**
 * Generate CSS custom properties for IKEA design system
 */
function generateIkeaCSSProperties() {
  const cssVars = [];

  // Colors
  Object.entries(IKEA_DESIGN_TOKENS.colors.primary).forEach(([key, value]) => {
    cssVars.push(`  --ikea-blue-${key}: ${value};`);
  });

  Object.entries(IKEA_DESIGN_TOKENS.colors.secondary).forEach(([key, value]) => {
    cssVars.push(`  --ikea-yellow-${key}: ${value};`);
  });

  Object.entries(IKEA_DESIGN_TOKENS.colors.accent).forEach(([key, value]) => {
    cssVars.push(`  --ikea-wood-${key}: ${value};`);
  });

  Object.entries(IKEA_DESIGN_TOKENS.colors.neutral).forEach(([key, value]) => {
    cssVars.push(`  --neutral-${key}: ${value};`);
  });

  // Spacing
  Object.entries(IKEA_DESIGN_TOKENS.spacing).forEach(([key, value]) => {
    cssVars.push(`  --spacing-${key}: ${value};`);
  });

  return `:root {\n${cssVars.join('\n')}\n}`;
}

/**
 * Generate component CSS classes for IKEA design system
 */
function generateIkeaComponentCSS() {
  return `
/* IKEA Design System Components */

.ikea-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: ${IKEA_DESIGN_TOKENS.typography.fontFamily.sans.join(', ')};
}

.ikea-btn-primary {
  background-color: ${IKEA_DESIGN_TOKENS.colors.primary[700]};
  color: ${IKEA_DESIGN_TOKENS.colors.text.inverse};
  padding: ${IKEA_DESIGN_TOKENS.spacing[3]} ${IKEA_DESIGN_TOKENS.spacing[6]};
  border-radius: ${IKEA_DESIGN_TOKENS.borderRadius.md};
  font-weight: ${IKEA_DESIGN_TOKENS.typography.fontWeight.medium};
  font-size: ${IKEA_DESIGN_TOKENS.typography.fontSize.base};
  border: none;
  box-shadow: ${IKEA_DESIGN_TOKENS.boxShadow.sm};
}

.ikea-btn-primary:hover {
  background-color: ${IKEA_DESIGN_TOKENS.colors.primary[800]};
  box-shadow: ${IKEA_DESIGN_TOKENS.boxShadow.md};
}

.ikea-btn-secondary {
  background-color: ${IKEA_DESIGN_TOKENS.colors.secondary[600]};
  color: ${IKEA_DESIGN_TOKENS.colors.text.primary};
  padding: ${IKEA_DESIGN_TOKENS.spacing[3]} ${IKEA_DESIGN_TOKENS.spacing[6]};
  border-radius: ${IKEA_DESIGN_TOKENS.borderRadius.md};
  font-weight: ${IKEA_DESIGN_TOKENS.typography.fontWeight.medium};
  font-size: ${IKEA_DESIGN_TOKENS.typography.fontSize.base};
  border: none;
  box-shadow: ${IKEA_DESIGN_TOKENS.boxShadow.sm};
}

.ikea-btn-secondary:hover {
  background-color: ${IKEA_DESIGN_TOKENS.colors.secondary[700]};
  box-shadow: ${IKEA_DESIGN_TOKENS.boxShadow.md};
}

.ikea-card {
  background-color: ${IKEA_DESIGN_TOKENS.colors.background.primary};
  border-radius: ${IKEA_DESIGN_TOKENS.borderRadius.lg};
  box-shadow: ${IKEA_DESIGN_TOKENS.boxShadow.md};
  padding: ${IKEA_DESIGN_TOKENS.spacing[6]};
  border: 1px solid ${IKEA_DESIGN_TOKENS.colors.neutral[200]};
}

.ikea-input {
  background-color: ${IKEA_DESIGN_TOKENS.colors.background.primary};
  border: 2px solid ${IKEA_DESIGN_TOKENS.colors.neutral[300]};
  border-radius: ${IKEA_DESIGN_TOKENS.borderRadius.md};
  padding: ${IKEA_DESIGN_TOKENS.spacing[3]} ${IKEA_DESIGN_TOKENS.spacing[4]};
  font-size: ${IKEA_DESIGN_TOKENS.typography.fontSize.base};
  line-height: ${IKEA_DESIGN_TOKENS.typography.lineHeight.normal};
  transition: border-color 0.2s ease;
  outline: none;
  width: 100%;
}

.ikea-input:focus {
  border-color: ${IKEA_DESIGN_TOKENS.colors.primary[500]};
  box-shadow: 0 0 0 3px ${IKEA_DESIGN_TOKENS.colors.primary[500]}20;
}

.ikea-text-primary {
  color: ${IKEA_DESIGN_TOKENS.colors.text.primary};
}

.ikea-text-secondary {
  color: ${IKEA_DESIGN_TOKENS.colors.text.secondary};
}

.ikea-bg-primary {
  background-color: ${IKEA_DESIGN_TOKENS.colors.background.primary};
}

.ikea-bg-secondary {
  background-color: ${IKEA_DESIGN_TOKENS.colors.background.secondary};
}
`;
}

module.exports = {
  IKEA_DESIGN_TOKENS,
  IKEA_COMPONENTS,
  generateIkeaTailwindConfig,
  generateIkeaCSSProperties,
  generateIkeaComponentCSS
};
