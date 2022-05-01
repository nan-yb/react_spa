const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const Board = require("./board");
const Item = require("./item");

const db = {};
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.Board = Board;
db.Item = Item;

Board.init(sequelize);
Item.init(sequelize);

// Board.associate(db);

module.exports = db;
