import React from "react";
import { Card, Table } from "react-bootstrap";

const StudentResult = () => {
  // Example data (you can fetch from API later)

  return (
    <div>
      <h2 className="mb-4">Result</h2>

      <Card>
        <Card.Header className="bg-primary text-white">Result</Card.Header>
        <Card.Body className="p-0">
          <Table striped bordered hover responsive className="mb-0">
            <thead>
              <tr>
                <th>#ID</th>
                <th>Subject</th>
                <th>Assignments Marks</th>
                <th>Exam Marks</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              
                <tr >
                  <td>"id"</td>
                  <td>'subject'</td>
                  <td>"assignmentMarks"</td>
                  <td>"exam mark"</td>
                  <td>"status"</td>
                </tr>
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  );
};

export default StudentResult;
