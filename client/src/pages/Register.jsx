import React, { useState } from "react";
import { FaEye, FaEyeSlash, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
// import "../style/Auth.css";

export const Register = () => {
  const navigate = useNavigate();

  const [showPass, setShowPass] = useState(false);

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

  const [user, setUser] = useState({
    name: "",
    enrollmentNumber: "",
    email: "",
    password: "",
    branch: "COMPUTER_SCIENCE",
    year: 1,
    sem: 1,
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleYearChange = (e) => {
    const newYear = parseInt(e.target.value);
    setUser({
      ...user,
      year: newYear,
      sem: validSemesters[newYear][0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("handlesubmit executed");

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...user,
          year: parseInt(user.year),
          sem: parseInt(user.sem),
        }),
      });

      const data = await response.json();

      console.log("frontend data", data);

      if (response.ok) {
        console.log("Register Successfully...");
        setUser({
          name: "",
          enrollmentNumber: "",
          email: "",
          password: "",
          branch: "COMPUTER_SCIENCE",
          year: 1,
          sem: 1,
        });
        navigate("/login");
      }
    } catch (error) {
      console.error("Register Error:", error);
    }
  };

  return (
    <>
      <div className="   w-100  text-center d-flex flex-column align-items-center ">
        <di className=" border border-secondary rounded  w-50 px-4 py-3">
          <h1 className="text-white ">Student Register</h1>
          <p className="text-secondary">
            Please fill out the form below to register as a college student.
          </p>

          <form onSubmit={handleSubmit} className="auth-form  ">
            <div className="d-flex text-start ms-2 ">
              <div className="w-25  ">
                <label htmlFor="name" className="text-white ">
                  Name:
                </label>
              </div>

              <div className="w-75">
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Your Name"
                  required
                  autoComplete="off"
                  value={user.name}
                  onChange={handleInput}
                  className=" ip w-100 "
                />
              </div>
            </div>

            <div className="d-flex">
              <div className="w-25  text-warning">
                <label htmlFor="enrollmentNumber" className=" text-white">
                  Enrollment No:
                </label>
              </div>

              <input
                type="text"
                name="enrollmentNumber"
                id="enrollmentNumber"
                placeholder=" Enrollment Number"
                required
                autoComplete="off"
                value={user.enrollmentNumber}
                onChange={handleInput}
                className="i-p ms-5"
              />
            </div>

            <div className="d-flex">
              <div className="w-25 text-warning text-start">
                <label htmlFor="email" className="ms-2 text-white">
                  Email:
                </label>
              </div>
              <div className="w-75">
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="student@gmail.com"
                  required
                  autoComplete="off"
                  value={user.email}
                  onChange={handleInput}
                  className=" ip"
                />
              </div>
            </div>

            <div className="d-flex">
              <div className="w-25 text-warning text-start">
                <labelbel htmlFor="password" className="ms-2 text-white">
                  Password:
                </labelbel>
              </div>

              <div className="w-75 d-flex  rounded pass-div  ps ">
                <input
                  type={showPass ? "password" : "text"}
                  name="password"
                  id="password"
                  placeholder="Enter Your Password"
                  required
                  autoComplete="off"
                  value={user.password}
                  onChange={handleInput}
                  className=" ip  border-0 pass text-white "
                />
                <button className="eye-div text-primary me-2  ">
                  <span
                    onClick={() => setShowPass(!showPass)}
                    className=" ms-2"
                  >
                    {showPass ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </button>
              </div>
            </div>

            <div className="d-flex">
              <div className="w-25 text-start">
                <label htmlFor="branch" className="ms-2 text-white">
                  Branch:
                </label>
              </div>

              <div className="w-75">
                <select
                  name="branch"
                  value={user.branch}
                  onChange={handleInput}
                  required
                  className="ip text-white"
                >
                  <option value="" disabled className="text-warning  ">
                    Select Branch
                  </option>
                  {branches.map((branch) => (
                    <option key={branch} value={branch}>
                      {branch}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="d-flex gap-4 ">
              <div className="input-group w-50 ms-2">
                <label htmlFor="year" className="text-white">
                  Year:
                </label>
                <select
                  name="year"
                  value={user.year}
                  onChange={handleYearChange}
                  className="bg-black text-white border rounded me-5 border-secondary"
                  required
                >
                  {[1, 2, 3, 4].map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>

              <div className="input-group w-50 ">
                <label htmlFor="sem" className="text-white">
                  Semester:
                </label>
                <select
                  name="sem"
                  value={user.sem}
                  onChange={handleInput}
                  required
                  className="border border-secondary rounded text-white bg-black  me-3"
                >
                  {validSemesters[user.year].map((sem) => (
                    <option key={sem} value={sem}>
                      {sem}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="btn-div ">
              <button type="submit" className="b-tn p-2 w-100">
                Register Now
              </button>
            </div>
            <div className="btn-div url text-center">
              <p className="text-white">
                Already User ?
                <a href="/login" className="ms-2">
                  Log-in Now
                </a>
              </p>
            </div>
          </form>
        </di>
      </div>
    </>
  );
};
