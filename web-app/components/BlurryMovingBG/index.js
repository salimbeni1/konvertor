import React from 'react'
import styles from './BlurryMovingBG.module.scss'

function BlurryMovingBG ()  {
    return (
    <div className={styles.bgImage}>
        <div className={styles.shape1}></div>
        <div className={styles.shape2}></div>
        <div className={styles.shape3}></div>
        <div className={styles.shape4}></div>
        <div className={styles.shape5}></div>
        <div className={styles.shape6}></div>
    </div>
    )
}

export default BlurryMovingBG