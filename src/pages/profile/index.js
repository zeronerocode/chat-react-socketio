/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import style from "./profile.module.css";
import Button from "../../components/base/Button";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [Profile, setProfile] = useState("");

  const navigate = useNavigate();
  const fetchUser = async () => {
    const authToken = localStorage.getItem("token");
    console.log("authToken =>", authToken);
    try {
      const result = await axios.get(
        `https://telechatapp.herokuapp.com/v1/users/profile`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      const data = result.data.data[0];
      console.log("data =>", data);
      setProfile(result.data.data[0]);
    } catch (error) {
      console.log(error);
      Swal({
        title: "Warning!",
        text: `${error.response.data.message}`,
        icon: "error",
      });
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleChange = (e) => {
    setProfile((current) => {
      return {
        ...current,
        [e.target.name]: e.target.value,
      };
    });
  };

  const updateProfile = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", Profile.name);
    formData.append("email", Profile.email);
    formData.append("id", Profile.id);;
    formData.append("photo", Profile.file_photo);
    const authToken = localStorage.getItem("token");
    axios
      .put(`https://telechatapp.herokuapp.com/v1/users/update-image`, formData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        }
      })
      .then(() => {
        navigate("/room");
        Swal({
          title: "Success!",
          text: `Update Profile Success`,
          icon: "success",
        });
      })
      .catch(() => alert("error"));
  };

  return (
    <div className={style.profile}>
      <div className={style.profileContainer}>
        <img
          src={Profile.photo ? Profile.photo : "/img/user.png"}
          height={70}
          width={70}
          alt="profile"
        />
        <h3 className={style.userName}>
          {Profile.fullname ? Profile.fullname : ""}
        </h3>
        <h5 className={style.userEmail}>
          {Profile.email ? Profile.email : ""}
        </h5>
        <form className={`${style.input_forms}`}>
          <div className={`${style.input}`}>
            <label htmlFor="id">ID User</label>
            <input
              type="text"
              id="id"
              name="id"
              defaultValue={Profile.id ? Profile.id : ""}
              disabled
            />
          </div>
          <div className={`${style.input}`}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              defaultValue={Profile.fullname ? Profile.fullname : ""}
              onChange={handleChange}
            />
          </div>
          <div className={`${style.input}`}>
            <label htmlFor="name">Email Address</label>
            <input
              type="text"
              id="email"
              name="email"
              defaultValue={Profile.email ? Profile.email : ""}
              onChange={handleChange}
            />
          </div>
          <div className={`${style.input}`}>
            <label htmlFor="name">Phone Number</label>
            <input
              type="text"
              id="phone"
              name="phone"
              defaultValue={Profile.phone ? Profile.phone : ""}
              onChange={handleChange}
              placeholder={"insert your phone number"}
            />
          </div>
          <Button
            type={"submit"}
            className={`${style.update_btn}`}
            onClick={updateProfile}
          >
            {" "}
            Update
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
