const express = require("express");

const {
  authCon,
  loginCon,
  userCon,
  register,
  getUserProfile,
  sendOtp,
  verifyOtp,
  resetPassword,
  getUser,
  changePass,
  updateUser,
  allUser,
  adminDashboard,
  studentDashboard,
} = require("../controller/authCon");

const { verifyToken } = require("../middleware/authMiddleeware");
const {
  AddAssignment,
  getAssignment,
  UpdateAssignment,
} = require("../controller/assignmentCon");
const { route } = require("./adminRoutes");

const router = express.Router();

router.get("/", authCon);
// ------------------------------------>>> auth apis
router.post("/register", register);
router.post("/login", loginCon);

// ------------------------------------>>> forgot password  apis
router.post("/forgot-password", sendOtp);
router.post("/otp", verifyOtp);
router.post("/reset-password", verifyToken, resetPassword);
router.patch("/change-password", verifyToken, changePass);

// ------------------------------------>>>  apis  for managing assignmate
router.post("/add-assignment", verifyToken, AddAssignment);
router.get("/get-assignment", verifyToken, getAssignment);
router.put("/update-assignment/:id", verifyToken, UpdateAssignment);

// ------------------------------------>>>  apis for the user and profile management
router.get("/user", verifyToken, userCon);

router.get("/admin-dashboard", verifyToken, adminDashboard);
router.get("/user-list", verifyToken, getUser);
router.put("/update-admin/:id", updateUser);
router.get("/alluser", verifyToken, allUser);

router.get("/profile", verifyToken, getUserProfile);
router.get("/students", verifyToken, studentDashboard);

module.exports = router;
