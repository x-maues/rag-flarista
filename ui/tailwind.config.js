/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './app/**/*.{js,ts,jsx,tsx,mdx}',
      './components/**/*.{js,ts,jsx,tsx,mdx}',
      './pages/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
      extend: {
        fontFamily: {
          'sans': ['var(--font-inter)', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'],
          'mono': ['var(--font-roboto-mono)', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
        },
        colors: {
          flare: {
            50: '#f0fdfa',
            100: '#ccfbf1',
            200: '#99f6e4',
            300: '#5eead4',
            400: '#2dd4bf',
            500: '#14b8a6',
            600: '#0d9488',
            700: '#0f766e',
            800: '#115e59',
            900: '#134e4a',
            950: '#042f2e',
          },
          darkBg: '#111827', // Dark background for dark mode
          lightBg: '#f9fafb', // Light background for light mode
          textPrimaryDark: '#f9fafb', // Primary text color in dark mode
          textPrimaryLight: '#111827', // Primary text color in light mode
          accent: '#2dd4bf', // Flare accent color
          grayBorder: '#e5e7eb', // Light gray border
          darkBorder: '#4b5563',  // Dark gray border for dark mode
        },
        keyframes: {
          'slide-up': {
            '0%': { transform: 'translateY(20px)', opacity: '0' },
            '100%': { transform: 'translateY(0)', opacity: '1' },
          },
          'fade-in': {
            '0%': { opacity: '0' },
            '100%': { opacity: '1' },
          },
        },
        animation: {
          'slide-up': 'slide-up 0.3s ease-out forwards',
          'fade-in': 'fade-in 0.2s ease-in-out forwards',
        },
      },
    },
    darkMode: 'class', // Enable dark mode via class strategy
    plugins: [],
  };