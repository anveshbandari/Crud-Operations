import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import axios from "axios";

import "./index.css";

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const changeHandler = (event) => {
    setData({ ...data, [event.target.id]: event.target.value });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setEmailError("");
    setPasswordError("");

    if (!data.email) {
        setEmailError("Incorrect Email");
      } else if (!data.password) {
        setPasswordError("Incorrect Password");
      } else {
        axios
          .post("http://localhost:4000/login", { email, password })
          .then((result) => {
            if (result.status === 200) {
              navigate("Home");
            }
          })
          .catch((err) => {
            if (err.response.status === 400 && err.response.data.message === "Enter valid email") {
              setEmailError("Incorrect Email");
            } else if (err.response.status === 400 && err.response.data.message === "Enter valid password") {
              setPasswordError("Incorrect Password");
            }
          });
        }
    };     

  const { email, password } = { ...data };
  return (
    <div className="bg-container">
      <div className="login-container">
        <h1 className="title">Login</h1>
        <form onSubmit={submitHandler}>
          <div className="label-container">
            <label className="login-labels" htmlFor="email">
              Email
            </label>
            <input
              className="login-inputs"
              id="email"
              value={email}
              type="email"
              onChange={changeHandler}
              required
            />
            {emailError && <p className="errMsg">{emailError}</p>}
          </div>
          <div className="label-container">
            <label className="login-labels" htmlFor="password">
              Password
            </label>
            <input
              className="login-inputs"
              id="password"
              value={password}
              type="password"
              onChange={changeHandler}
              required
            />
            {passwordError && <p className="errMsg">{passwordError}</p>}
          </div>
          <div className="button-container">
            <button className="button">LogIn</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
