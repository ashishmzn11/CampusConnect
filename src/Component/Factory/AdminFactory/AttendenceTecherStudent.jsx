import React, { useContext, useState, useMemo } from "react";
import { Container, Row, Col, Card, Table, Badge, ProgressBar, Button } from "react-bootstrap";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { AttendanceContext } from "../../../Store/User/Attendance/Attendance";
import { useNavigate } from "react-router-dom";

export default function StudentAttendance() {
  const { attendanceList } = useContext(AttendanceContext);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const navigate = useNavigate();

  const attendanceMap = useMemo(() => {
    const map = {};
    attendanceList.forEach((record) => {
      map[record.date] = record.status || "Present";
    });
    return map;
  }, [attendanceList]);

  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      const dateString = date.toLocaleDateString("en-GB");
      if (attendanceMap[dateString] === "Present")
        return "bg-success text-white rounded-circle";
      if (attendanceMap[dateString] === "Absent")
        return "bg-danger text-white rounded-circle";
    }
    return null;
  };

  const filteredRecords = attendanceList.filter(
    (record) => record.date === selectedDate.toLocaleDateString("en-GB")
  );

  const totalDays = attendanceList.length;
  const presentDays = attendanceList.filter((r) => r.status !== "Absent").length;
  const attendancePercentage = totalDays ? Math.round((presentDays / totalDays) * 100) : 0;

  return (
    <Container className="mt-5">
      <Card className="p-4 shadow-lg rounded-4">
        <h3 className="text-center mb-4 text-primary fw-bold">📋 Attendance Dashboard</h3>

        {/* 🔙 Back Button */}
        <div className="mb-3 text-end">
          <Button variant="secondary" onClick={() => navigate(-1)}>⬅ Back</Button>
        </div>

        {/* 🏆 Attendance % */}
        <Card className="mb-4 p-3 text-center bg-light">
          <h5 className="mb-2">Overall Attendance</h5>
          <ProgressBar now={attendancePercentage} label={`${attendancePercentage}%`} />
        </Card>

        <Row>
          {/* Calendar */}
          <Col md={4} className="mb-4">
            <Card className="p-3 shadow-sm">
              <h5 className="text-center mb-3">Attendance Calendar</h5>
              <Calendar onChange={setSelectedDate} value={selectedDate} tileClassName={tileClassName} />
              <div className="d-flex justify-content-center gap-2 mt-3">
                <Badge bg="success">Present</Badge>
                <Badge bg="danger">Absent</Badge>
              </div>
            </Card>
          </Col>

          {/* Attendance Table */}
          <Col md={8}>
            <Card className="p-3 shadow-sm">
              <h5 className="text-center mb-3">
                Records for <span className="text-primary">{selectedDate.toLocaleDateString("en-GB")}</span>
              </h5>

              {filteredRecords.length > 0 ? (
                <Table striped bordered hover responsive>
                  <thead className="table-dark">
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>User Type</th>
                      <th>Course/Dept</th>
                      <th>Session</th>
                      <th>Day</th>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRecords.map((record, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{record.name}</td>
                        <td>{record.userType}</td>
                        <td>{record.course || record.department}</td>
                        <td>{record.session}</td>
                        <td>{record.day}</td>
                        <td>{record.date}</td>
                        <td>{record.time}</td>
                        <td>
                          <Badge bg={record.status === "Absent" ? "danger" : "success"}>
                            {record.status || "Present"}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <p className="text-center text-muted">No attendance found for this date.</p>
              )}
            </Card>
          </Col>
        </Row>
      </Card>
    </Container>
  );
}