import logo from './logo.svg';
import './App.css';
import { useCallback } from 'react';

function App() {


  const getScreenshot = useCallback(async () => {

    let mediaStream = await navigator.mediaDevices.getDisplayMedia({
      video: {
        mediaSource: 'window',
      }
    });

    // CREATE VIDEO
    let vid = document.createElement('video');

    // SET VIDEO STREAM
    vid.src = mediaStream;

    // ALLOW CROSS ORIGIN
    vid.setAttribute('crossorigin', 'anonymous');  
    // PLAY
    await vid.play();
    
   
      vid.pause();
      console.log("Vid: ", vid);
      // GET CANVAS
      let canvas = document.createElement("canvas");

      // SET WIDTH AND HEIGHT
      canvas.height = vid.height;
      canvas.width = vid.width;
      console.log("Video: ", vid.height, vid.width);
      // DRAW IN CANVAS
      canvas.getContext('2d').drawImage(vid, 0, 0);
      // GET TRACKS
      mediaStream.getTracks().forEach((t=>t.stop()));

      
  },[]);

  return (
    <div className="App">
      
      <button onClick={getScreenshot}>
        get screenshot
      </button>

    
    </div>
  );
}

export default App;
