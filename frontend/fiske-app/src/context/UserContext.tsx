
import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction, useEffect } from 'react';
import { User } from '../types';
import FiskeAPI from '../api.ts';
import { useMessage } from './MessageContext.tsx';

interface UserContextType {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const{setMessage} = useMessage()
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = localStorage.getItem('fiske-token');
      if (token) {
        try {
          setIsLoading(true); // Set loading state to true before fetching user data
          const user = await FiskeAPI.profile(token);
          setUser(user);
        } catch (err) {
          setMessage('An error occurred', 'error')
        } finally {
          setIsLoading(false); // Set loading state back to false after fetching user data
        }
      }
    };

    checkLoginStatus();
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};