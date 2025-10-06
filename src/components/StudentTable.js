import React, { useEffect, useState } from "react";
import api from "../api";
import '../styles/StudentTable.css';

function StudentTable({ onEdit }) {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.get("/api/students");
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
      setError("Failed to load students. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteStudent = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;
    try {
      await api.delete(`/api/students/${id}`);
      fetchStudents();
    } catch (error) {
      console.error("Error deleting student:", error);
      setError("Failed to delete student. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <div className="table-card">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading students...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="table-card">
        <div className="error-state">
          <p>{error}</p>
          <button onClick={fetchStudents} className="btn-retry">Try Again</button>
        </div>
      </div>
    );
  }

  return (
    <div className="table-card">
      <div className="table-header">
        <h2>Student List</h2>
        <span className="student-count">{students.length} Students</span>
      </div>

      {students.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📚</div>
          <p className="empty-state-text">No students yet</p>
          <p className="empty-state-subtext">Add your first student using the form above</p>
        </div>
      ) : (
        <div className="table-wrapper">
          <table className="student-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Course</th>
                <th>Date of Joining</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s) => (
                <tr key={s.id}>
                  <td data-label="ID">{s.id}</td>
                  <td data-label="Name">{s.name}</td>
                  <td data-label="Email">{s.email}</td>
                  <td data-label="Course">{s.course}</td>
                  <td data-label="Date of Joining">{s.dateOfJoining}</td>
                  <td data-label="Actions">
                    <div className="action-buttons">
                      <button
                        onClick={() => onEdit(s)}
                        className="btn-edit"
                        title="Edit student"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteStudent(s.id)}
                        className="btn-delete"
                        title="Delete student"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default StudentTable;
