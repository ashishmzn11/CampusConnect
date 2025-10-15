import React, { useContext, useState, useEffect } from "react";
// import { StudentContext } from "../Store/User/StoreStudent";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap";
import { StudentContext } from "../../Store/User/StoreStudent";

export default function AttendanceSignin() {
  const {
    HandleStudentSignIn,
    HandleTeacherSignIn,
    currentstudent,
    currentteacher,
    error,
  } = useContext(StudentContext);

  const navigate = useNavigate();
  const [userType, setUserType] = useState("student");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [localError, setLocalError] = useState("");

  // 🚀 Auto Redirect if already logged in
  useEffect(() => {
    if (currentstudent) {
      navigate("/AttendanceSignin");
    } else if (currentteacher) {
      navigate("/AttendanceSignin");
    }
  }, [currentstudent, currentteacher, navigate]);

  // 🧠 Handle login submit
  const handleSubmit = (e) => {
    e.preventDefault();
    let success = false;

    if (userType === "student") {
      success = HandleStudentSignIn({ email, pass });
      if (success) navigate("/UserAttendancepage");
    } else {
      success = HandleTeacherSignIn({ email, pass });
      if (success) navigate("/UserAttendancepage");
    }

    if (!success) {
      setLocalError("Invalid email or password. Please try again.");
    } else {
      setLocalError("");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <Row className="w-100 justify-content-center">
        <Col md={6} lg={5}>
          <Card className="p-4 shadow-lg rounded-4">
            <h3 className="text-center mb-4 fw-bold">Sign In</h3>

            {/* User Type Switch */}
            <Form.Group className="mb-3 text-center">
              <Form.Label className="fw-semibold">Login as:</Form.Label>
              <div className="d-flex justify-content-center gap-3 mt-2">
                <Form.Check
                  inline
                  label="Student"
                  name="userType"
                  type="radio"
                  id="student"
                  checked={userType === "student"}
                  onChange={() => setUserType("student")}
                />
                <Form.Check
                  inline
                  label="Teacher"
                  name="userType"
                  type="radio"
                  id="teacher"
                  checked={userType === "teacher"}
                  onChange={() => setUserType("teacher")}
                />
              </div>
            </Form.Group>

            {/* Error Handling */}
            {(error || localError) && (
              <Alert variant="danger" className="py-2 text-center">
                {error || localError}
              </Alert>
            )}

            {/* Form */}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100 fw-semibold">
                Sign In
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
