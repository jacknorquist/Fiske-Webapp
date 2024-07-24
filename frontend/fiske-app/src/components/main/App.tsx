import React, { useState } from 'react';
import { ReactNode, useEffect} from 'react';
import NavBar from './NavBar.tsx';
import { BrowserRouter , Link} from "react-router-dom";
import RoutesList from '../routes/RoutesList.tsx';
import { Button } from 'reactstrap';
import FiskeAPI from '../../api.ts'
import GlobalError from './GlobalMessage.tsx';
import { LoggedInProvider } from '../../context/LoggedInContext.tsx';
import { useLoggedIn } from '../../context/LoggedInContext.tsx';
import { useUser } from '../../context/UserContext.tsx';
import { useMessage } from '../../context/MessageContext.tsx';
import { UserProvider } from '../../context/UserContext.tsx';
import { MessageProvider } from '../../context/MessageContext.tsx';
import styles from './css/App.module.css'


function App(): ReactNode{
  const {user} = useUser();
  const {setMessage} = useMessage();



  return (
    <div >
      <MessageProvider>
        <BrowserRouter>
      <div className={styles.app}>
          <main>
          {user && <NavBar/>}
          <RoutesList />
          <GlobalError />
          </main>
      </div>
        </BrowserRouter>
      </MessageProvider>
    </div>
  );
}

export default App;
