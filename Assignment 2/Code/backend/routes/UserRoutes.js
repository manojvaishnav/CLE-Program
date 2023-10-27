const express = require("express");
const {
  registerUser,
  loginUser,
  getUserDetail,
  logoutUser,
} = require("../controller/UserController");
const {verifyToken } = require('../config/CreateToken')
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", verifyToken, logoutUser);
router.get("/detail", verifyToken, getUserDetail);

module.exports = router;
