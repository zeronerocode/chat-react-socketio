import React, { useState } from "react";
import axios from "axios";
import io from "socket.io-client";
import styles from "./Auth.module.css"
import Input from "../../components/base/Input"
import Button from "../../components/base/Button"
import Swal from "sweetalert2";

import { useNavigate, Link } from "react-router-dom";

function Login({ setSocket }) {
  const [formLogin, setFormLogin] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormLogin({
      ...formLogin,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_API_BACKEND}/v1/users/login`, formLogin)
      .then((res) => {
        const respData = res.data.data;
        localStorage.setItem("token", respData.token);
        localStorage.setItem("refreshToken", respData.refreshToken);
        const resultSocket = io(`${process.env.REACT_APP_API_BACKEND}`, {
          query: {
            token: respData.token
          }
        });
        setSocket(resultSocket);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Logged In',
          showConfirmButton: false,
        })
        navigate('/room')
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Wrong Email or Password',
          showConfirmButton: false,
        })
      });
  };
  return (
    <div className={styles.loginBody}>
      <div className={styles.formWrapper}>
        <h1 className={styles.logo}>Login</h1>
        <p>Hi, Welcome back!</p>
        <form onSubmit={handleLogin}>
          <label htmlFor="email" className="form-label">Email</label>
          <Input
            type={"email"}
            name={"email"}
            id={"email"}
            placeholder={"email"}
            value={formLogin.email}
            onChange={handleChange}
          />
          <label htmlFor="password" className="form-label">Password</label>
          <Input
            type={"password"}
            name={"password"}
            id="password"
            placeholder={"password"}
            value={formLogin.password}
            onChange={handleChange}
          />
          <a href="/">Forgot password?</a>
          <Button type={"submit"}>Login</Button>
        </form>
        <p className="mt-3 text-center">Don’t have an account ?
          <Link to="/register"> Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;