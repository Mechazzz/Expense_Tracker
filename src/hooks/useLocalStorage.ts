import { Dispatch, SetStateAction, useEffect, useState } from "react";

const getLocalStorageValue = <T>(key: string, defaultValue: T): T => {
  const localStorageValue = localStorage.getItem(key);
  if (localStorageValue === null) return defaultValue;

  return JSON.parse(localStorageValue, (key: string, value: string) => {
    if (key === "date") {
      return new Date(value);
    }
    return value;
  });
};

export const useLocalStorage = <T>(
  key: string,
  defaultValue: T
): [T, Dispatch<SetStateAction<T>>] => {
  const [value, setValue] = useState(() =>
    getLocalStorageValue(key, defaultValue)
  );

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
};
