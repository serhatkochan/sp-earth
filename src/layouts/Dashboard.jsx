import React from "react";
import { Routes, Route } from "react-router-dom";
import StudentAdd from "../pages/Student/StudentAdd";
import StudentList from "../pages/Student/StudentList";
import StudentDetails from "../pages/Student/StudentDetails";
import Map from "./Map";

export default function Dashboard() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Map />} />
        <Route path="/students" element={<StudentList />} />
        <Route path="students/:studentId" element={<StudentDetails />} />;
        <Route path="/students/add" element={<StudentAdd />} />
      </Routes>
    </div>
  );
}
