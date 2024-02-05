"use client";
import { auth, db } from "@/firebase/config";
import { AuthT } from "@/models/auth";
import {
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import React, { createContext, useContext, useEffect, useState } from "react";
import { ParallaxProvider } from "react-scroll-parallax";

export function ParallaxProviders({ children }: { children: React.ReactNode }) {
    return <ParallaxProvider>{children}</ParallaxProvider>;
}
interface UserType {
    email: string | null;
    uid: string | null;
    role: string | null;
}

const AuthContext = createContext({});
export const useAuth = () => useContext<any>(AuthContext);

export const AuthContextProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [user, setUser] = useState<UserType>({
        email: null,
        uid: null,
        role: null,
    });
    const [loading, setLoading] = useState<Boolean>(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const userRef = doc(db, "users", user?.uid);
                const docSnap = await getDoc(userRef);
                if (docSnap.exists()) {
                    const userRole = docSnap.data().role;
                   
                    setUser({
                        email: user.email,
                        uid: user.uid,
                        role:
                            userRole === process.env.NEXT_PUBLIC_FIREBASE_ROLE_S
                                ? "admin"
                                : "guest",
                    });
                }
            } else {
                setUser({ email: null, uid: null, role: null });
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const signUp = async (values: AuthT) => {
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
          const user = userCredential.user;
          await setDoc(doc(db, "users", user.uid), {
            email: user.email,
            uid: user.uid,
            role: process.env.NEXT_PUBLIC_FIREBASE_ROLE!,
          });
      
          return true;
        } catch (error) {
          return error;
        }
      };

    // Login the user
    const logIn = (values:AuthT) => {
        return signInWithEmailAndPassword(auth, values.email, values.password)
    };

    // Logout the user
    const logOut = async () => {
        setUser({ email: null, uid: null, role: null });
        return await signOut(auth);
    };

    const googleLogin = async () => {
        const provider = new GoogleAuthProvider();

        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            const isNew =
                user.metadata.creationTime === user.metadata.lastSignInTime;
            if (isNew) {
                await setDoc(doc(db, "users", user.uid), {
                    email: user.email,
                    uid: user.uid,
                    role: process.env.NEXT_PUBLIC_FIREBASE_ROLE!,
                });
            }
        } catch (error: any) {
            return error;
        }
    };
    return (
        <AuthContext.Provider
            value={{ user, loading, signUp, logIn, googleLogin, logOut }}
        >
            {loading ? null : children}
        </AuthContext.Provider>
    );
};
