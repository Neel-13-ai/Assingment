import React, { useEffect, useState } from "react";
import { useAuth } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import { FaFileAlt, FaUser } from "react-icons/fa";

const AddAssignment = () => {
  const navigate = useNavigate();
  const { user, authorizationToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!authorizationToken) {
      navigate("/");
    }
  }, [authorizationToken, navigate]);

  const validSemesters = {
    1: [1, 2],
    2: [3, 4],
    3: [5, 6],
    4: [7, 8],
  };

  const [assignment, setAssignment] = useState({
    title: "",
    subject: "",
    description: "",
    year: 1,
    sem: 1,
    file: null,
    dueDate: new Date().toISOString().split("T")[0],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAssignment((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleYearChange = (e) => {
    const newYear = parseInt(e.target.value, 10);
    setAssignment((prevState) => ({
      ...prevState,
      year: newYear,
      sem: validSemesters[newYear][0],
    }));
  };

  const handleFileChange = (e) => {
    setAssignment((prevState) => ({ ...prevState, file: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      Object.entries(assignment).forEach(([key, value]) => {
        if (key === "file" && value) {
          formData.append("filePath", value);
        } else {
          formData.append(key, String(value));
        }
      });

      formData.append("branch", user?.branch || "");

      const response = await fetch(
        "http://localhost:5000/api/auth/add-assignment",
        {
          method: "POST",
          headers: { Authorization: authorizationToken },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const result = await response.json();
      console.log("Assignment submitted:", result);

      setAssignment({
        title: "",
        subject: "",
        description: "",
        year: 1,
        sem: 1,
        file: null,
      });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!authorizationToken) {
    return <div>Redirecting...</div>;
  }

  return (
    <div className="as-container pb-3">
      <div className="title p-2 rounded-bottom-0 rounded text-center">
        <span className="text-center text-white fs-3">
          <FaFileAlt />
        </span>
        <h1 className="text-white">Add Assignment</h1>
      </div>
      {error && <div className="error-message text-danger">{error}</div>}
      <form onSubmit={handleSubmit} className="auth-form px-4">
        <div className="d-flex gap-2">
          <div className="input-group w-50">
            <label htmlFor="title" className="text-white">
              Title:
            </label>
            <input
              type="text"
              name="title"
              placeholder="Enter Assignment Title"
              value={assignment.title}
              onChange={handleInputChange}
              className="border border-secondary rounded-2  text-white"
              required
            />
          </div>
          <div className="input-group w-50">
            <label htmlFor="subject" className="text-white">
              Subject:
            </label>
            <input
              type="text"
              name="subject"
              placeholder="Enter Subject"
              value={assignment.subject}
              onChange={handleInputChange}
              className="border border-secondary rounded-2  text-white"
              required
            />
          </div>
        </div>

        <div className="input-group w-100">
          <label htmlFor="description" className="text-white">
            Description:
          </label>
          <textarea
            name="description"
            placeholder="Enter Description"
            value={assignment.description}
            onChange={handleInputChange}
            className="border border-secondary rounded-2 p-2  text-white w-100"
            required
          />
        </div>

        <div className="d-flex gap-2 ">
          <div className="input-group w-50">
            <label htmlFor="year" className="text-white">
              Year:
            </label>
            <select
              name="year"
              value={assignment.year}
              onChange={handleYearChange}
              className="border border-secondary rounded-2  text-white w-100"
              required
            >
              {[1, 2, 3, 4].map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <div className="input-group w-50">
            <label htmlFor="sem" className="text-white">
              Semester:
            </label>
            <select
              name="sem"
              value={assignment.sem}
              onChange={handleInputChange}
              className="border border-secondary rounded-2  text-white w-100"
              required
            >
              {validSemesters[assignment.year].map((sem) => (
                <option key={sem} value={sem}>
                  {sem}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="d-flex gap-2">
          <div className="input-group w-50">
            <label htmlFor="branch" className="text-white">
              Branch:
            </label>
            <input
              type="text"
              value={user?.branch || ""}
              readOnly
              disabled
              className="border border-secondary rounded-2  text-white w-100"
            />
          </div>

          <div className="input-group w-50">
            <label htmlFor="file" className="text-white me-2">
              File:
            </label>
            <input
              type="file"
              onChange={handleFileChange}
              className="custom-file-input border border-secondary rounded-2 text-danger w-100"
            />
          </div>
        </div>

        <div className="input-group w-50">
          <label htmlFor="dueDate" className="text-white">
            Due Date:
          </label>
          <input
            type="date"
            name="dueDate"
            value={assignment.dueDate}
            onChange={handleInputChange}
            min={new Date().toISOString().split("T")[0]} // Restrict to today or future
            className="border border-secondary rounded-2 text-white w-100 bg-dark"
            required
          />
        </div>

        <div className="btn-div text-center p-2  ">
          <button className="b-tn p-2 fs-5 w-25 ms-2 rounded-3" onClick={() =>navigate("/get-assignments")}>Cancel</button>
          <button
            type="submit"
            className="b-tn p-2 fs-5 w-25 rounded-3 ms-4"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Add Assignment"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAssignment;
