import React from "react";
import LmsTable from "../LmsTable";
import { NavLink } from "react-router-dom";

const ViewAllTeachers = () => {
  const apiData = "/admin/getAllTeachers";
  const accessorData = [
    {
      accessorKey: "teacherId",
      header: "ID",
      size: 150,
    },
    {
      accessorKey: "teacherEmail",
      header: "Email",
      size: 150,
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
        <NavLink type="button" className="btn btn-danger" to="/deleteteacher">
          DELETE TEACHER
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

export default ViewAllTeachers;
