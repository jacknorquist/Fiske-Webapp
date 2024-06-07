import React from 'react';
import { ReactNode, useEffect} from 'react';
import NavBar from './components/NavBar.tsx';
import { BrowserRouter , Link} from "react-router-dom";
import RoutesList from './components/routes/RoutesList.tsx';
import { Button } from 'reactstrap';
import './App.css';
import FiskeAPI from './api.ts'
import GlobalError from './components/GlobalError.tsx';
import { LoggedInProvider } from './context/LoggedInContext.tsx';
import { useLoggedIn } from './context/LoggedInContext.tsx';
import { useUser } from './context/UserContext.tsx';
import { useError } from './context/ErrorContext.tsx';
import { UserProvider } from './context/UserContext.tsx';
import { ErrorProvider } from './context/ErrorContext.tsx';


function App(): ReactNode{
  const {user, setUser} = useUser()
  const {setError} = useError()

  console.log(user, 'user at app')

  return (
    <UserProvider>
      <ErrorProvider>
      <div className="App">
        <BrowserRouter>
          {user && <NavBar />}
          <RoutesList />
          <main>
            <GlobalError />
          </main>
        </BrowserRouter>
      </div>
      </ErrorProvider>
    </UserProvider>
  );
}

export default App;
