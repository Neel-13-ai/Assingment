import { useState } from "react";
import Profile from "./Profile";
import { useAuth } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import AdminUpdateForm from "./UpdateUser";

export const Setting = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [message, setMessage] = useState("");

  console.log(user);

  if (!user) {
    return navigate("/");
  }

  const handleChangePassword = async () => {
    const token = localStorage.getItem("token");
    console.log("user token", token);

    if (!token) {
      setMessage("Unauthorized: No token provided.");
      return;
    }

    const response = await fetch(
      "http://localhost:5000/api/auth/change-password",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
          confirmedPassword,
        }),
      }
    );

    if (response.ok) {
      setCurrentPassword("");
      setNewPassword("");
      setConfirmedPassword("");
    }
    const data = await response.json();
    console.log("data", data);

    setMessage(data.message);
  };

  return (
    <>
      <AdminUpdateForm />
      <div className="change-password-container ">
        <h2 className="heading">Change Password</h2>
        <div className="in-grp">
          <input
            type="password"
            placeholder="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmedPassword}
            onChange={(e) => setConfirmedPassword(e.target.value)}
          />
        </div>
        <div className="up-pass">
          <button onClick={handleChangePassword} className="update-btn ">
            Update
          </button>
        </div>
        {message && <p className="message">{message}</p>}
      </div>
    </>
  );
};
