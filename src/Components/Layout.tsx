import Navbar from "./Navbar";
import { ReactNode } from "react";
import { useSettings } from "../Providers/SettingsProvider";
import "../Styling/Layout.css";

const Layout = ({ children }: { children: ReactNode }) => {
  const { defaultThemeStyles, settings } = useSettings();
  return (
    <div
      className="layout-container"
      style={defaultThemeStyles[settings.theme]}
    >
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
