import logo from './logo.svg';
import './App.css';
import { useCallback } from 'react';

function App() {


  const getScreenshot = useCallback(async () => {

    let mediaStream = await window.navigator.mediaDevices.getDisplayMedia({
      audio: false,
      video: false,
    });

    // CREATE VIDEO
    let vid = document.createElement('video');

    // SET VIDEO STREAM
    vid.srcObject = mediaStream;

    // PLAY
    await vid.play();


    // GET CANVAS
    let canvas = document.getElementById("canvas");

    // SET WIDTH AND HEIGHT
    canvas.height = vid.height;
    canvas.width = vid.width;

    // DRAW IN CANVAS
    canvas.getContext('2d').drawImage(vid, 0, 0);
    // GET TRACKS
    mediaStream.getTracks().forEach((t=>t.stop()));

    return new Promise((res, rej) => {
      canvas.toBlob(res);
    })

  }, []);

  return (
    <div className="App">
      
      <button onClick={getScreenshot}>
        get screenshot
      </button>

      <div id="canvas">

      </div>

    </div>
  );
}

export default App;
