import React, { useState, useContext } from "react";
import { Container, Row, Col, Card, Table, Button, Form, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { StudentContext } from "../../../Store/User/StoreStudent";
// import { StudentContext } from "../../../Store/User/StoreStudent";

function TotalSubject() {
  const navigate = useNavigate();
  const { totalcourse,totalsubject ,HandleSubject,HandleSubjectRemove} = useContext(StudentContext);

  // const [totalsubject, settotalsubject] = useState({});
  const [currentCourse, setCurrentCourse] = useState("");
  
  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [department, setDepartment] = useState("");
  const [semester, setSemester] = useState("");
  const [credits, setCredits] = useState("");
  const [teacher, setTeacher] = useState("");

  // Open modal
  const openModal = (courseName, index = null) => {
    setCurrentCourse(courseName);
    if (index !== null) {
      const subject = totalsubject[courseName][index];
      setName(subject.name);
      setCode(subject.code);
      setDepartment(subject.department);
      setSemester(subject.semester);
      setCredits(subject.credits);
      setTeacher(subject.teacher);
      setEditIndex(index);
    } else {
      setName("");
      setCode("");
      setDepartment("");
      setSemester("");
      setCredits("");
      setTeacher("");
      setEditIndex(null);
    }
    setShowModal(true);
  };
const handleSubject = () => {
  if (!name || !code || !department || !semester || !credits) {
    alert("Please fill all required fields!");
    return;
  }

  const currentSubjects = [...(totalsubject[currentCourse] || [])];
  const duplicate = currentSubjects.find((s, idx) => s.code === code && idx !== editIndex);
  if (duplicate) {
    alert("Subject code must be unique!");
    return;
  }

  const subjectData = { name, code, department, semester, credits, teacher };
  
  // ✅ Call context function to save
  HandleSubject(currentCourse, subjectData, editIndex);

  setShowModal(false);
  setEditIndex(null);
};

  

  return (
    <Container className="py-4">
      <Row className="mb-3">
        <Col>
          <h3>Total Subjects by Course</h3>
        </Col>
        <Col className="text-end">
          <Button
            variant="secondary"
            className="me-2 rounded-pill"
            onClick={() => navigate(-1)}
          >
            ⬅ Back
          </Button>
        </Col>
      </Row>

      {/* ✅ Dynamically generate course tables */}
      {totalcourse.length === 0 ? (
        <p className="text-center text-muted">No courses available. Please add courses first.</p>
      ) : (
        totalcourse.map((course, index) => (
          <Card className="shadow-sm mb-4" key={index}>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0">{course.name}</h5>
              <Button variant="primary" size="sm" onClick={() => openModal(course.name)}>
                + Add Subject
              </Button>
            </Card.Header>

            <Card.Body>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Subject Name</th>
                    <th>Code</th>
                    <th>Department</th>
                    <th>Semester</th>
                    <th>Credits</th>
                    <th>Teacher</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {totalsubject[course.name]?.length > 0 ? (
                    totalsubject[course.name].map((sub, idx) => (
                      <tr key={idx}>
                        <td>{idx + 1}</td>
                        <td>{sub.name}</td>
                        <td>{sub.code}</td>
                        <td>{sub.department}</td>
                        <td>{sub.semester}</td>
                        <td>{sub.credits}</td>
                        <td>{sub.teacher}</td>
                        <td>
                          <Button
                            size="sm"
                            variant="warning"
                            className="me-2"
                            onClick={() => openModal(course.name, idx)}
                          >
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="danger"
                            onClick={() => HandleSubjectRemove(course.name, sub.code)}
                          >
                            Remove
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="text-center">
                        No subjects added yet
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        ))
      )}

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editIndex !== null
              ? `Edit Subject - ${currentCourse}`
              : `Add New Subject - ${currentCourse}`}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Subject Name*</Form.Label>
              <Form.Control value={name} onChange={(e) => setName(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Subject Code*</Form.Label>
              <Form.Control value={code} onChange={(e) => setCode(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Department*</Form.Label>
              <Form.Control value={department} onChange={(e) => setDepartment(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Semester*</Form.Label>
              <Form.Control value={semester} onChange={(e) => setSemester(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Credits*</Form.Label>
              <Form.Control
                type="number"
                value={credits}
                onChange={(e) => setCredits(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Teacher</Form.Label>
              <Form.Control value={teacher} onChange={(e) => setTeacher(e.target.value)} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubject}>
            {editIndex !== null ? "Update" : "Add"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default TotalSubject;
