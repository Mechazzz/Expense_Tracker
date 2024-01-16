import Navbar from "./Navbar";
import { ReactNode } from "react";
import { useSettings } from "../Providers/SettingsProvider";

const Layout = ({ children }: { children: ReactNode }) => {
  const { defaultThemeStyles, settings } = useSettings();
  return (
    <div style={defaultThemeStyles[settings.theme]}>
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
