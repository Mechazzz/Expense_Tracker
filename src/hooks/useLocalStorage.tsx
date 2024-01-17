import * as React from "react";

interface ThemeSettings {
  theme: "light" | "dark";
}

export const useLocalStorage = (
  key: string,
  fallbackState: [] | string | ThemeSettings
) => {
  const [value, setValue] = React.useState(
    JSON.parse(
      localStorage.getItem(key) || "[]" || "",
      (key: string, value: string) => {
        if (key === "date") {
          return new Date(value);
        }
        return value;
      }
    ) ?? fallbackState
  );

  React.useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
};
