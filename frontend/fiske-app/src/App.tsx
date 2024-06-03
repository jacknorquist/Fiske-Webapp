import React from 'react';
import { useState, ReactNode, useEffect, useContext} from 'react';
import NavBar from './components/NavBar.tsx';
import { BrowserRouter , Link} from "react-router-dom";
import RoutesList from './components/RoutesList.tsx';
import { Button } from 'reactstrap';
import './App.css';
import FiskeAPI from './api.ts'
import Homepage from './components/Homepage.tsx';

function App(): ReactNode{

  const [loggedIn, setLoggedIn] = useState(sessionStorage.getItem('token') || false);

  // useEffect(function fetchItemsOnMount() {
  //     async function fetchUsers() {
  //       const users = await FiskeAPI.getUsers(token);
  //       setUsers(
  //         users
  //       );
  //     }
  //     fetchUsers();
  //   }, []);
  //   console.log(users, 'hhhhhhhhhhhhhhhhhh')


  return (

    <div className="App">
      <BrowserRouter>
        <NavBar />
        <RoutesList login={FiskeAPI.login} />
        <main>
          {!loggedIn ?
          <div>
          <Button color='primary'><Link to={'/login'}>Login</Link></Button>
          <Button color='primary'>Signup</Button>
          </div>:
          <p>Edit <code>src/App.jsx</code></p>}
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
