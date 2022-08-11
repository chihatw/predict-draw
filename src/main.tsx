import { createRoot } from 'react-dom/client';
import React from 'react';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material';
import { TypographyOptions } from '@mui/material/styles/createTypography';

interface ExtendedTypographyOptions extends TypographyOptions {
  mPlusRounded: React.CSSProperties;
  mPlusRounded500: React.CSSProperties;
  lato100: React.CSSProperties;
  lato900: React.CSSProperties;
  mRounded300: React.CSSProperties;
}

declare module '@mui/material/styles' {
  interface Palette {
    liSan: { main: string };
    kouSan: { main: string };
  }
  interface PaletteOptions {
    liSan?: {
      main?: string;
    };
    kouSan?: {
      main?: string;
    };
  }
}

const theme = createTheme({
  palette: {
    liSan: { main: '#c62828' },
    kouSan: { main: '#1565c0' },
    primary: { main: '#52a2aa' },
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
    lato100: {
      color: '#555',
      fontFamily: 'Lato, sans-serif',
      fontWeight: 100,
    },
    lato900: {
      color: '#555',
      fontFamily: 'Lato, sans-serif',
      fontWeight: 900,
    },
    mRounded300: {
      color: '#555',
      fontFamily: '"M Plus Rounded 1c", sans-serif',
      fontWeight: 300,
    },
  } as ExtendedTypographyOptions,
});

const container = document.getElementById('root');
if (!container) throw new Error('Fail to find the roote lement');
const root = createRoot(container);

root.render(
  // strikt mode は useEffect が 2回実行される
  // <React.StrictMode>
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <div style={{ height: '100vh' }}>
        <App />
      </div>
    </BrowserRouter>
  </ThemeProvider>
  // </React.StrictMode>
);
