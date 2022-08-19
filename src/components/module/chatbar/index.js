/* eslint-disable no-unused-vars */
import React, {useState} from 'react'
import styles from './Chatbar.module.css'

const ChatBar = (props) => {
    console.log(props);
    const [friend, setFriend] = useState({});

    return (
        <div>
            <div className={styles.chatBarHeader}>
                <img src='/img/photo.png' alt='phptp' />
                <span>
                    <ul>
                        <li>Mother ❤</li>
                        <li>online</li>
                    </ul>
                </span>
            </div>
            <div className={styles.chatBox}>
                <ul>
                    <li>
                        <img src='/img/photo.png' alt='phptp' />
                        <span className={styles.chatFriend}>dkahduaidi</span>
                    </li>
                    <li className={styles.myChat}>
                        <span>dkahduaidi</span>
                        <img src='/img/photo.png' alt='phptp' />
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default ChatBar