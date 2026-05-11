import { useEffect, useState } from 'react';
import { auth } from './config';
import {
  signInAnonymously,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from 'firebase/auth';

export interface FirebaseAuthState {
  user: User | null;
  loading: boolean;
  error: Error | null;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const useFirebaseAuth = (): FirebaseAuthState => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser: User | null) => {
      if (currentUser) {
        setUser(currentUser);
        setLoading(false);
        setError(null);
        return;
      }

      try {
        const result = await signInAnonymously(auth);
        setUser(result.user);
        setError(null);
      } catch (signInError) {
        setUser(null);
        setError(signInError as Error);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const loginWithEmail = async (email: string, password: string) => {
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      setUser(result.user);
      setError(null);
    } catch (loginError) {
      setUser(null);
      setError(loginError as Error);
      throw loginError;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      setUser(null);
      setError(null);
    } catch (logoutError) {
      setError(logoutError as Error);
      throw logoutError;
    } finally {
      setLoading(false);
    }
  };

  return { user, loading, error, loginWithEmail, logout };
};
