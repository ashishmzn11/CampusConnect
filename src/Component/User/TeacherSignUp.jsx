import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StudentContext } from "../../Store/User/StoreStudent";
// import { TeacherContext } from "../../Store/User/StoreTeacher"; // Assume TeacherContext exists

function TeacherSignUp() {
  const navigate = useNavigate();
  const { HandleTeacherSignUp, error } = useContext(StudentContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const handleTeacherSignUp = (e) => {
    e.preventDefault();
    if (pass !== confirmPass) {
      alert("Password and Confirm Password must match!");
      return;
    }
    const success = HandleTeacherSignUp({ email, name, pass });
    if (success) {
      setName("");
      setEmail("");
      setPass("");
      setConfirmPass("");
      navigate("/TeacherDashboard");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg p-4 w-100" style={{ maxWidth: "450px" }}>
        <h2 className="text-center text-success mb-4">Teacher Sign Up</h2>

        <form onSubmit={handleTeacherSignUp}>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => setPass(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Confirm your password"
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
              required
            />
          </div>

          {error && <div className="alert alert-danger">{error}</div>}

          <button type="submit" className="btn btn-success w-100 mb-3 rounded-pill">
            Sign Up
          </button>

          <div className="text-center">
            Already have an account?{" "}
            <button
              type="button"
              className="btn btn-link p-0"
              onClick={() => navigate("/TeacherSignIn")}
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TeacherSignUp;
