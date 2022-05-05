const Sequelize = require("sequelize");

module.exports = class Notice extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        noticeNo: {
          field: "notice_no",
          type: Sequelize.BIGINT(140),
        },
        title: {
          type: Sequelize.STRING(255),
          allowNull: true,
        },
        content: {
          type: Sequelize.STRING(255),
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
        modelName: "Notice",
        tableName: "Notice",
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
