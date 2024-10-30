"use client"
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { auth } from "../config/firebase"; // Adjust the path as needed

// 1. Define a type for the User profile
interface User {
  name: string | null;
  email: string | null;
  uid: string;
}

// 2. Define the context type
interface UserContextType {
  user: User | null;
  loading: boolean;
}

// 3. Create the UserContext
const UserContext = createContext<UserContextType | undefined>(undefined);

// 4. Create a custom hook for easy access to the context
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};

// 5. Define props for the UserProvider
interface UserProviderProps {
  children: ReactNode;
}

// 6. Set up the UserProvider to handle user authentication state
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Listen for authentication changes and update state
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        const { displayName, email, uid } = firebaseUser;
        setUser({ name: displayName, email, uid });
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ user, loading }}>
      {children}
    </UserContext.Provider>
  );
};
