import React from "react";
import { useSelector } from "react-redux";

import { NavLink } from "react-router-dom";
import { ReactTyped } from "react-typed";

const AdminDashboard = () => {
  const username = useSelector((state) => state.auth.username);
  return (
    <>
      <div className="container-fluid admin_dashboard">
        <div className="custom_font">
          <h1>ADMIN DASHBOARD</h1>
        </div>
        <div>
          <h5>
            <ReactTyped
              strings={[`Welcome ${username}`]}
              typeSpeed={50}
              showCursor={false}
            />
          </h5>
        </div>
        <div>
          <div className="input_font">
            <div className="row mt-3">
              <div className="col-sm-6">
                <div className="card">
                  <NavLink
                    type="button"
                    className="btn btn-success"
                    to="/addteacher"
                  >
                    ADD TEACHER
                  </NavLink>
                </div>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-sm-3">
                <div className="card">
                  <NavLink
                    type="button"
                    className="btn btn-warning"
                    to="/viewallteachers"
                  >
                    VIEW ALL TEACHERS
                  </NavLink>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="card">
                  <NavLink
                    type="button"
                    className="btn btn-warning"
                    to="/viewallstudentsfromadmin"
                  >
                    VIEW ALL STUDENTS
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
