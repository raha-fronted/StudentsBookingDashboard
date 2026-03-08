import React, { useState } from "react";
import "./App.css";

function App() {
  

  const [students, setStudents] = useState([
    {
      id: 1,
      name: "saha",
      contact: {email: "sahr@mail.com",phone: "0100000001"},
      isActive: true,
      sessions: 2,
    },
    {
      id: 2, name: "Samar",
      isActive: false,
      sessions: 3,
    }
  ]);

  function addStudent(newStudent) {
    setStudents([...students, newStudent]);
  }

  return (
    <div className="container">
      <h1>Student Booking Dashboard</h1>
      <StudentForm addStudent={addStudent} />
      <StudentList students={students} />
    </div>
  );
}

function StudentForm({ addStudent }) {
  const [name, setName] = useState("");
  const [sessions, setSessions] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    const newStudentObj = {
      id: Date.now(),
      name:name,
      isActive: true,
      sessions:sessions
    };

    addStudent(newStudentObj);
    setName("");
    setSessions(1);
  }

  return (
    <form onSubmit={handleSubmit} className="student-form">
      <input
        type="text"
        placeholder="Student Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        // required
      />
      <input
        type="number"
        placeholder="Number of Sessions"
        value={sessions}
        onChange={(e) => setSessions(Number(e.target.value))}
        required
      />
      <button type="submit">Add Student</button>
    </form>
  );
}


function StudentList({ students }) {
  //it is optioal now...
  if (!students || students.length === 0) {
    return <p>No students yet.</p>;
  }

  return (
    <div className="student-list">
      {students.map((student) => (
        <StudentCard student={student} />
      ))}
    </div>
  );
}

function StudentCard({ student }) {
  return (
    <div className="student-card">
      <p>{student.name}</p>

      <p style={{
          color: student.isActive ? "green" : "red",
          fontWeight: "bold"
        }}>{student.isActive ? "Active Student" : "Inactive Student"}</p>
      
      <p>Email: {student.contact?.email ?? "No email provided"}</p>
      <p>Phone: {student.contact?.phone ?? "No phone provided"}</p>
      <p>Sessions:</p>

      <ul>
        {Array.from({ length: student.sessions }, (_, i) => (
          <li key={i}>Session {i + 1}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
