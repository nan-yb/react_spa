const Sequelize = require("sequelize");

module.exports = class Board extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        board_no: {
          type: Sequelize.BIGINT(140),
          allowNull: false,
        },
        title: {
          type: Sequelize.STRING(255),
          allowNull: true,
        },
        content: {
          type: Sequelize.STRING(255),
          allowNull: true,
        },
        writer: {
          type: Sequelize.STRING(255),
          allowNull: true,
        },
        reg_date: {
          type: Sequelize.DATE,
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Board",
        tableName: "Board",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  // static associate(db) {
  // db.Board.belongsTo(db.User);
  // db.Board.belongsToMany(db.Hashtag, { through: 'PostHashtag' });
  // }
};
