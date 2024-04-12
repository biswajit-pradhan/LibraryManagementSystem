import React from "react";
import { NavLink, useParams } from "react-router-dom";
import LmsTable from "../LmsTable";

const ViewAllBooksTakenByAStudent = () => {
  const { studentId, studentEmail } = useParams();
  const apiToFetch = "/teacher/getAllBooksAllocatedToAStudent/" + studentId;
  const columns = [
    {
      selector: (row) => row.bookTaken.bookId,
      name: "BOOK ID",
      sortable: true,
    },
    {
      selector: (row) => row.bookTaken.bookName,
      name: "BOOK NAME",
      sortable: true,
    },
    {
      selector: (row) => row.bookAllocationDate,
      name: "BOOK ALLOCATION DATE",
      sortable: true,
    },
    {
      selector: (row) => row.bookAllocationEndDate,
      name: "BOOK ALLOCATION END DATE",
      sortable: true,
    },
    {
      name: "EXTEND ALLOCATION DATE",
      cell: (row) => (
        <NavLink
          className="btn"
          to={"/deallocatebook/" + row.bookTaken.bookId + "/" + studentId}
        >
          <i className="material-icons" style={{ color: "blue" }}>
            info
          </i>
        </NavLink>
      ),
    },
    {
      name: "DEALLOCATE BOOK",
      cell: (row) => (
        <NavLink
          className="btn"
          to={"/deallocatebook/" + row.bookTaken.bookId + "/" + studentId}
        >
          <i className="material-icons" style={{ color: "red" }}>
            delete
          </i>
        </NavLink>
      ),
    },
  ];

  const changeInResponse = null;

  return (
    <div>
      <div style={{ minHeight: "100vh" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h1 className="custom_font">VIEW ALL BOOKS TAKEN BY STUDENT</h1>
        </div>
        <div>
          <h4>Student Id: {studentId}</h4>
          <br />
          <h4>Student Email: {studentEmail}</h4>
        </div>
        <LmsTable
          apiToFetch={apiToFetch}
          columns={columns}
          changeInResponse={changeInResponse}
        />
      </div>
    </div>
  );
};

export default ViewAllBooksTakenByAStudent;
