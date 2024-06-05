// ErrorContext.tsx
import React, { createContext, useState, useContext } from 'react';

interface ErrorContextType {
  error: string;
  setError: (error: string) => void;
  clearError: () => void;
}

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

export const useError = () => {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error('useError must be used within an ErrorProvider');
  }
  return context;
};

export const ErrorProvider: React.FC = ({ children }) => {
  const [error, setError] = useState('');

  const clearError = () => setError('');

  return (
    <ErrorContext.Provider value={{ error, setError, clearError }}>
      {children}
    </ErrorContext.Provider>
  );
};