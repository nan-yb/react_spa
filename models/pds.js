const Sequelize = require("sequelize");

module.exports = class Pds extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        itemId: {
          field: "item_id",
          type: Sequelize.BIGINT(19),
        },
        itemName: {
          field: "item_name",
          type: Sequelize.STRING(255),
          allowNull: true,
        },
        viewCnt: {
          field: "view_cnt",
          type: Sequelize.INTEGER(10),
          allowNull: true,
        },
        description: {
          field: "description",
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
        timestamps: true,
        underscored: false,
        modelName: "Pds",
        tableName: "Pds",
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
