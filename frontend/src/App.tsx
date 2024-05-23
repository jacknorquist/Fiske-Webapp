import React, { useState, FC, ProfilerProps } from 'react';
import './App.css';
import { Button } from 'reactstrap';

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


function App ({user}:Props): React.ReactNode {
  const [count, setCount] = useState<number>(0);

  function incrCount(): void {
    setCount(count => count + 1);
  }

  return (
    <div className="App">
      <main>
        <h1>Rithm React Starter</h1>
        <p>
          <Button
              color='primary'>
            Button
          </Button>
        </p>
        <p>
          Edit <code>src/App.jsx</code>
        </p>
      </main>
    </div>
  );
};

export default App;
