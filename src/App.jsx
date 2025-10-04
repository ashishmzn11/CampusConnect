import { Routes, Route } from "react-router-dom";
import StudentSignIn from "./Component/User/StudentSignIn";
import StudentSignUp from "./Component/User/StudentSignUp";
import StudentDashboard from "./Component/Factory/StudantFactory/StudentDashboard";
import StudentFeedback from "./Component/Factory/StudantFactory/StudentFeedback";
// import StudentDashboard from "./Component/Factory/StudentFactory/StudentDashboard.jsx"; // exact path

function App() {
  return (
    <Routes>
      <Route path="/" element={<StudentSignIn />} />
      <Route path="/SignUp" element={<StudentSignUp />} />
      <Route path="/StudentDashboard" element={<StudentDashboard/>}/>
      <Route path="/StudentFeedback" element={<StudentFeedback/>}/>
    </Routes>
  );
}

export default App;
