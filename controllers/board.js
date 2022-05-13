import Board from "../models/board";

export const selectBoard = async (req, res, next) => {
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

export const selectListBoard = async (req, res, next) => {
  try {
    const board = await Board.findAll();
    res.send(board);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const createBoard = async (req, res, next) => {
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

export const updateBoard = async (req, res, next) => {
  try {
    await Board.update(
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

export const deleteBoard = async (req, res, next) => {
  try {
    await Board.destroy({ where: { id: req.params.id } });

    res.send({ boardNo: req.params.boardNo });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
