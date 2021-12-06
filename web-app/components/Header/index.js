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

            <h1 className={styles.center}>KONVERTOR</h1>

            <div className={styles.right}>
            <h3>how to use</h3>
            <h3>about</h3>
            </div>

        </header>
    )
}

export default Header
