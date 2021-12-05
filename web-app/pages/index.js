import DropZone from '../components/DropZone'
import ConvertButton from '../components/ConvertButton'

import { useState , useEffect } from 'react'

// FFMPEG , converting tools
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
const ffmpeg = createFFmpeg({ 
  log: true,
  corePath: '/ffmpeg-core/dist/ffmpeg-core.js' // Next.js implement static files differently
});

export default function Home() {


  const [files , setFiles] = useState([])
  const [ready, setReady] = useState(true);
  const [outputVideo, setOutputVideo] = useState();

  const load = async () => {
    await ffmpeg.load();
    setReady(true);
  }

  useEffect(() => {
    load();
  }, [])
  
  const getFiles = (f) => {
    console.log('getting files');
    setFiles(f);
  }
  

  const convert = async () => {
    console.log('converting')

    await Promise.all(files.map(async (file) => {
      console.log(file.name , file);
      const fileb = await fetchFile(file)
      console.log('bytes',fileb);
      ffmpeg.FS('writeFile', file.name, fileb);
    }))


    switch(files.length){
      case 0 :
        alert('wtf u want a video out of nothing ?')
        break;
      case 1:
        alert('wtf u want a video of just an image ?')
        break;
      default:

        const f_1 = files[0].name

        let pos_nb
        let nb_nb
        
        files.forEach(file => {
          
          let found_start = false
          for(let i = 0; i < f_1.length; i++){
            if(found_start){
              if(f_1[i] === file.name[i]){
                nb_nb = nb_nb? Math.max(i-pos_nb , nb_nb) : i-pos_nb
                break;
              }
            }else if(f_1[i] !== file.name[i]){
              pos_nb = pos_nb? Math.min(i, pos_nb) : i
              found_start = true
            }
          }

        });

        const input_seq_formated = f_1.slice(0,pos_nb)+"%0"+nb_nb+"d"+f_1.slice(pos_nb+nb_nb)

        let min_nb

        files.forEach( (file) => {
          const nb = parseInt(file.name.slice(pos_nb , pos_nb+ nb_nb))
          min_nb = min_nb? Math.min(nb,min_nb) : nb;
          }
        )

        console.log(min_nb);

        await ffmpeg.run(
          '-y',
          '-f', 'image2',
          '-r','30',
          '-start_number', min_nb.toString(),
          '-i', input_seq_formated ,
          '-vcodec','libx264',
          '-crf','18',
          '-pix_fmt', 'yuv420p',
          'out.mp4'
          )
    
          const result = ffmpeg.FS('readFile', 'out.mp4');
          setOutputVideo(URL.createObjectURL(new Blob([result.buffer], { type: 'video/mp4' })))
    }

  }

  
  return ready? (
    <div className="App">

      <h1 style={{textAlign:"center" }}>KONVERTOR</h1>
      
      <DropZone onFileUpload={getFiles} />

      <ConvertButton onClickB={convert} title='CONVERT'/>

      { outputVideo && <video controls src={outputVideo} width="250" type="video/mp4" />}

    </div>
  ) : 
    <> 
      Loading ... 
    </>;


}
