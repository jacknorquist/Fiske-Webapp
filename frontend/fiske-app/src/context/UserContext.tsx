import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';
import { User } from '../types';

interface UserContextType {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useLoggedIn must be used within a LoggedInProvider');
  }
  return context;
};


interface UserProviderProps {
  children: ReactNode;
}


export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser}}>
      {children}
    </UserContext.Provider>
  );
};