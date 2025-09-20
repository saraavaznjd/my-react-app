import ThemeSwitcher from "./components/themeSwitcher";
import { ThemeProvider } from "./components/themeContex";

export default function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col items-center justify-center 
                      bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <h1 className="text-3xl font-bold mb-6">Day - 14 Context API</h1>
        <h2 className="text-2xl font-bold mb-6">Theme Switcher Demo</h2>
        <ThemeSwitcher />
        <p className="mt-6">
          متن نمونه: با تغییر تم، رنگ پس‌زمینه و متن تغییر می‌کنه 🚀
        </p>
      </div>
    </ThemeProvider>
  );
}

