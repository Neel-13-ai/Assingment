import React, { useState, useEffect } from "react";
import { useAuth } from "../store/authStore";
import { useNavigate } from "react-router-dom";

const AdminUpdateForm = ({ onClose }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [userState, setUserState] = useState(user || {});
  const [message, setMessage] = useState("");

  useEffect(() => {
    setUserState(user);
  }, [user]); // Update state when user changes

  // Dropdown options
  const branches = [
    "COMPUTER_SCIENCE",
    "INFORMATION_TECHNOLOGY",
    "ELECTRICAL",
    "MECHANICAL",
    "CIVIL",
    "CHEMICAL",
  ];

  const validSemesters = {
    1: [1, 2],
    2: [3, 4],
    3: [5, 6],
    4: [7, 8],
  };

  // Initial form data
  const [formData, setFormData] = useState({
    name: userState?.name || "",
    email: userState?.email || "",
    branch: userState?.branch || "",
    enrollmentNumber: userState?.enrollmentNumber || "",
    year: userState?.year || "",
    sem: userState?.sem || "",
  });

  useEffect(() => {
    setFormData({
      name: userState?.name || "",
      email: userState?.email || "",
      branch: userState?.branch || "",
      enrollmentNumber: userState?.enrollmentNumber || "",
      year: userState?.year || "",
      sem: userState?.sem || "",
    });
  }, [userState]); // Update form data when userState changes

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "year" && { sem: "" }), // Reset semester if year changes
    }));
  };

  // Handle form submission
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    console.log("user id", userState.id);

    try {
      const response = await fetch(
        `http://localhost:5000/api/auth/update-admin/${userState.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...formData, role: userState.role }),
        }
      );

      console.log("Form data for update", formData);

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      const updatedUser = await response.json();
      console.log("updated user", updatedUser);
      setMessage(updatedUser.message);

      setUserState((prev) => ({ ...prev, ...updatedUser.user }));
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  return (
    <div className="u-container rounded-4">
      <h2 className="heading">Update Details</h2>

      {/* First Row (Name, Email, Branch) */}
      <div className="d-flex w-100 justify-content-around">
        <div
          className={`d-flex flex-column ${
            userState.role === "SUPER_ADMIN" ? "w-50 ms-5" : "w-25"
          }`}
        >
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
           
          />
        </div>

        <div
          className={`d-flex flex-column ${
            userState.role === "SUPER_ADMIN" ? "w-50 ms-5" : "w-25"
          }`}
        >
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>

        {(userState.role === "STUDENT" || userState.role === "ADMIN") && (
          <div className="d-flex flex-column w-25">
            <label htmlFor="branch">Branch:</label>
            <select
              id="branch"
              name="branch"
              value={formData.branch}
              onChange={handleInputChange}
              className="bg-black text-white h-75 rounded-2"
            >
              <option value="" className="text-warning">
                Select New Branch
              </option>
              {branches.map((branch) => (
                <option key={branch} value={branch}>
                  {branch}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Second Row (Only for Students: Enrollment Number, Year, Semester) */}
      {userState.role === "STUDENT" && (
        <div className="d-flex w-100 justify-content-around">
          <div className="d-flex flex-column w-25">
            <label htmlFor="enrollmentNumber">Enrollment No:</label>
            <input
              type="text"
              id="enrollmentNumber"
              name="enrollmentNumber"
              value={formData.enrollmentNumber}
              onChange={handleInputChange}
            />
          </div>

          <div className="d-flex flex-column w-25">
            <label htmlFor="year">Year:</label>
            <select
              id="year"
              name="year"
              value={formData.year}
              onChange={handleInputChange}
              className="h-75 bg-black text-white rounded"
            >
              <option value="" className="text-warning">
                Select Year
              </option>
              {Object.keys(validSemesters).map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          <div className="d-flex flex-column w-25">
            <label htmlFor="sem">Semester:</label>
            <select
              id="sem"
              name="sem"
              value={formData.sem}
              onChange={handleInputChange}
              disabled={!formData.year}
              className="h-75 bg-black text-white rounded"
            >
              <option value="" className="text-warning">
                Select Semester
              </option>
              {formData.year &&
                validSemesters[formData.year].map((sem) => (
                  <option key={sem} value={sem}>
                    {sem}
                  </option>
                ))}
            </select>
          </div>
        </div>
      )}

      {/* Buttons */}
      <div className="up-pass">
        <button
          onClick={() =>navigate('/profile')}
          className="update-btn cancel-btn text-center"
        >
          Cancel
        </button>
        <button
          onClick={handleUpdateSubmit}
          className="update-btn text-center"
        >
          Update
        </button>
      </div>
      {message}
    </div>
  );
};

export default AdminUpdateForm;
