import Sequelize from "sequelize";

module.exports = class PayCoinHistory extends Sequelize.Model {
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
        itemId: {
          field: "item_id",
          type: Sequelize.BIGINT(19),
          allowNull: true,
        },
        itemName: {
          field: "item_name",
          type: Sequelize.STRING(255),
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
        timestamps: false,
        underscored: false,
        modelName: "PayCoinHistory",
        tableName: "PayCoinHistory",
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
