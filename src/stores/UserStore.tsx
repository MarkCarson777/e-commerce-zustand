import { create } from "zustand";

import { doc, setDoc, getDoc } from "firebase/firestore";
import { firestore } from "@/firebase/config";

import { User as FirebaseUser } from "firebase/auth";

type UserStore = {
  getUser: (id: string) => Promise<any>;
  createUser: (user: FirebaseUser) => Promise<void>;
};

export const useUserStore = create<UserStore>((set) => ({
  getUser: async (id: string) => {
    const docRef = doc(firestore, "users", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      throw new Error("No such document");
    }
  },
  createUser: async (user: FirebaseUser) => {
    try {
      const userRef = doc(firestore, "users", user.uid);

      await setDoc(userRef, {
        email: user.email,
        isAdmin: false,
      });
    } catch (error) {
      throw new Error((error as Error).message);
    }
  },
}));
