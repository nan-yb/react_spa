const express = require("express");

const pageRouter = require("./page");
const boardRouter = require("./board");
const itemRouter = require("./item");
const userRouter = require("./user");
const apiRouter = require("./api");
const codeGroupRouter = require("./codegroup");
const codeDetailRouter = require("./codedetail");

const router = express.Router();

router.use("/", pageRouter);
router.use("/boards", boardRouter);
router.use("/items", itemRouter);
router.use("/users", userRouter);
router.use("/api", apiRouter);
router.use("/codegroups", codeGroupRouter);
router.use("/codedetails", codeDetailRouter);

module.exports = router;
