import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2c7be5', // Updated primary color to match the new design
      light: '#42a5f5',
      dark: '#1a5dcc', // Darker shade for hover effects
    },
    secondary: {
      main: '#9c27b0',
      light: '#ba68c8',
      dark: '#7b1fa2',
    },
    background: {
      default: '#eaeaea', // Updated to match the new background color
      paper: '#ffffff',
    },
  },
  typography: {
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
      color: '#154c79', // Updated color for headings
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
      color: '#154c79', // Updated color for headings
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
      color: '#154c79', // Updated color for headings
    },
    body1: {
      fontSize: '1rem',
      color: '#333', // Default body text color
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'uppercase', // Ensuring all buttons are uppercase
          padding: '0.65rem 1.4rem', // Consistent padding
          backgroundColor: '#2c7be5', // Default background color
          color: 'white',
          '&:hover': {
            backgroundColor: '#1a5dcc', // Hover color
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)', // Shadow on hover
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12, // Slightly more rounded corners
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)', // Deeper shadow for cards
        },
      },
    },
  },
});

export default theme;
