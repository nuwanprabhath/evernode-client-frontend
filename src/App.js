import "./App.css";
import React, { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const students = [
    {
      name: "John Doe",
      degree: "Computer Science",
      date: "2023-05-01",
      studentId: "888066733",
      studentAccount: "rJQWTGnJ6zYHtmymcohFCZAW7LqZEYMRrV",
      uri: "514C3243573135393345",
    },
    {
      name: "Jane Smith",
      degree: "Electrical Engineering",
      date: "2023-06-01",
      studentId: "999066733",
      studentAccount: "rJQWTGnJ6zYHtmymcohFCZAW7LqZEYMRrV",
      uri: "4C545A42415331464D4F",
    },
    {
      name: "Alice Johnson",
      degree: "Physics",
      date: "2023-07-01",
      studentId: "066733",
      studentAccount: "rJQWTGnJ6zYHtmymcohFCZAW7LqZEYMRrV",
      uri: "474134364C364D594446",
    },
    {
      name: "Bob Williams",
      degree: "Mathematics",
      date: "2023-08-01",
      studentId: "4442454",
      studentAccount: "rJQWTGnJ6zYHtmymcohFCZAW7LqZEYMRrV",
      uri: "56523030454D53505952",
    },
    {
      name: "Emily Davis",
      degree: "Chemistry",
      date: "2023-09-01",
      studentId: "42454546",
      studentAccount: "rJQWTGnJ6zYHtmymcohFCZAW7LqZEYMRrV",
      uri: "56414F424B47584C314D",
    },
    {
      name: "Michael Wilson",
      degree: "Biology",
      date: "2023-10-01",
      studentId: "44454144",
      studentAccount: "rJQWTGnJ6zYHtmymcohFCZAW7LqZEYMRrV",
      uri: "3454514F31554E594E5A",
    },
  ];

  const [selectedStudent, setSelectedStudent] = useState(null);
  const [status, setStatus] = useState(null);

  const handleStudentChange = (event) => {
    setStatus(null);
    const selectedStudentId = event.target.value;
    const student = students.find((s) => s.studentId === selectedStudentId);
    setSelectedStudent(student);
  };

  const handleGraduate = () => {
    if (selectedStudent) {
      setStatus("Graduating...");
      axios
        .post("http://localhost:4001/record", selectedStudent, { proxy: true })
        .then((response) => {
          console.log(response.data);
          setStatus("Graduated!");
        })
        .catch((error) => {
          console.error(error);
          setStatus("Error graduating");
        });
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div style={{ fontSize: "xxx-large" }}>World Greatest University</div>
        <select
          style={{ marginTop: "3em", fontSize: "x-large" }}
          onChange={handleStudentChange}
        >
          <option value="">Select a student</option>
          {students.map((student) => (
            <option key={student.studentId} value={student.studentId}>
              {student.name}
            </option>
          ))}
        </select>
        {selectedStudent && (
          <div style={{ textAlign: "left" }}>
            <p>Name: {selectedStudent.name}</p>
            <p>Degree: {selectedStudent.degree}</p>
            <p>Date: {selectedStudent.date}</p>
            <p>Student ID: {selectedStudent.studentId}</p>
          </div>
        )}
        <button
          style={{ fontSize: "x-large" }}
          onClick={handleGraduate}
          disabled={!selectedStudent}
        >
          Graduate
        </button>
        <div>{status}</div>
      </header>
    </div>
  );
}

export default App;
