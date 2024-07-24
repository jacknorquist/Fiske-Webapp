// ErrorContext.tsx
import React, { createContext, useState, useContext } from 'react';

interface MessageContextType {
  message: string;
  messageType: 'success' | 'error' | '';
  setMessage: (msg: string, type: 'success' | 'error' | '') => void;
  clearMessage: () => void;
}

const MessageContext = createContext<MessageContextType | undefined>(undefined);

export const useMessage = () => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error('useMessage must be used within a MessageProvider');
  }
  return context;
};

export const MessageProvider: React.FC = ({ children }) => {
  const [messageState, setMessageState] = useState<{ message: string; messageType: 'success' | 'error' | '' }>({
    message: '',
    messageType: ''
  });

  const clearMessage = () => {
    setMessageState({ message: '', messageType: '' });
  };

  const setMessage = (msg: string, type: 'success' | 'error' | '') => {
    setMessageState({ message: msg, messageType: type });
  };

  return (
    <MessageContext.Provider value={{ message: messageState.message, messageType: messageState.messageType, setMessage, clearMessage }}>
      {children}
    </MessageContext.Provider>
  );
};