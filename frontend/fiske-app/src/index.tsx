import React from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { LoggedInProvider } from './context/LoggedInContext.tsx';
import './index.css';
import App from './App.tsx';
import reportWebVitals from './reportWebVitals.js';
import { ErrorProvider } from './context/ErrorContext.tsx';
import { UserProvider } from './context/UserContext.tsx';

const rootElement = document.getElementById('root');
createRoot(rootElement).render(
  <UserProvider>
    <ErrorProvider>
            <App />
    </ErrorProvider>
  </UserProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
