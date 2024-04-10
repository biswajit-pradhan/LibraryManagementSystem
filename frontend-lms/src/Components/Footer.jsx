import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="bg-body-tertiary text-center text-lg-start">
        <div className="text-center p-3" style={{ backgroundColor: "#d9d4d0" }}>
          ©️ 2024 Copyright: &nbsp;
          <NavLink
            className="text-body"
            to="https://biswajitpradhan-portfolio.netlify.app/"
            target="_blank"
            style={{ textDecoration: "none" }}
          >
            BISWAJIT PRADHAN
          </NavLink>
        </div>
      </footer>
    </>
  );
};

export default Footer;
