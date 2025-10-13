import React, { useContext, useState } from "react";
import { Container, Row, Col, Card, Table, Button, Form, Modal } from "react-bootstrap";
import { StudentContext } from "../../../Store/User/StoreStudent";
import { useNavigate } from "react-router-dom";

function TotalStudent() {
  const { totalstudent, handleRemoveStudent, HandleStudentSignUp, handleEditStudent } =
    useContext(StudentContext);
  const navigate = useNavigate("");

  // Form state
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [pass, setpass] = useState("");
  const [course, setcourse] = useState("");
  const [year, setyear] = useState("");
  const [batch, setbatch] = useState("");
  const [submitfee, setsubmitfee] = useState("");
  const [totalfee, settotalfee] = useState("");
  const [remainingfee, setremainingfee] = useState("");

  const allCourses = JSON.parse(localStorage.getItem("course")) || [];

  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  // Open modal for Add or Edit
  const openModal = (index = null) => {
    if (index !== null) {
      const student = totalstudent[index];
      setname(student.name);
      setemail(student.email);
      setpass(student.pass);
      setcourse(student.course);
      setyear(student.year);
      setbatch(student.batch);
      setsubmitfee(student.submitfee);
      settotalfee(student.totalfee);
      setremainingfee(student.remainingfee || "");
      setEditIndex(index);
    } else {
      setname("");
      setemail("");
      setpass("");
      setcourse("");
      setyear("");
      setbatch("");
      setsubmitfee("");
      settotalfee("");
      setremainingfee("");
      setEditIndex(null);
    }
    setShowModal(true);
  };

  // Auto-calculate remaining fee
  const handleSubmitFeeChange = (value) => {
    setsubmitfee(value);
    if (totalfee) {
      const remain = Number(totalfee) - Number(value);
      setremainingfee(remain >= 0 ? remain : 0);
    }
  };

  // Save student (Add or Edit)
  const handleSaveStudent = () => {
    if (!name || !email || !pass || !course || !year || !batch || !submitfee) {
      alert("Please fill all fields!");
      return;
    }
    if (!email.endsWith("@gmail.com")) {
      alert("Only Gmail addresses allowed!");
      return;
    }

    const studentData = {
      name,
      email,
      pass,
      course,
      year,
      batch,
      submitfee,
      totalfee,
      remainingfee,
    };

    if (editIndex !== null) {
      handleEditStudent(editIndex, studentData);
    } else {
      const success = HandleStudentSignUp(studentData);
      if (!success) {
        alert("Student with this email already exists!");
        return;
      }
    }

    setShowModal(false);
    setname("");
    setemail("");
    setpass("");
    setcourse("");
    setyear("");
    setbatch("");
    setsubmitfee("");
    settotalfee("");
    setremainingfee("");
    setEditIndex(null);
  };

  // Calculate total fees and remaining fees
  const totalFeesSum = totalstudent.reduce(
    (sum, student) => sum + Number(student.totalfee || 0),
    0
  );
  const remainingFeesSum = totalstudent.reduce(
    (sum, student) => sum + Number(student.remainingfee || 0),
    0
  );

  return (
    <Container fluid className="py-4 bg-light" style={{ minHeight: "100vh" }}>
      <Row className="mb-3">
        <Col>
          <h3>Total Students</h3>
        </Col>
        <Col className="text-end">
          <Button
            variant="secondary"
            className="me-2 rounded-pill"
            onClick={() => navigate(-1)}
          >
            ⬅ Back
          </Button>
          <Button variant="primary" onClick={() => openModal()}>
            + Add Student
          </Button>
        </Col>
      </Row>

      {/* Summary */}
      <Row className="mb-3">
        <Col>
          <Card className="p-3">
            <h5>Summary:</h5>
            <p>Total Fees of All Students: <strong>{totalFeesSum}</strong></p>
            <p>Total Remaining Fees: <strong>{remainingFeesSum}</strong></p>
          </Card>
        </Col>
      </Row>

      <Card className="shadow-sm">
        <Card.Body>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Password</th>
                <th>Course</th>
                <th>Class/Year</th>
                <th>Batch</th>
                <th>Submit Fee</th>
                <th>Total Fee</th>
                <th>Remaining Fee</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {(totalstudent || []).map((student, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.pass}</td>
                  <td>{student.course}</td>
                  <td>{student.year}</td>
                  <td>{student.batch}</td>
                  <td>{student.submitfee}</td>
                  <td>{student.totalfee}</td>
                  <td>{student.remainingfee}</td>
                  <td>
                    <Button
                      variant="warning"
                      size="sm"
                      onClick={() => openModal(index)}
                      className="me-2"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleRemoveStudent(student.email)}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Add/Edit Student Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editIndex !== null ? "Edit Student" : "Add New Student"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Student Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setname(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                pattern="[a-zA-Z0-9._%+-]+@gmail\.com"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={pass}
                onChange={(e) => setpass(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Course</Form.Label>
              <Form.Select
                value={course}
                onChange={(e) => {
                  const selectedCourse = e.target.value;
                  setcourse(selectedCourse);
                  const foundCourse = allCourses.find(c => c.name === selectedCourse);
                  if (foundCourse) {
                    const fee = foundCourse.totalFee || foundCourse.fee || 0;
                    settotalfee(fee);
                    const remain = Number(fee) - Number(submitfee);
                    setremainingfee(remain >= 0 ? remain : 0);
                  } else {
                    settotalfee("");
                    setremainingfee("");
                  }
                }}
              >
                <option value="">-- Select Course --</option>
                {allCourses.map((c, index) => (
                  <option key={index} value={c.name}>{c.name}</option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Class/Year</Form.Label>
              <Form.Control
                type="text"
                value={year}
                onChange={(e) => setyear(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Batch</Form.Label>
              <Form.Control
                type="text"
                value={batch}
                onChange={(e) => setbatch(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Total Fee</Form.Label>
              <Form.Control type="text" value={totalfee} readOnly />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Submit Fee</Form.Label>
              <Form.Control
                type="number"
                value={submitfee}
                onChange={(e) => handleSubmitFeeChange(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Remaining Fee</Form.Label>
              <Form.Control type="text" value={remainingfee} readOnly />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveStudent}>
            {editIndex !== null ? "Update Student" : "Add Student"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default TotalStudent;
