// import React, { useEffect, useState } from "react";
// import { useAuth } from "../store/authStore";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { FaCalendarDay, FaUser } from "react-icons/fa";
// import {
//   ArrowBigDownDash,
//   BookOpen,
//   CalendarDays,
//   Clock,
//   ClockFading,
//   ListCollapse,
//   NotepadText,
// } from "lucide-react";

// const StudentAssignmentList = () => {
//   const { authorizationToken } = useAuth();
//   const [assignments, setAssignments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchAssignments = async () => {
//       try {
//         const response = await fetch(
//           "http://localhost:5000/api/auth/get-assignment",
//           {
//             method: "GET",
//             headers: { Authorization: authorizationToken },
//           }
//         );
//         if (!response.ok) throw new Error("Failed to fetch assignments");
//         const data = await response.json();
//         console.log("Student assignment data", data);
//         setAssignments(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchAssignments();
//   }, [authorizationToken]);

//   if (loading) return <div className="text-white text-center">Loading...</div>;
//   if (error)
//     return <div className="text-danger text-center">Error: {error}</div>;
//   if (assignments.length === 0)
//     return <div className="text-white text-center">No assignments found.</div>;

//   return (
//     <div className="container d-flex flex-column h-auto bg-black  ">
//       <h1 className="text-center text-white mb-5">Assignments</h1>
//       <div className="border p-5 w-100"> search</div>

//       <div className=" a-s  d-flex flex-wrap w-100  mt-5 justify-content-around">
//         {assignments.map((assignment, index) => (
//           <div
//             key={assignment.id}
//             className="mb-4 p-3 border assignment asi border-secondary rounded"
//           >
//             {/* Top Section (Branch, Year, Semester) */}
//             <div className="d-flex justify-content-between text-light mb-3 ">
//               <p className="">
//                 <span className="fw-normal text-white fs-5 p-2 px-4 fw-bold">
//                   <BookOpen className="subject  " /> {assignment.subject}
//                 </span>
//               </p>
//               {assignment.dueDate && (
//                 <p className="due text-warning">
//                   <ClockFading className="mb-1 ms-1 " size={18} /> Due :{" "}
//                   <span className="small text-danger">
//                     {new Date(assignment.dueDate).toLocaleDateString()}
//                   </span>
//                 </p>
//               )}
//             </div>
//             <hr className="text-white" />

//             {/* title des */}
//             <div className=" ">
//               {/* Left Side: PDF Preview + View Button */}
//               <div className="d-flex ">
//                 <div className="w-50  d-flex flex-column justify-content-center w-75  border-end border-secondary">
//                   <p className="">
//                     <span className="fw-normal text-white h4 fw-bold">
//                       <NotepadText className="text-warning" />{" "}
//                       {assignment.title}
//                     </span>
//                   </p>
//                   <p className="ms-4">
//                     <span className="fw-normal text-white-50">
//                       {assignment.description}
//                     </span>
//                   </p>
//                 </div>

//                 {assignment.filePath &&
//                   assignment.filePath.endsWith(".pdf") && (
//                     <>
//                       <div className="ms-3">
//                         <button
//                           className="btn bg-white border-black text-dark  fw-bold mt-2"
//                           onClick={() =>
//                             window.open(
//                               `http://localhost:5000${assignment.filePath}`,
//                               "_blank"
//                             )
//                           }
//                         >
//                           <ArrowBigDownDash className="text-black  fw-normal" />
//                           File
//                         </button>
//                       </div>
//                     </>
//                   )}
//               </div>
//             </div>

//             <hr className="text-white" />

//             <div className=" d-flex pt-2 justify-content-around">
//               <p className="fw-bold  text-secondary">
//                 <FaUser className="mb-1   ms-1  text-info" size={15} />
//                 <span className="fw-normal ms-1 text-secondary">
//                   {assignment.admin?.name || "N/A"}
//                 </span>
//               </p>

//               <p className=" text-white ">
//                 <CalendarDays
//                   className="mb-1 text-success    ms-1 me-1"
//                   size={17}
//                 />

//                 <span className="fw-normal text-secondary">
//                   {new Date(assignment.createdAt).toLocaleDateString()}
//                 </span>
//               </p>

//               <p className=" text-secondary">
//                 <span className="">
//                   <Clock className="mb-1 text-primary    ms-1 " size={17} />{" "}
//                   {new Date(assignment.createdAt).toLocaleTimeString()}
//                 </span>
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default StudentAssignmentList;

import React, { useEffect, useState } from "react";
import { useAuth } from "../store/authStore";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaCalendarDay, FaMagento, FaUser } from "react-icons/fa";
import {
  ArrowBigDownDash,
  BookOpen,
  CalendarDays,
  Clock,
  ClockFading,
  NotepadText,
  Search,
} from "lucide-react";

const StudentAssignmentList = () => {
  const { authorizationToken } = useAuth();
  const [assignments, setAssignments] = useState([]);
  const [filteredAssignments, setFilteredAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("newest");

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/auth/get-assignment",
          {
            method: "GET",
            headers: { Authorization: authorizationToken },
          }
        );
        if (!response.ok) throw new Error("Failed to fetch assignments");
        const data = await response.json();
        setAssignments(data);
        setFilteredAssignments(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAssignments();
  }, [authorizationToken]);

  useEffect(() => {
    let filtered = [...assignments];

    // Search
    if (searchTerm) {
      filtered = filtered.filter((a) =>
        [a.title, a.subject, a.description]
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
    }

    // Sort
    switch (sortOption) {
      case "newest":
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case "oldest":
        filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case "atoz":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "ztoa":
        filtered.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        break;
    }

    setFilteredAssignments(filtered);
  }, [searchTerm, sortOption, assignments]);

  if (loading) return <div className="text-white text-center">Loading...</div>;
  if (error)
    return <div className="text-danger text-center">Error: {error}</div>;
  if (assignments.length === 0)
    return <div className="text-white text-center">No assignments found.</div>;

  return (
    <div className="container d-flex flex-column h-auto bg-black">
      <h1 className="text-center text-white mb-5">Assignments</h1>

      {/* 🔍 Search and Sort Controls */}
      <div className="  px-3 w-100 mb-3  text-white ">
        <div className="d-flex  flex-md-row gap-5 search">
          <div className="w-50  d-flex border border-secondary rounded s-inp">
            <input
              type="text"
              className="form-control   w-md-75"
              placeholder="Search assignments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className=" mt-1 s-icon">
              <Search size={19} className="me-2" />
            </span>
          </div>
          <div className="w-25">
            {" "}
            <select
              className="dropdown border border-secondary text-secondary w-100 p-2 rounded border-secondary"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="newest" className="text-white">
                Newest First
              </option>
              <option value="oldest" className="text-white">
                Oldest First
              </option>
              <option value="atoz" className="text-white">
                A to Z
              </option>
              <option value="ztoa" className="text-white">
                Z to A
              </option>
            </select>
          </div>
        </div>
      </div>

      {/* Assignment Cards */}
      <div className="a-s d-flex flex-wrap w-100 mt-4 justify-content-around">
        {filteredAssignments.map((assignment) => (
          <div
            key={assignment.id}
            className="mb-4 p-3 border assignment asi border-secondary rounded"
          >
            {/* Top Section (Subject + Due Date) */}
            <div className="d-flex justify-content-between text-light mb-3">
              <p>
                <span className="fw-normal text-white fs-5 p-2 px-4 fw-bold">
                  <BookOpen className="subject" /> {assignment.subject}
                </span>
              </p>
              {assignment.dueDate && (
                <p className="due text-warning">
                  <ClockFading className="mb-1 ms-1" size={19} /> Due :{" "}
                  <span className="small text-danger">
                    {new Intl.DateTimeFormat("en-GB").format(
                      new Date(assignment.dueDate)
                    )}
                  </span>
                </p>
              )}
            </div>
            <hr className="text-white" />

            {/* Title & Description */}
            <div className="d-flex">
              <div className="w-75 border-end border-secondary pe-3">
                <p>
                  <span className="fw-normal text-white h4 fw-bold">
                    <NotepadText className="text-warning" /> {assignment.title}
                  </span>
                </p>
                <p className="ms-4 text-white-50">{assignment.description}</p>
              </div>

              {assignment.filePath && assignment.filePath.endsWith(".pdf") && (
                <div className="ms-3">
                  <button
                    className="btn bg-white border-black text-dark fw-bold mt-2"
                    onClick={() => window.open(assignment.filePath, "_blank")}
                  >
                    <ArrowBigDownDash className="text-black fw-normal" /> File
                  </button>
                </div>
              )}
            </div>

            <hr className="text-white" />

            {/* Admin + Date & Time Info */}
            <div className="d-flex pt-2 justify-content-around">
              <p className="fw-bold text-secondary">
                <FaUser className="mb-1 ms-1 text-info" size={15} />
                <span className="fw-normal ms-1 text-secondary">
                  {assignment.admin?.name || "N/A"}
                </span>
              </p>

              <p className="text-white">
                <CalendarDays
                  className="mb-1 text-success ms-1 me-1"
                  size={17}
                />
                <span className="fw-normal text-secondary">
                  {new Intl.DateTimeFormat("en-GB").format(
                    new Date(assignment.createdAt)
                  )}
                </span>
              </p>

              <p className="text-secondary">
                <Clock className="mb-1 text-primary ms-1" size={17} />{" "}
                {new Date(assignment.createdAt).toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentAssignmentList;
