import React, {useEffect, useState} from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import ChatRoom from './pages/ChatRoom'
import Login from './pages/auth/Login'
import io from "socket.io-client";
import Register from './pages/auth/Register';
import Chat from './pages/chat';
import Profile from './pages/profile'


const App = () => {
  const [socket, setSocket] = useState(null)
  useEffect(()=>{
    const token = localStorage.getItem('token')
    if(!socket && token){
      const resultSocket = io(`${process.env.REACT_APP_API_BACKEND}`, {
        query: {
          token: token
        }
      })
      setSocket(resultSocket)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login setSocket={setSocket}/>}/>
      <Route path="/login" element={<Login setSocket={setSocket}/>}/>
      <Route path="/room" element={<ChatRoom socket={socket} />}/>
      <Route path="/register" element={<Register/>}/>
      <Route path='/chat' element={<Chat socket={socket}/>}/>
      <Route path='/profile' element={<Profile socket={socket}/>} />
    </Routes>
    </BrowserRouter>
  )
}

export default App