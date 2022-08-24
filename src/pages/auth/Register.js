import React, { useState } from "react";
import axios from "axios";
import io from "socket.io-client";
import styles from "./Auth.module.css"
import Input from "../../components/base/Input"
import Button from "../../components/base/Button"
import Swal from "sweetalert2";

import { useNavigate } from "react-router-dom";

function Register({ setSocket }) {
  const [formRegister, setFormRegister] = useState({
    email: "",
    password: "",
    fullname:""
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormRegister({
      ...formRegister,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_API_BACKEND}/v1/users/register`, formRegister)
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
          title: 'Register Success',
          showConfirmButton: false,
        })
        navigate('/login')
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Register Error',
          showConfirmButton: false,
        })
      });
  };
  return (
    <div className={styles.loginBody}>
      <div className={styles.formWrapper}>
        <h1 className={styles.logo}>Register</h1>
        <p>Let’s create your account!</p>
        <form onSubmit={handleRegister}>
        <label htmlFor="name" className="form-label">Name</label>
          <Input
            type={"text"}
            name={"fullname"}
            id={"name"}
            placeholder={"fullname"}
            value={formRegister.fullname}
            onChange={handleChange}
          />
          <label htmlFor="email" className="form-label">Email</label>
          <Input
            type={"email"}
            name={"email"}
            id={"email"}
            placeholder={"email"}
            value={formRegister.email}
            onChange={handleChange}
          />
          <label htmlFor="password" className="form-label">Password</label>
          <Input
            type={"password"}
            name={"password"}
            id="password"
            placeholder={"password"}
            value={formRegister.password}
            onChange={handleChange}
          />
          <a href="/">Forgot password?</a>
          <Button type={"submit"}>Register</Button>
        </form>
      </div>
    </div>
  );
}

export default Register;