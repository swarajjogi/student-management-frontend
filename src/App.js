import React, { useState, useEffect } from "react";
import StudentTable from "./components/StudentTable";
import StudentForm from "./components/StudentForm";
import Login from "./components/Login";
import "./styles/StudentForm.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [refreshFlag, setRefreshFlag] = useState(false);
  const [editStudent, setEditStudent] = useState(null);

  // Change tab title
  useEffect(() => {
    document.title = "Student Management System";
  }, []);

  // Trigger refresh of StudentTable
  const refresh = () => setRefreshFlag((prev) => !prev);

  // Login screen
  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="app-container">
      <div className="student-management">
        <div className="page-header">
          <h1>Student Management System</h1>
          <p>Manage your students efficiently</p>
        </div>

        {/* Student Form */}
        <StudentForm
          refresh={refresh}
          studentToEdit={editStudent}
          clearEdit={() => setEditStudent(null)}
        />

        {/* Student Table */}
        <StudentTable
          key={refreshFlag} // Forces re-render when refreshFlag changes
          onEdit={(student) => setEditStudent(student)}
        />
      </div>
    </div>
  );
}

export default App;
