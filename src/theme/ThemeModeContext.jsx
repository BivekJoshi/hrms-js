import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { responsiveFontSizes, ThemeProvider, createTheme } from "@mui/material";

export const ThemeModeContext = createContext({
  toggleMode: () => {},
  mode: "light",
  isMobile: false,
  toggleMobile: () => {},
  palette: {}, // Empty palette initially
});

// Define getPalette outside the ThemeContextProvider
const getPalette = (darkMode) => {
  return {
    mode: darkMode ? "dark" : "light",
    primary: {
      main: darkMode ? "#7bb338" : "#388E3C",
      light: darkMode ? "#f0ca92" : "#6DAB23",
      dark: darkMode ? "#98c464" : "#7bb338",
      holiday: darkMode ? "" : "#FF8A7B",
    },
    secondary: {
      main: darkMode ? "#10598E" : "#98D8F1",
      light: darkMode ? "#75baf0" : "#418fdd",
      dark: darkMode ? "#336cb8" : "#336cb8",
    },
    background: {
      default: darkMode ? "#303030" : "#f8f8f8",
      paper: darkMode ? "#292929" : "#fff",
      imageCaption: darkMode ? "#c5c7cb" : "#616161",
      tabbg: darkMode ? "#3D4852" : "#E8F5E9",
      activetabBg: darkMode ? "#388E3C" : "#C8E6C9",
      event: darkMode ? "#b3f594" : "#D5FFCB",
      holiday: darkMode ? "#eeccc6" : "#FFEDEA",
      toDo: darkMode ? "" : "#F2F4F4",
    },
    text: {
      primary: darkMode ? "#FFFFFF" : "#000",
      secondary: darkMode ? "#fff" : "#616161",
      white: "#000",
      tableHead: darkMode ? "#fff" : "#25262E",
    },
    divider: darkMode ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)",
  };
};

export const ThemeContextProvider = ({ children }) => {
  const storedMode =
    localStorage.getItem("mode") === null
      ? "light"
      : localStorage.getItem("mode");

  const [mode, setMode] = useState(storedMode || "light");

  const [isDarkMode, setIsDarkMode] = useState(mode === "dark");
  const [width, setWidth] = useState(window.innerWidth);
  const [isMobile, setIsMobile] = useState(width <= 768);

  const handleWindowSizeChange = useCallback(() => {
    setWidth(window.innerWidth);
    setIsMobile(width <= 768);
  }, [width]);

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, [handleWindowSizeChange]);

  const toggleMode = useCallback(() => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    setIsDarkMode(newMode === "dark");
    localStorage.setItem("mode", newMode);
  }, [mode]);

  const colorMode = useMemo(
    () => ({
      toggleMode,
      mode,
      isDarkMode,
      isMobile,
      palette: getPalette(isDarkMode),
    }),
    [mode, isDarkMode, isMobile, toggleMode]
  );

  let theme = createTheme({
    palette: getPalette(isDarkMode),
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            color: mode === "dark" && "#f5f5f5",
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
