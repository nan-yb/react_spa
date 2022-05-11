const express = require("express");

const {
  fetchCodeGroup,
  writeCodeGroup,
  removeCodeGroup,
  modifyCodeGroup,
  fetchCodeGroupList,
} = require("../controllers/codegroup");

const router = express.Router();

router.get("/", fetchCodeGroupList);
router.get("/:id", fetchCodeGroup);

router.post("/", writeCodeGroup);
router.delete("/:id", removeCodeGroup);
router.put("/:id", modifyCodeGroup);

module.exports = router;
