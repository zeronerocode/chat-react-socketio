import axios from "axios";
import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import styles from "./ChatRoom.module.css"
import { FaList } from "react-icons/fa";
const ChatRoom = ({ socket }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [friends, setFriends] = useState([]);
  const [friend, setFriend] = useState({});

  useEffect(() => {
    const token = localStorage.getItem('token')
    axios.get("http://localhost:4000/v1/users/", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      const users = res.data.data;
      setFriends(users);
    });
  }, []);

  useEffect(() => {
    if (socket) {
      socket.off('newMessage')
      socket.on('newMessage', (message) => {
        setMessages((current) => [...current, message])
        console.log(message);
      })
    }

  }, [socket])

  useEffect(() => {
    const token = localStorage.getItem('token')
    axios.get(`http://localhost:4000/v1/messages/${friend.id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      const messages = res.data.data;
      setMessages(messages);
    });
  }, [friend])


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
    setMessage('')
  };
  const chooseFriend = (friend) => {
    setFriend(friend)
  }
  return (
    <div >
      <div className="row">
        <div className="col-md-4">
          <div className={styles.sideHeader}>
            <h1>Telegram</h1>
            <span><FaList /></span>
          </div>
          <ul className="list-group">
            {friends.map((item) => (
              <li className="list-group-item pointer" onClick={() => chooseFriend(item)}>
                <img src='/img/photo.png' alt='phptp' />
                {item.fullname}
              </li>
            ))}
          </ul>
        </div>
        <div className="col-md-8">
          <div className="wrapper-chat">
            <ul className="list-group">
              <ScrollToBottom className="scrool-buttom">
                <li class="list-group-item active" aria-current="true">{friend.fullname ? friend.fullname : 'pilih teman'}</li>
                {messages.map((item) => (
                  <li className={`list-group-item ${item.receiver_id === friend.id ? 'bg-green' : ''}`}>
                    <p>
                      {item.message} - {item.created_at}
                    </p>
                  </li>
                ))}
              </ScrollToBottom>
            </ul>
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