import axios from "axios";
import React from "react";
import { NavLink } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import * as Yup from "yup";
import { Formik } from "formik";

const RemoveStudentByEmail = () => {
  const initialValues = {
    studentEmail: "",
  };
  const validationSchema = Yup.object().shape({
    studentEmail: Yup.string()
      .email("Invalid email address")
      .required("Email address Required"),
  });
  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    console.log(values);
    try {
      const response = await axios.delete(
        "/teacher/deleteStudentByStudentEmail/" + values.studentEmail
      );
      console.log(response.data);
      toast.success("Student deleted successfully!!");
      resetForm();
    } catch (error) {
      toast.error(error.response.data);
    }
    setSubmitting(false);
  };
  return (
    <>
      <ToastContainer
        position="bottom-left"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="delete_teacher">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div className="custom_font">
            <h1>REMOVE STUDENT BY EMAIL</h1>
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
                      REMOVE STUDENT BY EMAIL
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
                        <form onSubmit={handleSubmit}>
                          <div className="form-group">
                            <label
                              htmlFor="studentEmail"
                              className="text-dark custom_font"
                            >
                              STUDENT EMAIL:
                            </label>
                            <br />
                            <input
                              type="email"
                              className="form-control input_font"
                              name="studentEmail"
                              value={values.studentEmail}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            {touched.studentEmail && errors.studentEmail && (
                              <span className="errors">
                                {errors.studentEmail}
                              </span>
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

export default RemoveStudentByEmail;
