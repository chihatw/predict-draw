import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material';
import { TypographyOptions } from '@mui/material/styles/createTypography';

interface ExtendedTypographyOptions extends TypographyOptions {
  mPlusRounded: React.CSSProperties;
  mPlusRounded500: React.CSSProperties;
}

const theme = createTheme({
  palette: {
    primary: { main: '#c62828' },
    secondary: { main: '#1565c0' },
  },
  typography: {
    mPlusRounded: {
      color: '#555',
      fontFamily: '"M PLUS Rounded 1c", sans-serif',
    },
    mPlusRounded500: {
      color: '#555',
      fontFamily: '"M PLUS Rounded 1c", sans-serif',
      fontWeight: 500,
    },
  } as ExtendedTypographyOptions,
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <div style={{ height: '100vh' }}>
          <App />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
