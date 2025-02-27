import { User } from "../types/auth.types";

const isChromeAvailable = (): boolean => {
  return (
    typeof window !== "undefined" &&
    "chrome" in window &&
    !!window.chrome.storage
  );
};

export const saveToChromeStorage = (data: {
  user: User;
  token: string;
}): void => {
  if (isChromeAvailable()) {
    window.chrome.storage.local.set({
      user: data.user,
      token: data.token,
    });
  } else {
    // fallback to local storage
    localStorage.setItem("stratos-user", JSON.stringify(data.user));
    localStorage.setItem("stratos-token", data.token);
  }
};

export const removeFromChromeStorage = (keys: string[]): void => {
  if (isChromeAvailable()) window.chrome.storage.local.remove(keys);
  else keys.forEach((key) => localStorage.removeItem(`stratos-${key}`));
};

/**
 * get data from chrome storage with fallback to local storage
 * @returns promise that resolves with the requested data
 */
export const getFromChromeStorage = <T>(key: string): Promise<T | null> => {
  return new Promise((resolve) => {
    if (isChromeAvailable()) {
      window.chrome.storage.local.get(key, (result: { [x: string]: any }) => {
        resolve(result[key] || null);
      });
    } else {
      const item = localStorage.getItem(`stratos-${key}`);
      try {
        resolve(item ? JSON.parse(item) : null);
      } catch {
        resolve((item as unknown as T) || null);
      }
    }
  });
};
