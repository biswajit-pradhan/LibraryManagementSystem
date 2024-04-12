import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Formik } from "formik";
import * as Yup from "yup";
import { NavLink } from "react-router-dom";

const AddBook = () => {
  const initialValues = {
    bookName: "",
    totalAvailability: "",
    bookLink: "",
    isbnNo: "",
  };

  const validationSchema = Yup.object().shape({
    bookName: Yup.string().required("Book Name Required"),
    totalAvailability: Yup.number().required("Total Availability Required"),
    bookLink: Yup.string().required("Book Link Required"),
    isbnNo: Yup.string().required("ISBN Number Required"),
  });

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await axios.post("/teacher/addBook", values);
      console.log(response.data.bookName);
      toast.success("Book added successfully!!");
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
      <div>
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
                          ADD BOOK
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
                              <div className="form-group col-md-12">
                                <label
                                  htmlFor="bookName"
                                  className="text-dark custom_font"
                                >
                                  BOOK NAME:
                                </label>
                                <br />
                                <input
                                  type="text"
                                  className="form-control input_font"
                                  name="bookName"
                                  value={values.bookName}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                                {touched.bookName && errors.bookName && (
                                  <span className="errors">
                                    {errors.bookName}
                                  </span>
                                )}
                              </div>
                              <div className="row">
                                <div className="form-group col-md-6">
                                  <label
                                    htmlFor="totalAvailability"
                                    className="text-dark custom_font"
                                  >
                                    TOTAL BOOKS:
                                  </label>
                                  <br />
                                  <input
                                    type="number"
                                    className="form-control input_font"
                                    name="totalAvailability"
                                    value={values.totalAvailability}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                  />
                                  {touched.totalAvailability &&
                                    errors.totalAvailability && (
                                      <span className="errors">
                                        {errors.totalAvailability}
                                      </span>
                                    )}
                                </div>
                                <div className="form-group col-md-6">
                                  <label
                                    htmlFor="isbnNo"
                                    className="text-dark custom_font"
                                  >
                                    ISBN NO:
                                  </label>
                                  <br />
                                  <input
                                    type="text"
                                    className="form-control input_font"
                                    name="isbnNo"
                                    value={values.isbnNo}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                  />
                                  {touched.isbnNo && errors.isbnNo && (
                                    <span className="errors">
                                      {errors.isbnNo}
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className="form-group col-md-12">
                                <label
                                  htmlFor="bookLink"
                                  className="text-dark custom_font"
                                >
                                  BOOK IMAGE LINK:
                                </label>
                                <br />
                                <input
                                  type="text"
                                  className="form-control input_font"
                                  name="bookLink"
                                  value={values.bookLink}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                                {touched.bookLink && errors.bookLink && (
                                  <span className="errors">
                                    {errors.bookLink}
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
                                    {isSubmitting ? "Adding..." : "ADD BOOK"}
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
        </div>
      </div>
    </>
  );
};

export default AddBook;
