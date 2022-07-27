import React from 'react'
import styles from './Sidebar.module.css'
import { FaList } from 'react-icons/fa'


const Sidebar = (children) => {
    return (
        <div>
            <div className={styles.sideHeader}>
                <h1>Telegram</h1>
                <span><FaList /></span>
            </div>
            <div className={styles.friendList}>
                <img src='/img/photo.png' alt='phptp' />
                <span>
                    Theresa Webb <br/>
                    Why did you do that?
                </span>
                <span>12.00</span>
            </div>
        </div>
    )
}

export default Sidebar