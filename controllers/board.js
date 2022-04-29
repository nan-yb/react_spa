const Board = require("../models/board");

exports.selectBoard = async (req, res, next) => {
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
    const board = await Board.create({
      title: req.board.title,
      writer: req.board.writer,
      content: req.board.content,
      reg_date: req.board.reg_date,
    });
    if (board) {
      res.send("success");
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
    await Board.destroy({ where: { id: req.params.board_no } });

    res.status(200).json({ BoardID: req.params.board_no });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
