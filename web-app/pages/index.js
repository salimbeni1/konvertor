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
    neutral: {
      main: '#64748B'
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
      case 0:
      case 1:
        alert('You need to upload at least 2 images')
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
          <Typography>
          <DropZone onFileUpload={getFiles} />
          total : {files.length} images
          <br/>
          total size : +- {Math.round(files.reduce(
                  ((previousValue, currentValue) =>  previousValue + currentValue.size) ,0)*1e-6) } MB
          </Typography>
      </div>
    </Grid>
    
    <Grid item >
      <div className={`${styles.card} ${files.length ? styles.pulser : '' }`} >

              
          <div style={{display: 'flex'}}>
          <TextField
              color="neutral"
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
              color="neutral"
              style={{margin: '10px', maxWidth : '45%'}}
              label={"crf"}
              size="small" type="number"
              value= {crf}
              onChange= {(e) => setCrf(e.target.value)}
            />
          
          </div>
          <TextField
              color="neutral" 
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

    <div id="howtouse" className={styles.howtouse}>
        <h1>How to use</h1> 

        <h3> Quick guide </h3>

        <p>
          Simply select your image sequence on the selector box<br/>
          On the right box , select the desired framerate and press the convert button.<br/> 
        </p>

        <p>
          The image file names must follow a frame index (more details below)<br/>
          Fortunately this is the default output of most popular Animation tools<br/>
          like Blender and Houdini.
        </p>

          <div>
        <img src="Houdini.png" width="70px" />
        <img src="Blender.png" width="70px" />
          </div>


        <p className={styles.note}>
          Note : this site doesnt use a server <br/>
          and the conversion will occur on your browser <br/>
          As a consequence performances may <br/> varry on different machines
        </p>

        <h3> Image file names </h3>
        <p>
          The images you want to convert must have the same file name<br/>
          followed by the frame nb of the image.  <br/>
        </p> 
        <p className={styles.note}>
          Example 1 : frame01.jpg frame02.jpg frame03.jpg <br/>
          Example 2 : im04v2.jpg im05v2.jpg im06v2.jpg <br/>
        </p>


        <h3> Supported image types </h3>

        <p>
        Input : .PNG .JPG .EXR - Output : .MP4
        </p>
        
        <p className={styles.note}>
          Note : many online video services only support the YUV color space
          with 4:2:0 chroma subsampling , to maximize compatibility by default subsampling is used.
        </p>

        <h3> Convertion parameters </h3>

        <p>
          You can currently only chose the frame rate. <br/> 
        </p>

    </div>

    <div id="about" className={styles.about}>
        <h1>About</h1> 
        <p>
          I was bored of those paid and slow version of image
          to video convertors online. So I decided to make my own.
        </p>
        <p>Have fun guys !</p>
    </div>

    </ThemeProvider>

    </>
  ) : 
    <> 
      Loading ... 
    </>;


}
