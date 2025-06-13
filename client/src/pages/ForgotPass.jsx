import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import "../style/ForgotPass.css";

export const ForgotPass = () => {
  const navigate = new useNavigate();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [timer, setTimer] = useState(60);
  const [isTimerActive, setIsTimerActive] = useState(false);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "otp") setOtp(value);
  };

  const sendOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/forgot-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );
      if (response.ok) {
        setOtpSent(true);
        setIsTimerActive(true);
        setTimer(60);
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Failed to send OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  };

  useEffect(() => {
    let interval;
    if (isTimerActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsTimerActive(false);
      document.getElementById("Btn").innerHTML = "Resend  OTP";
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timer]);

  const verifyOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      const data = await response.json();
      console.log("data", data);

      if (response.ok) {
        localStorage.setItem("resetToken", data.token);
        console.log("Token saved:", data.token);

        navigate("/reset-pass");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
    }
  };

  return (
    <div className="auth-container bg-black d-flex   justify-content-center">
      <div className="form-box bg-black w-25 py-3">
        <h2 className="text-white text-center mt-3">Forgot Password</h2>
        <form onSubmit={sendOtp}>
          <div className="w">
            <label htmlFor="email" className="text-white">
              E-mail:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleChangeInput}
              placeholder="Enter Your Email"
              required
              className="w-100 p-2 bg-black border border-secondary rounded text-white"
            />
          </div>
          <button
            type="submit"
            disabled={isTimerActive}
            id="Btn"
            className="b-tn text-white p-2"
          >
            Send OTP
          </button>
          <p className="text-danger text-center mt-2">
            {" "}
            {isTimerActive ? `Resend OTP in ${timer}s` : ""}
          </p>
        </form>

        {otpSent && isTimerActive && (
          <form onSubmit={verifyOtp}>
            <div className="u-ip">
              <label htmlFor="otp" className="text-white">Enter OTP:</label>
              <input
                type="text"
                id="otp"
                name="otp"
                value={otp}
                onChange={handleChangeInput}
                placeholder="Enter OTP"
                required
                className="bg-black text-white w-100 p-2 border rounded border-secondary"
              />
            </div>
            <button type="submit" className="b-tn p-2 text-white">
              Verify OTP
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
