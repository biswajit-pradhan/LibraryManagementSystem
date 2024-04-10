import React from "react";
import LmsTable from "../LmsTable";
import { NavLink } from "react-router-dom";

const ViewAllBooks = () => {
  const apiData = "/teacher/getAllBooks";
  const accessorData = [
    {
      accessorKey: "bookId",
      header: "ID",
      size: 150,
    },
    {
      accessorKey: "bookName",
      header: "BOOK NAME",
      size: 150,
    },
    {
      accessorKey: "totalAvailability",
      header: "TOTAL AVAILABILITY",
      size: 150,
    },
    {
      accessorKey: "bookLink",
      header: "BOOK LINK",
      size: 150,
    },
    {
      accessorKey: "isbnNo",
      header: "ISBN NO",
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
        apiData={apiData}
        accessorData={accessorData}
        changeInResponse={changeInResponse}
      />
    </div>
  );
};

export default ViewAllBooks;
