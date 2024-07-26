// ErrorContext.tsx
import React, { createContext, useState, useContext, ReactNode} from 'react';
import { MessageContextType } from '../types';


const MessageContext = createContext<MessageContextType | undefined>(undefined);


export function useMessage(){
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error('useMessage must be used within a MessageProvider');
  }
  return context;
};



// Provides message
export function MessageProvider({children}:{children:ReactNode}):ReactNode{
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