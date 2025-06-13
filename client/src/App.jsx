import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import { Navbar } from "./component/Navbar";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import { ForgotPass } from "./pages/ForgotPass";
import { ResetPass } from "./pages/ResetPass";
import AddAssignment from "./pages/AddAssignment";
import AssignmentList from "./pages/AssingmentList";
import AddAdmin from "./pages/AddAdmin";
import StudentList from "./pages/StudentList";
import { AdminList } from "./pages/AdminList";
import Profile from "./pages/Profile";
import { Setting } from "./pages/Setting";
import StudentAssignmentList from "./pages/StudentAssignmentList";

// ✅ Import your auth store
import { useAuth } from "../src/store/authStore";

function App() {
  const { isLoggedIn } = useAuth((state) => state.isLoggedIn);

  return (
    <BrowserRouter>
      <Navbar>
        <Routes>
          <Route
            path="/login"
            element={isLoggedIn ? <Navigate to="/home" replace /> : <Login />}
          />
          <Route
            path="/register"
            element={
              isLoggedIn ? <Navigate to="/home" replace /> : <Register />
            }
          />

          {/* 🔓 Open or protected routes */}
          <Route path="/home" element={<Home />} />
          <Route path="/forgot-pass" element={<ForgotPass />} />
          <Route path="/reset-pass" element={<ResetPass />} />
          <Route path="/add-assignments" element={<AddAssignment />} />
          <Route path="/get-assignments" element={<AssignmentList />} />
          <Route path="/assignments" element={<StudentAssignmentList />} />
          <Route path="/add-admin" element={<AddAdmin />} />
          <Route path="/students" element={<StudentList />} />
          <Route path="/admin-list" element={<AdminList />} />
          <Route path="/profile" element={<Profile />}>
            <Route path="setting" element={<Setting />} />
          </Route>
        </Routes>
      </Navbar>
    </BrowserRouter>
  );
}

export default App;
