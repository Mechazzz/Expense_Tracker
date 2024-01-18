import {
  createContext,
  ReactNode,
  useState,
  useContext,
  useLayoutEffect,
} from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import {
  SettingsState,
  SettingsContextProps,
  ThemeStyles,
} from "../types/SettingsProviderInterfaces";

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
  const [localState, setLocalState] = useLocalStorage<SettingsState>(
    "settings",
    {
      theme: "light",
    }
  );
  const [settings, setSettings] = useState<SettingsState>(localState);

  const toggleTheme = () => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      theme: prevSettings.theme === "light" ? "dark" : "light",
    }));
  };

  useLayoutEffect(() => {
    setLocalState(settings);
    if (settings.theme === "light") {
      document.documentElement.classList.remove("dark-mode");
      document.documentElement.classList.add("light-mode");
    } else {
      document.documentElement.classList.remove("light-mode");
      document.documentElement.classList.add("dark-mode");
    }
  }, [settings.theme, localState, setLocalState]);

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
