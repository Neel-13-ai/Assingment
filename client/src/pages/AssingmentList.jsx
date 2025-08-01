// import React, { useEffect, useState } from "react";
// import { useAuth } from "../store/authStore";
// import { FaEdit, FaFileAlt } from "react-icons/fa";
// import { Plus } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// const AssignmentList = () => {
//   const { authorizationToken, user } = useAuth();
//   const [assignments, setAssignments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedAssignment, setSelectedAssignment] = useState(null);
//   const [updating, setUpdating] = useState(false);

//   const navigate = useNavigate();
//   const validSemesters = {
//     1: [1, 2],
//     2: [3, 4],
//     3: [5, 6],
//     4: [7, 8],
//   };

//   const handleYearChange = (e) => {
//     const newYear = parseInt(e.target.value, 10);
//     setSelectedAssignment((prevState) => ({
//       ...prevState,
//       year: newYear,
//       sem: validSemesters[newYear][0],
//     }));
//   };

//   useEffect(() => {
//     fetchAssignments();
//   }, [authorizationToken]);

//   const fetchAssignments = async () => {
//     try {
//       const response = await fetch(
//         "http://localhost:5000/api/auth/get-assignment",
//         {
//           method: "GET",
//           headers: { Authorization: authorizationToken },
//         }
//       );
//       if (!response.ok) throw new Error("Failed to fetch assignments");
//       const data = await response.json();
//       console.log("assignment data ", data);

//       setAssignments(data);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const isAdmin = user?.role === "ADMIN";

//   const handleEditClick = (assignment) => {
//     setSelectedAssignment({ ...assignment, file: null });
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setSelectedAssignment((prevState) => ({ ...prevState, [name]: value }));
//   };

//   const handleFileChange = (e) => {
//     setSelectedAssignment((prevState) => ({
//       ...prevState,
//       file: e.target.files[0],
//     }));
//   };

//   const handleUpdateSubmit = async (e) => {
//     e.preventDefault();
//     if (updating) return;

//     setUpdating(true);
//     try {
//       const formData = new FormData();
//       Object.entries(selectedAssignment).forEach(([key, value]) => {
//         if (key === "file" && value) {
//           formData.append("filePath", value);
//         } else {
//           formData.append(key, String(value));
//         }
//       });

//       formData.append("branch", user?.branch || "");

//       const response = await fetch(
//         `http://localhost:5000/api/auth/update-assignment/${selectedAssignment.id}`,
//         {
//           method: "PUT",
//           headers: { Authorization: authorizationToken },
//           body: formData,
//         }
//       );

//       if (!response.ok) throw new Error(await response.text());

//       setAssignments((prevAssignments) =>
//         prevAssignments.map((assignment) =>
//           assignment.id === selectedAssignment.id
//             ? { ...selectedAssignment }
//             : assignment
//         )
//       );
//       setSelectedAssignment(null);
//     } catch (error) {
//       console.error("Error updating assignment:", error.message);
//     } finally {
//       setUpdating(false);
//       fetchAssignments();
//     }
//   };

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     const day = String(date.getDate()).padStart(2, "0");
//     const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
//     const year = String(date.getFullYear()).slice(2); // Get last two digits
//     return `${day}-${month}-${year}`;
//   };

//   if (loading) return <div className="loading">Loading...</div>;
//   if (error) return <div className="error">Error: {error}</div>;
//   if (assignments.length === 0) return <div>No assignments found.</div>;

//   return (
//     <div className="text-white w-100 ">
//       <h1 className="ti">Assignments</h1>
//       {user.role === "ADMIN" ? (
//         <div className="mb-3">
//           {" "}
//           <button
//             className="btn bg-white "
//             onClick={() => navigate("/add-assignments")}
//           >
//             <span>
//               <Plus className="me-1 " size={20} />
//             </span>
//             Add Assignment
//           </button>
//         </div>
//       ) : (
//         " "
//       )}
//       <div className="card border-0 w-100">
//         <div className="card-body bg-black ">
//           <div className="table-responsive-sm ">
//             <table className="table table-hover  table-dark table-sm align-middle rounded-2">
//               <thead className=" text-center  bg-black ">
//                 <tr>
//                   <th className="text-primary">Sr.no</th>
//                   {!isAdmin && <th className="text-primary">Admin</th>}
//                   <th className="text-primary">Title</th>
//                   <th className="text-primary">Subject</th>
//                   <th className="text-primary">Created At</th>
//                   <th className="text-primary">Due</th>
//                   <th className="text-primary">Description</th>
//                   <th className="text-primary">Branch</th>
//                   <th className="text-primary">Year</th>
//                   <th className="text-primary">Semester</th>
//                   <th className="text-primary">File</th>
//                   {isAdmin && <th className="text-primary">Actions</th>}
//                 </tr>
//               </thead>
//               <tbody>
//                 {assignments.map((assignment, index) => (
//                   <tr key={assignment.id}>
//                     <td>{index + 1}</td>
//                     {!isAdmin && <td>{assignment.admin?.name || "N/A"}</td>}
//                     <td
//                       className="text-wrap"
//                       style={{ maxWidth: "120px", whiteSpace: "normal" }}
//                     >
//                       {assignment.title}
//                     </td>
//                     <td className="text-nowrap">{assignment.subject}</td>
//                     <td className="text-nowrap">
//                       {formatDate(assignment.createdAt)}
//                     </td>
//                     <td className="text-nowrap">
//                       {formatDate(assignment.dueDate)}
//                     </td>
//                     <td
//                       className="text-wrap"
//                       style={{ maxWidth: "200px", whiteSpace: "normal" }}
//                     >
//                       {assignment.description}
//                     </td>
//                     <td
//                       className="text-wrap"
//                       style={{ maxWidth: "100px", whiteSpace: "normal" }}
//                     >
//                       {assignment.branch}
//                     </td>
//                     <td className="text-nowrap">{assignment.year}</td>
//                     <td className="text-nowrap">{assignment.sem}</td>
//                     <td className="text-nowrap">
//                       {assignment.filePath && (
//                         <a
//                           href={assignment.filePath}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="btn btn-sm  bg-success text-white"
//                         >
//                           View File
//                         </a>
//                       )}
//                     </td>
//                     {isAdmin && (
//                       <td className="text-center text-nowrap">
//                         <FaEdit
//                           className="edit-icon"
//                           onClick={() => handleEditClick(assignment)}
//                           style={{ cursor: "pointer", color: "blue" }}
//                         />
//                       </td>
//                     )}
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>

//       {selectedAssignment && (
//         <div className="as-container">
//           <div className="title p-2 rounded text-center">
//             <FaFileAlt className="text-white fs-3" />
//             <h2 className="text-white">Update Assignment</h2>
//           </div>
//           <form onSubmit={handleUpdateSubmit} className="auth-form px-4">
//             <div className="d-flex gap-2">
//               <div className="input-group w-50">
//                 <label htmlFor="title" className="text-white">
//                   Title:
//                 </label>
//                 <input
//                   type="text"
//                   name="title"
//                   placeholder="Enter Assignment Title"
//                   value={selectedAssignment.title}
//                   onChange={handleInputChange}
//                   className="border border-secondary rounded-2 text-white"
//                   required
//                 />
//               </div>
//               <div className="input-group w-50">
//                 <label htmlFor="subject" className="text-white">
//                   Subject:
//                 </label>
//                 <input
//                   type="text"
//                   name="subject"
//                   placeholder="Enter Subject"
//                   value={selectedAssignment.subject}
//                   onChange={handleInputChange}
//                   className="border border-secondary rounded-2 text-white"
//                   required
//                 />
//               </div>
//             </div>

//             <div className="input-group w-100">
//               <label htmlFor="description" className="text-white">
//                 Description:
//               </label>
//               <textarea
//                 name="description"
//                 placeholder="Enter Description"
//                 value={selectedAssignment.description}
//                 onChange={handleInputChange}
//                 className="border border-secondary rounded-2  text-white w-100"
//                 required
//               />
//             </div>

//             <div className="d-flex gap-2">
//               <div className="input-group w-50">
//                 <label htmlFor="year" className="text-white">
//                   Year:
//                 </label>
//                 <select
//                   name="year"
//                   value={selectedAssignment.year}
//                   onChange={handleYearChange}
//                   className="border border-secondary rounded-2 text-white w-100"
//                   required
//                 >
//                   {[1, 2, 3, 4].map((year) => (
//                     <option key={year} value={year}>
//                       {year}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <div className="input-group w-50">
//                 <label htmlFor="sem" className="text-white">
//                   Semester:
//                 </label>
//                 <select
//                   name="sem"
//                   value={selectedAssignment.sem}
//                   onChange={handleInputChange}
//                   className="border border-secondary rounded-2 text-white w-100"
//                   required
//                 >
//                   {validSemesters[selectedAssignment.year].map((sem) => (
//                     <option key={sem} value={sem}>
//                       {sem}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>

//             <div className="d-flex gap-2">
//               <div className="input-group w-50">
//                 <label htmlFor="branch" className="text-white">
//                   Branch:
//                 </label>
//                 <input
//                   type="text"
//                   value={user?.branch || ""}
//                   readOnly
//                   disabled
//                   className="border border-secondary rounded-2  text-white w-100"
//                 />
//               </div>

//               <div className="input-group d-flex flex-column w-50">
//                 <label htmlFor="file" className="text-white me-2">
//                   File:
//                 </label>
//                 <div>
//                   <input
//                     type="file"
//                     onChange={handleFileChange}
//                     className="custom-file-input border border-secondary rounded-2 text-danger w-100"
//                   />
//                 </div>

//                 {selectedAssignment.filePath && (
//                   <div className="mt-1 ms-2">
//                     <span className="text-secondary me-2">Previous File:</span>
//                     <a
//                       href={selectedAssignment.filePath}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-white"
//                     >
//                       View File
//                     </a>
//                   </div>
//                 )}
//               </div>
//             </div>

//             <div className="d-flex gap-2">
//               <div className="input-group d-flex flex-column w-50">
//                 <label htmlFor="dueDate" className="text-white me-2">
//                   Submit-Before:
//                 </label>
//                 <div>
//                   <input
//                     type="date"
//                     id="dueDate"
//                     name="dueDate"
//                     value={
//                       selectedAssignment?.dueDate
//                         ? new Date(selectedAssignment.dueDate)
//                             .toISOString()
//                             .split("T")[0]
//                         : ""
//                     }
//                     onChange={handleInputChange}
//                     min={new Date().toISOString().split("T")[0]}
//                     className="border border-secondary rounded-2 text-white w-100 bg-dark"
//                     required
//                   />
//                 </div>
//               </div>
//             </div>

//             <div className="text-center">
//               <button
//                 type="button"
//                 className="b-tn w-25 p-2"
//                 onClick={() => setSelectedAssignment(null)}
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 className="b-tn w-25 ms-3 p-2"
//                 disabled={updating}
//               >
//                 {updating ? "Updating..." : "Update Assignment"}
//               </button>
//             </div>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AssignmentList;

import React, { useEffect, useState } from "react";
import { useAuth } from "../store/authStore";
import { FaEdit, FaFileAlt } from "react-icons/fa";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AssignmentList = () => {
  const { authorizationToken, user } = useAuth();
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [updating, setUpdating] = useState(false);
  const navigate = useNavigate();

  const validSemesters = { 1: [1,2], 2: [3,4], 3: [5,6], 4: [7,8] };
  const isAdmin = user?.role === "ADMIN";

  useEffect(() => {
    fetchAssignments();
  }, [authorizationToken]);

  const fetchAssignments = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/get-assignment", {
        method: "GET",
        headers: { Authorization: authorizationToken },
      });
      if (!res.ok) throw new Error("Failed to fetch assignments");
      setAssignments(await res.json());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (assignment) => {
    setSelectedAssignment({ ...assignment, file: null });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedAssignment(prev => ({ ...prev, [name]: value }));
  };

  const handleYearChange = (e) => {
    const y = parseInt(e.target.value, 10);
    setSelectedAssignment(prev => ({
      ...prev,
      year: y,
      sem: validSemesters[y][0],
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedAssignment(prev => ({ ...prev, file }));
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    if (updating) return;
    setUpdating(true);

    try {
      const updates = { ...selectedAssignment };
      
      // Upload new file if provided
      if (selectedAssignment.file instanceof File) {
        const data = new FormData();
        data.append("file", selectedAssignment.file);
        data.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
        data.append("resource_type", "raw");

        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/raw/upload`,
          { method: "POST", body: data }
        );
        const json = await res.json();
        if (!res.ok) throw new Error(json.error?.message || "Upload failed");
        updates.filePath = json.secure_url;
      }

      // Clean up temporary file prop before sending
      delete updates.file;
      updates.branch = user.branch || "";

      const res = await fetch(
        `http://localhost:5000/api/auth/update-assignment/${selectedAssignment.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: authorizationToken,
          },
          body: JSON.stringify(updates),
        }
      );
      if (!res.ok) throw new Error(await res.text());

      setAssignments(prev =>
        prev.map(a => a.id === selectedAssignment.id ? { ...a, ...updates } : a)
      );
      setSelectedAssignment(null);
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setUpdating(false);
      fetchAssignments();
    }
  };

  const formatDate = (d) => {
    const dt = new Date(d);
    return `${String(dt.getDate()).padStart(2,'0')}-${String(dt.getMonth()+1).padStart(2,'0')}-${String(dt.getFullYear()).slice(-2)}`;
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!assignments.length) return <div>No assignments found.</div>;

  return (
    <div className="text-white w-100">
      <h1 className="ti">Assignments</h1>
      {isAdmin && (
        <button className="btn bg-white mb-3" onClick={() => navigate("/add-assignments")}>
          <Plus className="me-1" size={20} /> Add Assignment
        </button>
      )}

      {/* Existing table */}
      <div className="card border-0 w-100">
        <div className="card-body bg-black">
          <div className="table-responsive-sm">
            <table className="table table-hover table-dark table-sm align-middle rounded-2">
              <thead className="text-center bg-black">
                <tr>
                  <th>Sr.no</th>
                  {!isAdmin && <th>Admin</th>}
                  <th>Title</th>
                  <th>Subject</th>
                  <th>Created At</th>
                  <th>Due</th>
                  <th>Description</th>
                  <th>Branch</th>
                  <th>Year</th>
                  <th>Semester</th>
                  <th>File</th>
                  {isAdmin && <th>Actions</th>}
                </tr>
              </thead>
              <tbody>
                {assignments.map((a, idx) => (
                  <tr key={a.id}>
                    <td>{idx + 1}</td>
                    {!isAdmin && <td>{a.admin?.name || "N/A"}</td>}
                    <td className="text-wrap" style={{ maxWidth: "120px" }}>{a.title}</td>
                    <td>{a.subject}</td>
                    <td>{formatDate(a.createdAt)}</td>
                    <td>{formatDate(a.dueDate)}</td>
                    <td className="text-wrap" style={{ maxWidth: "200px" }}>{a.description}</td>
                    <td>{a.branch}</td>
                    <td>{a.year}</td>
                    <td>{a.sem}</td>
                    <td>
                      {a.filePath && (
                        <a href={a.filePath} target="_blank" rel="noopener noreferrer"
                           className="btn btn-sm bg-success text-white">View File</a>
                      )}
                    </td>
                    {isAdmin && (
                      <td className="text-center">
                        <FaEdit
                          onClick={() => handleEditClick(a)}
                          style={{ cursor: "pointer", color: "blue" }}
                        />
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Edit form */}
      {selectedAssignment && (
        <div className="as-container">
          <div className="title p-2 rounded text-center">
            <FaFileAlt className="text-white fs-3" />
            <h2 className="text-white">Update Assignment</h2>
          </div>
          <form onSubmit={handleUpdateSubmit} className="auth-form px-4">
            <div className="d-flex gap-2">
              <div className="input-group w-50">
                <label className="text-white">Title:</label>
                <input
                  type="text"
                  name="title"
                  value={selectedAssignment.title}
                  onChange={handleInputChange}
                  className="border border-secondary rounded-2 text-white"
                  required
                />
              </div>
              <div className="input-group w-50">
                <label className="text-white">Subject:</label>
                <input
                  type="text"
                  name="subject"
                  value={selectedAssignment.subject}
                  onChange={handleInputChange}
                  className="border border-secondary rounded-2 text-white"
                  required
                />
              </div>
            </div>

            <div className="input-group w-100 mt-2">
              <label className="text-white">Description:</label>
              <textarea
                name="description"
                value={selectedAssignment.description}
                onChange={handleInputChange}
                className="border border-secondary rounded-2 text-white w-100"
                required
              />
            </div>

            <div className="d-flex gap-2 mt-2">
              <div className="input-group w-50">
                <label className="text-white">Year:</label>
                <select
                  name="year"
                  value={selectedAssignment.year}
                  onChange={handleYearChange}
                  className="border border-secondary rounded-2 text-white w-100"
                  required
                >
                  {[1,2,3,4].map(y => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>

              <div className="input-group w-50">
                <label className="text-white">Semester:</label>
                <select
                  name="sem"
                  value={selectedAssignment.sem}
                  onChange={handleInputChange}
                  className="border border-secondary rounded-2 text-white w-100"
                  required
                >
                  {validSemesters[selectedAssignment.year].map(sem => (
                    <option key={sem} value={sem}>{sem}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="input-group w-50 mt-2">
              <label className="text-white">Branch:</label>
              <input
                type="text"
                value={user.branch || ""}
                readOnly
                disabled
                className="border border-secondary rounded-2 text-white w-100"
              />
            </div>

            <div className="input-group d-flex flex-column w-50 mt-2">
              <label className="text-white">File:</label>
              <input
                type="file"
                onChange={handleFileChange}
                className="custom-file-input border border-secondary rounded-2 text-danger w-100"
              />
              {selectedAssignment.filePath && !selectedAssignment.file && (
                <div className="mt-1 ms-2">
                  <span className="text-secondary me-2">Previous File:</span>
                  <a
                    href={selectedAssignment.filePath}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white"
                  >
                    View File
                  </a>
                </div>
              )}
            </div>

            <div className="input-group d-flex flex-column w-50 mt-3">
              <label className="text-white">Submit-Before:</label>
              <input
                type="date"
                name="dueDate"
                value={
                  selectedAssignment.dueDate
                    ? new Date(selectedAssignment.dueDate)
                        .toISOString()
                        .split("T")[0]
                    : ""
                }
                onChange={handleInputChange}
                min={new Date().toISOString().split("T")[0]}
                className="border border-secondary rounded-2 text-white w-100 bg-dark"
                required
              />
            </div>

            <div className="text-center mt-4">
              <button
                type="button"
                className="b-tn w-25 p-2"
                onClick={() => setSelectedAssignment(null)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="b-tn w-25 ms-3 p-2"
                disabled={updating}
              >
                {updating ? "Updating..." : "Update Assignment"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AssignmentList;
