const express = require("express");

// const { isLoggedIn } = require('./middlewares');
const {
  selectBoard,
  createBoard,
  deleteBoard,
  updateBoard,
} = require("../controllers/board");

const router = express.Router();

router.get("/:id/", selectBoard);
router.post("/create", createBoard);
router.delete("/delete/:id", deleteBoard);
router.put("/update/:id", updateBoard);

module.exports = router;
