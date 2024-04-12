import React from "react";
import { NavLink } from "react-router-dom";
import LmsTable from "../LmsTable";

const ViewAllStudents = () => {
  const apiToFetch = "/admin/getAllStudents";
  const columns = [
    {
      selector: (row) => row.studentId,
      name: "ID",
      sortable: true,
    },
    {
      selector: (row) => row.studentEmail,
      name: "EMAIL",
      sortable: true,
    },
    {
      name: "ALL BOOKS TAKEN / DEALLOCATE",
      cell: (row) => (
        <NavLink
          className="btn"
          to={
            "/viewallbookstakenbyastudent/" +
            row.studentId +
            "/" +
            row.studentEmail
          }
        >
          <i className="material-icons" style={{ color: "green" }}>
            info
          </i>
        </NavLink>
      ),
    },
    {
      name: "DELETE STUDENT",
      cell: (row) => (
        <NavLink className="btn" to={"/removestudentbyid/" + row.studentId}>
          <i className="material-icons" style={{ color: "red" }}>
            delete
          </i>
        </NavLink>
      ),
    },
    {
      name: "ALLOCATE BOOK",
      cell: (row) => (
        <NavLink
          className="btn"
          to={"/bookselection/" + row.studentId + "/" + row.studentEmail}
        >
          <i className="material-icons" style={{ color: "green" }}>
            book
          </i>
        </NavLink>
      ),
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
        <h1 className="custom_font">VIEW ALL STUDENTS</h1>
        <NavLink type="button" className="btn btn-success" to="/addstudent">
          ADD STUDENT
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

export default ViewAllStudents;
