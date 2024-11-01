"use client"
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { auth } from '../../config/firebase';

interface User {
  name: string | null;
  email: string | null;
  uid: string;
  additionalData?: any;
}

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  loading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

const fetchAdditionalUserData = async (uid: string) => {
  try {
    const response = await fetch(`/api/users?uid=${uid}`);
    if (response.ok) {
      const data = await response.json();
      return data.user;
    } else {
      console.error('Error fetching additional user data:', response.statusText);
      return null;
    }
  } catch (error) {
    console.error('Error fetching additional user data:', error);
    return null;
  }
};

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        const { displayName, email, uid } = firebaseUser;
        let userData: User = { name: displayName, email, uid };
        const additionalData = await fetchAdditionalUserData(uid);
        if (additionalData) {
          userData = { ...userData, additionalData };
        }
        setUser(userData);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};
