import React from "react";
import { useSelector } from "react-redux";
import LmsTable from "../LmsTable";

const ViewAllStudentsFromAdmin = () => {
  const jwtToken = useSelector((state) => state.auth.jwtToken);
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

export default ViewAllStudentsFromAdmin;
