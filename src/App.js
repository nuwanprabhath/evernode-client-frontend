import './App.css';
import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const students = [
    { name: 'John Doe', degree: 'Computer Science', date: '2022-05-01', studentId: '123' },
    { name: 'Jane Smith', degree: 'Electrical Engineering', date: '2022-06-01', studentId: '456' },
    // Add more students here
  ];

  const [selectedStudent, setSelectedStudent] = useState(null);

  const handleStudentChange = (event) => {
    const selectedStudentId = event.target.value;
    const student = students.find((s) => s.studentId === selectedStudentId);
    setSelectedStudent(student);
  };

  const handleGraduate = () => {
    if (selectedStudent) {
      axios.post('http://localhost:4001/record', selectedStudent, { proxy: true })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <select onChange={handleStudentChange}>
          <option value="">Select a student</option>
          {students.map((student) => (
            <option key={student.studentId} value={student.studentId}>
              {student.name}
            </option>
          ))}
        </select>
        {selectedStudent && (
          <div>
            <p>Name: {selectedStudent.name}</p>
            <p>Degree: {selectedStudent.degree}</p>
            <p>Date: {selectedStudent.date}</p>
            <p>Student ID: {selectedStudent.studentId}</p>
          </div>
        )}
        <button onClick={handleGraduate} disabled={!selectedStudent}>
          Graduate
        </button>
      </header>
    </div>
  );
}


export default App;
