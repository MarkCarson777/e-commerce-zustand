import { create } from "zustand";
import { onAuthStateChanged, User } from "firebase/auth";
import { firebaseAuth } from "@/firebase/config";

type AuthStore = {
  currentUser: User | null;
  loading: boolean;
  watchAuthState: () => () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  currentUser: null,
  loading: true,
  watchAuthState: () => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      set({ currentUser: user, loading: false });
    });

    return unsubscribe;
  },
}));
