import React from "react";
import { useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
import LmsTable from "../LmsTable";

const ViewAllBooks = () => {
  const jwtToken = useSelector((state) => state.auth.jwtToken);
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
      name: "STUDENTS WHO TAKEN",
      cell: (row) => (
        <NavLink
          className="btn"
          to={
            "/viewallstudentswhotakenabook/" + row.bookId + "/" + row.bookName
          }
        >
          <i className="material-icons" style={{ color: "green" }}>
            info
          </i>
        </NavLink>
      ),
    },
    {
      name: "Delete",
      cell: (row) => (
        <NavLink className="btn" to={"/removebookbybookid/" + row.bookId}>
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
        <h1 className="custom_font">VIEW ALL BOOKS</h1>
        <NavLink type="button" className="btn btn-success" to="/addbook">
          ADD BOOK
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

export default ViewAllBooks;
