import express from "express";

import pageRouter from "./page";
import boardRouter from "./board";
import itemRouter from "./item";
import userRouter from "./user";
import apiRouter from "./api";
import codeGroupRouter from "./codegroup";
import codeDetailRouter from "./codedetail";

const router = express.Router();

router.use("/", pageRouter);
router.use("/boards", boardRouter);
router.use("/items", itemRouter);
router.use("/users", userRouter);
router.use("/api", apiRouter);
router.use("/codegroups", codeGroupRouter);
router.use("/codedetails", codeDetailRouter);

module.exports = router;
