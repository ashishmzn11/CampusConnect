import React, { useState } from "react";
import { Form, Button, Table, Card } from "react-bootstrap";

const StudentFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [message, setMessage] = useState("");

  return (
    <div className="container mt-4">
      <h3>Feedback Message</h3>

      {/* Feedback Form */}
      <Card className="mb-4 border-primary">
        <Card.Header className="bg-primary text-white">
          Leave a Feedback Message
        </Card.Header>
        <Card.Body>
          <Form >
            <Form.Group className="mb-3" controlId="feedbackMessage">
              <Form.Label>Feedback Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Enter your feedback"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </Form.Group>
            <Button type="submit" variant="primary">
              Leave a Feedback
            </Button>
          </Form>
        </Card.Body>
      </Card>

      {/* Feedback History */}
      <Card className="border-success">
        <Card.Header className="bg-success text-white">
          Feedback History
        </Card.Header>
        <Card.Body>
          <Table striped bordered hover>
            <thead className="table-light">
              <tr>
                <th>#ID</th>
                <th>Feedback Message</th>
                <th>Feedback Reply</th>
              </tr>
            </thead>
            <tbody>
              {/* {feedbacks.length === 0 ? (
                <tr>
                  <td colSpan={3} className="text-center">
                    No feedback yet
                  </td>
                </tr>
              ) : (
                feedbacks.map((f) => (
                  <tr key={f.id}>
                    <td>{f.id}</td>
                    <td>{f.message}</td>
                    <td>{f.reply}</td>
                  </tr>
                ))
              )} */}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  );
};

export default StudentFeedback;
