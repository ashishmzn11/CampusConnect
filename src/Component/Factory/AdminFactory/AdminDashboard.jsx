import React, { useContext } from "react";
import { Container, Row, Col, Card, Button, Dropdown } from "react-bootstrap";
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";
import { StudentContext } from "../../../Store/User/StoreStudent";
import { useNavigate } from "react-router-dom";

const studentStaffData = [
  { name: "Students", value: 15 },
  { name: "Staffs", value: 22 }
];

const subjectsData = [
  { name: "B.Tech", value: 5 },
  { name: "BCA", value: 4 },
  { name: "BDS", value: 2 },
  { name: "BPharma", value: 3 },
  { name: "B.Sc", value: 3 },
  { name: "Diploma", value: 2 }
];

const COLORS = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40"];

function AdminDashboard() {
  const { totalStudentsCount, totalTeacherCount, totalcourse,totalsubject } = useContext(StudentContext);
  const navigate = useNavigate();


 const totalSubjectsCount = Object.values(totalsubject || {}).reduce(
  (sum, subjectsArray) => sum + subjectsArray.length,
  0
);

const subjectsChartData = Object.keys(totalsubject || {}).map((courseName) => ({
  name: courseName,
  value: totalsubject[courseName].length
}));


  const handleBack = () => {
    navigate(-1);
  };

  const handleLogout = () => {
    localStorage.removeItem("currentAdmin");
    navigate("/");
  };

  return (
    <Container fluid className="p-3 bg-light" style={{ minHeight: "100vh" }}>
      {/* Header */}
      <Row className="mb-3 align-items-center">
        <Col md={2} className="d-flex align-items-center gap-2">
          {/* Back Button */}
          <Button variant="secondary" onClick={handleBack}>
            ⬅ Back
          </Button>

          {/* Dropdown Menu */}
          <Dropdown>
            <Dropdown.Toggle variant="dark" id="dropdown-basic">
              Menu
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={handleLogout}>🚪 Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>

        <Col md={10}>
          <h3 className="mb-0 text-center">
            Student Management System | Admin Dashboard
          </h3>
        </Col>
      </Row>

      {/* Stats Cards */}
      <Row className="mb-3">
        <Col md={3}>
          <Card bg="info" text="white" className="mb-3">
            <Card.Body>
              <Card.Title>Total Students</Card.Title>
              <Card.Text>{totalStudentsCount}</Card.Text>
              <Button variant="light" size="sm" onClick={() => navigate("/TotalStudent")}>
                More Info
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card bg="danger" text="white" className="mb-3">
            <Card.Body>
              <Card.Title>Total Staffs</Card.Title>
              <Card.Text>{totalTeacherCount}</Card.Text>
              <Button variant="light" size="sm" onClick={() => navigate("/TotalTeacher")}>
                More Info
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card bg="warning" text="white" className="mb-3">
            <Card.Body>
              <Card.Title>Total Courses</Card.Title>
              <Card.Text>{totalcourse.length}</Card.Text>
              <Button variant="light" size="sm" onClick={() => navigate("/TotalCourse")}>
                More Info
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card bg="success" text="white" className="mb-3">
            <Card.Body>
              <Card.Title>Total Subjects</Card.Title>
              <Card.Text>{totalSubjectsCount}</Card.Text>
              <Button variant="light" size="sm" onClick={() => navigate("/TotalSubject")}>More Info</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Charts */}
      <Row>
        <Col md={6}>
          <Card className="mb-3 shadow-sm">
            <Card.Header>Student and Staff Chart</Card.Header>
            <Card.Body>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={studentStaffData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    label
                  >
                    {studentStaffData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="mb-3 shadow-sm">
            <Card.Header>Total Subjects in Each Course</Card.Header>
            <Card.Body>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={subjectsData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#82ca9d"
                    label
                  >
                    {subjectsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default AdminDashboard;
