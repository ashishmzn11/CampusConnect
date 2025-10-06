import React, { useContext, useState } from "react";
import { Container, Row, Col, Card, Table, Button, Form, Modal } from "react-bootstrap";
import { StudentContext } from "../../../Store/User/StoreStudent";

function TotalStudent() {
  const { totalstudent, handleRemoveStudent, HandleStudentSignUp, handleEditStudent } = useContext(StudentContext);

  // Form state
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [pass, setpass] = useState("");
  const [course, setcourse] = useState("");
  const [year, setyear] = useState("");
  const [batch, setbatch] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null); // null = add, number = edit

  // Open modal for Add or Edit
  const openModal = (index = null) => {
    if (index !== null) {
      // Edit mode
      const student = totalstudent[index];
      setname(student.name);
      setemail(student.email);
      setpass(student.pass);
      setcourse(student.course);
      setyear(student.year);
      setbatch(student.batch);
      setEditIndex(index);
    } else {
      // Add mode
      setname("");
      setemail("");
      setpass("");
      setcourse("");
      setyear("");
      setbatch("");
      setEditIndex(null);
    }
    setShowModal(true);
  };

  // Save student (Add or Edit)
  const handleSaveStudent = () => {
    if (!name || !email || !pass || !course || !year || !batch) {
      alert("Please fill all fields!");
      return;
    }

    const studentData = { name, email, pass, course, year, batch };

    if (editIndex !== null) {
      // Edit student
      handleEditStudent(editIndex, studentData);
    } else {
      // Add student
      const success = HandleStudentSignUp(studentData);
      if (!success) {
        alert("Student with this email already exists!");
        return;
      }
    }

    // Reset and close modal
    setShowModal(false);
    setname("");
    setemail("");
    setpass("");
    setcourse("");
    setyear("");
    setbatch("");
    setEditIndex(null);
  };

  return (
    <Container fluid className="py-4 bg-light" style={{ minHeight: "100vh" }}>
      <Row className="mb-3">
        <Col>
          <h3>Total Students</h3>
        </Col>
        <Col className="text-end">
          <Button variant="primary" onClick={() => openModal()}>
            + Add Student
          </Button>
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
          <Modal.Title>{editIndex !== null ? "Edit Student" : "Add New Student"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Student Name</Form.Label>
              <Form.Control type="text" value={name} onChange={(e) => setname(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" value={email} onChange={(e) => setemail(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" value={pass} onChange={(e) => setpass(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Course</Form.Label>
              <Form.Control type="text" value={course} onChange={(e) => setcourse(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Class/Year</Form.Label>
              <Form.Control type="text" value={year} onChange={(e) => setyear(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Batch</Form.Label>
              <Form.Control type="text" value={batch} onChange={(e) => setbatch(e.target.value)} />
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
