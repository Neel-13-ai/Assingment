import React from "react";

const Sidebar = ({ onLogout }) => {
  return (
    <>
      {/* Button to Open Sidebar */}
      <button
        className="btn btn-primary m-3"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#sidebar"
      >
        ☰ Open Sidebar
      </button>

      {/* Sidebar Offcanvas */}
      <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="sidebar"
        aria-labelledby="sidebarLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="sidebarLabel">
            Navigation
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>

        {/* Sidebar Links */}
        <div className="offcanvas-body">
          <ul className="nav flex-column">
            <li className="nav-item">
              <a className="nav-link" href="/">
                🏠 Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/dashboard">
                📊 Dashboard
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/profile">
                👤 Profile
              </a>
            </li>
            <li className="nav-item">
              <button className="nav-link text-danger btn" onClick={onLogout}>
                🚪 Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
