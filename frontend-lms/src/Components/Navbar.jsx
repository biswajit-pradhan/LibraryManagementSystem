import React from "react";
import { NavLink } from "react-router-dom";

import logo from "../Images/Logo.jpg";

const role = "STUDENT";

const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg fixed-top sticky-top navbar-dark bg-primary">
        <div className="container-fluid">
          <NavLink className="navbar-brand nav-name active" to="/">
            <img
              src={logo}
              alt="not found"
              width="35"
              height="25"
              className="d-inline-block align-text-top me-4"
            />
            L M S
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {/* <div className="ms-auto">
              <NavLink to="/admindashboard">
                <button className="btn btn-outline-light me-2">
                  ADMIN DASHBOARD
                </button>
              </NavLink>
            </div> */}
            <div className="ms-auto">
              <NavLink to="/teacherdashboard">
                <button className="btn btn-outline-light me-2">
                  TEACHER DASHBOARD
                </button>
              </NavLink>
            </div>

            {/* <div className="ms-auto">
              <NavLink to="/teacherdashboard">
                <button className="btn btn-outline-light me-2">
                  STUDENT DASHBOARD
                </button>
              </NavLink>
            </div>

            {role === "" ? (
              <div className="ms-auto">
                <NavLink to="/login">
                  <button className="btn btn-outline-light me-2">LOG IN</button>
                </NavLink>
              </div>
            ) : (
              <div className="ms-auto">
                <NavLink to="/login">
                  <button className="btn btn-outline-light me-2">
                    LOG OUT
                  </button>
                </NavLink>
              </div>
            )} */}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
