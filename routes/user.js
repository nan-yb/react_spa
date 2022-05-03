const express = require("express");

// const { isLoggedIn } = require('./middlewares');
const {
  selectUser,
  createUser,
  deleteUser,
  updateUser,
  selectListUser,
} = require("../controllers/user");

const router = express.Router();

router.get("/", selectListUser);
router.get("/:id", selectUser);

router.post("/setup", createUser);
router.delete("/:id", deleteUser);
router.put("/:id", updateUser);

module.exports = router;
