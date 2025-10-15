import React, { useContext, useEffect, useState } from "react";
import { StudentContext } from "../../Store/User/StoreStudent";
import { AttendanceContext } from "../../Store/User/Attendance/Attendance";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button, Alert, Spinner } from "react-bootstrap";

export default function UserAttendancePage() {
  const { currentstudent, currentteacher } = useContext(StudentContext);
  const { successMsg, errorMsg, handleMarkAttendance, setSuccessMsg, setErrorMsg } =
    useContext(AttendanceContext);

  const navigate = useNavigate();
  const user = currentstudent || currentteacher;

  const [currentDateTime, setCurrentDateTime] = useState({ date: "", time: "", day: "" });

  // Live time update
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentDateTime({
        date: now.toLocaleDateString(),
        time: now.toLocaleTimeString(),
        day: now.toLocaleDateString("en-US", { weekday: "long" }),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Redirect to login if not logged in
  useEffect(() => {
    if (!user) {
      const timer = setTimeout(() => navigate("/"), 1000);
      return () => clearTimeout(timer);
    }
  }, [user, navigate]);

  // Redirect to home after marking attendance
  useEffect(() => {
    if (successMsg) {
      const timer = setTimeout(() => {
        setSuccessMsg("");
        navigate("/");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [successMsg, navigate, setSuccessMsg]);

  if (!user) {
    return (
      <Container className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <Card className="p-5 text-center shadow rounded-4">
          <Spinner animation="border" variant="primary" />
          <p className="mt-3 text-muted">Redirecting to Sign-in...</p>
        </Card>
      </Container>
    );
  }

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <Row className="w-100 justify-content-center">
        <Col md={6} lg={5}>
          <Card className="p-4 shadow-lg rounded-4 text-center">
            <h3 className="fw-bold mb-3 text-primary">Mark Attendance</h3>

            <div className="mb-3">
              <p className="mb-1 fw-semibold">
                📅 <strong>{currentDateTime.day}</strong>, {currentDateTime.date}
              </p>
              <p className="text-muted mb-0">⏰ {currentDateTime.time}</p>
            </div>

            <h5 className="mb-2">Welcome, {user.name} 👋</h5>
            <p className="text-muted mb-4">
              {currentstudent ? `Course: ${user.course || "N/A"}` : `Department: ${user.department || "N/A"}`}
            </p>

            {successMsg && <Alert variant="success">{successMsg}</Alert>}
            {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}

            <div className="d-flex gap-2 mt-3">
              {!successMsg && (
                <Button variant="success" size="lg" className="w-100" onClick={() => handleMarkAttendance({ ...user, userType: currentstudent ? "Student" : "Teacher" })}>
                  Mark My Attendance
                </Button>
              )}

              <Button variant="secondary" size="lg" className="w-100" onClick={() => navigate("/")}>
                ⬅ Back
              </Button>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
