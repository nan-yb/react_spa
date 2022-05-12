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
router.get("/:groupCode/:codeValue", fetchCodeDetail);

router.post("/", writeCodeDetail);
router.delete("/:groupCode/:codeValue", removeCodeDetail);
router.put("/:groupCode/:codeValue", modifyCodeDetail);

module.exports = router;
