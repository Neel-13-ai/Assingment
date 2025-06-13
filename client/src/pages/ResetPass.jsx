import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const ResetPass = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("resetToken");
    
    if (!token) {
      console.log("No token found. Please verify OTP again.");
      return;
    }

    if (password !== confirmPassword) {
      console.log("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ password, confirmPassword }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log("Password reset successfully!");
        localStorage.removeItem("resetToken");
        navigate("/login");
      } else {
        alert(data.message || "Failed to reset password");
      }
    } catch (error) {
      console.error("Error resetting password:", error);
    }
  };

  return (
    <div className="auth-container bg-black d-flex justify-content-center">
      <div className="form-box bg-black w-25 py-4">
        <h2 className="text-white text-center pb-2">Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="password" className="text-white">
              New Password:
            </label>
            <div className="border border-secondary rounded d-flex align-items-center">
              <input
                type={showPass ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-black pass text-white border-0 "
                required
              />
              <button
                type="button"
                className="bg-transparent border-0 text-primary ms-2"
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="confirmPassword" className="text-white">
              Confirm Password:
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="bg-black border border-secondary rounded-1 text-white"
              required
            />
          </div>

          <button type="submit" className="mt-3 b-tn p-2 text-black">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};
