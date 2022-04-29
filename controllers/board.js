const Board = require("../models/board");

exports.selectBoard = async (req, res, next) => {
  console.log(req.params);

  try {
    const board = await Board.findOne({
      where: { board_no: req.params.id },
    });
    res.send(board);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.selectListBoard = async (req, res, next) => {
  try {
    const board = await Board.findAll();
    res.send(board);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.createBoard = async (req, res, next) => {
  try {
    let maxBoardNo = await Board.max("board_no");

    if (!maxBoardNo) {
      maxBoardNo = 0;
    }
    maxBoardNo += 1;

    const board = await Board.create({
      boardNo: maxBoardNo,
      title: req.body.title,
      writer: req.body.writer,
      content: req.body.content,
    });

    if (board) {
      res.send({ boardNo: maxBoardNo });
    } else {
      res.status(404).send("error");
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.updateBoard = async (req, res, next) => {
  try {
    await Board.update(
      {
        content: req.board.content,
      },
      {
        where: {
          id: req.params.board_no,
          writer: req.board.writer,
        },
      }
    );

    res.send("success");
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.deleteBoard = async (req, res, next) => {
  try {
    await Board.destroy({ where: { id: req.params.id } });

    res.status(200).json({ BoardID: req.params.id });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
