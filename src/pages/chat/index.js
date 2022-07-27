/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import ChatBar from '../../components/module/chatbar'
import Sidebar from '../../components/module/sidebar'

const Chat = ({ socket }) => {
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
        <div>
            <div className='row'>
                <div className='col-md-4'>
                    <Sidebar />
                    <ul className="list-group">
                        {friends.map((item) => (
                            <li className="list-group-item pointer" onClick={() => chooseFriend(item)}>{item.fullname}</li>
                        ))}
                    </ul>
                </div>
                <div className='col-md-8'>
                    <ChatBar />
                </div>
            </div>
        </div>
    )
}

export default Chat