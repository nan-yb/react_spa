import Member from "../models/member";
import MemberAuth from "../models/memberAuth";
import fs from "fs";
import jwt from "jsonwebtoken";

export const selectUser = async (req, res, next) => {
  try {
    const user = await Member.findOne({
      where: { user_id: req.params.id },
    });

    console.log(user);

    res.send(user);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const selectListUser = async (req, res, next) => {
  try {
    const user = await Member.findAll();
    res.send(user);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const createUser = async (req, res, next) => {
  try {
    let maxUserNo = await Member.max("userNo");

    if (!maxUserNo) {
      maxUserNo = 0;
    }
    maxUserNo += 1;

    const user = await Member.create({
      userNo: maxUserNo,
      userId: req.body.userId,
      userPw: req.body.userPw,
      userName: req.body.userName,
      job: req.body.job,
      coin: req.body.coin,
    });

    if (user) {
      res.send({ userNo: maxUserNo });
    } else {
      res.status(404).send("error");
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const createAdminUser = async (req, res, next) => {
  try {
    let maxUserNo = await Member.max("userNo");

    if (!maxUserNo) {
      maxUserNo = 0;
    }
    maxUserNo += 1;

    const user = await Member.create({
      userNo: maxUserNo,
      userId: req.body.userId,
      userPw: req.body.userPw,
      userName: req.body.userName,
      job: req.body.job,
      coin: req.body.coin,
    });

    // const userAuth = await MemberAuth.create({

    // })

    if (user) {
      res.send({ userNo: maxUserNo });
    } else {
      res.status(404).send("error");
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const userParam = JSON.parse(req.body.user);

    await Member.update(
      {
        UserName: userParam.UserName,
        price: userParam.price,
        description: userParam.description,
        prctureUrl: req.file.path,
      },
      {
        where: {
          description: userParam.userNo,
        },
      }
    );
    res.send({ userNo: req.params.userNo });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    await Member.destroy({ where: { userNo: req.params.id } });
    res.send({ userNo: req.params.id });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const showImage = async (req, res, next) => {
  try {
    const user = await Member.findOne({
      where: { user_id: req.query.userNo },
    });

    const prctureUrl = user.prctureUrl;
    fs.readFile(prctureUrl, function (err, data) {
      //http??? ??????????????? ???????????????????????? ??????
      //image/jpg : jpg ????????? ????????? ????????????
      //write ??? ?????? ????????? ??????
      res.writeHead(200, { "Context-Type": "image/jpg" }); //?????? ????????? ??????
      res.write(data); //????????? ?????????
      res.end(); //????????????????????? ????????? ????????????
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const authUser = async (req, res, next) => {
  const { username, password } = req.query;

  const loginUser = await Member.findOne({
    where: { user_id: username },
    include: [
      {
        model: MemberAuth,
        attributes: ["user_auth_no", "auth"],
      },
    ],
  });

  if (!loginUser) {
    return res.send({
      error: true,
      msg: "???????????? ?????? ?????????",
    });
  }

  const correctPassword = loginUser.userPw;

  if (correctPassword !== password) {
    return res.send({
      error: true,
      msg: "???????????? ?????????",
    });
  }

  const secret = req.app.get("secretCode");

  const token = jwt.sign(
    {
      username: loginUser.userName,
      userId: loginUser.userId,
      authList: loginUser.MemberAuths,
    },
    secret
  );

  res.status(200).header("authorization", token).send();
};
