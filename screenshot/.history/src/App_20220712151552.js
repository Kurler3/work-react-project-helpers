import logo from './logo.svg';
import './App.css';
import { useCallback } from 'react';

function App() {


  const getScreenshot = useCallback(async () => {

    // let mediaStream = await navigator.mediaDevices.getDisplayMedia({
    //   video: true,
    //   audio: false,
    // });

    // // CREATE VIDEO
    // let vid = document.createElement('video');

    // // SET VIDEO STREAM
    // vid.src = mediaStream;

    // // ALLOW CROSS ORIGIN
    // vid.setAttribute('crossorigin', 'anonymous');  
    // vid.crossOrigin = 'anonymous';
    // // PLAY
    // await vid.play();
     
    // console.log("Vid: ", vid);
    // // GET CANVAS
    // let canvas = document.createElement("canvas");

    //   // SET WIDTH AND HEIGHT
    //   canvas.height = vid.height;
    //   canvas.width = vid.width;
    //   console.log("Video: ", vid.height, vid.width);
    //   // DRAW IN CANVAS
    //   canvas.getContext('2d').drawImage(vid, 0, 0);
    //   // GET TRACKS
    //   mediaStream.getTracks().forEach((t=>t.stop()));

    navigator.mediaDevices.getDisplayMedia().then(stream => 
      {
        // Grab frame from stream
        let track = stream.getVideoTracks()[0];
        let capture = new ImageCapture(track);
        let canvas = document.createElement('canvas');  
        capture.grabFrame().then(bitmap => 
        {
          track.stop();
            
          canvas.width = bitmap.width;
          canvas.height = bitmap.height;
          canvas.getContext('2d').drawImage(bitmap, 0, 0);
            
          // let a = document.createElement("a");
          // document.body.appendChild(a);
          
          // a.href = canvas.toDataURL(`image/png`);
          // a.download = "screenshot.png";
      
          // a.click();

          canvas.toBlob((blob) => {
            console.log(URL.createObjectURL(blob));

            let img = document.createElement('img');

            img.src = URL.createObjectURL(blob);

            

          })

        });
      })

      
  },[]);

  return (
    <div className="App">
      
      <button onClick={getScreenshot}>
        get screenshot
      </button>

      <div id="images_container">

      </div>
    </div>
  );
}

export default App;
