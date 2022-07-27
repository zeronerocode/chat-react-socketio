import React, { useState } from "react";
import axios from "axios";
import io from "socket.io-client";

import { useNavigate } from "react-router-dom";

function Login({ setSocket }) {
  const [formLogin, setFormLogin] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  //   useEffect(() => {
  //
  //   }, []);
  const handleChange = (e) => {
    setFormLogin({
      ...formLogin,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4000/v1/users/login", formLogin)
      .then((res) => {
        const respData = res.data.data;
        localStorage.setItem("token", respData.token);
        localStorage.setItem("refreshToken", respData.refreshToken);
        const resultSocket = io("http://localhost:4000", {
          query:{
            token: respData.token
          }
        });
        setSocket(resultSocket);
        navigate('/room')
      })
      .catch((err) => {
        console.log(err);
      });
    // navigate(`/room?username=${username}&group=${group}`)
  };
  return (
    <div>
      <form onSubmit={handleLogin}>
        <ul>
          <li>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="email"
              value={formLogin.email}
              onChange={handleChange}
            />
          </li>
          <li>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="password"
              value={formLogin.password}
              onChange={handleChange}
            />
          </li>
          <li>
            <button type="submit">login</button>
          </li>
        </ul>
      </form>
    </div>
  );
}

export default Login;