import React from "react";
import { Route, Routes } from "react-router-dom";

import AddTeacher from "./Components/Admin/AddTeacher";
import AdminDashboard from "./Components/Admin/AdminDashboard";
import DeleteTeacher from "./Components/Admin/DeleteTeacher";
import ViewAllStudentsFromAdmin from "./Components/Admin/ViewAllStudentsFromAdmin";
import ViewAllTeachers from "./Components/Admin/ViewAllTeachers";
import Footer from "./Components/Footer";
import Homepage from "./Components/Homepage";
import Login from "./Components/Login";
import Navbar from "./Components/Navbar";
import StudentDashBoard from "./Components/Student/StudentDashBoard";
import ViewAllBooksTakenByAStudentUsingUsername from './Components/Student/ViewAllBooksTakenByAStudentUsingUsername';
import AddBook from "./Components/Teacher/AddBook";
import AddStudent from "./Components/Teacher/AddStudent";
import AllocateBook from "./Components/Teacher/AllocateBook";
import BookSelection from "./Components/Teacher/BookSelection";
import DeallocateBook from "./Components/Teacher/DeallocateBook";
import ExtendAllocateDate from "./Components/Teacher/ExtendAllocateDate";
import RemoveBookByBookId from "./Components/Teacher/RemoveBookByBookId";
import RemoveStudentById from "./Components/Teacher/RemoveStudentById";
import TeacherDashboard from "./Components/Teacher/TeacherDashboard";
import ViewAllBooks from "./Components/Teacher/ViewAllBooks";
import ViewAllBooksTakenByAStudent from "./Components/Teacher/ViewAllBooksTakenByAStudent.jsx";
import ViewAllStudents from "./Components/Teacher/ViewAllStudents";
import ViewAllStudentsWhoTakenABook from "./Components/Teacher/ViewAllStudentsWhoTakenABook";
import PageNotFound from "./PageNotFound";

localStorage.setItem("username", "");
localStorage.setItem("jwtToken", "");
localStorage.setItem("roles", "");
localStorage.setItem("isLoggedIn", false);

const Navigation = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/addteacher" element={<AddTeacher />} />
        <Route
          path="/deleteteacher/:teacherEmail"
          element={<DeleteTeacher />}
        />
        <Route path="/viewallteachers" element={<ViewAllTeachers />} />
        <Route path="/viewallstudents" element={<ViewAllStudents />} />
        <Route
          path="/viewallstudentsfromadmin"
          element={<ViewAllStudentsFromAdmin />}
        />
        <Route path="/teacherdashboard" element={<TeacherDashboard />} />
        <Route path="/addstudent" element={<AddStudent />} />
        <Route path="/addbook" element={<AddBook />} />
        <Route path="/viewallbooks" element={<ViewAllBooks />} />
        <Route
          path="/viewallbookstakenbyastudent/:studentId/:studentEmail"
          element={<ViewAllBooksTakenByAStudent />}
        />

        <Route
          path="/viewallstudentswhotakenabook/:bookId/:bookName"
          element={<ViewAllStudentsWhoTakenABook />}
        />

        <Route
          path="/removestudentbyid/:idOfStudent"
          element={<RemoveStudentById />}
        />
        <Route
          path="/removebookbybookid/:bookId"
          element={<RemoveBookByBookId />}
        />
        <Route
          path="/allocatebook/:bookId/:studentId"
          element={<AllocateBook />}
        />
        <Route
          path="/bookselection/:studentId/:studentEmail"
          element={<BookSelection />}
        />
        <Route
          path="/deallocatebook/:bookId/:studentId"
          element={<DeallocateBook />}
        />
        <Route
          path="/extendallocatedate/:bookId/:studentId"
          element={<ExtendAllocateDate />}
        />
        <Route path="/studentdashboard" element={<StudentDashBoard />} />
        <Route
          path="/viewallbookstakenbyastudentusingusername"
          element={<ViewAllBooksTakenByAStudentUsingUsername />}
        />
      </Routes>
      <Footer />
    </>
  );
};

export default Navigation;
