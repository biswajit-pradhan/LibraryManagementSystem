import React from "react";
import { useSelector } from 'react-redux';
import { NavLink, useParams } from "react-router-dom";
import LmsTable from "./../LmsTable";

const BookSelection = () => {
  const jwtToken = useSelector((state) => state.auth.jwtToken);
  const { studentId, studentEmail } = useParams();
  const apiToFetch = "/teacher/getAllBooks";
  const columns = [
    {
      selector: (row) => row.bookId,
      name: "ID",
      sortable: true,
    },
    {
      selector: (row) => row.bookName,
      name: "BOOK NAME",
      sortable: true,
    },
    {
      selector: (row) => row.totalAvailability,
      name: "TOTAL AVAILABILITY",
      sortable: true,
    },
    {
      name: "BOOK IMAGE",
      cell: (row) => (
        <img
          src={row.bookLink}
          alt="NOT FOUND"
          style={{ height: "30vh", width: "25vh" }}
        />
      ),
    },
    {
      selector: (row) => row.isbnNo,
      name: "ISBN NO",
      sortable: true,
    },
    {
      name: "ALLOCATE BOOK",
      cell: (row) => (
        <NavLink
          className="btn"
          to={"/allocatebook/" + row.bookId + "/" + studentId}
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
    <>
      <div
        style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1 className="custom_font">SELECT BOOK TO ALLOCATE</h1>
        </div>
        <h3>STUDENT ID: {studentId}</h3>
        <h3>STUDENT EMAIL: {studentEmail}</h3>
        <LmsTable
          apiToFetch={apiToFetch}
          columns={columns}
          changeInResponse={changeInResponse}
          jwtToken={jwtToken}
        />
      </div>
    </>
  );
};

export default BookSelection;
