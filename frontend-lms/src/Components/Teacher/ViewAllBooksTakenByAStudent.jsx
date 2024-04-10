import axios from "axios";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import * as Yup from "yup";
import LmsTable from "../LmsTable";

const accessorData = [
  {
    accessorKey: "studentBookId",
    header: "ID",
    size: 150,
  },
  {
    accessorKey: "bookTaken.bookName",
    header: "BOOK NAME",
    size: 150,
  },
  {
    accessorKey: "bookAllocationDate",
    header: "BOOK ALLOCATION DATE",
    size: 150,
  },
  {
    accessorKey: "bookAllocationEndDate",
    header: "BOOK ALLOCATION END DATE",
    size: 150,
  },
];

const ViewAllBooksTakenByAStudent = () => {
  const [studentData, setStudentData] = useState([]);
  const [apiData, setApiData] = useState("");
  const [showLmsTable, setShowLmsTable] = useState(false);
  const changeInResponse = null;

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await axios.get("teacher/getAllStudents");
        setStudentData(response.data);
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };
    fetchStudentData();
  }, []);
  const initialValues = {
    studentId: "",
  };
  const validationSchema = Yup.object().shape({
    studentId: Yup.number().required("Student Id Required"),
  });
  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    console.log(values);
    setApiData(
      "/teacher/getAllBooksAllocatedToAStudent/" + Number(values.studentId)
    );
    console.log(apiData);
    setShowLmsTable(true);

    setSubmitting(false);
  };
  return (
    <>
      <div className="delete_teacher">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div className="custom_font">
            <h1>VIEW ALL BOOKS TAKEN BY A STUDENT</h1>
          </div>
          <NavLink
            type="button"
            className="btn btn-warning"
            to="/viewallstudents"
          >
            VIEW ALL STUDENTS
          </NavLink>
        </div>
        <br />
        <br />

        <div className="event-booking-container">
          <div id="login">
            <div className="container">
              <div
                id="login-row"
                className="row justify-content-center align-items-center"
              >
                <div id="login-column" className="col-md-6">
                  <div id="login-box" className="col-md-12">
                    <Formik
                      initialValues={initialValues}
                      validationSchema={validationSchema}
                      onSubmit={onSubmit}
                    >
                      {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                        resetForm,
                      }) => (
                        <form autoComplete="off" onSubmit={handleSubmit}>
                          <div className="form-group">
                            <label
                              htmlFor="studentId"
                              className="text-dark custom_font"
                            >
                              STUDENT ID:
                            </label>
                            <br />
                            <input
                              type="text"
                              className="form-control input_font"
                              name="studentId"
                              value={values.studentId}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            {studentData.map((student) => {
                              return student.studentId ===
                                Number(values.studentId) ? (
                                <span
                                  className="showbooks"
                                  key={student.studentId}
                                >
                                  {student.studentEmail}
                                </span>
                              ) : null;
                            })}
                            {touched.studentId && errors.studentId && (
                              <span className="errors">{errors.studentId}</span>
                            )}
                          </div>
                          <div className="form-group">
                            <br />
                            <div
                              style={{
                                alignItems: "center",
                                textAlign: "center",
                              }}
                            >
                              <button
                                type="submit"
                                className="btn btn-warning btn-md"
                                disabled={isSubmitting}
                              >
                                {isSubmitting ? "Viewing..." : "VIEW"}
                              </button>
                            </div>
                          </div>
                        </form>
                      )}
                    </Formik>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {showLmsTable ? (
          <>
            <br />
            <LmsTable
              apiData={apiData}
              accessorData={accessorData}
              changeInResponse={changeInResponse}
            />
          </>
        ) : null}
      </div>
    </>
  );
};

export default ViewAllBooksTakenByAStudent;
