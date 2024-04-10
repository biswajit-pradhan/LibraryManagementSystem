import axios from "axios";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import * as Yup from "yup";

const RemoveBookByBookId = () => {
  const [bookData, setBookData] = useState([]);
  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const response = await axios.get("/teacher/getAllBooks");
        setBookData(response.data);
      } catch (error) {
        console.error("Error fetching book data:", error);
      }
    };

    fetchBookData();
  }, []);
  const initialValues = {
    bookId: "",
  };
  const validationSchema = Yup.object().shape({
    bookId: Yup.number().required("Book Id Required"),
  });
  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    console.log(values);
    try {
      const response = await axios.delete(
        "/teacher/deleteBookByBookId/" + values.bookId
      );
      console.log(response.data);
      toast.success("Book deleted successfully!!");
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
            <h1>REMOVE BOOK BY BOOK ID</h1>
          </div>
          <NavLink type="button" className="btn btn-success" to="/addbook">
            ADD BOOK
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
                      REMOVE BOOK BY BOOK ID
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
                              return book.bookId === Number(values.bookId) ? (
                                <span className="showbooks">
                                  {book.bookName}
                                </span>
                              ) : null;
                            })}
                            {touched.bookId && errors.bookId && (
                              <span className="errors">{errors.bookId}</span>
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
                                {isSubmitting ? "Removing..." : "REMOVE BOOK"}
                              </button>
                              <br />
                              <br />
                              <NavLink
                                type="button"
                                className="btn btn-warning"
                                to="/viewallbooks"
                              >
                                VIEW ALL BOOKS
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

export default RemoveBookByBookId;
