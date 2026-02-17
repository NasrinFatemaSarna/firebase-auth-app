import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  onAuthStateChanged,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from "firebase/auth";

export const AuthContext = createContext(null);

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("user"); // demo: admin/user
  const [loading, setLoading] = useState(true);

  // ✅ Register
  const register = async (email, password, name) => {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    if (name) await updateProfile(res.user, { displayName: name });
    return res;
  };

  // ✅ Login
  const login = (email, password) => signInWithEmailAndPassword(auth, email, password);

  // ✅ Google login
  const loginWithGoogle = () => signInWithPopup(auth, googleProvider);

  // ✅ GitHub login
  const loginWithGithub = () => signInWithPopup(auth, githubProvider);

  // ✅ Logout
  const logout = () => signOut(auth);

  // ✅ Stay logged in after refresh
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      // demo role set (তুমি চাইলে email/uid দেখে admin করতে পারো)
      if (currentUser?.email === "admin@gmail.com") setRole("admin");
      else setRole("user");

      setLoading(false);
    });

    return () => unsub();
  }, []);

  const value = {
    user,
    role,
    loading,
    register,
    login,
    loginWithGoogle,
    loginWithGithub,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
