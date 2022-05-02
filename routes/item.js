const express = require("express");
const path = require("path");
const fs = require("fs");
const multer = require("multer");

try {
  fs.readdirSync("uploads");
} catch (error) {
  console.error("uploads 폴더가 없어 uploads 폴더를 생성합니다.");
  fs.mkdirSync("uploads");
}

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, "uploads/");
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

const {
  selectItem,
  createItem,
  deleteItem,
  updateItem,
  selectListItem,
  showImage,
} = require("../controllers/Item");

const router = express.Router();

router.get("/", selectListItem);
router.get("/display/", showImage);
router.get("/:id", selectItem);

router.post("/", upload.single("file"), createItem);
router.delete("/:id", deleteItem);
router.put("", updateItem);

module.exports = router;
