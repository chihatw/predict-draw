import React from 'react';
import ReactDOM from 'react-dom/client';

import { createTheme, ThemeProvider } from '@mui/material';
import { TypographyOptions } from '@mui/material/styles/createTypography';

import './index.css';
import App from './views';

import { configureStore } from '@/application/0-store/store';
import services from '@/infrastructure/services';
import { Provider } from 'react-redux';

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

if (import.meta.env.PROD) {
  console.log = () => {};
  console.error = () => {};
  console.debug = () => {};
  console.warn = () => {};
}

const store = configureStore(services);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>
);

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = ReturnType<typeof configureStore>;
export type AppDispatch = typeof store.dispatch;
