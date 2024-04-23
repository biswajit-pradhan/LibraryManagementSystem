import axios from "axios";
import { Formik } from "formik";
import React from "react";
import { useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";

const DeleteTeacher = () => {
  const jwtToken = useSelector((state) => state.auth.jwtToken);
  const { teacherEmail } = useParams();
  const initialValues = {
    teacherEmail: teacherEmail,
  };
  const validationSchema = Yup.object().shape({
    teacherEmail: Yup.string()
      .email("Invalid email address")
      .required("Email address Required"),
  });
  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    const config = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };
    try {
      const response = await axios.delete(
        "/admin/deleteTeacherByTeacherEmail",
        {
          ...config,
          data: values.teacherEmail,
        }
      );
      console.log(response.data.teacherEmail);
      toast.success("Teacher deleted successfully!!");
      values.teacherEmail = "";
      resetForm();
    } catch (error) {
      toast.error(error.response.data);
    } finally {
      setSubmitting(false);
    }
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
            <h1>DELETE TEACHER</h1>
          </div>
          <NavLink type="button" className="btn btn-success" to="/addteacher">
            ADD TEACHER
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
                      DELETE TEACHER
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
                              htmlFor="teacherEmail"
                              className="text-dark custom_font"
                            >
                              TEACHER EMAIL:
                            </label>
                            <br />
                            <input
                              type="email"
                              className="form-control input_font"
                              name="teacherEmail"
                              value={values.teacherEmail}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            {touched.teacherEmail && errors.teacherEmail && (
                              <span className="errors">
                                {errors.teacherEmail}
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
                                  ? "Deleting..."
                                  : "DELETE TEACHER"}
                              </button>
                              <br />
                              <br />
                              <NavLink
                                type="button"
                                className="btn btn-warning"
                                to="/viewallteachers"
                              >
                                VIEW ALL TEACHERS
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

export default DeleteTeacher;
