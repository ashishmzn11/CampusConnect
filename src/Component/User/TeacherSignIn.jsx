import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StudentContext } from "../../Store/User/StoreStudent";
// import { TeacherContext } from "../../Store/User/StoreTeacher"; // Assume TeacherContext exists

function TeacherSignIn() {
  const navigate = useNavigate();
  const { HandleTeacherSignIn, error } = useContext(StudentContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const handleTeacherSignIn = (e) => {
    e.preventDefault();
    const success = HandleTeacherSignIn({ email, name, pass });
    if (success) {
      setName("");
      setEmail("");
      setPass("");
      navigate("/TeacherDashboard");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100" style={{ background: "linear-gradient(135deg, rgba(106,17,203,0.9), rgba(37,117,252,0.9))" }}>
      <div  className="bg-white rounded-4 shadow-lg p-4 p-md-5" style={{ width: "100%", maxWidth: "600px" }}>
        <h2 className="text-center text-success mb-4">Teacher Sign In</h2>

        <form onSubmit={handleTeacherSignIn}>
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

          {error && <div className="alert alert-danger">{error}</div>}

          <button type="submit" className="btn btn-success w-100 mb-3 rounded-pill">
            Sign In
          </button>

          <div className="text-center">
            Don't have an account?{" "}
            <button
              type="button"
              className="btn btn-link p-0"
              onClick={() => navigate("/TeacherSignUp")}
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TeacherSignIn;
