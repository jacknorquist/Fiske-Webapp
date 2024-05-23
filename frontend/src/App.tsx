import { useState, ReactNode, createContext} from 'react';
import {BrowserRouter} from 'react-router-dom'
import './App.css';
import { Button } from 'reactstrap';
import NavBar from './components/NavBar';



type Props = {
  user: {
    username:string,
    first_name:string,
    last_name:string,
    email:string,
    bio:string
  }
}



/** Component for entire page.
 *
 * Props: none
 * State: none
 *
*/


function App (): ReactNode {
  const [count, setCount] = useState<number>(0);

  function incrCount(): void {
    setCount(count => count + 1);
  }

  return (
    <div className="App">
      <BrowserRouter>
      <NavBar />
      <main>
          <Button
              color='primary'>
            Login
          </Button>
          <Button
              color='primary'>
            Signup
          </Button>
        <p>
          Edit <code>src/App.jsx</code>
        </p>
      </main>
      </BrowserRouter>
    </div>
  );
};

export default App;
