const express = require("express");

const {
  fetchCodeDetail,
  writeCodeDetail,
  removeCodeDetail,
  modifyCodeDetail,
  fetchCodeDetailList,
} = require("../controllers/codedetail");

const router = express.Router();

router.get("/", fetchCodeDetailList);
router.get("/:id", fetchCodeDetail);

router.post("/", writeCodeDetail);
router.delete("/:id", removeCodeDetail);
router.put("/:id", modifyCodeDetail);

module.exports = router;
