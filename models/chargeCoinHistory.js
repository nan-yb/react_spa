const Sequelize = require("sequelize");

module.exports = class ChargeCoinHistory extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        historyNo: {
          field: "history_no",
          type: Sequelize.BIGINT(19),
        },
        userNo: {
          field: "user_no",
          type: Sequelize.BIGINT(19),
          allowNull: true,
        },
        amount: {
          field: "amount",
          type: Sequelize.INTEGER(10),
          allowNull: true,
        },
        regDate: {
          field: "reg_date",
          type: Sequelize.DATE,
          defaultValue: new Date(),
        },
        updDate: {
          field: "upd_date",
          type: Sequelize.DATE,
          defaultValue: new Date(),
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "ChargeCoinHistory",
        tableName: "ChargeCoinHistory",
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
