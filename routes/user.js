const express = require("express");

// const { isLoggedIn } = require('./middlewares');
const {
  selectUser,
  createUser,
  deleteUser,
  updateUser,
  selectListUser,
  authUser,
  getMyInfo,
} = require("../controllers/user");

const router = express.Router();

router.get("/", selectListUser);
router.get("/myinfo", getMyInfo);
router.get("/:id", selectUser);

router.post("/setup", createUser);
router.post("/authenticate", authUser);
router.delete("/:id", deleteUser);
router.put("/:id", updateUser);

module.exports = router;
