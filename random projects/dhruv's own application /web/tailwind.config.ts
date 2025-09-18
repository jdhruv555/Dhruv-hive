export default {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Perplexity-inspired palette
        primary: {
          DEFAULT: '#3b82f6',
          50: '#ecf3ff',
          100: '#dbe9ff',
          200: '#b7d2ff',
          300: '#8ab4ff',
          400: '#5c93ff',
          500: '#3b82f6',
          600: '#326ee0',
          700: '#2857bd',
          800: '#23489a',
          900: '#1e3a8a'
        },
        ink: {
          50: '#f7f8fb',
          100: '#eef0f5',
          200: '#d9deea',
          300: '#b8c2d8',
          400: '#93a3c2',
          500: '#6e82aa',
          600: '#4e628c',
          700: '#3f5073',
          800: '#33405d',
          900: '#2a344d',
          950: '#121723'
        },
        surface: {
          DEFAULT: '#0b1220',
          light: '#f8fafc',
          dark: '#0b1220'
        }
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.25rem',
        '3xl': '1.5rem'
      },
      boxShadow: {
        soft: '0 4px 20px rgba(0,0,0,0.08)',
        glow: '0 10px 30px rgba(59,130,246,0.25)'
      }
    }
  }
} as const;


