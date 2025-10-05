import React, { useContext, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { StudentContext } from "../../../Store/User/StoreStudent";
import Dropdown from "react-bootstrap/Dropdown";
import Nav from "react-bootstrap/Nav";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../../Css/StudentDashboard.css";
// for custom styles

const StudentDashboard = () => {
  const { currentstudent, HandleStudentLogout } = useContext(StudentContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!currentstudent) {
      navigate("/StudentDashboard");
    }
  }, [currentstudent, navigate]);
  return (
    <div className="dashboard d-flex">
      {/* Sidebar */}
      <div className="sidebar bg-dark text-white p-3">
        <h4 className="text-center mb-4">Apna college</h4>
        <ul className="nav flex-column">
          <li className="nav-item">
            <a href="#" className="nav-link text-white">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link text-white">
              View Attendance
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link text-white" onClick={() => navigate("/StudentResult")}>
              View Result
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link text-white">
              Apply for Leave
            </a>
          </li>
          <li className="nav-item">
            <a
              href="#"
              className="nav-link text-white"
              onClick={() => navigate("/StudentFeedback")}
            >
              Send Feedback
            </a>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="content flex-grow-1">
        <header className="header bg-light p-3 border-bottom d-flex justify-content-between align-items-center">
          <h5>Student Management System | Student Dashboard</h5>
          <div>
            {currentstudent ? (
              <Dropdown align="end" className="ms-3">
                <Dropdown.Toggle variant="outline-primary" id="dropdown-user">
                  {currentstudent.name.split("@")[0]} {/* username */}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item>View Profile</Dropdown.Item>
                  <Dropdown.Item>View Order</Dropdown.Item>
                  <Dropdown.Item onClick={HandleStudentLogout}>
                    Sign Out
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Nav.Link
                onClick={() => navigate("/SignIn")}
                className="ms-3 btn btn-outline-success"
              >
                Sign In
              </Nav.Link>
            )}
          </div>
        </header>
        <Container fluid className="p-3">
          <Outlet />
          <h4>Student Home</h4>

          <Row className="mb-3">
            <Col md={3}>
              <Card className="text-white bg-info mb-3">
                <Card.Body>
                  <Card.Title>Total Attendance</Card.Title>
                  <a href="#" className="text-white">
                    More info →
                  </a>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="text-white bg-success mb-3">
                <Card.Body>
                  <Card.Title>Absent</Card.Title>
                  <a href="#" className="text-white">
                    More info →
                  </a>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="text-white bg-warning mb-3">
                <Card.Body>
                  <Card.Title>Present</Card.Title>
                  <a href="#" className="text-white">
                    More info →
                  </a>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="text-white bg-danger mb-3">
                <Card.Body>
                  <Card.Title>Total Subjects</Card.Title>
                  <a href="#" className="text-white">
                    More info →
                  </a>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Card className="mb-3">
                <Card.Header className="bg-danger text-white">
                  Total Attendance Chart
                </Card.Header>
                <Card.Body style={{ minHeight: "200px" }}>
                  {/* Your chart here */}
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="mb-3">
                <Card.Header className="bg-success text-white">
                  Attendance Statistics by Subjects
                </Card.Header>
                <Card.Body style={{ minHeight: "200px" }}>
                  {/* Your chart here */}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default StudentDashboard;
