import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StudentContext } from "../../Store/User/StoreStudent";
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

  if (success) {
    navigate("/AdminDashboard");
  } else {
    seterror(message);
  }
};

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg p-4 w-100" style={{ maxWidth: "400px" }}>
        <h2 className="text-center text-success mb-4">Admin Sign In</h2>

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

          <button type="submit" className="btn btn-success w-100 mb-3 rounded-pill">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminSignIn;