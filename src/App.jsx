import { Routes, Route } from "react-router-dom";
import StudentSignIn from "./Component/User/StudentSignIn";
import StudentSignUp from "./Component/User/StudentSignUp";
import StudentDashboard from "./Component/Factory/StudantFactory/StudentDashboard";
import StudentFeedback from "./Component/Factory/StudantFactory/StudentFeedback";
import StudentResult from "./Component/Factory/StudantFactory/StudentResult";
import TeacherSignIn from "./Component/User/TeacherSignIn";
import TeacherSignUp from "./Component/User/TeacherSignUp";
import AdminSignIn from "./Component/User/AdminSignIn";
import AdminDashboard from "./Component/Factory/AdminFactory/AdminDashboard";
import HomePage from "./Component/Home/HomePage";
import TotalStudent from "./Component/Factory/StudantFactory/TotalStudent";
import TotalTeacher from "./Component/Factory/TeacherFactory/TotalTeacher";
import TotalSubject from "./Component/Factory/Subject/TotalSubject";
import TotalCourse from "./Component/Factory/Course/TotalCourse";
import AttendenceTeacherStudent from "./Component/Factory/AdminFactory/AttendenceTecherStudent";
import AttendanceSignin from "./Component/Attendance/AttendanceSignin";
import UserAttendancepage from "./Component/Attendance/UserAttendancepage";
import StudentAttendance from "./Component/Factory/StudantFactory/StudentAttendance";
// import Attendance from "./Component/Attendance/AttendanceSignin";

// import StudentDashboard from "./Component/Factory/StudentFactory/StudentDashboard.jsx"; // exact path

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/AdminSignIn" element={<AdminSignIn/>}/>
      <Route path="/StudentSignIn" element={<StudentSignIn />} />
      <Route path="/StudentSignUp" element={<StudentSignUp />} />
      <Route path="/StudentDashboard" element={<StudentDashboard/>}/>
      <Route path="/StudentFeedback" element={<StudentFeedback/>}/>
      <Route path="/StudentResult" element={<StudentResult/>}/>
      <Route path="/TeacherSignIn" element={<TeacherSignIn/>}/>
      <Route path="/TeacherSignUp" element={<TeacherSignUp/>}/>
      <Route path="/AdminDashboard" element={<AdminDashboard/>}/>
      <Route path="/TotalStudent" element={<TotalStudent/>}/>
       <Route path="/TotalTeacher" element={<TotalTeacher/>}/>
       <Route path="/TotalSubject" element={<TotalSubject/>}/>
       <Route path="/TotalCourse" element={<TotalCourse/>}/>
      <Route path="/AttendenceTeacherStudent" element={<AttendenceTeacherStudent/>}/>
      <Route path="/AttendanceSignin" element={<AttendanceSignin/>}/>UserAttendancepage
      <Route path="/UserAttendancepage" element={<UserAttendancepage/>}/>
      <Route path="/StudentAttendance" element={<StudentAttendance/>}/>
    </Routes>
  );
}

export default App;
