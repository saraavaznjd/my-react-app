import { createContext, useContext, useState, useEffect } from "react";

// ایجاد Context
const ThemeContext = createContext();

// Provider
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  // وقتی theme تغییر می‌کنه، روی body کلاس اضافه میشه
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  // تابع تغییر تم
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// هوک کمکی برای استفاده راحت‌تر
export function useTheme() {
  return useContext(ThemeContext);
}