import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useUser } from './UserContext.tsx';
import { useMessage } from './MessageContext.tsx';
import FiskeAPI from '../api.ts';


// Define the type for the context value
interface LoggedInContextType {
    loggedIn: boolean;
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

// Create the context with a default value
const LoggedInContext = createContext<LoggedInContextType | undefined>(undefined);

// Define the type for the provider's props
interface LoggedInProviderProps {
    children: ReactNode;
}

// Provider component
export const LoggedInProvider: React.FC<LoggedInProviderProps> = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState<boolean>(localStorage['fiske-token']?true:false);
    const {setUser} = useUser()
    const {setError} = useMessage()
    // Check login status on component mount
    // useEffect(() => {
    //     const checkLoginStatus = async () => {
    //         // Example: You might check login status by verifying a token in localStorage or making an API call
    //         const token = localStorage.getItem('fiske-token');
    //         if (token) {
    //             try{
    //             const user =await FiskeAPI.profile(localStorage['fiske-token'])
    //             setLoggedIn(true);
    //             setUser(user)
    //             }catch(err){
    //                 setError(err.message)
    //             }// Set loggedIn to true if token is found
    //         }
    //     };

    //     checkLoginStatus();
    // }, []);

    return (
        <LoggedInContext.Provider value={{ loggedIn, setLoggedIn }}>
            {children}
        </LoggedInContext.Provider>
    );
};

// Custom hook to use the LoggedInContext
export const useLoggedIn = (): LoggedInContextType => {
    const context = useContext(LoggedInContext);
    if (context === undefined) {
        throw new Error('useLoggedIn must be used within a LoggedInProvider');
    }
    return context;
};