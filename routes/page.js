import { sequelize } from "../models";
import express from "express";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    res.status(200).send("");
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
