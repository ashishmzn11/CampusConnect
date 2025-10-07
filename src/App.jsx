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
      
    </Routes>
  );
}

export default App;
