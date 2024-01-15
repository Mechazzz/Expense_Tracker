import Navbar from "./Navbar";
import Switch from "react-switch";
import { useContext } from "react";
import {
  SettingsContext,
  SettingsContextProps,
} from "../Providers/SettingsProvider";
import "../Styling/Settings.css";

const Settings = () => {
  const { settings, toggleTheme, defaultThemeStyles }: SettingsContextProps =
    useContext(SettingsContext);
  return (
    <>
      <Navbar />
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
