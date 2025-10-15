// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
// import { UserProvider } from "./Store/User/Student.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import { StudentProvider } from "./Store/User/StoreStudent.jsx";
import { AttendanceProvider } from "./Store/User/Attendance/Attendance.jsx";


ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
  <StudentProvider>
    <AttendanceProvider>
    <App/>
    </AttendanceProvider>
  </StudentProvider>
    
  </BrowserRouter>
);
