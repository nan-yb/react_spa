const CodeGroup = require("../models/codeGroup");

const express = require("express");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    res.send("1");
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get("/codes/codeGroup", async (req, res, next) => {
  try {
    const codeGroup = await CodeGroup.findAll();
    res.send(codeGroup);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
