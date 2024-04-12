import React from "react";
import LmsTable from "../LmsTable";
import { NavLink } from "react-router-dom";

const ViewAllBooks = () => {
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
      name: "Information",
      cell: (row) => (
        <button className="btn" onClick={() => alert(row.bookId)}>
          <i className="material-icons" style={{ color: "green" }}>
            info
          </i>
        </button>
      ),
    },
    {
      name: "Delete",
      cell: (row) => (
        <button className="btn" onClick={() => alert(row.bookId)}>
          <i className="material-icons" style={{ color: "red" }}>
            delete
          </i>
        </button>
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
        <NavLink
          type="button"
          className="btn btn-danger"
          to="/removebookbybookid"
        >
          REMOVE BOOK BY BOOK ID
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

export default ViewAllBooks;
