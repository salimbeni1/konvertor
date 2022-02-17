import React from 'react'
import styles from './Header.module.scss'
import { useState , useEffect } from 'react'



function Header() {

    const [overEmoji, setOverEmoji] = useState(false)
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        const onScroll = () => setOffset(window.pageYOffset);
        // clean up code
        window.removeEventListener('scroll', onScroll);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
      }, []);


    
    return (
        <nav className={`${styles.header} ${(offset=== 0)?"":styles.scrolledHeader}`}>

            <div  className={styles.logo}>
                <a href='#'><h1>K O N V E R T O R</h1></a>
                
            </div>

            <div className={styles.btn} >

                <ul className={styles.btnul} >

                    {/*
                    <li>
                        <a href='#whyme'>Why me?</a>
                    </li>
                    */}
                    

                    <li>
                        <a>convertion types</a>
                        <div className={styles.featuresmenu}>
                            <a href='#app'> EXR to MP4 </a>
                            <a href='#app'> JPG to MP4 </a>
                            <a href='#app'> PNG to MP4 </a>
                            <a href='#app'> EXR to MOV </a>
                            <a href='#app'> JPG to MOV </a>
                            <a href='#app'> PNG to MOV </a>
                        </div>
                    </li>

                    <li>
                        <a href='#howtouse'>manual</a>
                    </li>

                    <li>
                        <a href='#about' >about</a>
                    </li>

                </ul>
                
                <a href='#app' className={styles.fancybtn}>CONVERT NOW</a>


            </div>


        </nav>
    )
}

export default Header
