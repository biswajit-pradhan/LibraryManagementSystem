import React from "react";
import LmsTable from "../LmsTable";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const ViewAllTeachers = () => {
  const jwtToken = useSelector((state) => state.auth.jwtToken);
  console.log(jwtToken);
  const apiToFetch = "/admin/getAllTeachers";
  const columns = [
    {
      selector: (row) => row.teacherId,
      name: "ID",
      sortable: true,
    },
    {
      selector: (row) => row.teacherEmail,
      name: "Email",
      sortable: true,
    },
    {
      name: "DELETE TEACHER",
      cell: (row) => (
        <NavLink className="btn" to={"/deleteTeacher/" + row.teacherEmail}>
          <i className="material-icons" style={{ color: "red" }}>
            delete
          </i>
        </NavLink>
      ),
    },
  ];

  const changeInResponse = null;

  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1 className="custom_font">VIEW ALL TEACHERS</h1>
        <NavLink type="button" className="btn btn-success" to="/addteacher">
          ADD TEACHER
        </NavLink>
      </div>
      <LmsTable
        apiToFetch={apiToFetch}
        columns={columns}
        changeInResponse={changeInResponse}
        jwtToken={jwtToken}
      />
    </div>
  );
};

export default ViewAllTeachers;
