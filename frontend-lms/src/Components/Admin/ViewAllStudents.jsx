import React from "react";
import { NavLink } from "react-router-dom";
import LmsTable from "../LmsTable";

const ViewAllStudents = () => {
  const apiData = "/admin/getAllStudents";
  const accessorData = [
    {
      accessorKey: "studentId",
      header: "ID",
      size: 150,
    },
    {
      accessorKey: "studentEmail",
      header: "Email",
      size: 150,
    },
  ];

  const changeInResponse = null;

  return (
    <div style={{ minHeight: "100vh" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1 className="custom_font">VIEW ALL TEACHERS</h1>
        <NavLink type="button" className="btn btn-success" to="/addstudent">
          ADD STUDENT
        </NavLink>
        <NavLink
          type="button"
          className="btn btn-danger"
          to="/removestudentbyemail"
        >
          REMOVE STUDENT BY EMAIL
        </NavLink>
        <NavLink
          type="button"
          className="btn btn-danger"
          to="/removestudentbyid"
        >
          REMOVE STUDENT BY ID
        </NavLink>
      </div>
      <LmsTable
        apiData={apiData}
        accessorData={accessorData}
        changeInResponse={changeInResponse}
      />
    </div>
  );
};

export default ViewAllStudents;
