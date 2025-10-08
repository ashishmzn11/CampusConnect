import React, { useContext, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Button,
  Form,
  Modal,
} from "react-bootstrap";
import { StudentContext } from "../../../Store/User/StoreStudent";

function TotalCourse() {
  const {
    HandleCourse,
    totalcourse,
    HandleEditCourse,
    handleRemoveCourse,
    totalstudent, // Add totalstudent from context
  } = useContext(StudentContext);

  const [name, setname] = useState("");
  const [code, setcode] = useState("");
  const [duration, setduration] = useState("");
  const [totalFee, settotalFee] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editIndex, seteditIndex] = useState(null);

  const openModal = (index = null) => {
    if (index !== null) {
      const courseToEdit = totalcourse[index];
      if (courseToEdit) {
        setname(courseToEdit.name);
        setcode(courseToEdit.code);
        setduration(courseToEdit.duration);
        settotalFee(courseToEdit.totalFee);
        seteditIndex(index);
      }
    } else {
      setname("");
      setcode("");
      setduration("");
      settotalFee("");
      seteditIndex(null);
    }
    setShowModal(true);
  };

  const handleCourseSave = () => {
    if (!name || !code || !totalFee || !duration) {
      alert("Please fill all fields!");
      return;
    }

    const courseData = { name, code, duration, totalFee };

    if (editIndex !== null) {
      HandleEditCourse(editIndex, courseData);
    } else {
      HandleCourse(courseData);
    }

    setShowModal(false);
    setname("");
    setcode("");
    setduration("");
    settotalFee("");
    seteditIndex(null);
  };

  return (
    <Container className="py-4">
      <Row className="mb-3">
        <Col>
          <h3>Total Courses</h3>
        </Col>
        <Col className="text-end">
          <Button variant="primary" onClick={() => openModal()}>
            + Add Course
          </Button>
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
              {totalcourse.map((course, idx) => {
                // Count students enrolled in this course
                const studentsInThisCourse = totalstudent.filter(
                  (student) => student.course === course.name
                );

                // Sum total fees paid (if student has a paidFee property)
                const totalFeesPaid = studentsInThisCourse.reduce(
                  (sum, student) => sum + (student.paidFee || 0),
                  0
                );

                return (
                  <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td>{course.name}</td>
                    <td>{course.code}</td>
                    <td>{course.duration}</td>
                    <td>{course.totalFee}</td>
                    <td>{studentsInThisCourse.length}</td>
                    <td>{totalFeesPaid}</td>
                    <td>
                      <Button
                        size="sm"
                        variant="warning"
                        className="me-2"
                        onClick={() => openModal(idx)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => handleRemoveCourse(course.code)}
                      >
                        Remove
                      </Button>
                    </td>
                  </tr>
                );
              })}
              {totalcourse.length === 0 && (
                <tr>
                  <td colSpan="8" className="text-center">
                    No courses added yet
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Add/Edit Course Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editIndex !== null ? "Edit Course" : "Add New Course"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Course Name*</Form.Label>
              <Form.Control
                value={name}
                onChange={(e) => setname(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Course Code*</Form.Label>
              <Form.Control
                value={code}
                onChange={(e) => setcode(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Duration (Years)*</Form.Label>
              <Form.Control
                type="number"
                value={duration}
                onChange={(e) => setduration(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Total Fee*</Form.Label>
              <Form.Control
                type="number"
                value={totalFee}
                onChange={(e) => settotalFee(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleCourseSave}>
            {editIndex !== null ? "Update" : "Add"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default TotalCourse;
