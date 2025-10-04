import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StudentContext, StudentProvider } from "../../Store/User/StoreStudent";

function StudentSignUp(){
  const navigate=useNavigate();
  const {HandleStudentSignUp,error}=useContext(StudentContext);

  const [name,setname]=useState("");
  const [email,setemail]=useState("");
  const [pass,setpass]=useState("");
  const [course,setcourse]=useState("");

  const handleStudentSignUp=(e)=>{
      e.preventDefault();
    const success=HandleStudentSignUp({name,email,pass,course})
  if (success){
     setname("");
    setemail("");
    setpass("");
    setcourse("");
    navigate("/")
  }
   
  }
  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ background: "linear-gradient(to right, #6a11cb, #2575fc)" }}>
      <div className="card p-4 shadow" style={{ width: "100%", maxWidth: "400px", borderRadius: "15px" }}>
        <h2 className="text-center mb-4" style={{ color: "#2575fc" }}>Student Signup</h2>
        <form onSubmit={handleStudentSignUp}>
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input type="text" className="form-control" name="name" value={name} onChange={(e)=>setname(e.target.value)} placeholder="Enter your full name" required />
          </div>
          {error?{}:<div className="mb-3">
            <label className="form-label">Email address</label>
            <input type="email" className="form-control" name="email" value={email} onChange={(e)=>setemail(e.target.value)} placeholder="Enter your email" required />
          </div>}

          

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control"value={pass} onChange={(e)=>setpass(e.target.value)} name="password"placeholder="Enter your password" required />
          </div>

          <div className="mb-3">
            <label className="form-label">Select Course</label>
            <select className="form-select" name="course" value={course} onChange={(e)=>setcourse(e.target.value)} required>
              <option value="">Select a course</option>
              <option value="bca">BCA</option>
              <option value="bsc">BSc</option>
              <option value="bcom">BCom</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary w-100 py-2" style={{ borderRadius: "50px" }}>Sign Up</button>

          <p className="text-center mt-3">
            Already have an account? <a href="#" style={{ color: "#2575fc", fontWeight: "500" }}onClick={()=>navigate("/")}>Login</a>
          </p>
        </form>
      </div>
    </div>
  );
}
export default StudentSignUp;