import { create } from "zustand";
import { persist } from "zustand/middleware";

import { AuthState, User } from "../types/auth.types";
import {
  getFromChromeStorage,
  removeFromChromeStorage,
  saveToChromeStorage,
} from "../utils/chromeStorage";

const API_URL = "http://localhost:3000/api";

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      user: null,
      token: null,
      loading: false,
      error: null,

      login: async (email, password) => {
        try {
          set({ loading: true, error: null });

          const response = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          });

          const data = await response.json();
          if (!response.ok) throw new Error(data.message || "Login failed");

          set({
            isAuthenticated: true,
            user: data.user,
            token: data.token,
            loading: false,
          });

          saveToChromeStorage({ user: data.user, token: data.token });
        } catch (error) {
          set({
            loading: false,
            error: error instanceof Error ? error.message : "Login failed",
          });
        }
      },

      signup: async (name, email, password) => {
        try {
          set({ loading: true, error: null });

          const response = await fetch(`${API_URL}/auth/signup`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, password }),
          });

          const data = await response.json();
          if (!response.ok) throw new Error(data.message || "Signup failed");

          set({
            isAuthenticated: true,
            user: data.user,
            token: data.token,
            loading: false,
          });

          saveToChromeStorage({ user: data.user, token: data.token });
        } catch (error) {
          set({
            loading: false,
            error: error instanceof Error ? error.message : "Signup failed",
          });
        }
      },

      logout: () => {
        set({
          isAuthenticated: false,
          user: null,
          token: null,
        });

        removeFromChromeStorage(["user", "token"]);
      },

      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: "stratos-auth",
    }
  )
);

export const initAuthState = async () => {
  const user = await getFromChromeStorage<User>("user");
  const token = await getFromChromeStorage<string>("token");

  if (user && token) {
    useAuthStore.setState({
      isAuthenticated: true,
      user,
      token,
    });
  }
};

if (typeof window !== "undefined") initAuthState();
