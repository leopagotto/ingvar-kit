/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // IKEA Brand Colors
        'ikea-blue': '#0058A3',
        'ikea-yellow': '#FFDB00',
        
        // Neutral Scale (from 10-FOUNDATIONS-EXTENDED.md)
        neutral: {
          0: '#FFFFFF',
          50: '#F5F5F5',
          100: '#E8E8E8',
          200: '#DFDFDF',
          300: '#929292',
          400: '#6F6F6F',
          500: '#484848',
          600: '#383838',
          700: '#282828',
          800: '#1F1F1F',
          900: '#111111',
          950: '#000000',
        },
        
        // Semantic Colors
        success: {
          DEFAULT: '#2E7D32',
          light: '#E8F5E9',
        },
        warning: {
          DEFAULT: '#ED6C02',
          light: '#FFF3E0',
        },
        error: {
          DEFAULT: '#D32F2F',
          light: '#FFEBEE',
        },
        info: {
          DEFAULT: '#0288D1',
          light: '#E1F5FE',
        },
      },
      spacing: {
        // 4px base spacing scale (from 10-FOUNDATIONS-EXTENDED.md)
        0: '0',
        1: '4px',
        2: '8px',
        3: '12px',
        4: '16px',
        5: '20px',
        6: '24px',
        8: '32px',
        10: '40px',
        12: '48px',
        16: '64px',
        20: '80px',
        24: '96px',
        32: '128px',
      },
      borderRadius: {
        // Corner radius system
        none: '0',
        xs: '2px',
        sm: '4px',
        DEFAULT: '8px',
        lg: '16px',
        full: '9999px',
      },
      boxShadow: {
        // Elevation system (from 10-FOUNDATIONS-EXTENDED.md)
        1: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        2: '0 2px 4px 0 rgba(0, 0, 0, 0.1)',
        3: '0 4px 8px 0 rgba(0, 0, 0, 0.12)',
        4: '0 8px 16px 0 rgba(0, 0, 0, 0.14)',
        5: '0 16px 32px 0 rgba(0, 0, 0, 0.16)',
      },
      fontFamily: {
        sans: ['Noto Sans', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Typography scale (from 10-FOUNDATIONS-EXTENDED.md)
        xs: ['12px', { lineHeight: '16px' }],
        sm: ['14px', { lineHeight: '20px' }],
        base: ['16px', { lineHeight: '24px' }],
        lg: ['18px', { lineHeight: '28px' }],
        xl: ['20px', { lineHeight: '28px' }],
        '2xl': ['24px', { lineHeight: '32px' }],
        '3xl': ['30px', { lineHeight: '36px' }],
        '4xl': ['36px', { lineHeight: '40px' }],
        '5xl': ['48px', { lineHeight: '48px' }],
        '6xl': ['60px', { lineHeight: '60px' }],
      },
      transitionDuration: {
        // Motion scale (from 10-FOUNDATIONS-EXTENDED.md)
        fast: '100ms',
        normal: '200ms',
        medium: '300ms',
        slow: '400ms',
        slower: '600ms',
      },
    },
  },
  plugins: [],
};
