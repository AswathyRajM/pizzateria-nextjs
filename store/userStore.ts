// stores/userStore.ts
import { create } from "zustand";
import { Session, User } from "@supabase/supabase-js";

interface UserState {
  user: User | null;
  session: any | null;
  isLoading: boolean;
  error: string | null;
  clearUser: () => void;
  setAuth: (authData: { user: User | null; session: Session | null }) => void;
}

export const useUserState = create<UserState>((set, get) => ({
  user: null,
  session: null,
  isLoading: true,
  error: null,

  setAuth: (authData) =>
    set({
      user: authData.user,
      session: authData.session,
      isLoading:false
    }),

  clearUser: () => set({ user: null, session: null, error: null }),
}));
