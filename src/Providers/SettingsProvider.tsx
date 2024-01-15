import { createContext, ReactNode, useState, useContext } from "react";

interface SettingsState {
  theme: "light" | "dark";
}

export interface SettingsContextProps {
  settings: SettingsState;
  setSettings: React.Dispatch<React.SetStateAction<SettingsState>>;
  toggleTheme: () => void;
  defaultThemeStyles: ThemeStyles;
}

interface ThemeStyles {
  light: {
    background: string;
    color: string;
  };
  dark: {
    background: string;
    color: string;
  };
}

const defaultThemeStyles: ThemeStyles = {
  light: {
    background: "#fff",
    color: "#333",
  },
  dark: {
    background: "#333",
    color: "#fff",
  },
};

export const SettingsContext = createContext<SettingsContextProps>(
  {} as SettingsContextProps
);

const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState<SettingsState>({
    theme: "light",
  });

  const toggleTheme = () => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      theme: prevSettings.theme === "light" ? "dark" : "light",
    }));
  };

  const contextValue: SettingsContextProps = {
    settings,
    setSettings,
    toggleTheme,
    defaultThemeStyles,
  };

  return (
    <SettingsContext.Provider value={contextValue}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = (): SettingsContextProps => {
  return useContext(SettingsContext);
};

export default SettingsProvider;
