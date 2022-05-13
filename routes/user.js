import express from "express";

// const { isLoggedIn } = require('./middlewares');
import {
  selectUser,
  createAdminUser,
  createUser,
  deleteUser,
  updateUser,
  selectListUser,
  authUser,
  getMyInfo,
} from "../controllers/user";

const router = express.Router();

router.get("/", selectListUser);
router.get("/:id", selectUser);

router.post("/setup", createAdminUser);
router.post("/authenticate", authUser);
router.post("/", createUser);
router.delete("/:id", deleteUser);
router.put("/:id", updateUser);

module.exports = router;
