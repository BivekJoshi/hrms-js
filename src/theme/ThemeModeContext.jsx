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
      ...(mode === 'light'
        ? {
            // palette values for light mode
            primary: {
              main: '#427b62',
            },
            secondary: {
              main: '#f5f5f5',
            },
            background: {
              imageCaption: '#c5c7cb',
            },
            text: {
              black: '#fff',
            },
            divider: 'rgba(0,0,0,0.12)',
          }
        : {
            // palette values for dark mode
            primary: {
              main: '#689CF3',
            },
            divider: 'rgba(53,53,53,0.12)',
            background: {
              default: '#303030',
              paper: '#424242',
            },
            text: {
              primary: '#fff',
              secondary: 'rgba(255, 255, 255, 0.7)',
              black: '#000',
            },
          }),
    },
  });

  theme = responsiveFontSizes(theme);
  return (
    <ThemeModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeModeContext.Provider>
  );
};
