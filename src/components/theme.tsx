import React, {
  createContext,
  useState,
  useContext,
  type ReactNode,
} from "react";
import Dropdown from "./dropdown";

// 1️⃣ Define theme structure
interface CustomTheme {
  background: string;
  text: string;
  [key: string]: string;
}

interface ThemeContextType {
  theme: string; // Current selected theme name
  themes: Record<string, CustomTheme>; // ✅ Now stores all available themes
  setTheme: (theme: string) => void;
}

// 3️⃣ Create the context
export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

// 4️⃣ Provider props allowing dynamic themes
interface ThemeProviderProps {
  children: ReactNode;
  themes: Record<string, CustomTheme>; // Supports multiple themes
  defaultTheme?: string;
}

interface ThemeSwitcherProps {
  triggerContent?: React.ReactNode | string; // ✅ Custom content for the button (text, icons, etc.)
  triggerStyle?: string; // ✅ Custom styles for the trigger button
  menuStyle?: string;
  menuItemStyle?: string;
}

// 5️⃣ Create ThemeProvider supporting multiple themes
export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  themes,
  defaultTheme = "dark",
}) => {
  const [theme, setTheme] = useState<string>(defaultTheme);

  return (
    <ThemeContext.Provider value={{ theme, themes, setTheme }}>
      <div
        className={`${themes[theme]?.background} ${themes[theme]?.text} transition-colors duration-300 min-h-screen`}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

// 6️⃣ Create ThemeSwitcher for dynamic switching
export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({
  triggerContent = "Switch Theme", // Default label if no custom content provided
  triggerStyle = "flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition",
  menuStyle,
  menuItemStyle,
}) => {
  const themeContext = useContext(ThemeContext);
  if (!themeContext) {
    throw new Error("ThemeSwitcher must be used within a ThemeProvider");
  }

  const { themes, setTheme } = themeContext;

  return (
    <Dropdown
      menuItemStyle={`${menuItemStyle}`}
      menuStyle={`${menuStyle}`}
      triggerLabel={triggerContent}
      triggerStyle={triggerStyle}
      options={Object.keys(themes).map((themeKey) => ({
        key: themeKey,
        label: themeKey.charAt(0).toUpperCase() + themeKey.slice(1),
        action: () => setTheme(themeKey), // ✅ Set selected theme and close dropdown
      }))}
    />
  );
};
