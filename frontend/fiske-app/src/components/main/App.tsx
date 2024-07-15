import React, { useState } from 'react';
import { ReactNode, useEffect} from 'react';
import NavBar from './NavBar.tsx';
import { BrowserRouter , Link} from "react-router-dom";
import RoutesList from '../routes/RoutesList.tsx';
import { Button } from 'reactstrap';
import FiskeAPI from '../../api.ts'
import GlobalError from './GlobalError.tsx';
import { LoggedInProvider } from '../../context/LoggedInContext.tsx';
import { useLoggedIn } from '../../context/LoggedInContext.tsx';
import { useUser } from '../../context/UserContext.tsx';
import { useError } from '../../context/ErrorContext.tsx';
import { UserProvider } from '../../context/UserContext.tsx';
import { ErrorProvider } from '../../context/ErrorContext.tsx';
import styles from './css/App.module.css'


function App(): ReactNode{
  const {user} = useUser();
  const {setError} = useError();



  return (
    <div >
      <ErrorProvider>
        <BrowserRouter>
      <div className={styles.app}>
          <main>
          {user && <NavBar/>}
          <RoutesList />
          <GlobalError />
          </main>
      </div>
        </BrowserRouter>
      </ErrorProvider>
    </div>
  );
}

export default App;
