import * as React from "react";

export const useLocalStorage = (key: string, fallbackState: []) => {
  const [value, setValue] = React.useState(
    JSON.parse(localStorage.getItem(key) || "[]") ?? fallbackState
  );

  React.useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
};
