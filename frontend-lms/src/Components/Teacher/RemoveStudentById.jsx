import axios from "axios";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { NavLink, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";

const RemoveStudentById = () => {
  const jwtToken = useSelector((state) => state.auth.jwtToken);
  const { idOfStudent } = useParams();
  const [studentData, setStudentData] = useState([]);
  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        };
        const response = await axios.get("/teacher/getAllStudents", config);
        setStudentData(response.data);
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };
    fetchStudentData();
  }, []);
  const initialValues = {
    studentId: idOfStudent,
  };
  const validationSchema = Yup.object().shape({
    studentId: Yup.number().required("Student Id Required"),
  });
  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    console.log(values);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      };
      const response = await axios.delete(
        "/teacher/deleteStudentByStudentId/" + values.studentId, config
      );
      console.log(response.data);
      toast.success("Student deleted successfully!!");
      values.studentId = "";
      resetForm();
    } catch (error) {
      toast.error(error.response.data);
    }
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
            <h1>REMOVE STUDENT</h1>
          </div>
          <NavLink type="button" className="btn btn-success" to="/addstudent">
            ADD STUDENT
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
                    <h3 className="text-center text-dark custom_font">
                      REMOVE STUDENT BY ID
                    </h3>
                    <br />
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
                                className="btn btn-danger btn-md"
                                disabled={isSubmitting}
                              >
                                {isSubmitting
                                  ? "Removing..."
                                  : "REMOVE STUDENT"}
                              </button>
                              <br />
                              <br />
                              <NavLink
                                type="button"
                                className="btn btn-warning"
                                to="/viewallstudents"
                              >
                                VIEW ALL STUDENTS
                              </NavLink>
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
      </div>
    </>
  );
};

export default RemoveStudentById;
