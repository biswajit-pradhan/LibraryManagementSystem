import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Formik } from "formik";
import * as Yup from "yup";
import { NavLink } from "react-router-dom";

const AddStudent = () => {
  const initialValues = {
    studentEmail: "",
    studentPassword: "",
    booksTakenByStudent: null,
  };

  const validationSchema = Yup.object().shape({
    studentEmail: Yup.string()
      .email("Invalid email address")
      .required("Email address Required"),
    studentPassword: Yup.string().required("Password Required"),
  });

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await axios.post("/teacher/addStudent", values);
      console.log(response.data.studentEmail);
      toast.success("Student added successfully!!");
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
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h1 className="custom_font">ADD STUDENT</h1>
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
                          ADD STUDENT
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
                                {touched.studentEmail &&
                                  errors.studentEmail && (
                                    <span className="errors">
                                      {errors.studentEmail}
                                    </span>
                                  )}
                              </div>
                              <div className="form-group">
                                <label
                                  htmlFor="studentPassword"
                                  className="text-dark custom_font"
                                >
                                  STUDENT PASSWORD:
                                </label>
                                <br />
                                <input
                                  type="password"
                                  className="form-control input_font"
                                  name="studentPassword"
                                  value={values.studentPassword}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                                {touched.studentPassword &&
                                  errors.studentPassword && (
                                    <span className="errors">
                                      {errors.studentPassword}
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
                                    {isSubmitting ? "Adding..." : "ADD STUDENT"}
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
        </div>
      </div>
    </>
  );
};

export default AddStudent;
