/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect, useState } from "react";
// import ScrollToBottom from "react-scroll-to-bottom";
import styles from "./ChatRoom.module.css";
import { useNavigate } from "react-router";
import { FaList, FaPowerOff } from "react-icons/fa";
import { BsGearFill } from "react-icons/bs";
const ChatRoom = ({ socket }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [friends, setFriends] = useState([]);
  const [friend, setFriend] = useState({});

  const [createOption, setcreateOption] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`${process.env.REACT_APP_API_BACKEND}/v1/users/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const users = res.data.data;
        setFriends(users);
      });
  }, []);

  useEffect(() => {
    if (socket) {
      socket.off("newMessage");
      socket.on("newMessage", (message) => {
        setMessages((current) => [...current, message]);
        console.log(message);
      });
    }
  }, [socket]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`${process.env.REACT_APP_API_BACKEND}/v1/messages/${friend.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const messages = res.data.data;
        setMessages(messages);
      });
  }, [friend]);

  const handleSendMessage = () => {
    if (socket && message) {
      socket.emit(
        "sendMessage",
        {
          idReceiver: friend.id,
          messageBody: message,
        },
        (message) => {
          setMessages((current) => [...current, message]);
        }
      );
    }
    setMessage("");
  };
  const chooseFriend = (friend) => {
    setFriend(friend);
  };

  const handleOptionMenu = () => {
    setcreateOption(!createOption);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleSetting = () => {
    navigate('/profile')
  };
  return (
    <div>
      <div className="row">
        <div className="col-md-4">
          <div className={styles.sideHeader}>
            <h1>Telegram</h1>
            <span>
              <FaList onClick={handleOptionMenu} />
            </span>
            {createOption === true ? (
              <div className={styles.optionMenu}>
                <div className="d-flex mb-4" onClick={handleSetting}>
                  <BsGearFill className="text-white"/>
                  <p>Setting</p>
                </div>
                <div className="d-flex " onClick={handleLogout}>
                  <FaPowerOff className="text-white" />
                  <p>Logout</p>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
          <ul className="list-group">
            {friends.map((item) => (
              <li
                className="list-group-item pointer"
                onClick={() => chooseFriend(item)}
              >
                <img src={item.photo ? item.photo : '/img/photo.png'} alt="phptp" />
                {item.fullname}
              </li>
            ))}
          </ul>
        </div>
        <div className="col-md-8">
          <div className="">
            <div className={styles.chatBarHeader}>
              {friend.fullname ? (
                <>
                  <img src={friend.photo ? friend.photo : '/img/photo.png'} alt="phptp" />
                  <span>
                    <ul>
                      <li>{friend.fullname}</li>
                      <li>online</li>
                    </ul>
                  </span>
                </>
              ) : (
                "pilih teman"
              )}
            </div>
            <div className={styles.chatBox}>
              {messages.map((item) =>
                item.receiver_id === friend.id ? (
                  <ul>
                    <li>
                      <span className={styles.chatFriend}>
                        {item.message} - {item.date}
                      </span>
                    </li>
                  </ul>
                ) : (
                  <ul>
                    <li className={styles.myChat}>
                      {item.date}
                      <span>{item.message}</span>
                    </li>
                  </ul>
                )
              )}
            </div>
          </div>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="isikan pesan anda"
              aria-label="Recipient's username"
              aria-describedby="button-addon2"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              className="btn btn-outline-secondary"
              type="button"
              id="button-addon2"
              onClick={handleSendMessage}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
