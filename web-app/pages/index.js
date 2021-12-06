import DropZone from '../components/DropZone'
import ConvertButton from '../components/ConvertButton'
import {Button, Grid ,LinearProgress  ,  CircularProgress , ThemeProvider} from '@mui/material'
import { useState , useEffect , useRef} from 'react'
import styles from '../styles/Home.module.scss'
// FFMPEG , converting tools
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  status: {
    danger: '#e53e3e',
  },
  palette: {
    primary: {
      main: '#0971f1',
      darker: '#053e85',
    },
    neutral: {
      main: '#64748B',
      contrastText: '#fff',
    },
  },
});





export default function Home() {

  


  const [files , setFiles] = useState([])
  const [ready, setReady] = useState(true);
  const [outputVideo, setOutputVideo] = useState();
  const [progress, setProgress] = useState(0)
  const ffmpeg = useRef(null)
  const [loading, setLoading] = useState(false)

  const load = async () => {
    ffmpeg.current = createFFmpeg({ 
      log: false,
      corePath: '/ffmpeg-core/dist/ffmpeg-core.js', // Next.js implement static files differently
      progress: setProgress,
    });
    await ffmpeg.current.load();
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
    setLoading(true)
    console.log('converting')

    await Promise.all(files.map(async (file) => {
      console.log(file.name , file);
      const fileb = await fetchFile(file)
      console.log('bytes',fileb);
      ffmpeg.current.FS('writeFile', file.name, fileb);
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

        await ffmpeg.current.run(
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
    
          const result = ffmpeg.current.FS('readFile', 'out.mp4');
          setOutputVideo(URL.createObjectURL(new Blob([result.buffer], { type: 'video/mp4' })))
    }


    setLoading(false)
  }

  
  return ready? (
    <>

    <ThemeProvider theme={theme}>

    <Grid container spacing="10" 
          direction="row"
          justifyContent="center"
          alignItems="center"
    >

    <Grid item >
        <div className={styles.card}>
          
          <DropZone onFileUpload={getFiles} />

          <div>
              <h4>total : {files.length} images</h4>
              <h4>total size : +- {Math.round(files.reduce(
                  ((previousValue, currentValue) =>  previousValue + currentValue.size) ,0)*1e-6) } MB
                  </h4>
        </div>
      </div>
    </Grid>
    
    <Grid item >
      <div className={styles.card}>
          <Button variant="outlined" onClick={convert} color="neutral">
              CONVERT
          </Button>
          <div style={{margin: '10px'}}>
          { loading ? 
          <LinearProgress color="neutral" variant="determinate" value={progress?.ratio*100} />
          : outputVideo && 
          <video controls src={outputVideo} width="100%" type="video/mp4" />}
          
          </div>
      </div>
    </Grid>

    </Grid>

    </ThemeProvider>

    </>
  ) : 
    <> 
      Loading ... 
    </>;


}
