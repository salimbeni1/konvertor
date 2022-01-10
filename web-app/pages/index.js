import styles from '../styles/Home.module.scss'
import ConvertorApp from '../components/ConvertorApp'

import Header from '../components/Header'
import BlurryMovingBG from '../components/BlurryMovingBG'
import { useState } from 'react'
import SVGmain1  from '../svgs/SVGmain1'
import { get_icon } from '../svgs/get_icon'

import { useEffect } from 'react';

export default function Home() {

  const [appSelected, setAppSelected] = useState()
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => setOffset(window.pageYOffset);
    // clean up code
    window.removeEventListener('scroll', onScroll);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);


  const getAbout = () => {
    return <>
    <a className="anchor" id="about"></a>
    <div className={styles.about}>
      
        <h1>Why did I created this ..</h1> 
        <p>
          I was bored of those paid and slow version of image
          to video convertors online. So I decided to make my own...
        </p>
        <p>Have fun guys !</p>

        <div className={styles.aboutiml}>{get_icon("10")}</div>
        <div className={styles.aboutimr}>{get_icon("11")}</div>
    </div>
    </>
  }

  const getHowToUse = () => {
    return <>
    <a className="anchor" id="howtouse"></a>
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
        <img src="Houdini.png" width="70px" alt='houdini logo'/>
        <img src="Blender.png" width="70px" alt='blender logo'/>
          </div>


        <p className={styles.note}>
          <b>Note : </b> this site doesnt use a server <br/>
          and the conversion will occur on your browser <br/>
          As a consequence performances may <br/> varry on different machines
        </p>

        <h3> Image file names </h3>
        <p>
          The images you want to convert must have the same file name<br/>
          followed by the frame nb of the image.  <br/>
        </p> 
        <p className={styles.note}>
          <b>Example 1 : </b> frame01.jpg frame02.jpg frame03.jpg <br/>
          <b>Example 2 : </b> im04v2.jpg im05v2.jpg im06v2.jpg <br/>
        </p>


        <h3> Supported image types </h3>

        <p>
        Input : .PNG .JPG .EXR - Output : .MP4 .MOV
        </p>
        
        <p className={styles.note}>
          <b>Note : </b> many online video services only support the YUV color space
          with 4:2:0 chroma subsampling , to maximize compatibility by default subsampling is used.
        </p>

        <h3> Parameters </h3>

        <dl>
          <dt>frame rate</dt>
          <dd>frame rate of the output video</dd>
          <dt>crl</dt>
          <dd>convertion level , when crl is set to 1 you keep full quality </dd>
          <dd>but may be slower, try higher values for faster renders</dd>
          <dt>output name</dt>
          <dd>output name of the video , chose the output extension here</dd>
          <dt>gamma</dt>
          <dd>only for exr images , the gamma correction value</dd>
        </dl>

    </div>
    </>
  }


  const getIntro = () => {
    return <div className={styles.intro}>
      <p>
        If a picture is worth a thousand words, then a video is worth a million.
        Convert easily for free your .JPG .PNG .EXR images to .MP4 .MOV videos.
        Enjoy your conversion :)
      </p>
    </div>
  }


  return  <>
  
  <Header/>

  
  <div className={styles.maingrid}>
  <div className={styles.frontpage}>
    
      <div className={styles.frontpagetext}>
        <h1>
          Convert easily,<br/>
          all images to videos.
        </h1>
        {getIntro()}
        <a href='#app' className={styles.fancybtn}> CONVERT FOR FREE NOW</a>
      </div>

      <div className={styles.frontpageimage}>
        <SVGmain1/>
      </div>

  </div>
  </div>
  <div className={styles.frontpageimagebot}>  
    
  </div>

  <a className="anchor" id="app"></a>
  <div id="app" className={styles.app}>
    <h2> A fully featured converter that allows you to make a video out of any sequences of images </h2>
    <ConvertorApp/>
  </div>


  <a className="anchor" id="whyme"></a>
  <div id="whyme" className={styles.whyme}>

    <div >
        <div>{get_icon("1")}</div>
        <h3> as fast as your machine </h3>
    </div>

    <div >
        <div>{get_icon("2")}</div>
        <h3> nothing stored on servers </h3>
    </div>

    <div >
        <div>{get_icon("3")}</div>
        <h3> no uploads needed </h3>
    </div>

  </div>

  {getHowToUse()}

  {getAbout()}


  <footer>
    
  </footer>
  
  
  </>

}
