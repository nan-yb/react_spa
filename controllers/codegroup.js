const CodeGroup = require("../models/codeGroup");

exports.fetchCodeGroup = async (req, res, next) => {
  try {
    const codeGroup = await CodeGroup.findOne({
      where: { board_no: req.params.id },
    });
    res.send(codeGroup);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.fetchCodeGroupList = async (req, res, next) => {
  try {
    const codeGroup = await CodeGroup.findAll();
    res.send(codeGroup);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.writeCodeGroup = async (req, res, next) => {
  try {
    let maxCodeGroupNo = await CodeGroup.max("board_no");

    if (!maxCodeGroupNo) {
      maxCodeGroupNo = 0;
    }
    maxCodeGroupNo += 1;

    const codeGroup = await CodeGroup.create({
      boardNo: maxCodeGroupNo,
      title: req.body.title,
      writer: req.body.writer,
      content: req.body.content,
    });

    if (codeGroup) {
      res.send({ boardNo: maxCodeGroupNo });
    } else {
      res.status(404).send("error");
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.modifyCodeGroup = async (req, res, next) => {
  try {
    await CodeGroup.update(
      {
        title: req.body.title,
        content: req.body.content,
      },
      {
        where: {
          boardNo: req.params.id,
        },
      }
    );
    res.send({ boardNo: req.params.boardNo });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.removeCodeGroup = async (req, res, next) => {
  try {
    await CodeGroup.destroy({ where: { id: req.params.id } });

    res.send({ boardNo: req.params.boardNo });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
