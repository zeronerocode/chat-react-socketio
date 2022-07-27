import React, { useState } from "react";
import axios from "axios";
import io from "socket.io-client";
import styles from "./Auth.module.css"
import Input from "../../components/base/Input"
import Button from "../../components/base/Button"

import { useNavigate } from "react-router-dom";

function Register({ setSocket }) {
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
      .post("http://localhost:4000/v1/users/login", formLogin)
      .then((res) => {
        const respData = res.data.data;
        localStorage.setItem("token", respData.token);
        localStorage.setItem("refreshToken", respData.refreshToken);
        const resultSocket = io("http://localhost:4000", {
          query: {
            token: respData.token
          }
        });
        setSocket(resultSocket);
        navigate('/room')
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className={styles.loginBody}>
      <div className={styles.formWrapper}>
        <h1 className={styles.logo}>Register</h1>
        <p>Let’s create your account!</p>
        <form onSubmit={handleLogin}>
        <label htmlFor="name" className="form-label">Name</label>
          <Input
            type={"text"}
            name={"fullname"}
            id={"name"}
            placeholder={"fullname"}
            value={formLogin.email}
            onChange={handleChange}
          />
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
          <a href="/"> Sign Up</a>
        </p>
      </div>
    </div>
  );
}

export default Register;