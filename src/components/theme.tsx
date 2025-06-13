import { Moon, Sun } from "lucide-react";
import React, {
  createContext,
  useState,
  useContext,
  type ReactNode,
} from "react";

interface CustomTheme {
  background: string;
  text: string;
  [key: string]: string;
}

interface ThemeProviderProps {
  children: ReactNode;
  lightTheme?: CustomTheme;
  darkTheme?: CustomTheme;
}

const defaultLightTheme: CustomTheme = {
  background: "bg-white",
  text: "text-black",
};

const defaultDarkTheme: CustomTheme = {
  background: "bg-zinc-900",
  text: "text-white",
};

// 1. Define the shape of the context value
interface ThemeContextType {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

// 2. Create the context with an initial undefined value
export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

// 3. Define props type for the provider
interface ThemeProviderProps {
  children: ReactNode;
}

// 4. Create the provider component
export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  lightTheme = defaultLightTheme,
  darkTheme = defaultDarkTheme,
}) => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const appliedTheme = theme === "light" ? lightTheme : darkTheme;

  const themeClasses = `${appliedTheme.background} ${appliedTheme.text}`;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div
        className={`${themeClasses} transition-colors duration-300 min-h-screen`}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const ThemeSwitcher = () => {
  const themeContext = useContext(ThemeContext);
  if (!themeContext) {
    throw new Error("ThemeSwitcher must be used within a ThemeProvider");
  }

  const { theme, toggleTheme } = themeContext;

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition hover:cursor-pointer"
    >
      {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
      {theme === "light" ? "Dark mode" : "Light mode"}
    </button>
  );
};
