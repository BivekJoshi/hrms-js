import { responsiveFontSizes, ThemeProvider, createTheme } from '@mui/material';
import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

export const ThemeModeContext = createContext({
  toggleMode: () => {},
  mode: 'light',
  isMobile: 'false',
  toggleMobile: () => {},
});

export const ThemeContextProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mode, setMode] = useState('light');
  const [width, setWidth] = useState(window.innerWidth);
  const [isMobile, setIsMobile] = useState(width <= 768);

  const handleWindowSizeChange = useCallback(() => {
    setWidth(window.innerWidth);
    setIsMobile(width <= 768);
  }, [width]);

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, [handleWindowSizeChange]);

  const toggleMode = useCallback(() => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    setIsDarkMode((prevMode) => !prevMode);
  }, []);

  const colorMode = useMemo(
    () => ({
      toggleMode,
      mode,
      isDarkMode,
      isMobile,
    }),
    [mode, isDarkMode, isMobile, toggleMode]
  );

  let theme = createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
      primary: {
        main: '#6DAB23',
        light: '#f0ca92',
        dark: '#cd7539',
      },
      secondary: {
        main: '#418fdd',
        light: '#75baf0',
        dark: '#336cb8',
      },
      background: {
        default: isDarkMode ? '#303030' : '#f8f8f8',
        paper: isDarkMode ? '#3838388a' : '#fff',
        imageCaption: isDarkMode ? '#c5c7cb' : '#616161',
      },
      text: {
        primary: isDarkMode ? '#FFFFFF ' : '#000',
        secondary: isDarkMode ? '#fff' : '#616161',
        white: '#000',
      },
      divider: isDarkMode ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)',
    },
    components: {
      MuiTabs: {
        styleOverrides: {
          root: {
            backgroundColor: '#your-tab-background-color',
          },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            color: '#000',
            '&.Mui-selected': {
              // Change the color of the selected tab
              color: '#6DAB23',
            },
          },
        },
      },
    },
  });

  theme = responsiveFontSizes(theme);

  return (
    <ThemeModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeModeContext.Provider>
  );
};

export default ThemeModeContext;
