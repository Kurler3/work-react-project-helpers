import logo from './logo.svg';
import './App.css';
import { useCallback } from 'react';

function App() {


  const getScreenshot = useCallback(async () => {

    console.log(await window.navigator.mediaDevices.getDisplayMedia());
    
  }, []);

  return (
    <div className="App">
      
      <button onClick={getScreenshot}>
        get screenshot
      </button>

    </div>
  );
}

export default App;
