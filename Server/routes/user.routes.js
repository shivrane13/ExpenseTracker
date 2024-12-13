const express = require("express");
const {
  createUser,
  loginUser,
  getLogedInUser,
  logoutUser,
} = require("../controllers/user.controller");
const router = express.Router();

router.get("/logedinuser", getLogedInUser);
router.post("/createuser", createUser);
router.post("/loginuser", loginUser);
router.post("/logoutUser", logoutUser);

module.exports = router;
