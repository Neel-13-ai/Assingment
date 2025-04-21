import React, { useEffect, useState } from "react";
import { useAuth } from "../store/authStore";

const StudentList = () => {
  const { authorizationToken } = useAuth();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStudents = async (req, res) => {
    const response = await fetch("http://localhost:5000/api/auth/user-list", {
      headers: {
        Authorization: authorizationToken,
      },
    });

    const data = await response.json();

    console.log("data", data);
    setStudents(data.students);
  };
  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="student-list">
      <h1>Student List</h1>
      <table>
        <thead>
          <tr>
            <th className="text-center">Sr No</th>
            <th className="text-center">Enroll NO</th>
            <th className="text-center">Name</th>
            <th className="text-center">Email</th>
            <th className="text-center">Branch</th>
            <th className="text-center">Year</th>
            <th className="text-center">Sem</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={student.id}>
              <td >{index + 1}</td>
              <td >{student.enrollmentNumber}</td>
              <td >{student.name}</td>
              <td >{student.email}</td>
              <td >{student.branch}</td>
              <td >{student.year}</td>
              <td >{student.sem}</td>
              <td  id="action">

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;
