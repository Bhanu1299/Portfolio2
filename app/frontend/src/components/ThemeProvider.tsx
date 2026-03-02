import { createContext, useContext, useEffect, useState, useCallback } from "react";

type Theme = "dark" | "light";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  bulbPosition: { x: number; y: number };
  isTransitioning: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  toggleTheme: () => {},
  bulbPosition: { x: 0, y: 0 },
  isTransitioning: false,
});

export const useTheme = () => useContext(ThemeContext);

const STORAGE_KEY = "portfolio-theme";

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "dark";
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "light" || stored === "dark") return stored;
  if (window.matchMedia("(prefers-color-scheme: light)").matches) return "light";
  return "dark";
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [bulbPosition, setBulbPosition] = useState({ x: 0, y: 0 });

  // Apply theme class to <html>
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
    }
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  // Initialize on mount
  useEffect(() => {
    const root = document.documentElement;
    const initial = getInitialTheme();
    if (initial === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
    }
  }, []);

  const toggleTheme = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    // The bulb position is updated by the LightBulbToggle component
    // Start the radial reveal animation
    const nextTheme = theme === "dark" ? "light" : "dark";

    // Delay the actual theme switch slightly so the reveal animation starts first
    requestAnimationFrame(() => {
      setTheme(nextTheme);
      // End transition after the reveal animation completes
      setTimeout(() => {
        setIsTransitioning(false);
      }, 900);
    });
  }, [theme, isTransitioning]);

  return (
    <ThemeContext.Provider
      value={{ theme, toggleTheme, bulbPosition, isTransitioning }}
    >
      {children}
      {/* Radial reveal overlay */}
      {isTransitioning && (
        <div
          className="fixed inset-0 z-[9999] pointer-events-none"
          style={{
            background:
              theme === "light"
                ? "radial-gradient(circle at var(--reveal-x) var(--reveal-y), transparent var(--reveal-size), #0A0A0F var(--reveal-size))"
                : "radial-gradient(circle at var(--reveal-x) var(--reveal-y), transparent var(--reveal-size), #F5F5F7 var(--reveal-size))",
          }}
        />
      )}
    </ThemeContext.Provider>
  );
}

// Export a function to update bulb position from the toggle component
export function useBulbPosition() {
  const context = useContext(ThemeContext);
  return context;
}