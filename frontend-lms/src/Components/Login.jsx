import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login } from "../Redux/Slices/authSlice";

const Login = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const [isDisable, setIsDisable] = useState(false);

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

    if (!user.username) {
      formValid = false;
      tempErrors["username"] = "Email cannot be empty";
    } else if (!userNamePattern.test(user.username)) {
      formValid = false;
      tempErrors["username"] = "Email not valid";
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
      try {
        const response = await axios.post("/auth/login", user);
        const data = response.data;
        setIsDisable(true);
        console.log(data);
        toast.success("login success!!");
        setTimeout(() => {
          dispatch(
            login({
              jwtToken: data.jwtToken,
              username: data.username,
              roles: data.roles,
              isLoggedIn: "true",
              jwtTokenValidity: Date.now() / 1000 + (data.jwtTokenValidity - 2),
            })
          );
        }, 2000);
      } catch (error) {
        toast.error(error.response.data);
      }
    }
  };

  return isLoggedIn === "true" ? (
    <Navigate to="/" />
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
                    <div className="form-group">
                      <label
                        htmlFor="username"
                        className="text-dark custom_font"
                      >
                        EMAIL:
                      </label>
                      <br />
                      <input
                        className="form-control input_font"
                        name="username"
                        value={user.username}
                        onChange={changeHandler}

                      />
                    </div>
                    <span className="errors">{errors["username"]}</span>
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
                          disabled={isDisable}
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
