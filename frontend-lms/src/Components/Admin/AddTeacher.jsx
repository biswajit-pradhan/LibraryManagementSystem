import axios from "axios";
import { Formik } from "formik";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";

const AddTeacher = () => {
  const jwtToken = useSelector((state) => state.auth.jwtToken);
  const initialValues = {
    teacherEmail: "",
    teacherPassword: "",
  };

  const validationSchema = Yup.object().shape({
    teacherEmail: Yup.string()
      .email("Invalid email address")
      .required("Email address Required"),
    teacherPassword: Yup.string().required("Password Required"),
  });

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      };

      const response = await axios.post("/admin/addTeacher", values, config);

      console.log(response.data.teacherEmail);
      toast.success("Teacher added successfully!!");
      resetForm();
    } catch (error) {
      toast.error(error.response.data);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
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
                          ADD TEACHER
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
                                {touched.teacherEmail &&
                                  errors.teacherEmail && (
                                    <span className="errors">
                                      {errors.teacherEmail}
                                    </span>
                                  )}
                              </div>
                              <div className="form-group">
                                <label
                                  htmlFor="teacherPassword"
                                  className="text-dark custom_font"
                                >
                                  TEACHER PASSWORD:
                                </label>
                                <br />
                                <input
                                  type="password"
                                  className="form-control input_font"
                                  name="teacherPassword"
                                  value={values.teacherPassword}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                                {touched.teacherPassword &&
                                  errors.teacherPassword && (
                                    <span className="errors">
                                      {errors.teacherPassword}
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
                                    {isSubmitting ? "Adding..." : "ADD TEACHER"}
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
        </div>
      </div>
    </>
  );
};

export default AddTeacher;
