import { firebaseAuth } from "./config";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut as _signOut,
} from "firebase/auth";

export const resetPassword = async (email: string) => {
  let result = null;
  let error = null;

  try {
    result = await sendPasswordResetEmail(firebaseAuth, email);
  } catch (err) {
    error = err;
  }

  return { result, error };
};

export const signUp = async (email: string, password: string) => {
  let result = null;
  let error = null;

  try {
    result = await createUserWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    );
  } catch (err) {
    error = err;
  }

  return { result, error };
};

export const signIn = async (email: string, password: string) => {
  let result = null;
  let error = null;

  try {
    result = await signInWithEmailAndPassword(firebaseAuth, email, password);
  } catch (err) {
    error = err;
  }

  return { result, error };
};

export const signOut = async () => {
  try {
    await _signOut(firebaseAuth);
  } catch (err) {
    console.error("Error signing out", err);
  }
};
