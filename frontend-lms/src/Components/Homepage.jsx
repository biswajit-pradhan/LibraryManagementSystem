import React from "react";
import { ReactTyped } from "react-typed";
import Marquee from "react-fast-marquee";

import library from "../Images/library.png";
import library2 from "../Images/library2.png";
import Crousal from "./Crousal";

const Homepage = () => {
  return (
    <>
      <Marquee
        pauseOnHover={true}
        speed={90}
        style={{
          backgroundColor: "darkseagreen",
          color: "black",
          fontWeight: "bold",
        }}
      >
        It is a test of notification bar for library management system by
        Biswajit Pradhan.
      </Marquee>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6 custom_font">
            <h3
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ReactTyped
                strings={["LATEST BOOKS"]}
                typeSpeed={30}
                showCursor={false}
              />
            </h3>
            <Crousal link="/global/getLatestTenBooks" />
          </div>
          <div className="col-md-6 custom_font">
            <h3
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ReactTyped
                strings={["TOP BOOKS"]}
                typeSpeed={30}
                showCursor={false}
              />
            </h3>
            <Crousal link="/global/getLatestTenBooks" />
          </div>
        </div>
        <section>
          <div className="row">
            <div className="col-md-6">
              <img
                width="640"
                height="640"
                src={library}
                alt="not found"
                sizes="(max-width: 1000px) 100vw, 1000px"
              />
            </div>
            <div className="col-md-6 typed_content">
              <div className="mt-5">
                <ReactTyped
                  strings={[
                    "A library management system (LMS) automates library operations like cataloging, circulation, and patron management. It organizes inventory, facilitates borrowing, and tracks due dates. LMS offers search capabilities for users, generates reports for librarians, and integrates with digital resources. It manages acquisitions, budgets, and adheres to industry standards. Customizable and scalable, LMS caters to various library types and ensures accessibility and a seamless user experience.",
                  ]}
                  typeSpeed={30}
                  loop
                  showCursor={false}
                />
              </div>
            </div>
          </div>
        </section>
        <div>
          <img
            width="1000"
            height="575"
            src={library2}
            alt="not found"
            sizes="(max-width: 1000px) 100vw, 1000px"
          />
        </div>
      </div>
    </>
  );
};

export default Homepage;
