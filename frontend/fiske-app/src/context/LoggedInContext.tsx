import React, { createContext, useContext, useState, ReactNode} from 'react';

interface LoggedInContextType {
  loggedIn: boolean;
  setLoggedIn: (loggedIn: boolean) => void;
}

const LoggedInContext = createContext<LoggedInContextType | undefined>(undefined);

export const useLoggedIn = () => {
  const context = useContext(LoggedInContext);
  if (!context) {
    throw new Error('useLoggedIn must be used within a LoggedInProvider');
  }
  return context;
};


interface LoggedInProviderProps {
  children: ReactNode;
}


export const LoggedInProvider = ({ children }: LoggedInProviderProps) => {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <LoggedInContext.Provider value={{ loggedIn, setLoggedIn }}>
      {children}
    </LoggedInContext.Provider>
  );
};