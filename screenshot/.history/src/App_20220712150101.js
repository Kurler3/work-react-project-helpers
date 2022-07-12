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
    vid.srcObject = mediaStream;

    // PLAY
    await vid.play();

    await setTimeout(() => {
      console.log("Video", vid);
      // GET CANVAS
      let canvas = document.createElement("canvas");

      // SET WIDTH AND HEIGHT
      canvas.height = vid.height;
      canvas.width = vid.width;

      // DRAW IN CANVAS
      canvas.getContext('2d').drawImage(vid, 0, 0);
      // GET TRACKS
      mediaStream.getTracks().forEach((t=>t.stop()));

      canvas.toBlob((function(blob) {
        // const newImg = document.createElement('img');
        // const url = URL.createObjectURL(blob);

        // newImg.onload = function() {
        //   // no longer need to read the blob so it's revoked
        //   URL.revokeObjectURL(url);
        // };

        // newImg.src = url;
        // document.body.appendChild(newImg);

        console.log("Blob", blob);
      }));
    } , 2000);

    

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
