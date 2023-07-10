'use client'
import { useState, createContext, useEffect } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db, auth } from '@/services/firebaseConnection';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    function loadStorage() {
      const storageUser = localStorage.getItem('SistemaUser');

      if (storageUser) {
        setUser(JSON.parse(storageUser));
        setLoading(false);
      }

      setLoading(false);
    }

    loadStorage();
  }, []);


  async function signIn(email, password) {
    setLoadingAuth(true);

    try {
      const value = await signInWithEmailAndPassword(auth, email, password);
      const uid = value.user.uid;

      const userProfile = await getDoc(doc(db, 'users', uid));

      const data = {
        uid: uid,
        name: userProfile.data().name,
        avatarUrl: userProfile.data().avatarUrl,
        email: value.user.email
      };

      setUser(data);
      storageUser(data);
      setLoadingAuth(false);
      toast.success('Welcome!');
      router.push('/')
    } catch (error) {
   
      toast.error('Oops! Something went wrong!');
      setLoadingAuth(false);
    }
  }

  // User Sign-Up
  async function signUp(email, password, name) {
    setLoadingAuth(true);
    try {
      const value = await createUserWithEmailAndPassword(auth, email, password);
      const uid = value.user.uid;

      await setDoc(doc(db, 'users', uid), {
        name: name,
        avatarUrl: null
      });

      const data = {
        uid: uid,
        name: name,
        email: value.user.email,
        avatarUrl: null
      };

      setUser(data);
      storageUser(data);
      setLoadingAuth(false);
      toast.success('Welcome to platform!');
      router.push('/')
    } catch (error) {
   
      toast.error('Oops! Something went wrong!');
      setLoadingAuth(false);
    }
  }

  function storageUser(data) {
    localStorage.setItem('SistemaUser', JSON.stringify(data));
  }

  // User Logout
  async function signOutUser() {
    await signOut(auth);
    localStorage.removeItem('SistemaUser');
    setUser(null);
    toast.success("Goodbye...");
    router.push("/");
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        loading,
        signUp,
        signOut: signOutUser,
        signIn,
        loadingAuth,
        setUser,
        storageUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
