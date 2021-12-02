import DropZone from "./components/DropZone";
import ConvertButton from "./components/ConvertButton";
import { useState } from 'react'

const SERVER_URL = 'http://localhost:8000'





function App() {

  const [files , setFiles] = useState([])
  
  // TODO : update session_id
  const session_id = 'id_1'
  
  const getFiles = (f) => {
    console.log('getting files');
    setFiles(f);
  }

  const uploadFiles = async () => {

    await Promise.all(files.map(async (file) => {
      
      var data = new FormData()
      data.append('file', file )
      data.append('session_id', session_id )

      const response = await fetch(
      SERVER_URL+'/uploadFile',
        {
          method: 'POST',
          body: data,
        }
      )
      const responseStatus = await response.json()
      console.log('file upload response : ' , responseStatus)
    }))

  }

  const convert = async () => {
    console.log('converting')

    var data = new FormData()
    data.append('session_id', session_id )

    const response = await fetch(
      SERVER_URL+'/convertFiles',
      {
        method: 'POST',
        body: data,
      }
    )
    const responseStatus = await response.json()
    console.log('conversion response : ' , responseStatus)
  }



  
  const uploadAndConvert = async () => {
    await uploadFiles()
    await convert()
  }

  
  return (
    <div className="App">
      <h1 style={{textAlign:"center"}}>Converter</h1>
      
      <DropZone onFileUpload={getFiles} />

      <ConvertButton onClickB={uploadAndConvert} title='CONVERT'/>


      {files.length}

    </div>
  );
}

export default App;






/*  to read a file as a byte array  

    const get_file_array = (file) => {
      return new Promise((acc, err) => {
          const reader = new FileReader();
          reader.onloadend = (event) => { acc(event.target.result) };
          reader.onerror   = (err)  => { err(err) };
          reader.readAsArrayBuffer(file);
      });
    }
    const filename = file.name
    const fileAB = await get_file_array(file)
    console.log(fileAB);
    // wrong encoding  :/
    const file_utf8 = String.fromCharCode.apply(null, new Uint8Array(fileAB))//Buffer.from(fileAB).toString('utf8');
    console.log(file_utf8)
    console.log(file_utf8.length);
*/