import React, { useState } from "react";
import { useAuth } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaUser, FaUserCircle } from "react-icons/fa";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

export const Login = () => {
  const navigate = new useNavigate();

  const [user, setUser] = useState({ email: "", password: "" });
  const { setTokeninLs } = useAuth();
  const [showPass, setShowPass] = useState(false);

  const handleInput = async (e) => {
    e.preventDefault();

    const name = e.target.name;
    const value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      const data = await response.json();

      console.log(data);

      if (response.ok) {
        console.log("user log in successfully..");
        setTokeninLs(data.token);
        navigate("/home");
      }
    } catch (error) {
      console.error("error during log in", error);
    }
  };

  return (
    <>
      <div className=" auth-container d-flex justify-content-center align-items-center   ">
       

        <div className="right shadow rounded  ">
          <div className="auth-title mt-2">
            {/* <span className="text-center fs-1  ">
              <FaUserCircle />
            </span> */}

            <h1 className="">Sing In To Your Account</h1>
            <p className="text-secondary">
              Enter your credentials to access your dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form text-cneter  ">
            <div className="input-group align-items-center ">
              <label htmlFor="email" className="text-white text-start w-100">
                Email Adress
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="example@gmail.com"
                required
                autoComplete="off"
                value={user.email}
                onChange={handleInput}
                className=" rounded  w-100 border-0 "
              />
            </div>

            <div className="input-group  align-items-center ">
              <label
                htmlFor="password "
                className="text-white text-start w-100"
              >
                Password
              </label>
              <div className=" d-flex pass-div rounded w-100">
                <input
                  type={showPass ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="Enter Your Password"
                  required
                  autoComplete="off"
                  value={user.password}
                  onChange={handleInput}
                  className="pass border-0 shadow-none  text-white"
                />

                <button className="eye-div">
                  {" "}
                  <span className="ms-3" onClick={() => setShowPass(!showPass)}>
                    {" "}
                    {showPass ? <FaEyeSlash /> : <FaEye />}{" "}
                  </span>
                </button>
              </div>
              <div className="btn-div url  w-100 text-end mt-2">
                <a href="/forgot-pass" className="text-danger forgot">
                  Forgot Password?
                </a>
              </div>
            </div>

            <div className="btn-div  text-center">
              <button type="submit" className="p-2 b-tn w-100 ">
                Log In
              </button>
            </div>
            <div className="btn-div url">
              <p className="text-white text-center">
                {" "}
                Not a user?
                <a href="/register" className="reg">
                  {" "}
                  Regsiter Now
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
