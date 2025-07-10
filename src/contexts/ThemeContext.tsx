import React, { createContext, useEffect } from "react";

interface ThemeContextType {
  theme: "dark";
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const theme = "dark";

  useEffect(() => {
    // Always set dark theme
    document.documentElement.setAttribute("data-theme", "dark");
  }, []);

  return (
    <ThemeContext.Provider value={{ theme }}>{children}</ThemeContext.Provider>
  );
};
