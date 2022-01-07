import React from 'react'
import styles from './Header.module.scss'
import { useState } from 'react'

function Header() {

    const [overEmoji, setOverEmoji] = useState(false)

    return (
        <header className={styles.header}>

            <div className={styles.headerctn}>
                <h1>Convert-me-please</h1>

                <h2>convert</h2>
                <h2>how-to-use</h2>
                <h2>about</h2>
            </div>

            

        </header>
    )
}

export default Header
