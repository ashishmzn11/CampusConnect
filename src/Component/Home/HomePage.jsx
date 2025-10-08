import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
// import TeacherSignIn from "../User/TeacherSignIn";

function HomePage() {
  const navigate=useNavigate()
  return (
    <div className="bg-light" style={{ minHeight: "100vh" }}>
      {/* Hero Section */}
      <Container fluid className="py-5 bg-primary text-white text-center">
        <h1 className="display-4">Campus Connection</h1>
        <p className="lead">Welcome! Choose your portal to sign in below</p>
      </Container>

      {/* Sign-In Options */}
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={4}>
            <Card className="shadow-sm mb-4 text-center">
              <Card.Body>
                <Card.Title className="mb-3">Admin Login</Card.Title>
                <Card.Text>
                  Access the admin dashboard to manage students, staff and courses.
                </Card.Text>
                <Button variant="primary" size="lg" onClick={()=>navigate("/AdminSignIn")}block>
                  Sign In as Admin
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="shadow-sm mb-4 text-center">
              <Card.Body>
                <Card.Title className="mb-3">Student Login</Card.Title>
                <Card.Text>
                  View your profile, courses, and academic information.
                </Card.Text>
                <Button variant="success" size="lg" onClick={()=>navigate("/StudentSignIn")} block>
                  Sign In as Student
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="shadow-sm mb-4 text-center">
              <Card.Body>
                <Card.Title className="mb-3">Teacher Login</Card.Title>
                <Card.Text>
                  Manage your classes, students, and performance records.
                </Card.Text>
                <Button variant="info" size="lg" onClick={()=>navigate("/TeacherSignIn")}block>
                  Sign In as Teacher
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Footer */}
      <Container fluid className="bg-dark text-light py-3 text-center">
        <small>© {new Date().getFullYear()} Campus Connection. All Rights Reserved.</small>
      </Container>
    </div>
  );
}

export default HomePage;
