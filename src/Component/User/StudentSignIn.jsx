import { useContext, useState } from "react";
// import { UserContext } from "../../Store/User/Student";
import { useNavigate } from "react-router-dom";

function StudentSignIn(){
  
  const navigate=useNavigate();
  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ background: "linear-gradient(to right, #6a11cb, #2575fc)" }}>
      <div className="card p-4 shadow" style={{ width: "100%", maxWidth: "400px", borderRadius: "15px" }}>
        <h2 className="text-center mb-4" style={{ color: "#2575fc" }}>Student SignIn</h2>
        <form >
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input type="text" className="form-control" name="name"  placeholder="Enter your full name" required />
          </div>

          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input type="email" className="form-control" name="email"  placeholder="Enter your email" required />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" name="password"placeholder="Enter your password" required />
          </div>

         
          <button type="submit" className="btn btn-primary w-100 py-2" style={{ borderRadius: "50px" }}>Sign In</button>

          <p className="text-center mt-3">
            Already have't an account? <a href="#" style={{ color: "#2575fc", fontWeight: "500" }} onClick={()=>navigate("/SignUp")}>SignUp</a>
          </p>
        </form>
      </div>
    </div>
  );
}
export default StudentSignIn;