// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    background: {
      default: '#e5e5e5', // Gris claro
    },
    primary: {
      main: '#642c6b', // Lavanda para los botones y textos
    },
    text: {
      primary: '#642c6b', // Lavanda para los textos
    },
  },
});

export default theme;
