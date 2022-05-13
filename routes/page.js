import { sequelize } from "../models";
import express from "express";
import CodeGroup from "../models/codeGroup";
import CodeDetail from "../models/codeDetail";

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
    const [result, metadata] = await sequelize.query(
      "SELECT GROUP_NAME AS label , GROUP_CODE AS value FROM CODEGROUP "
    );

    console.log(result);

    res.send(result);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
