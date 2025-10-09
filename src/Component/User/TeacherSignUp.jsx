import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StudentContext } from "../../Store/User/StoreStudent";
import { Row, Col, Button } from "react-bootstrap";

function TeacherSignUp() {
  const navigate = useNavigate();
  const { HandleTeacherSignUp, error } = useContext(StudentContext);
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [pass, setpass] = useState("");
  const [department, setdepartment] = useState("");
  const [designation, setdesignation] = useState("");
  const [qualification, setqualification] = useState("");

  const handleTeacherSignUp = (e) => {
    e.preventDefault();
    const success = HandleTeacherSignUp({ name, email, pass, department, designation, qualification });
    if (success) {
      setname(""); setemail(""); setpass(""); setdepartment(""); setdesignation(""); setqualification("");
      navigate("/AdminDashboard");
    }
    if (!email.endsWith("@gmail.com")) {
    alert("Only Gmail addresses allowed!");
    return;
  }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100" style={{ background: "linear-gradient(135deg, rgba(106,17,203,0.9), rgba(37,117,252,0.9))" }}>
      <div className="bg-white rounded-4 shadow-lg p-4 p-md-5" style={{ width: "100%", maxWidth: "600px" }}>
        <h2 className="text-center mb-4 fw-bold text-success">Teacher Sign Up</h2>

        <form onSubmit={handleTeacherSignUp}>
          {error && <div className="alert alert-danger text-center py-2">{error}</div>}

          <div className="mb-3">
            <label className="form-label fw-semibold">Full Name</label>
            <input type="text" className="form-control form-control-lg" value={name} onChange={(e) => setname(e.target.value)} placeholder="Enter full name" required />
          </div>

          {/* Email + Password in one row */}
          <Row className="mb-3">
            <Col md={6} className="mb-3 mb-md-0">
              <label className="form-label fw-semibold">Email</label>
              <input type="email" className="form-control form-control-lg" value={email} onChange={(e) => setemail(e.target.value)} placeholder="Enter email" pattern="[a-zA-Z0-9._%+-]+@gmail\.com"
    required />
            </Col>
            <Col md={6}>
              <label className="form-label fw-semibold">Password</label>
              <input type="password" className="form-control form-control-lg" value={pass} onChange={(e) => setpass(e.target.value)} placeholder="Enter password" required />
            </Col>
          </Row>

          {/* Department + Designation in one row */}
          <Row className="mb-3">
            <Col md={6} className="mb-3 mb-md-0">
              <label className="form-label fw-semibold">Department / Subject</label>
              <input type="text" className="form-control form-control-lg" value={department} onChange={(e) => setdepartment(e.target.value)} placeholder="Enter department" required />
            </Col>
            <Col md={6}>
              <label className="form-label fw-semibold">Designation / Role</label>
              <input type="text" className="form-control form-control-lg" value={designation} onChange={(e) => setdesignation(e.target.value)} placeholder="Enter designation" required />
            </Col>
          </Row>

          {/* Qualification single row */}
          <div className="mb-4">
            <label className="form-label fw-semibold">Qualification</label>
            <input type="text" className="form-control form-control-lg" value={qualification} onChange={(e) => setqualification(e.target.value)} placeholder="Enter qualification" required />
          </div>

          <button type="submit" className="btn btn-success btn-lg w-100 rounded-pill fw-semibold mb-3">Sign Up</button>

          <div className="text-center">
            Already have an account?{" "}
            <button type="button" className="btn btn-link fw-semibold text-success p-0" onClick={() => navigate("/TeacherSignIn")}>
              Sign In
            </button>
          </div>
        </form>
         <Button variant="secondary"className="btn  w-100 mb-3 rounded-pill" onClick={()=>navigate(-1)}>
            ⬅ Back
          </Button>
      </div>
    </div>
  );
}

export default TeacherSignUp;
