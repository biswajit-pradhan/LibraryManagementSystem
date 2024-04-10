import React from "react";

import { NavLink } from "react-router-dom";
import { ReactTyped } from "react-typed";

const TeacherDashboard = () => {
  return (
    <>
      <div className="container-fluid admin_dashboard">
        <div className="custom_font">
          <h1>TEACHER DASHBOARD</h1>
        </div>
        <div>
          <h5>
            <ReactTyped
              strings={["Welcome Teacher"]}
              typeSpeed={50}
              showCursor={false}
            />
          </h5>
        </div>
        <div>
          <div className="input_font">
            <div className="row mt-3">
              <div className="col-sm-3">
                <div className="card">
                  <NavLink
                    type="button"
                    className="btn btn-success"
                    to="/addstudent"
                  >
                    ADD STUDENT
                  </NavLink>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="card">
                  <NavLink
                    type="button"
                    className="btn btn-success"
                    to="/addbook"
                  >
                    ADD BOOK
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
                    to="/viewallstudents"
                  >
                    VIEW ALL STUDENTS
                  </NavLink>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="card">
                  <NavLink
                    type="button"
                    className="btn btn-warning"
                    to="/viewallbooks"
                  >
                    VIEW ALL BOOKS
                  </NavLink>
                </div>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-sm-6">
                <div className="card">
                  <NavLink
                    type="button"
                    className="btn btn-warning"
                    to="/viewallbookstakenbyastudent"
                  >
                    VIEW ALL BOOKS TAKEN BY A STUDENT
                  </NavLink>
                </div>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-sm-3">
                <div className="card">
                  <NavLink
                    type="button"
                    className="btn btn-danger"
                    to="/removestudentbyemail"
                  >
                    REMOVE STUDENT BY EMAIL
                  </NavLink>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="card">
                  <NavLink
                    type="button"
                    className="btn btn-danger"
                    to="/removestudentbyid"
                  >
                    REMOVE STUDENT BY ID
                  </NavLink>
                </div>
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-sm-6">
                <div className="card">
                  <NavLink
                    type="button"
                    className="btn btn-danger"
                    to="/removebookbybookid"
                  >
                    REMOVE BOOK BY BOOK ID
                  </NavLink>
                </div>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-sm-3">
                <div className="card">
                  <NavLink
                    type="button"
                    className="btn btn-info"
                    to="/allocatebook"
                  >
                    ALLOCATE BOOK
                  </NavLink>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="card">
                  <NavLink
                    type="button"
                    className="btn btn-info"
                    to="/deallocatebook"
                  >
                    DEALLOCATE BOOK
                  </NavLink>
                </div>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-sm-6">
                <div className="card">
                  <NavLink
                    type="button"
                    className="btn btn-info"
                    to="/extendallocatedate"
                  >
                    EXTEND ALLOCATE DATE
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

export default TeacherDashboard;
