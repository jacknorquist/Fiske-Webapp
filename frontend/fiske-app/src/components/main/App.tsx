import React, { useState } from 'react';
import { ReactNode, useEffect} from 'react';
import NavBar from './NavBar.tsx';
import { BrowserRouter , Link} from "react-router-dom";
import RoutesList from '../routes/RoutesList.tsx';
import { Button } from 'reactstrap';
import GlobalMessage from './GlobalMessage.tsx';
import { useUser } from '../../context/UserContext.tsx';
import { useMessage } from '../../context/MessageContext.tsx';
import { MessageProvider } from '../../context/MessageContext.tsx';
import styles from './css/App.module.css'
import { UserType } from '../../types.ts';

/**App: renders NavBar, RoutesList and GlobalMessage
 *
 *Props:
 * - none
 *
 *State:
 * - none
 *
 * Index -> App -> RoutesList & GloablMessage & NavBar
 */
function App(): ReactNode{
  const {user}:{user:UserType} = useUser();
  const {setMessage} = useMessage();

  return (
    <div >
      <MessageProvider>
        <BrowserRouter>
      <div className={styles.app}>
          <main>
          {user && <NavBar/>}
          <RoutesList />
          <GlobalMessage />
          </main>
      </div>
        </BrowserRouter>
      </MessageProvider>
    </div>
  );
}

export default App;
