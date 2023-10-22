import React, { useState, createContext } from "react";
type TTheme = [typeof themes['light']| typeof themes['dark'], () => void];

export const ThemeContext = createContext<TTheme>(
  [{
    foreground: "#000000",
    background: "#eeeeee"
  }, ()=>undefined]
);
const themes = {
  light: {
    foreground: "#000000",
    background: "#eeeeee"
  },
  dark: {
    foreground: "#ffffff",
    background: "#222222"
  }
};
interface IThemeContextProvider {
  children: React.ReactNode;
}

export const ThemeContextProvider: React.FC<IThemeContextProvider> = ({ children }) => {
  const [theme, setTheme] = useState(themes.light);
  const [activeTheme, setActiveTheme] = useState("light");

  const toggleTheme = () => {
    const nextTheme = activeTheme === "light" ? "dark" : "light";
    setTheme(themes[nextTheme]);
    setActiveTheme(nextTheme);
  };
  return (
    <ThemeContext.Provider value={[theme, toggleTheme]}>
      {children}
    </ThemeContext.Provider>
  );
};
