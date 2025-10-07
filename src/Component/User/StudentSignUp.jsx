import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StudentContext } from "../../Store/User/StoreStudent";
import { Row, Col } from "react-bootstrap";

function StudentSignUp() {
  const navigate = useNavigate();
  const { HandleStudentSignUp, error } = useContext(StudentContext);

  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [pass, setpass] = useState("");
  const [course, setcourse] = useState("");
  const [year, setyear] = useState("");
  const [batch, setbatch] = useState("");

  const handleStudentSignUp = (e) => {
    e.preventDefault();
    if (!email.endsWith("@gmail.com")) {
    alert("Only Gmail addresses allowed!");
    return;
  }
    const success = HandleStudentSignUp({ name, email, pass, course, year, batch });
    if (success) {
      setname("");
      setemail("");
      setpass("");
      setcourse("");
      setyear("");
      setbatch("");
      navigate("/StudentSignIn");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center min-vh-100"
      style={{
        background:
          "linear-gradient(135deg, rgba(106,17,203,0.9), rgba(37,117,252,0.9))",
      }}
    >
      <div
        className="bg-white rounded-4 shadow-lg p-4 p-md-5"
        style={{ width: "100%", maxWidth: "600px" }}
      >
        {/* Header */}
        <h2 className="text-center mb-4 fw-bold text-primary">Student Sign Up</h2>

        {/* Form */}
        <form onSubmit={handleStudentSignUp}>
          {error && (
            <div className="alert alert-danger text-center py-2">{error}</div>
          )}

          {/* Full name single row */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Full Name</label>
            <input
              type="text"
              className="form-control form-control-lg"
              value={name}
              onChange={(e) => setname(e.target.value)}
              placeholder="Enter your full name"
              required
            />
          </div>

          {/* Email + Password in one row */}
          <Row className="mb-3">
            <Col md={6} className="mb-3 mb-md-0">
              <label className="form-label fw-semibold">Email</label>
              <input
                type="email"
                className="form-control form-control-lg"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                placeholder="Enter email"
                pattern="[a-zA-Z0-9._%+-]+@gmail\.com"
    required
              />
            </Col>
            <Col md={6}>
              <label className="form-label fw-semibold">Password</label>
              <input
                type="password"
                className="form-control form-control-lg"
                value={pass}
                onChange={(e) => setpass(e.target.value)}
                placeholder="Enter password"
                required
              />
            </Col>
          </Row>

          {/* Course + Year in one row */}
          <Row className="mb-3">
            <Col md={6} className="mb-3 mb-md-0">
              <label className="form-label fw-semibold">Select Course</label>
              <select
                className="form-select form-select-lg"
                value={course}
                onChange={(e) => setcourse(e.target.value)}
                required
              >
                <option value="">Select a course</option>
                <option value="bca">BCA</option>
                <option value="bsc">B.Sc</option>
                <option value="bcom">B.Com</option>
              </select>
            </Col>
            <Col md={6}>
              <label className="form-label fw-semibold">Year</label>
              <input
                type="text"
                className="form-control form-control-lg"
                value={year}
                onChange={(e) => setyear(e.target.value)}
                placeholder="Enter year"
                required
              />
            </Col>
          </Row>

          {/* Batch single row */}
          <div className="mb-4">
            <label className="form-label fw-semibold">Batch</label>
            <input
              type="text"
              className="form-control form-control-lg"
              value={batch}
              onChange={(e) => setbatch(e.target.value)}
              placeholder="Enter batch"
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-lg w-100 rounded-pill fw-semibold"
          >
            Sign Up
          </button>

          <div className="text-center mt-3">
            <span className="text-muted">Already have an account?</span>{" "}
            <button
              type="button"
              className="btn btn-link fw-semibold text-primary p-0"
              onClick={() => navigate("/StudentSignIn")}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StudentSignUp;
