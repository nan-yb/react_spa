import express from "express";
// const { isLoggedIn } = require('./middlewares');
import {
  selectBoard,
  createBoard,
  deleteBoard,
  updateBoard,
  selectListBoard,
} from "../controllers/board";

const router = express.Router();

router.get("/", selectListBoard);
router.get("/:id", selectBoard);

router.post("/create", createBoard);
router.delete("/:id", deleteBoard);
router.put("/:id", updateBoard);

module.exports = router;
