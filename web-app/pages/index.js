import DropZone from '../components/DropZone'
import ConvertButton from '../components/ConvertButton'
import {Button, Grid ,Typography , LinearProgress , InputAdornment, TextField ,  CircularProgress , ThemeProvider} from '@mui/material'
import { useState , useEffect , useRef} from 'react'
import styles from '../styles/Home.module.scss'
// FFMPEG , converting tools
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
import { createTheme } from '@mui/material/styles';
import { maxWidth } from '@mui/system'

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
  const [frameRate, setFrameRate] = useState(30)
  const [crf, setCrf] = useState(18)
  const [outputName, setOutputName] = useState('out.mp4')


  const load = async () => {
    ffmpeg.current = createFFmpeg({ 
      log: true,
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


  const dowload_video = async () => {
    const link = document.createElement("a");
    link.download = outputName;
    link.href = outputVideo;
    link.click();
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
          '-r', frameRate.toString(),
          '-start_number', min_nb.toString(),
          '-i', input_seq_formated ,
          '-vcodec','libx264',
          '-crf', crf.toString(),
          '-pix_fmt', 'yuv420p',
          outputName
          )
    
          const result = ffmpeg.current.FS('readFile', outputName);
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
          

          <Typography>
          total : {files.length} images
          <br/>
          total size : +- {Math.round(files.reduce(
                  ((previousValue, currentValue) =>  previousValue + currentValue.size) ,0)*1e-6) } MB
          
          </Typography>
      </div>
    </Grid>
    
    <Grid item >
      <div className={styles.card}>

              
          <div style={{display: 'flex'}}>
          <TextField
              style={{margin: '10px', maxWidth : '45%'}}
              label={"frame rate"}
              size="small" type="number"
              InputProps={{
                endAdornment:<InputAdornment position="end">fps</InputAdornment>,
              }}
              value= {frameRate}
              onChange= {(e) => setFrameRate(e.target.value)}
            />
          <TextField 
              disabled
              style={{margin: '10px', maxWidth : '45%'}}
              label={"crf"}
              size="small" type="number"
              value= {crf}
              onChange= {(e) => setCrf(e.target.value)}
            />
          
          </div>
          <TextField 
              style={{margin: '10px'}}
              label={"output video name"}
              size="small"
              value= {outputName}
              onChange= {(e) => setOutputName(e.target.value)}
          />

          <Button variant="outlined" onClick={convert} color="neutral">
              CONVERT
          </Button>
          <div style={{margin: '10px'}}>
          { loading ? 
          <LinearProgress color="neutral" variant="determinate" value={progress?.ratio*100} />
          : outputVideo && <>
          <video controls src={outputVideo} width="100%" type="video/mp4" />
          </>
          }          
          </div>
          { !loading && outputVideo && <Button variant="outlined" onClick={dowload_video} color="neutral">
              DOWNLOAD
          </Button>}
      </div>
    </Grid>

    </Grid>

    <div className={styles.howtouse}>
        <h1>How to use</h1> 

        <h3> Image file names </h3>
        <p>
          the images you want to convert must have the same file name<br/>
          followed by the frame nb of the image.  <br/>
          Example 1 : foto01.jpg foto02.jpg foto03.jpg <br/>
          Example 2 : frame01project.jpg frame02project.jpg frame03project.jpg <br/>
        </p>


        <h3> Supported image types </h3>

        <p>
        No idea ... <br/> 
        </p>

        <h3> Convertion parameters </h3>

        <p>
          You can currently only chose the frame rate. <br/> 
        </p>

    </div>

    <div className={styles.about}>
        <h1>About</h1> 
        <p>
          What is the point of having an about section ... <br/>
          <br/>
          Have fun guys ! <br/>
        </p>
    </div>

    </ThemeProvider>

    </>
  ) : 
    <> 
      Loading ... 
    </>;


}
