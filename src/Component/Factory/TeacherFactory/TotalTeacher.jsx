import React, { useContext, useState } from "react";
import { Container, Row, Col, Card, Table, Button, Form, Modal } from "react-bootstrap";
import { StudentContext } from "../../../Store/User/StoreStudent";
// import { teacherContext } from "../../../Store/User/Storeteacher";

function TotalTeacher() {
  const { totalteacher, handleRemoveteacher,HandleTeacherSignUp, handleEditteacher, } = useContext(StudentContext);

  // Form state
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [pass, setpass] = useState("");
  const [department, setdepartment] = useState("");
  const [designation, setdesignation] = useState("");
  const [qualification, setqualification] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null); // null = add, number = edit

  // Open modal for Add or Edit
  const openModal = (index = null) => {
    if (index !== null) {
    const teacher = totalteacher[index];
    setname(teacher.name);
    setemail(teacher.email);
    setpass(teacher.pass);
    setdepartment(teacher.department);
    setdesignation(teacher.designation);
    setqualification(teacher.qualification); // ✅ add this
    setEditIndex(index); // ✅ add this
  } else {
      // Add mode
      setname(""); setemail(""); setpass(""); setdepartment(""); setdesignation(""); setqualification("");
      setEditIndex(null);
    }
    setShowModal(true);
  };

  // Save teacher (Add or Edit)
  const handleSaveteacher = () => {
    if (!name || !email || !pass || !department || !designation || !qualification) {
      alert("Please fill all fields!");
      return;
    }
 if (!email.endsWith("@gmail.com")) {
    alert("Only Gmail addresses allowed!");
    return;
  }
    const teacherData ={ name, email, pass, department, designation, qualification };

    if (editIndex !== null) {
      // Edit teacher
      handleEditteacher(editIndex, teacherData);
    } else {
      // Add teacher
      const success = HandleTeacherSignUp(teacherData);
      if (!success) {
        alert("teacher with this email already exists!");
        return;
      }
    }

    // Reset and close modal
    setShowModal(false);
    setname(""); setemail(""); setpass(""); setdepartment(""); setdesignation(""); setqualification("");
    setEditIndex(null);
  };

  return (
    <Container fluid className="py-4 bg-light" style={{ minHeight: "100vh" }}>
      <Row className="mb-3">
        <Col>
          <h3>Total Teacher</h3>
        </Col>
        <Col className="text-end">
          <Button variant="primary" onClick={() => openModal()}>
            + Add Teacher
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
                <th>department/Subject</th>
                <th>designation/Role</th>
                <th>qualification</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {(totalteacher || []).map((teacher, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{teacher.name}</td>
                  <td>{teacher.email}</td>
                  <td>{teacher.pass}</td>
                  <td>{teacher.department}</td>
                  <td>{teacher.designation}</td>
                  <td>{teacher.qualification}</td>
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
                      onClick={() => handleRemoveteacher(teacher.email)}
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

      {/* Add/Edit teacher Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editIndex !== null ? "Edit teacher" : "Add New teacher"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>teacher Name</Form.Label>
              <Form.Control type="text" value={name} onChange={(e) => setname(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" value={email} onChange={(e) => setemail(e.target.value)} pattern="[a-zA-Z0-9._%+-]+@gmail\.com"
    required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" value={pass} onChange={(e) => setpass(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Department/Subject</Form.Label>
              <Form.Control type="text" value={department} onChange={(e) => setdepartment(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Designation/Role</Form.Label>
              <Form.Control type="text" value={designation} onChange={(e) => setdesignation(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Qualification</Form.Label>
              <Form.Control type="text" value={qualification} onChange={(e) => setqualification(e.target.value)} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveteacher}>
            {editIndex !== null ? "Update teacher" : "Add teacher"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default TotalTeacher;
