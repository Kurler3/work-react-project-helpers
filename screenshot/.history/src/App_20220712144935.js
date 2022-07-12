import logo from './logo.svg';
import './App.css';
import { useCallback } from 'react';

function App() {


  const getScreenshot = useCallback(async () => {

    let mediaStream = await window.navigator.mediaDevices.getDisplayMedia({
      audio: false,
      video: false,
    });

    let track = mediaStream.getVideoTracks()[0];

    console.log("Track", track);
    
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
