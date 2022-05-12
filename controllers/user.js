const Member = require("../models/member");
const MemberAuth = require("../models/memberAuth");
const fs = require("fs");
const jwt = require("jsonwebtoken");

exports.selectUser = async (req, res, next) => {
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

exports.selectListUser = async (req, res, next) => {
  try {
    const user = await Member.findAll();
    res.send(user);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.createUser = async (req, res, next) => {
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

exports.createAdminUser = async (req, res, next) => {
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

exports.updateUser = async (req, res, next) => {
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

exports.deleteUser = async (req, res, next) => {
  try {
    await Member.destroy({ where: { userNo: req.params.id } });
    res.send({ userNo: req.params.id });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.showImage = async (req, res, next) => {
  try {
    const user = await Member.findOne({
      where: { user_id: req.query.userNo },
    });

    const prctureUrl = user.prctureUrl;
    fs.readFile(prctureUrl, function (err, data) {
      //http의 헤더정보를 클라이언트쪽으로 출력
      //image/jpg : jpg 이미지 파일을 전송한다
      //write 로 보낼 내용을 입력
      res.writeHead(200, { "Context-Type": "image/jpg" }); //보낼 헤더를 만듬
      res.write(data); //본문을 만들고
      res.end(); //클라이언트에게 응답을 전송한다
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.authUser = async (req, res, next) => {
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
      msg: "존재하지 않는 이메일",
    });
  }

  const correctPassword = loginUser.userPw;

  if (correctPassword !== password) {
    return res.send({
      error: true,
      msg: "비밀번호 불일치",
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
