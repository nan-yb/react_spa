const express = require("express");
const jwt = require("jsonwebtoken");
// const { isLoggedIn } = require('./middlewares');
const {
  selectUser,
  createUser,
  deleteUser,
  updateUser,
  selectListUser,
  authUser,
  getMyInfo,
} = require("../controllers/user");

const router = express.Router();

router.get("/", selectListUser);
router.get("/myinfo", async (req, res, next) => {
  try {
    var authorization = req.headers["authorization"].trim();

    if (!authorization) {
      return res.send(false);
    }
    // const token = authorization.split(" ")[1];
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjEiLCJ1c2VySWQiOiIxMjMiLCJpYXQiOjE2NTIwMTM4NDEsImV4cCI6MTY1MjEwMDI0MSwiaXNzIjoic3BhRGV2ZWxvcCIsInN1YiI6ImF1dGgifQ.JFLbITKhOxfBNcDPCuU7NfPJ5_tsaBO11WCkdzkxNTE";
    const secret = req.app.get("secretCode");

    const { username, userId } = jwt.verify(token, secret);

    res.send({
      userName: username,
      userId: userId,
    });
  } catch (error) {
    console.log(error);
  }
});
router.get("/:id", selectUser);

router.post("/setup", createUser);
router.post("/authenticate", authUser);
router.delete("/:id", deleteUser);
router.put("/:id", updateUser);

module.exports = router;
