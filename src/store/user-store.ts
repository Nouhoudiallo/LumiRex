import { create } from "zustand";

export interface User {
  id: string;
  email: string;
  token: string;
  tokenExpiry?: string;
  [key: string]: any;
}

interface UserStore {
  user: User | null;
  setUser: (user: User | null) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));
