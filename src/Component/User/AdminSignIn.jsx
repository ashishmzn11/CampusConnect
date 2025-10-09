import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StudentContext } from "../../Store/User/StoreStudent";
import { Button } from "react-bootstrap";
// import { TeacherContext } from "../../Store/User/StoreTeacher"; // Assume TeacherContext exists

function AdminSignIn() {
  const navigate = useNavigate();
  const { HandleAdminSignIn, message } = useContext(StudentContext);
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [pass, setpass] = useState("");
  const [error,seterror]=useState("");

  const handleAdminSignIn = (e) => {
  e.preventDefault();
  const { success, message } = HandleAdminSignIn(email, pass);
if (!email.endsWith("@gmail.com")) {
    alert("Only Gmail addresses allowed!");
    return;
  }
  if (success) {
    navigate("/AdminDashboard");
  } else {
    seterror(message);
  }
};

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ background: "linear-gradient(to right, #6a11cb, #2575fc)" }}>
      <div className="card p-4 shadow" style={{ width: "100%", maxWidth: "400px", borderRadius: "15px" }}>
        <h2 className="text-center mb-4" style={{ color: "#2575fc" }}>AdminSign In</h2>

        <form onSubmit={handleAdminSignIn}>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setname(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              pattern="[a-zA-Z0-9._%+-]+@gmail\.com"
    required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              value={pass}
              onChange={(e) => setpass(e.target.value)}
              required
            />
          </div>

          {error && <div className="alert alert-danger">{error}</div>}

          <button type="submit" className="btn btn-primary w-100 mb-3 rounded-pill">
            Sign In
          </button>
          
        </form>
         <Button variant="secondary"className="btn  w-100 mb-3 rounded-pill" onClick={()=>navigate(-1)}>
            ⬅ Back
          </Button>
      </div>
     
    </div>
  );
}

export default AdminSignIn;