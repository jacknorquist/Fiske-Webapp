
import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction, useEffect } from 'react';
import { UserType } from '../types';
import FiskeAPI from '../api.ts';
import { useMessage } from './MessageContext.tsx';

interface UserContextType {
  user: UserType | null;
  setUser: Dispatch<SetStateAction<UserType | null>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}
export function UserProvider({children}:{children:ReactNode}):ReactNode{
  const{setMessage} = useMessage()
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token: string | null = localStorage.getItem('fiske-token');
      if (token) {
        try {
          const user = await FiskeAPI.profile(token);
          setUser(user);
        }catch(err:unknown){
          if (err instanceof Error) {
              setMessage(err.message, 'error');
            }else{
              setMessage('An Unknown Error Occurred', 'error')
            }
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


export function useUser(){
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};