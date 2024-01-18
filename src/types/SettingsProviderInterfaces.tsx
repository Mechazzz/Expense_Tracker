export interface SettingsState {
  theme: "light" | "dark";
}

export interface SettingsContextProps {
  settings: SettingsState;
  setSettings: React.Dispatch<React.SetStateAction<SettingsState>>;
  toggleTheme: () => void;
  defaultThemeStyles: ThemeStyles;
}

export interface ThemeStyles {
  light: {
    background: string;
    color: string;
  };
  dark: {
    background: string;
    color: string;
  };
}
