import axios from "axios";
import { Formik } from "formik";
import { useState } from "react";
import { useSelector } from 'react-redux';
import { NavLink, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";

const DeallocateBook = () => {
  const jwtToken = useSelector((state) => state.auth.jwtToken);
  const [bookData, setBookData] = useState([]);
  const [studentData, setStudentData] = useState([]);
  const { bookId, studentId } = useParams();

  const initialValues = {
    bookId: bookId,
    studentId: studentId,
  };

  const validationSchema = Yup.object().shape({
    bookId: Yup.number().required("Book Id Required"),
    studentId: Yup.number().required("Student Id Required"),
  });

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      };
      const response = await axios.put(
        "/teacher/deallocateBookFromAStudent/" +
        values.bookId +
        "/" +
        values.studentId, null,
        config
      );
      console.log(response.data);
      toast.success("Book deallocated successfully!!");
      values.bookId = "";
      values.studentId = "";
      resetForm();
    } catch (error) {
      toast.error(error.response.data);
    }
    setSubmitting(false);
  };

  return (
    <>

      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h1 className="custom_font">DEALLOCATE BOOK FROM A STUDENT</h1>
        </div>
        <div>
          <div className="teacher_container">
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
                          DEALLOCATE BOOK FROM A STUDENT
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
                                  htmlFor="bookId"
                                  className="text-dark custom_font"
                                >
                                  BOOK ID:
                                </label>
                                <br />
                                <input
                                  type="text"
                                  className="form-control input_font"
                                  name="bookId"
                                  value={values.bookId}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                                {bookData.map((book) => {
                                  return book.bookId ===
                                    Number(values.bookId) ? (
                                    <span className="showbooks">
                                      {book.bookName}
                                    </span>
                                  ) : null;
                                })}
                                {touched.bookId && errors.bookId && (
                                  <span className="errors">
                                    {errors.bookId}
                                  </span>
                                )}
                              </div>
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
                                    <span className="showbooks">
                                      {student.studentEmail}
                                    </span>
                                  ) : null;
                                })}
                                {touched.studentId && errors.studentId && (
                                  <span className="errors">
                                    {errors.studentId}
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
                                    className="btn btn-info btn-md"
                                    disabled={isSubmitting}
                                  >
                                    {isSubmitting
                                      ? "Deallocating..."
                                      : "DEALLOCATE BOOK"}
                                  </button>
                                  <br />
                                  <br />
                                  <div className="row">
                                    <div className="col-md-6">
                                      <NavLink
                                        type="button"
                                        className="btn btn-warning"
                                        to="/viewallbooks"
                                      >
                                        VIEW ALL BOOKS
                                      </NavLink>
                                    </div>
                                    <div className="col-md-6">
                                      <NavLink
                                        type="button"
                                        className="btn btn-warning"
                                        to="/viewallstudents"
                                      >
                                        VIEW ALL STUDENTS
                                      </NavLink>
                                    </div>
                                  </div>
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
        </div>
      </div>
    </>
  );
};

export default DeallocateBook;
