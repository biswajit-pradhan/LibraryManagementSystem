import React from "react";
import { NavLink, useParams } from "react-router-dom";
import LmsTable from "./../LmsTable";

const ViewAllStudentsWhoTakenABook = () => {
  const { bookId, bookName } = useParams();
  const apiToFetch = "/teacher/getAllStudentsWhoomABookIsAllocated/" + bookId;
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
      name: "DEALLOCATE BOOK",
      cell: (row) => (
        <NavLink
          className="btn"
          to={"/deallocatebook/" + bookId + "/" + row.studentId}
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
            <h4>Book Id: {bookId}</h4>
            <br />
            <h4>Book Name: {bookName}</h4>
          </div>
          <LmsTable
            apiToFetch={apiToFetch}
            columns={columns}
            changeInResponse={changeInResponse}
          />
        </div>
      </div>
    </div>
  );
};

export default ViewAllStudentsWhoTakenABook;
