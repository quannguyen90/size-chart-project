export const THEME = {
  colors: {
    primary: {
      main: '#F48220',
      light: '#FFF5ED',
      dark: '#E6730F',
    },
    text: {
      primary: '#1F2937', // gray-900
      secondary: '#4B5563', // gray-600
      light: '#9CA3AF', // gray-400
    },
    background: {
      default: '#F9FAFB', // gray-50
      paper: '#FFFFFF',
    },
    border: {
      default: '#E5E7EB', // gray-200
      selected: '#F48220',
    }
  },
  spacing: {
    container: {
      padding: '2rem', // 32px
      maxWidth: '80rem', // 1280px
    }
  },
  borderRadius: {
    default: '0.5rem', // 8px
    button: '0.5rem', // 8px
  }
} as const; 