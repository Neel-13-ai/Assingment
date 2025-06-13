import React, { useState, useEffect } from "react";
import { useAuth } from "../store/authStore";
import { useNavigate, Link, useLocation } from "react-router-dom";
import "../style/Navbar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FlagOff,
  LayoutDashboardIcon,
  LayoutGrid,
  Layers,
  UserCog,
  PanelRightOpen,
  PanelRightClose,
} from "lucide-react";

import {
  FaUser,
  FaCog,
  FaPlus,
  FaHome,
  FaBook,
  FaUsers,
  FaSignOutAlt,
} from "react-icons/fa";

export const Navbar = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarMinimized, setSidebarMinimized] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { isLoggedIn, LogoutUser, user, authorizationToken } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const pathParts = location.pathname.split("/").filter(Boolean);

  const formattedPath = pathParts
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("  >  ");

  useEffect(() => {
    if (!authorizationToken) {
      navigate("/");
    }
  }, [authorizationToken, navigate]);

  const handleLogout = () => {
    LogoutUser();
    navigate("/");
    window.location.reload();
  };

  const toggleSidebar = () => {
    if (sidebarOpen && !sidebarMinimized) {
      setSidebarMinimized(true);
    } else if (sidebarOpen && sidebarMinimized) {
      setSidebarMinimized(false);
    } else {
      setSidebarOpen(true);
    }
  };

  const roleBasedLinks = {
    SUPER_ADMIN: [
      {
        path: "/admin-list",
        label: "Admins",
        icon: <FaUsers className="text-info" />,
      },
      {
        path: "/get-assignments",
        label: "Assignments",
        icon: <FaBook className="text-success" />,
      },
      {
        path: "/profile",
        label: "Profile",
        icon: <FaUser className="text-danger" />,
      },
    ],
    ADMIN: [
      {
        path: "/get-assignments",
        label: "Assignments",
        icon: <FaBook className="text-success" />,
      },
      {
        path: "/students",
        label: "Student",
        icon: <FaUsers className="text-info" />,
      },
      {
        path: "/profile",
        label: "Profile",
        icon: <FaUser className="text-danger" />,
      },
    ],
    STUDENT: [
      {
        path: "/assignments",
        label: "Assignments",
        icon: <FaBook className="text-success" />,
      },
      {
        path: "/profile",
        label: "Profile",
        icon: <FaUser className="text-danger" />,
      },
    ],
  };

  const userLinks = user?.role ? roleBasedLinks[user.role] || [] : [];
  const userInitial = user?.name ? user.name[0].toUpperCase() : "U";

  const rightSectionClass = `right-section ${
    isLoggedIn ? (sidebarMinimized ? "minimized" : "shifted") : ""
  }`;

  return (
    <div className="layout">
      {isLoggedIn && (
        <div
          className={`sidebar ${sidebarOpen ? "open" : ""} ${
            sidebarMinimized ? "minimized" : ""
          }`}
        >
          <button
            className="btn text-white text-start border-0  toggle-btn"
            onClick={toggleSidebar}
          >
            <LayoutDashboardIcon size={30} className="text-warning " />
            {!sidebarMinimized && (
              <span className="ms-3 fs-5 text-white mt-1">
                Assing
                <span className="text-black bg-warning px-2 py-1 fw-semibold rounded ms-1">
                  Mate
                </span>
              </span>
            )}
          </button>
          <Link to="/home" className="sidebar-link">
            {/* <LayoutGrid  /> */}

            <Layers size={20} className="text-primary" />

            {!sidebarMinimized && <span>Dashboard</span>}
          </Link>
          {userLinks.map((link) => (
            <Link key={link.path} to={link.path} className="sidebar-link">
            
              {link.icon}
              {!sidebarMinimized && <span>{link.label}</span>}
            
            </Link>
          ))}
          <hr />
          <Link onClick={handleLogout} className="sidebar-link">
            <FaSignOutAlt className="text-warning" />
            {!sidebarMinimized && <span>Logout</span>}
          </Link>
        </div>
      )}

      <div className={rightSectionClass}>
        <nav className="navbar navbar-dark bg-black px-3 shadow border-bottom sticky-top border-2  border-dark d-flex justify-content-between align-items-center">
          {isLoggedIn ? (
            <small className="text-secondary  w-25 ">
              {sidebarMinimized ? (
                <PanelRightClose
                  size={19}
                  className="mb-1 me-2 text-secondary"
                  onClick={() => setSidebarMinimized(!sidebarMinimized)}
                />
              ) : (
                <span>
                  <PanelRightOpen
                    size={19}
                    className="mb-1 me-2 text-secondary"
                    onClick={() => setSidebarMinimized(!sidebarMinimized)}
                  />
                </span>
              )}{" "}
              Dashboard
              {formattedPath && ` > ${formattedPath}`}
            </small>
          ) : (
            <div></div>
          )}

          <div>
            {isLoggedIn ? (
              <div className="avatar-container position-relative">
                <div
                  className="avatar"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  {userInitial}
                </div>
                {dropdownOpen && (
                  <div className="dropdown-menu show position-absolute end-0 mt-2 bg-black border border-secondary shadow rounded p-2">
                    <button
                      className="dropdown-item text-warning w-100 text-start border-0 bg-transparent"
                      onClick={() => navigate("/profile/setting")}
                    >
                      Update Profile
                      <UserCog className="ms-2 " size={20} />
                    </button>
                    <button
                      className="dropdown-item text-warning w-100 text-start border-0 bg-transparent"
                      onClick={handleLogout}
                    >
                      Logout
                      <FaSignOutAlt className="ms-2 text-warning" />
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <button
                  className="px-3 py-1 border-0 rounded me-2 r-btn"
                  onClick={() => navigate("/register")}
                >
                  Register
                </button>
                <button
                  className="px-3 py-1 border-0 rounded l-btn"
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
              </div>
            )}
          </div>
        </nav>

        <div className="main-content">{children}</div>
      </div>
    </div>
  );
};
