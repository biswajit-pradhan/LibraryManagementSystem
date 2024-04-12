import React from "react";
import LmsTable from "../LmsTable";
import { NavLink } from "react-router-dom";

const ViewAllTeachers = () => {
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
        apiToFetch={apiToFetch}
        columns={columns}
        changeInResponse={changeInResponse}
      />
    </div>
  );
};

export default ViewAllTeachers;
