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
  updateAdmin,
  updateUser,
  allUser,
  adminDashboard,
  studentDashboard,
} = require("../controller/authCon");
const { upload } = require("../middleware/fileMid");
const { verifyToken } = require("../middleware/authMiddleeware");
const {
  AddAssignment,
  getAssignment,
  updateAssingment,
  UpdateAssignment,
} = require("../controller/assignmentCon");
const { route } = require("./adminRoutes");

const router = express.Router();

router.get("/", authCon);

router.post("/register", register);
router.post("/login", loginCon);

router.post("/forgot-password", sendOtp);
router.post("/otp", verifyOtp);
router.post("/reset-password", verifyToken, resetPassword);

router.patch("/change-password", verifyToken, changePass);

router.post(
  "/add-assignment",
  verifyToken,
  upload.single("filePath"),
  AddAssignment
);
router.get("/get-assignment", verifyToken, getAssignment);

router.put(
  "/update-assignment/:id",
  verifyToken,
  upload.single("filePath"),
  UpdateAssignment
);

router.get("/user", verifyToken, userCon);

router.get("/profile", verifyToken, getUserProfile);

router.get("/user-list", verifyToken, getUser);

router.put("/update-admin/:id", updateUser);

router.get("/alluser", verifyToken, allUser);
module.exports = router;

router.get("/admin-dashboard", verifyToken, adminDashboard);
router.get("/students", verifyToken, studentDashboard);
