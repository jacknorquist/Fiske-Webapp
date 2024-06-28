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
import CreatePostContainer from '../posts/CreatePostContainer.tsx';
import styles from './css/App.module.css'


function App(): ReactNode{
  const {user, setUser} = useUser()
  const {setError} = useError()
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false)

  function toggleCreatePost (){
    setIsCreatePostOpen(!isCreatePostOpen)
  }



  return (
    <div >
    <UserProvider>
      <ErrorProvider>
        <BrowserRouter>
          {isCreatePostOpen && <CreatePostContainer toggleCreatePost={toggleCreatePost} />}
      <div className={`${styles.app} ${isCreatePostOpen ? styles.overlay : ''}`}>
          {user && <NavBar toggleCreatePost={toggleCreatePost}/>}
          <RoutesList />
          <main>
            <GlobalError />
          </main>
      </div>
        </BrowserRouter>
      </ErrorProvider>
    </UserProvider>
    </div>
  );
}

export default App;
