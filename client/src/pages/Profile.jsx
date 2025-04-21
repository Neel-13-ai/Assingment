import { useEffect, useState } from "react";
import { useAuth } from "../store/authStore";
import { Outlet, useNavigate } from "react-router-dom";
import { Setting } from "./Setting";
import { Pencil, SquarePen } from "lucide-react";

const Profile = () => {
  const navigate = useNavigate();
  const [showSet, setShowset] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  if (!user) {
    return null; // Prevent rendering if user is not available
  }

  const avatarLetter = user.name ? user.name[0].toUpperCase() : "?";

  return (
    <>
      <div className="profile-container rounded-4 ">
        {/* Avatar */}
        <div className="avatar" id="avatar">
          {avatarLetter}
        </div>

        {/* User Info */}
        <div className="user-info">
          <p className="user-role">
            <strong>Role:</strong> {user.role}
          </p>
          <p>
            <strong>Name:</strong> {user.name || "N/A"}
          </p>
          <p>
            <strong>Email:</strong> {user.email || "N/A"}
          </p>

          {/* Show Branch Only if Available (for Students) */}
          {user.branch && (
            <p>
              <strong>Branch:</strong> {user.branch}
            </p>
          )}

          {/* Additional Details for Students */}
          {user.role === "STUDENT" && (
            <>
              <p className="n-con">
                <strong>Enrollment Number:</strong>{" "}
                {user.enrollmentNumber || "N/A"}
                <strong>Year:</strong> {user.year || "N/A"}
                <strong>Semester:</strong> {user.sem || "N/A"}
              </p>
            </>
          )}
        </div>

        <div>
          {location.pathname === "/profile/setting" ? (
            <button
              className="editBtn p-2 rounded border-0"
              onClick={() => navigate("/profile")}
            >
              Cancel
            </button>
          ) : (
            <button
              className="editBtn p-2 rounded border-0"
              onClick={() => navigate("/profile/setting")}
            >
              Edit
              <SquarePen size={18} className="ms-2 fw-bold" />
            </button>
          )}
        </div>
      </div>

      {/* Here the nested route component will render */}
      <Outlet />
    </>
  );
};

export default Profile;
