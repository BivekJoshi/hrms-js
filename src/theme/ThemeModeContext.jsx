import React from 'react';
import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material';
import { createContext, useEffect, useMemo, useState } from 'react';

export const ThemeModeContext = createContext({
  toggleMode: () => {},
  mode: 'light',
  isMobile: 'false',
  toggleMobile: () => {},
});

export const ThemeContextProvider = ({ children }) => {
  const [mode, setMode] = useState('light');
  const [width, setWidth] = useState(window.innerWidth);

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, []);
  const [isMobile, setIsMobile] = useState(width <= 768);

  useEffect(() => {
    setIsMobile(width <= 768);
  }, [width]);

  const colorMode = useMemo(
    () => ({
      toggleMode: () =>
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light')),
      mode,
      isMobile,
      toggleMobile: () => {
        setIsMobile((prevMode) => !prevMode);
      },
    }),
    [mode, isMobile]
  );

  let theme = createTheme({
    overrides: {
      MuiDialog: {
        paper: {
          overflowX: 'hidden',
        },
      },
    },
    typography: {
      button: {
        textTransform: 'none',
      },
    },
    palette: {
      mode: mode,
      primary: {
        main: mode === 'light' ? '#1626C9' : '#689CF3',
      },
      secondary: {
        main: mode === 'light' ? '#C98421' : '#689CF3',
      },
      background: {
        default: mode === 'light' ? '#f5f5f5' : '#303030',
        paper: mode === 'light' ? '#fff' : '#424242',
        imageCaption: mode === 'light' ? '#c5c7cb' : '#fff',
      },
      text: {
        primary: mode === 'light' ? '#000' : '#fff',
        secondary:
          mode === 'light' ? 'rgba(0, 0, 0, 0.7)' : 'rgba(255, 255, 255, 0.7)',
      },
      divider:
        mode === 'light' ? 'rgba(0, 0, 0, 0.12)' : 'rgba(53, 53, 53, 0.12)',
    },
  });

  theme = responsiveFontSizes(theme);

  return (
    <ThemeModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeModeContext.Provider>
  );
};
