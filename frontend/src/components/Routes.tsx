import { useState, ReactNode, createContext} from 'react';
import {Routes, Route, Router} from 'react-router-dom'
import './App.css';




/** Component for entire page.
 *
 * Props: none
 * State: none
 *
*/


function RoutesList (): ReactNode {
  const [count, setCount] = useState<number>(0);

  function incrCount(): void {
    setCount(count => count + 1);
  }

  return (
    <div className="routes">
      <Routes>
        <Route path='/' />
        <Route path='users/:username'/>
      </Routes>
    </div>
  );
};

export default RoutesList;

























