import React, { useState } from "react";
import axios from "axios";
// import "./style.css";

const Login = () => {
  const [user, setUser] = useState({
    userName: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [msg, setMsg] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const changeHandler = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  const handleValidation = () => {
    const userNamePattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let tempErrors = {};
    let formValid = true;

    if (!user.userName) {
      formValid = false;
      tempErrors["userName"] = "Email cannot be empty";
    } else if (!userNamePattern.test(user.userName)) {
      formValid = false;
      tempErrors["userName"] = "Email not valid";
    }

    if (!user.password) {
      formValid = false;
      tempErrors["password"] = "Password cannot be empty";
    }

    setErrors(tempErrors);
    return formValid;
  };

  const loginUser = async () => {
    if (handleValidation()) {
      // let authCode = "Basic " + btoa(user.userName + ":" + user.password);
      // try {
      //   const response = await axios.get("http://localhost:8080/api/user/login", {
      //     headers: { Authorization: authCode },
      //   });
      //   const data = response.data;
      //   console.log("login success " + data);
      //   localStorage.setItem("userName", data.userName);
      //   setIsLoggedIn(true);
      // } catch (error) {
      //   console.error(error);
      //   setMsg("Invalid Credentials");
      // }
    }
  };

  return isLoggedIn ? (
    <div>Home Component</div>
  ) : (
    <>
      <div className="page_container">
        <div className="event-booking-container">
          <div id="login">
            <div className="container">
              <div
                id="login-row"
                className="row justify-content-center align-items-center"
              >
                <div id="login-column" className="col-md-6">
                  <div id="login-box" className="col-md-12">
                    <h3 className="text-center text-dark custom_font">LOGIN</h3>
                    <span style={{ color: "red" }}>{msg}</span> <br />
                    <div className="form-group">
                      <label
                        htmlFor="userName"
                        className="text-dark custom_font"
                      >
                        EMAIL:
                      </label>
                      <br />
                      <input
                        className="form-control input_font"
                        name="userName"
                        value={user.userName}
                        onChange={changeHandler}
                      />
                    </div>
                    <span className="errors">{errors["userName"]}</span>
                    <div className="form-group">
                      <label
                        htmlFor="password"
                        className="text-dark custom_font"
                      >
                        PASSWORD:
                      </label>
                      <br />
                      <input
                        type="password"
                        className="form-control input_font"
                        name="password"
                        value={user.password}
                        onChange={changeHandler}
                      />
                    </div>
                    <span className="errors">{errors["password"]}</span>
                    <div className="form-group">
                      <br />
                      <div
                        style={{ alignItems: "center", textAlign: "center" }}
                      >
                        <button
                          className="btn btn-info btn-md custom_font"
                          onClick={loginUser}
                        >
                          Login
                        </button>
                        <br />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
