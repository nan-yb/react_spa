import express from "express";
import jwt from "jsonwebtoken";
import Member from "../models/member";

const router = express.Router();

router.get("/myinfo", async (req, res, next) => {
  try {
    var authorization = req.headers["authorization"].trim();
    if (!authorization) {
      return res.send(false);
    }
    const token = authorization.split(" ")[1];
    const secret = req.app.get("secretCode");

    jwt.verify(token, secret, async (err, data) => {
      if (err) {
        console.log(err);
      }

      const user = await Member.findOne({
        where: { user_id: data.userId },
      });

      console.log(user);

      res.status(200).send({
        userName: data.username,
        userId: data.userId,
        authList: [
          {
            auth: "ROLE_ADMIN",
          },
        ],
      });
    });
  } catch (error) {}
});

module.exports = router;
