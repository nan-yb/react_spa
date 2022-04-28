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
    const user = await Board.findOne({ where: { id: req.user.id } });
    if (user) {
      await user.addFollowing(parseInt(req.params.id, 10));
      res.send("success");
    } else {
      res.status(404).send("no user");
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.updateBoard = async (req, res, next) => {
  try {
    const user = await Board.findOne({ where: { id: req.user.id } });
    if (user) {
      await user.addFollowing(parseInt(req.params.id, 10));
      res.send("success");
    } else {
      res.status(404).send("no user");
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.deleteBoard = async (req, res, next) => {
  try {
    const user = await Board.findOne({ where: { id: req.user.id } });
    if (user) {
      await user.addFollowing(parseInt(req.params.id, 10));
      res.send("success");
    } else {
      res.status(404).send("no user");
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};
