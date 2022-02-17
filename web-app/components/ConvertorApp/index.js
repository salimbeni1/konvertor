import DropZone from '../DropZone'
import ConvertButton from '../ConvertButton'
import {Button , Slider, Grid ,Typography , Grow, LinearProgress , InputAdornment, TextField ,  CircularProgress , ThemeProvider} from '@mui/material'
import { useState , useEffect , useRef} from 'react'
import styles from './convertorApp.module.scss'
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





export default function ConvertorApp() {

  


  const [files , setFiles] = useState([])
  const [ready, setReady] = useState(true);
  const [outputVideo, setOutputVideo] = useState();
  const [progress, setProgress] = useState(0)
  const ffmpeg = useRef(null)
  const [loading, setLoading] = useState(false)
  const [frameRate, setFrameRate] = useState(30)
  const [crf, setCrf] = useState(18)
  const [outputName, setOutputName] = useState('out.mp4')
  const [gamma, setGamma] = useState(2.2)
  const [error, setError] = useState("")
  const [selectedFrame, setSelectedFrame] = useState(0);


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
    setError("");


    if(f.length > 2) {

      const f_1 = f[0].name

      let pos_nb
      let nb_nb
          
      f.forEach(file => {
            
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

      const correct_name_1 = f.every( (el) => { return el.name.slice(0,pos_nb) ===  f_1.slice(0,pos_nb)} )
      const correct_name_2 = f.every( (el) => { return el.name.slice(pos_nb+nb_nb) ===  f_1.slice(pos_nb+nb_nb)})

      if ( ! correct_name_1 || ! correct_name_2){
        // alert('wrong file name format , look at the guide below')
        setError("wrong file names, plz look at guide below")
        return
      }

      let min_nb
      let max_nb

      f.forEach( (file) => {
            const nb = parseInt(file.name.slice(pos_nb , pos_nb+ nb_nb))
            min_nb = min_nb? Math.min(nb,min_nb) : nb;
            max_nb = max_nb? Math.max(nb,max_nb) : nb;
            }
      )

      if( max_nb -  min_nb !== f.length-1) {
        setError("wrong file names (look at number) , plz look at guide below")
        return
      }

    }



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

        // clip crf 
        crf = crf < 1 ? 1 : Math.floor(crf); 
        crf = crf > 50 ? 50 : Math.floor(crf); 

        // console.log(min_nb);

        await ffmpeg.current.run(
          '-y',
          '-gamma' , gamma.toString(),
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


  const convertGamma = async () =>{

    // TODO : TRYING TO APPLY GAMMA CORRECTION for preview

    await ffmpeg.current.run(
      '-y',
      '-gamma' , gamma.toString(),
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

  
  return ready? (
    <>

    <ThemeProvider theme={theme}>
    <Typography>


      <div className={styles.cardctn}>

      

    <Grid container spacing="10" 
          direction="row"
          justifyContent="center"
          alignItems="flex-start"
    >
    <Grow in={ready}>
    <Grid item >
        <div className={styles.card}>
          
          <DropZone onFileUpload={getFiles} />
          total : {files.length} images
          <br/>
          total size : +- {Math.round(files.reduce(
                  ((previousValue, currentValue) =>  previousValue + currentValue.size) ,0)*1e-6) } MB
          
          
          <div style={{width: '100%' , display:'flex', alignItems: 'center', justifyContent: 'center'}}>
            { ( files.length !== 0 ) && error === ""  ?
            <svg width="157" height="110" viewBox="0 0 157 110" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path className={styles.animated_path_1} id="tick" d="M7 43L57 99L150 7" strokeWidth='14' strokeLinecap='round'/>
            </svg> : 
            <svg width="157" height="110" viewBox="0 0 157 160" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path className={styles.animated_path} id="n1tick" d="M150 40 L40 150" strokeWidth='14' strokeLinecap='round'/>
              <path className={styles.animated_path} id="n2tick" d="M40 40 L150 150" strokeWidth='14' strokeLinecap='round'/>
            </svg>
            
            }
            { error !== "" ? <p className={styles.error}> {error} </p> :  <></>}
           </div> 
        </div>
    </Grid>
    </Grow >

    <Grid item>

      <div className={styles.card}>

      
        <Typography>
          
        

        {files.length === 0 ? 
          <div className={styles.previewdiv} style={{width:"200px"}}>FRAME PREVIEW</div>:
          files[selectedFrame].name.match('[exr|EXR]$')?<div className={styles.previewdiv} style={{width:"200px"}}>NO PREVIEW <br/> FOR EXR :/</div>:
          <img src={URL.createObjectURL(files[selectedFrame])} style={{maxWidth:"250px", borderRadius:"5px"}}/>
        }


        
          <p >Select a Frame : </p>
        </Typography>

        <Slider
        color="neutral"
          defaultValue={0}
          step={1}
          marks
          min={0}
          max={files.length-1}
          valueLabelDisplay="auto"
          onChange={(e) => { 
            if(e.target.value > 0)
              setSelectedFrame( e.target.value )
          } }
        />


      <p style={{ maxWidth : '100%' }} >
                    only for .EXR images : 
      </p>
      
      <TextField 
        color="neutral"
        style={{margin: '10px', maxWidth : '50%'}}
        label={"gamma"}
        size="small" type="number"
        InputProps={{ inputProps: { min: 0, max: 100 } }}
        value= {gamma}
        onChange= {(e) => setGamma(e.target.value)}
      />
    



      </div>

    </Grid>


    <Grow
    in={ready}
    style={{ transformOrigin: '0 0 0' }}
    {...(ready ? { timeout: 1000 } : {})}
    >
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
              color="neutral"
              style={{margin: '10px', maxWidth : '45%'}}
              label={"crf"}
              size="small" type="number"
              InputProps={{ inputProps: { min: 0, max: 50 } }}
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
          
          <LinearProgress color="neutral" variant="determinate" value={progress?.ratio*100} />          
          
          {outputVideo? <>
          <video playsInline autoPlay muted loop src={outputVideo} width="100%" type="video/mp4" />
          </>:<div className={styles.previewdiv}>VIDEO PREVIEW</div>}
                   
          </div>
          <Button variant="outlined" onClick={
            () => {if (!outputVideo){
                alert("video not ready")
            } else {
              dowload_video();}}} color="neutral">
              DOWNLOAD
          </Button>
      </div>
    </Grid>
    </Grow>

    </Grid>
    </div>
    </Typography>
    </ThemeProvider>

    </>
  ) : 
    <> 
      Loading ... 
    </>;


}
