import { createContext } from "react";

export type Theme = "dark" | "light";
export interface ThemeState {
  theme: Theme;
  setTheme?: () => void;
}

const ThemeContext = createContext<ThemeState>({ theme: "dark" });

export { ThemeContext };
