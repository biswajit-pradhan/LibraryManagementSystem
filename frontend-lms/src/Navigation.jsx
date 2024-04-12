import React from "react";
import { Route, Routes } from "react-router-dom";

import AddTeacher from "./Components/Admin/AddTeacher";
import AdminDashboard from "./Components/Admin/AdminDashboard";
import DeleteTeacher from "./Components/Admin/DeleteTeacher";
import ViewAllStudents from "./Components/Admin/ViewAllStudents";
import ViewAllTeachers from "./Components/Admin/ViewAllTeachers";
import Footer from "./Components/Footer";
import Homepage from "./Components/Homepage";
import Login from "./Components/Login";
import Navbar from "./Components/Navbar";
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
import PageNotFound from "./PageNotFound";

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
        <Route path="/deleteteacher" element={<DeleteTeacher />} />
        <Route path="/viewallteachers" element={<ViewAllTeachers />} />
        <Route path="/viewallstudents" element={<ViewAllStudents />} />
        <Route path="/teacherdashboard" element={<TeacherDashboard />} />
        <Route path="/addstudent" element={<AddStudent />} />
        <Route path="/addbook" element={<AddBook />} />
        <Route path="/viewallbooks" element={<ViewAllBooks />} />
        <Route
          path="/viewallbookstakenbyastudent/:studentId/:studentEmail"
          element={<ViewAllBooksTakenByAStudent />}
        />

        <Route
          path="/removestudentbyid/:idOfStudent"
          element={<RemoveStudentById />}
        />
        <Route path="/removebookbybookid" element={<RemoveBookByBookId />} />
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
        <Route path="/extendallocatedate" element={<ExtendAllocateDate />} />
      </Routes>
      <Footer />
    </>
  );
};

export default Navigation;
