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
// import StudentDashboard from "./Component/Factory/StudentFactory/StudentDashboard.jsx"; // exact path

function App() {
  return (
    <Routes>
      <Route path="/" element={<AdminSignIn/>}/>
      <Route path="/SignIn" element={<StudentSignIn />} />
      <Route path="/SignUp" element={<StudentSignUp />} />
      <Route path="/StudentDashboard" element={<StudentDashboard/>}/>
      <Route path="/StudentFeedback" element={<StudentFeedback/>}/>
      <Route path="/StudentResult" element={<StudentResult/>}/>
      <Route path="/TeacherSignIn" element={<TeacherSignIn/>}/>
      <Route path="/TeacherSignUp" element={<TeacherSignUp/>}/>
      <Route path="/AdminDashboard" element={<AdminDashboard/>}/>
    </Routes>
  );
}

export default App;
