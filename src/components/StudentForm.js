import React, { useState, useEffect } from "react";
import api from "../api";
import '../styles/StudentForm.css';

function StudentForm({ refresh, studentToEdit, clearEdit }) {
  const [student, setStudent] = useState({
    name: "",
    email: "",
    course: "",
    dateOfJoining: ""
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    if (studentToEdit) {
      setStudent(studentToEdit);
    } else {
      setStudent({ name: "", email: "", course: "", dateOfJoining: "" });
    }
    setErrors({});
  }, [studentToEdit]);

  // Show alert message
  const showAlert = (message, type) => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 5000);
  };

  // Validate individual field
  const validateField = (name, value) => {
    let error = "";

    switch(name) {
      case "name":
        if (!value.trim()) {
          error = "Name is required";
        } else if (value.trim().length < 2) {
          error = "Name must be at least 2 characters";
        }
        break;
      case "email":
        if (!value.trim()) {
          error = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = "Please enter a valid email";
        }
        break;
      case "course":
        if (!value.trim()) {
          error = "Course is required";
        }
        break;
      case "dateOfJoining":
        if (!value) {
          error = "Date is required";
        }
        break;
      default:
        break;
    }

    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    if (error) {
      setErrors({ ...errors, [name]: error });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(student).forEach(key => {
      const error = validateField(key, student[key]);
      if (error) {
        newErrors[key] = error;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      showAlert("Please fix the errors before submitting", "error");
      return;
    }

    setIsLoading(true);

    try {
      if (student.id) {
        await api.put(`/api/students/${student.id}`, student);
        showAlert("Student updated successfully!", "success");
      } else {
        await api.post("/api/students", student);
        showAlert("Student added successfully!", "success");
      }

      setStudent({ name: "", email: "", course: "", dateOfJoining: "" });
      setErrors({});
      clearEdit();
      refresh();
    } catch (error) {
      console.error("Error saving student:", error);
      showAlert(
        error.response?.data?.message || "Failed to save student. Please try again.",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="form-card">
      {alert && (
        <div className={`alert alert-${alert.type}`}>
          <span>{alert.message}</span>
          <button
            className="alert-close"
            onClick={() => setAlert(null)}
            aria-label="Close alert"
          >
            ×
          </button>
        </div>
      )}

      <h2>{student.id ? "Edit Student" : "Add Student"}</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              placeholder="Enter student name"
              value={student.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.name ? "error" : ""}
              aria-invalid={errors.name ? "true" : "false"}
              aria-describedby={errors.name ? "name-error" : undefined}
            />
            {errors.name && (
              <span id="name-error" className="error-message" role="alert">
                {errors.name}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter email address"
              value={student.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.email ? "error" : ""}
              aria-invalid={errors.email ? "true" : "false"}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email && (
              <span id="email-error" className="error-message" role="alert">
                {errors.email}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="course">Course</label>
            <input
              id="course"
              name="course"
              placeholder="Enter course name"
              value={student.course}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.course ? "error" : ""}
              aria-invalid={errors.course ? "true" : "false"}
              aria-describedby={errors.course ? "course-error" : undefined}
            />
            {errors.course && (
              <span id="course-error" className="error-message" role="alert">
                {errors.course}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="dateOfJoining">Date of Joining</label>
            <input
              id="dateOfJoining"
              type="date"
              name="dateOfJoining"
              value={student.dateOfJoining}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.dateOfJoining ? "error" : ""}
              aria-invalid={errors.dateOfJoining ? "true" : "false"}
              aria-describedby={errors.dateOfJoining ? "date-error" : undefined}
            />
            {errors.dateOfJoining && (
              <span id="date-error" className="error-message" role="alert">
                {errors.dateOfJoining}
              </span>
            )}
          </div>
        </div>

        <div>
          <button
            type="submit"
            className={`btn-primary ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : (student.id ? "Update" : "Add")}
          </button>
          {student.id && (
            <button
              type="button"
              onClick={clearEdit}
              className="btn-secondary"
              disabled={isLoading}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default StudentForm;
