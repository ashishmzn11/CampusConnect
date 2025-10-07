import React, { useContext, useState } from "react";
import { Container, Row, Col, Card, Table, Button, Form, Modal } from "react-bootstrap";
import { StudentContext } from "../../../Store/User/StoreStudent";

function TotalCourse() {
  const {HandleCourse,totalcourse}=useContext(StudentContext)

  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const [name, setname] = useState("");
  const [code, setcode] = useState("");
  const [duration, setduration] = useState("");
  const [totalFee, settotalFee] = useState("");

  const handleCourse=()=>{
    if(!name||!code||!duration||!totalFee){
      alert("Please fill all fields!")
      return;
    }
    const susse=HandleCourse({name,code,duration,totalFee});
    if(susse){
      setname("");
      setcode("");
      setduration("");
      settotalFee("");
    }
  }


  return (
    <Container className="py-4">
      <Row className="mb-3">
        <Col><h3>Total Courses</h3></Col>
        <Col className="text-end">
          <Button variant="primary">+ Add Course</Button>
        </Col>
      </Row>

      <Card className="shadow-sm">
        <Card.Body>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Course Name</th>
                <th>Code</th>
                <th>Duration (Years)</th>
                <th>Total Fee</th>
                <th>Students Enrolled</th>
                <th>Total Fees Paid</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {totalcourse.map((course, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>{course.name}</td>
                  <td>{course.code}</td>
                  <td>{course.duration}</td>
                  <td>{course.totalFee}</td>
                  <td>total student</td>
                  <td>total fee</td>
                  <td>
                    {/* <Button size="sm" variant="warning" className="me-2" onClick={() => openModal(idx)}>Edit</Button>
                    <Button size="sm" variant="danger" onClick={() => handleRemove(course.code)}>Remove</Button> */}
                  </td>
                </tr>
              ))}
              {totalcourse.length === 0 && <tr><td colSpan="8" className="text-center">No courses added yet</td></tr>}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Modal */}
      <Modal show={showModal} >
        <Modal.Header closeButton>
          {/* <Modal.Title>{editIndex !== null ? "Edit Course" : "Add New Course"}</Modal.Title> */}
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Course Name*</Form.Label>
              <Form.Control value={name} onChange={e => setName(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Course Code*</Form.Label>
              <Form.Control value={code} onChange={e => setCode(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Duration (Years)*</Form.Label>
              <Form.Control type="number" value={duration} onChange={e => setDuration(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Total Fee*</Form.Label>
              <Form.Control type="number" value={totalFee} onChange={e => setTotalFee(e.target.value)} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleSave}>{editIndex !== null ? "Update" : "Add"}</Button> */}
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default TotalCourse;
