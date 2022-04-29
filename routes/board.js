const express = require("express");

// const { isLoggedIn } = require('./middlewares');
const {
  selectBoard,
  createBoard,
  deleteBoard,
  updateBoard,
  selectListBoard,
} = require("../controllers/board");

const router = express.Router();

router.get("/", selectListBoard);
router.get("/:id", selectBoard);

router.post("/create", createBoard);
router.delete("/:id", deleteBoard);
router.put("/:id", updateBoard);

module.exports = router;
