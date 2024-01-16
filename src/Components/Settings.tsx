import Switch from "react-switch";
import {
  SettingsContextProps,
  useSettings,
} from "../Providers/SettingsProvider";
import "../Styling/Settings.css";

const Settings = () => {
  const { settings, toggleTheme, defaultThemeStyles }: SettingsContextProps =
    useSettings();
  return (
    <>
      <div style={defaultThemeStyles[settings.theme]}>
        <h2>Settings</h2>
        <p>Current Theme: {settings.theme}</p>
        <div>
          <label>
            {settings.theme === "light" ? "Light Mode" : "Dark Mode"}
          </label>
          <Switch onChange={toggleTheme} checked={settings.theme === "dark"} />
        </div>
      </div>
    </>
  );
};

export default Settings;
