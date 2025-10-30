import { IKEA_DESIGN_TOKENS } from './tokens';

export const ikeaTailwindConfig = {
  theme: {
    extend: {
      colors: {
        'ikea-blue': IKEA_DESIGN_TOKENS.colors.primary.blue,
        'ikea-blue-dark': IKEA_DESIGN_TOKENS.colors.primary['blue-dark'],
        'ikea-blue-light': IKEA_DESIGN_TOKENS.colors.primary['blue-light'],
        'ikea-yellow': IKEA_DESIGN_TOKENS.colors.accent.yellow,
        'ikea-yellow-dark': IKEA_DESIGN_TOKENS.colors.accent['yellow-dark'],
        'ikea-yellow-light': IKEA_DESIGN_TOKENS.colors.accent['yellow-light'],
        'ikea-white': IKEA_DESIGN_TOKENS.colors.neutral.white,
        'ikea-gray': IKEA_DESIGN_TOKENS.colors.neutral.gray
      },
      fontFamily: {
        'ikea-sans': IKEA_DESIGN_TOKENS.typography.fontFamily.sans
      },
      spacing: {
        'ikea-xs': IKEA_DESIGN_TOKENS.spacing.xs,
        'ikea-sm': IKEA_DESIGN_TOKENS.spacing.sm,
        'ikea-md': IKEA_DESIGN_TOKENS.spacing.md,
        'ikea-lg': IKEA_DESIGN_TOKENS.spacing.lg,
        'ikea-xl': IKEA_DESIGN_TOKENS.spacing.xl,
        'ikea-2xl': IKEA_DESIGN_TOKENS.spacing['2xl'],
        'ikea-3xl': IKEA_DESIGN_TOKENS.spacing['3xl']
      },
      borderRadius: {
        'ikea-sm': IKEA_DESIGN_TOKENS.borderRadius.sm,
        'ikea-md': IKEA_DESIGN_TOKENS.borderRadius.md,
        'ikea-lg': IKEA_DESIGN_TOKENS.borderRadius.lg
      },
      boxShadow: {
        'ikea-sm': IKEA_DESIGN_TOKENS.shadows.sm,
        'ikea-md': IKEA_DESIGN_TOKENS.shadows.md,
        'ikea-lg': IKEA_DESIGN_TOKENS.shadows.lg
      }
    }
  }
};
