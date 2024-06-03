import React from 'react';
import { useState, ReactNode, createContext} from 'react';
import NavBar from './components/NavBar.tsx';
import { BrowserRouter , Routes} from "react-router-dom";
import RoutesList from './components/RoutesList.tsx';
import { Button } from 'reactstrap';
import './App.css';

function App(): ReactNode{
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <RoutesList />
        <main>
          <Button color='primary'>Login</Button>
          <Button color='primary'>Signup</Button>
          <p>Edit <code>src/App.jsx</code></p>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
