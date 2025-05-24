export const THEME = {
  colors: {
    primary: {
      main: '#2563eb', // Tailwind blue-600, matches focus highlight
      light: '#E8F1FF', // Lighter blue background
      dark: '#1e40af', // Tailwind blue-800
    },
    accent: {
      main: '#00B96L', // LarkSuite green accent
      light: '#E6FAF0',
      dark: '#008C4A',
    },
    text: {
      primary: '#1D2129', // LarkSuite dark text
      secondary: '#4E5969', // LarkSuite secondary text
      light: '#86909C', // LarkSuite light text
      link: '#2563eb', // Tailwind blue-600
    },
    background: {
      default: '#F7F8FA', // LarkSuite background
      paper: '#FFFFFF',
    },
    border: {
      default: '#E5E6EB', // LarkSuite border
      selected: '#2563eb',
    }
  },
  spacing: {
    container: {
      padding: '2rem', // 32px
      maxWidth: '80rem', // 1280px
    }
  },
  borderRadius: {
    default: '0.75rem', // 12px, more rounded
    button: '1.5rem', // 24px, pill-shaped buttons
  },
  fontFamily: {
    main: '"Inter", "LarkSans", "Helvetica Neue", Arial, sans-serif',
  }
} as const;