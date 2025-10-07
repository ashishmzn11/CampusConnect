import React, { useState } from "react";
import { Container, Row, Col, Card, Table, Button, Form, Modal } from "react-bootstrap";

function TotalSubject() {
  const [subjects, setSubjects] = useState([
    // initial example data
    { name: "Mathematics", code: "MATH101", department: "Science", semester: "1st", credits: 4, teacher: "Dr. Sharma" }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [department, setDepartment] = useState("");
  const [semester, setSemester] = useState("");
  const [credits, setCredits] = useState("");
  const [teacher, setTeacher] = useState("");

  // Open Add/Edit Modal
  const openModal = (index = null) => {
    if (index !== null) {
      const subject = subjects[index];
      setName(subject.name);
      setCode(subject.code);
      setDepartment(subject.department);
      setSemester(subject.semester);
      setCredits(subject.credits);
      setTeacher(subject.teacher);
      setEditIndex(index);
    } else {
      setName(""); setCode(""); setDepartment(""); setSemester(""); setCredits(""); setTeacher("");
      setEditIndex(null);
    }
    setShowModal(true);
  };

  // Save subject
  const handleSave = () => {
    if (!name || !code || !department || !semester || !credits) {
      alert("Please fill all required fields!");
      return;
    }

    // Check unique code
    const duplicate = subjects.find((s, idx) => s.code === code && idx !== editIndex);
    if (duplicate) {
      alert("Subject code must be unique!");
      return;
    }

    const subjectData = { name, code, department, semester, credits, teacher };

    if (editIndex !== null) {
      // Edit
      const updated = [...subjects];
      updated[editIndex] = subjectData;
      setSubjects(updated);
    } else {
      // Add
      setSubjects([...subjects, subjectData]);
    }

    setShowModal(false);
    setEditIndex(null);
    setName(""); setCode(""); setDepartment(""); setSemester(""); setCredits(""); setTeacher("");
  };

  // Remove subject
  const handleRemove = (code) => {
    const filtered = subjects.filter(sub => sub.code !== code);
    setSubjects(filtered);
  };

  return (
    <Container className="py-4">
      <Row className="mb-3">
        <Col><h3>Total Subjects</h3></Col>
        <Col className="text-end">
          <Button variant="primary" onClick={() => openModal()}>+ Add Subject</Button>
        </Col>
      </Row>

      <Card className="shadow-sm">
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
              {subjects.map((sub, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>{sub.name}</td>
                  <td>{sub.code}</td>
                  <td>{sub.department}</td>
                  <td>{sub.semester}</td>
                  <td>{sub.credits}</td>
                  <td>{sub.teacher}</td>
                  <td>
                    <Button size="sm" variant="warning" className="me-2" onClick={() => openModal(idx)}>Edit</Button>
                    <Button size="sm" variant="danger" onClick={() => handleRemove(sub.code)}>Remove</Button>
                  </td>
                </tr>
              ))}
              {subjects.length === 0 && <tr><td colSpan="8" className="text-center">No subjects added yet</td></tr>}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editIndex !== null ? "Edit Subject" : "Add New Subject"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Subject Name*</Form.Label>
              <Form.Control value={name} onChange={e => setName(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Subject Code*</Form.Label>
              <Form.Control value={code} onChange={e => setCode(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Department*</Form.Label>
              <Form.Control value={department} onChange={e => setDepartment(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Semester*</Form.Label>
              <Form.Control value={semester} onChange={e => setSemester(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Credits*</Form.Label>
              <Form.Control type="number" value={credits} onChange={e => setCredits(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Teacher</Form.Label>
              <Form.Control value={teacher} onChange={e => setTeacher(e.target.value)} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleSave}>{editIndex !== null ? "Update" : "Add"}</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default TotalSubject;
