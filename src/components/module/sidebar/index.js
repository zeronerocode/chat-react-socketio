/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import styles from "./Sidebar.module.css";
import { FaList } from "react-icons/fa";

const Sidebar = (props) => {
  const [friend, setFriend] = useState({});
  const chooseFriend = (friend) => {
    setFriend(friend);
  };
  return (
    <div>
      <div className={styles.sideHeader}>
        <h1>Telegram</h1>
        <span>
          <FaList />
        </span>
      </div>
      {props.friends.map((item) => (
        <li
          className="list-group-item pointer"
          onClick={() => chooseFriend(item)}
        >
          <div className={styles.friendList}>
            <img src="/img/photo.png" alt="phptp" />
            <span>
            {item.fullname}<br />
              Why did you do that?
            </span>
            <span>12.00</span>
          </div>
        </li>
      ))}
    </div>
  );
};

export default Sidebar;
