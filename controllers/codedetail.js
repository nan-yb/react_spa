const CodeDetail = require("../models/codeDetail");

exports.fetchCodeDetail = async (req, res, next) => {
  try {
    const codeDetail = await CodeDetail.findOne({
      where: { group_code: req.params.id },
    });
    res.send(codeDetail);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.fetchCodeDetailList = async (req, res, next) => {
  try {
    const codeDetail = await CodeDetail.findAll();
    res.send(codeDetail);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.writeCodeDetail = async (req, res, next) => {
  try {
    let groupDefine = await CodeDetail.findOne({
      where: {
        groupCode: req.body.groupCode,
      },
    });

    if (!groupDefine) {
      res.send({ groupCode: "" });
    }

    const codeDetail = await CodeDetail.create({
      groupCode: req.body.groupCode,
      groupName: req.body.groupName,
      useYn: "Y",
    });

    if (codeDetail) {
      res.send({ groupCode: req.body.groupCode });
    } else {
      res.status(404).send("error");
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.modifyCodeDetail = async (req, res, next) => {
  try {
    await CodeDetail.update(
      {
        groupName: req.body.groupName,
      },
      {
        where: {
          groupCode: req.params.id,
        },
      }
    );
    res.send({ groupCode: req.params.id });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.removeCodeDetail = async (req, res, next) => {
  try {
    await CodeDetail.destroy({ where: { groupCode: req.params.id } });

    res.send({ groupCode: req.params.groupCode });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
