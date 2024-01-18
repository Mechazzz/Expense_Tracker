import Switch from "react-switch";
import {
  SettingsContextProps,
  useSettings,
} from "../Providers/SettingsProvider";
import "../Styling/Settings.css";

const Settings = () => {
  const { settings, toggleTheme }: SettingsContextProps = useSettings();
  return (
    <>
      <h2>Settings</h2>
      <p className="currentTheme">Current Theme: {settings.theme}</p>
      <div>
        <label className="switchLabel">
          {settings.theme === "light" ? "Light Mode" : "Dark Mode"}
        </label>
        <Switch onChange={toggleTheme} checked={settings.theme === "dark"} />
      </div>
    </>
  );
};

export default Settings;
