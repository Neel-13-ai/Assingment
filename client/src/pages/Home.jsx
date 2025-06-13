// import { useState, useEffect } from "react";
// import { FaUsers, FaBook, FaUser, FaCog, FaPlus } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import { useAuth } from "../store/authStore";
// import { Filter } from "lucide-react";

// const branchNameMap = {
//   COMPUTER_SCIENCE: "Computer Science",
//   INFORMATION_TECHNOLOGY: "Information Technology",
//   ELECTRICAL: "Electrical",
//   MECHANICAL: "Mechanical",
//   CIVIL: "Civil",
//   CHEMICAL: "Chemical",
// };

// export const Home = () => {
//   const [branchData, setBranchData] = useState({ admins: {}, students: {} });
//   const [selectedBranch, setSelectedBranch] = useState("");
//   const [totalAssignments, setTotalAssignments] = useState(0);
//   const [pendingAssignments, setPendingAssignments] = useState(0);
//   const [loading, setLoading] = useState(true);

//   const { authorizationToken } = useAuth();

//   const handleBranchChange = (event) => {
//     setSelectedBranch(event.target.value);
//   };

//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       try {
//         const res = await fetch("http://localhost:5000/api/auth/allUser", {
//           method: "GET",
//           headers: {
//             Authorization: authorizationToken,
//             "Content-Type": "application/json",
//           },
//         });

//         if (!res.ok) {
//           throw new Error("Failed to fetch data");
//         }

//         const data = await res.json();

//         const admins = data.data.adminCountByBranch || {};
//         const students = data.studentCountByBranch || {};

//         setBranchData({ admins, students });

//         // Merge all branches from both admins and students for dropdown
//         const allBranches = Array.from(
//           new Set([...Object.keys(admins), ...Object.keys(students)])
//         );

//         setSelectedBranch(allBranches[0] || "");
//         setTotalAssignments(data.data.totalAssignments || 0);
//         setPendingAssignments(data.data.pendingAssignments || 0);
//         setLoading(false);
//       } catch (error) {
//         console.error("Failed to load dashboard data:", error);
//       }
//     };

//     fetchDashboardData();
//   }, []);

//   if (loading) {
//     return <div className="dashboard-container">Loading...</div>;
//   }

//   const displayBranch = branchNameMap[selectedBranch] || selectedBranch;

//   const totalAdmins = Object.values(branchData.admins).reduce(
//     (acc, count) => acc + count,
//     0
//   );

//   return (
//     <div className="dashboard-container d-flex flex-column">
//       <div className="branch-filter  d-flex justify-content-between  px-3 ">
//         <div className="w-75">
//           <input
//             type="text"
//             placeholder="Search"
//             className="bg-black rounded p-2 w-100 h-src border-dark  border "
//           />
//         </div>

//         <div>
//           <Filter className="text-white me-3 " />
//           <select
//             onChange={handleBranchChange}
//             className="bg-black text-white border border-dark  outline-0"
//             value={selectedBranch}
//           >
//             {Array.from(
//               new Set([
//                 ...Object.keys(branchData.admins),
//                 ...Object.keys(branchData.students),
//               ])
//             ).map((branch) => (
//               <option key={branch} value={branch}>
//                 {branchNameMap[branch] || branch}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>
//       <div className="dashboard-stats justify-content-evenly">
//         <div className="stat-card ">
//           <h3  className="text-warning">All Admins</h3>
//           <p>{totalAdmins}</p>
//         </div>
//         <div className="stat-card">
//           <h3 className="text-warning">Total Admins ({displayBranch})</h3>
//           <p>{branchData.admins[selectedBranch] || 0}</p>
//         </div>
//         <div className="stat-card">
//           <h3 className="text-warning">Total Students ({displayBranch})</h3>
//           <p>{branchData.students[selectedBranch] || 0}</p>
//         </div>
//         <div className="stat-card">
//           <h3 className="text-warning">Total Assignments</h3>
//           <p>{totalAssignments}</p>
//         </div>
//         <div className="stat-card">
//           <h3 className="text-warning">Pending Assignments</h3>
//           <p>{pendingAssignments}</p>
//         </div>
//       </div>

//       <div className="dashboard-actions  rounded-1">
//         <h2 className="text-primary">Quick Actions</h2>
//         <div className="action-links">
//           <Link to="/add-admin">
//             <FaPlus /> Add Admin
//           </Link>
//           <Link to="/admin-list">
//             <FaUsers /> Admin List
//           </Link>
//           <Link to="/get-assignments">
//             <FaBook /> All Assignments
//           </Link>
//           <Link to="/profile">
//             <FaUser /> Profile
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

import { useState, useEffect } from "react";
import { FaUsers, FaBook, FaUser, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth } from "../store/authStore";
import {
  Book,
  Dice1,
  Filter,
  Mail,
  Plus,
  User,
  Users,
  Users2,
} from "lucide-react";

const branchNameMap = {
  COMPUTER_SCIENCE: "Computer Science",
  INFORMATION_TECHNOLOGY: "Information Technology",
  ELECTRICAL: "Electrical",
  MECHANICAL: "Mechanical",
  CIVIL: "Civil",
  CHEMICAL: "Chemical",
};

export const Home = () => {
  const [branchData, setBranchData] = useState({ admins: {}, students: {} });
  const [selectedBranch, setSelectedBranch] = useState("");
  const [totalAssignments, setTotalAssignments] = useState(0);
  const [studentByYear, setStudentByYear] = useState({});
  const [loading, setLoading] = useState(true);

  const { authorizationToken, user } = useAuth();
  const role = user?.role;

  console.log("role", role);

  const handleBranchChange = (event) => {
    setSelectedBranch(event.target.value);
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        let endpoint = "";

        if (role === "SUPER_ADMIN") {
          endpoint = "http://localhost:5000/api/auth/allUser";
        } else if (role === "ADMIN") {
          endpoint = "http://localhost:5000/api/auth/admin-dashboard";
        } else if (role === "STUDENT") {
          endpoint = `http://localhost:5000/api/auth/students`; // example endpoint for student
        } else {
          console.error("Unknown role. Cannot fetch data.");
        }

        const res = await fetch(endpoint, {
          method: "GET",
          headers: {
            Authorization: authorizationToken,
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();

        if (role === "SUPER_ADMIN") {
          const admins = data.data.adminCountByBranch || {};
          const students = data.studentCountByBranch || {};

          setBranchData({ admins, students });

          const allBranches = Array.from(
            new Set([...Object.keys(admins), ...Object.keys(students)])
          );
          setSelectedBranch(allBranches[0] || "");
          setTotalAssignments(data.data.totalAssignments || 0);
        } else if (role === "ADMIN") {
          setStudentByYear(data.data.studentCountByYear || {});
          setTotalAssignments(data.data.totalUploadedAssignments || 0);
        } else if (role === "STUDENT") {
          setTotalAssignments(data.data.totalAssignments || 0);
        }

        setLoading(false);
      } catch (error) {
        console.error("Failed to load dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, [role]);

  if (loading) {
    return <div className="dashboard-container">Loading...</div>;
  }

  const totalAdmins = Object.values(branchData.admins).reduce(
    (acc, count) => acc + count,
    0
  );

  return (
    <div className="dashboard-container d-flex flex-column">
      {/* Branch Filter for SUPER_ADMIN only */}
      {role === "SUPER_ADMIN" && (
        <div className="branch-filter d-flex justify-content-between px-3">
          <div className="w-75">
            <input
              type="text"
              placeholder="Search"
              className="bg-black rounded p-2 w-100 h-src border-dark border"
            />
          </div>
          <div>
            <Filter className="text-white me-3" />
            <select
              onChange={handleBranchChange}
              className="bg-black text-white border border-dark outline-0"
              value={selectedBranch}
            >
              {Array.from(
                new Set([
                  ...Object.keys(branchData.admins),
                  ...Object.keys(branchData.students),
                ])
              ).map((branch) => (
                <option key={branch} value={branch}>
                  {branchNameMap[branch] || branch}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
      {role === "SUPER_ADMIN" ? (
        " "
      ) : (
        <div className="container-fluid shadow  d-tails text-white w-100 py-3 px-3 rounded mb-3">
          {/* 25% Section */}
          <div className="d-flex flex-column ">
            <h4 className="text-uppercase fw-bold">{user.role} Dashboard</h4>
            <p className="ms-2">
              Welcome, <span className="fw-semibold">{user.name}</span>
            </p>
          </div>

          {/* 75% Section */}
          <div className="d-flex flex-column justify-content-start  ">
            <div className="d-flex justify-content-start align-items-center mb-3">
              <img
                src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                alt="Profile"
                style={{ width: "60px", height: "60px", borderRadius: "50%" }}
              />
              <div className="me-3 text-start ms-3">
                <h5 className="fw-bold mb-1 mt-1">{user.name}</h5>
                <p className="mb-1  ">
                  <span>
                    <Mail size={20} className="me-2 text-primary" />
                  </span>
                  {user.email}
                </p>
                <span className="badge bg-success mt-2 ">{user.role}</span>
              </div>
            </div>

            {/* You can add more content here */}
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="dashboard-stats ">
        {role === "SUPER_ADMIN" && (
          <>
            <div className="stat-card w-25 px-0 ">
              <h3 className="text-info ">Total Admins</h3>
              <p className=" d-flex justify-content-around  mt-5">
                {totalAdmins}{" "}
                <span>
                  <Users className="text-danger" />
                </span>
              </p>
            </div>
            <div className="stat-card w-25 ">
              <h3 className="text-info">
                Total Admins
                <br />({branchNameMap[selectedBranch] || selectedBranch})
              </h3>
              <p className="d-flex justify-content-around mt-4">
                {branchData.admins[selectedBranch] || 0}{" "}
                <span>
                  <Users2 className="text-success" />
                </span>
              </p>
            </div>
            <div className="stat-card w-25  px-0">
              <h3 className="text-info mb-4">
                Total Students <br />(
                {branchNameMap[selectedBranch] || selectedBranch})
              </h3>
              <p className="w-100  d-flex justify-content-around  ">
                {branchData.students[selectedBranch] || 0}{" "}
                <span>
                  <Users2 className="text-primary" />
                </span>
              </p>
            </div>
          </>
        )}

        {role === "ADMIN" && (
          <div className="stat-card w-25">
            <h3 className="text-info">Total Students</h3>

            <div className=" mt-4">
              {Object.entries(studentByYear).map(([year, count]) => (
                <small className="fw-semibold" key={year}>
                  Year {year}: {count}
                  <br />
                </small>
              ))}
              {/* <p>{totalStudnets}</p> */}
            </div>
          </div>
        )}

        {/* <div className="w-25 px-0 stat-card">
          <h3 className="text-warning ">Total Assignments</h3>
          <p className=" d-flex justify-content-around ">
            {totalAssignments}
            <span>
              <FaBook />
            </span>
          </p>
        </div> */}
        <div className="stat-card w-25  px-0">
          <h3 className="text-info mb-4">
            Total Assignments <br />
          </h3>
          <p className="w-100  d-flex justify-content-around  mt-5 ">
            {totalAssignments}{" "}
            <span>
              <FaBook className="text-warning" />
            </span>
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="dashboard-actions rounded-1">
        <h2 className="text-primary">Quick Actions</h2>
        <div className="action-links">
          {role === "SUPER_ADMIN" && (
            <>
              <Link to="/add-admin">
                <FaPlus className="me-1 text-danger" /> Add Admin
              </Link>
              <Link to="/admin-list">
                <FaUsers className="me-1 text-warning" /> Admin List
              </Link>
            </>
          )}

          {role === "ADMIN" && (
            <>
              <Link to="/add-assignments">
                <Plus className="text-warning me-1" /> Add Assignments
              </Link>
              <Link to="/get-assignments">
                <FaBook className="text-success me-1" /> Assignments
              </Link>
            </>
          )}

          <Link to="/assignments">
            <FaBook className="text-success me-1" /> Assignments
          </Link>
          <Link to="/">
            <FaUser className="text-info me-1" /> Profile
          </Link>
        </div>
      </div>
      
    </div>
  );
};
