import logo from './logo.svg';
import './App.css';
import { useCallback } from 'react';

function App() {


  // GET SCREENSHOT FUNCTION :)
  const getScreenshot = useCallback(async () => {

    // LET USER CHOOSE THE SCREEN/TAB TO SCREENSHOT
    let stream = await navigator.mediaDevices.getDisplayMedia();


    // GRAB FIRST FRAME FROM VIDEO STREAM (SAME AS IMAGE)
    let track = stream.getVideoTracks()[0];

    // CREATE CAPTURE
    let capture = new ImageCapture(track);

    // CREATE CANVAS
    let canvas = document.createElement('canvas');  

    // GRAB FRAMES FROM THE CAPTURE
    let bitmap = await capture.grabFrame();

    // STOP THE TRACK (SAME AS STOPPING THE VIDEO, kinda)
    track.stop();
        
    // SET WIDTH OF CANVAS TO BE THE SAME AS THE SCREENSHOT
    canvas.width = bitmap.width;  
    // SET HEIGHT OF CANVAS
    canvas.height = bitmap.height;

    // DRAW THE IMAGE (BASICALLY SET THE SCREENSHOT IN THE CANVAS)
    canvas.getContext('2d').drawImage(bitmap, 0, 0);
        
    // -----------------------------------------
    // ----------- IN CASE OF DOWNLOAD ---------
    // -----------------------------------------

    // let a = document.createElement("a"); 
    // document.body.appendChild(a);
      
    // a.href = canvas.toDataURL(`image/png`);
    // a.download = "screenshot.png";
  
    // a.click();

    // ------------------------------------------
    // ------------------------------------------
    // ------------------------------------------


    // -----------------------------------------------
    // ----------- IN CASE OF SIMPLE DISPLAY ---------
    // -----------------------------------------------

    // USE TO BLOB FUNCTION (USED TO GET THE URL FOR THE BLOB)
    canvas.toBlob((blob) => {

      // CREATE VALID URL FOR THE IMAGE FROM THE BLOB
      let blobUrl = URL.createObjectURL(blob);

      // LOG THE BLOB URL :))
      console.log(blobUrl);


      // CREATE A HTML IMG ELEMENT
      let img = document.createElement('img');

      // SET THE SRC TO BE THE BLOB URL
      img.src = blobUrl;

      // APPEND NEW IMG HTML ELEMENT TO IMAGES CONTAINER 
      document.getElementById('images_container').appendChild(img);
    })

    // -----------------------------------------------
    // -----------------------------------------------
    // -----------------------------------------------

  },[]);

  return (
    <div className="App">
      
      <button onClick={getScreenshot}>
        get screenshot
      </button>

      <div id="images_container" style={{marginTop: '20px'}}>

      </div>
    </div>
  );
}

export default App;
