import React from "react";
import { ReactTyped } from "react-typed";
import Marquee from "react-fast-marquee";

import library from "../Images/library.png";
import library2 from "../Images/library2.png";

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
                    "A library management system represents a pivotal tool in the modernization and optimization of library operations, integrating a multitude of functions to streamline processes and enhance user experiences. Through automation, it significantly reduces manual tasks associated with cataloging, circulation, patron management, and resource discovery, thereby allowing librarians to allocate their time more effectively towards providing personalized services and curating collections. By centralizing data and facilitating efficient access to resources, it empowers patrons to easily locate and borrow materials, whether physical or digital. Moreover, the system's reporting and analytics capabilities enable libraries to gain valuable insights into usage patterns, collection effectiveness, and operational efficiency, facilitating informed decision-making and strategic planning. Ultimately, a well-implemented library management system not only boosts organizational productivity but also fosters a more engaging and accessible environment for library users.",
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
