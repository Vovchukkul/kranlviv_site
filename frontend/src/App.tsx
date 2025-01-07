import { useState } from 'react';
import './App.css'
import { Header } from './components/Header/Header'
import { Aside } from './components/Aside/Aside';

function App() {
  const [isActive, setIsActive] = useState(false);

  const toggleBurger = () => {
      setIsActive(!isActive);
  };

  return (
    <div className='app'>
      <Header click={toggleBurger} isActive={isActive} />

      {isActive && (
        <Aside />
      )}
    </div>
  )
}

export default App
