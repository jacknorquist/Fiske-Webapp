import React from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { LoggedInProvider } from './context/LoggedInContext.tsx';
import './index.css';
import App from './components/main/App.tsx';
import reportWebVitals from './reportWebVitals.js';
import { MessageProvider } from './context/MessageContext.tsx';
import { UserProvider } from './context/UserContext.tsx';


const rootElement = document.getElementById('root');
createRoot(rootElement).render(
    <MessageProvider>
      <UserProvider>
            <App />
      </UserProvider>
    </MessageProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
