import React from 'react'
import styles from './Header.module.scss'
import { useState } from 'react'

function Header() {

    const [overEmoji, setOverEmoji] = useState(false)

    return (
        <header className={styles.header}
                onMouseEnter = {() => 
                    {setOverEmoji( overEmoji => !overEmoji)}}
                onMouseLeave = {() => 
                    {setOverEmoji( overEmoji => !overEmoji)}}>

            <h3 className={styles.left}>
                {overEmoji ? "0.0" : "-.-" }
            </h3>

            <h1 className={styles.center}>Convert Me Please</h1>

            <div className={styles.right}>
            <a href="#howtouse"><h3>how to use</h3></a>
            
            <a href="#about"><h3>about</h3></a>
            </div>

        </header>
    )
}

export default Header
