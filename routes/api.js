const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.get("/myinfo", async (req, res, next) => {
  try {
    var authorization = req.headers["authorization"].trim();
    if (!authorization) {
      return res.send(false);
    }
    const token = authorization.split(" ")[1];
    const secret = req.app.get("secretCode");
    jwt.verify(token, secret, (err, data) => {
      if (err) {
        console.log(err);
      }

      res.status(200).send({
        userName: data.username,
        userId: data.userId,
        authList: data.authList,
      });
    });
  } catch (error) {}
});

module.exports = router;
