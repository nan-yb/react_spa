const Sequelize = require("sequelize");

module.exports = class PdsFile extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        pdsFileId: {
          field: "pds_file_id",
          type: Sequelize.BIGINT(19),
        },
        itemNo: {
          field: "item_no",
          type: Sequelize.BIGINT(255),
          allowNull: true,
        },
        fullName: {
          field: "full_name",
          type: Sequelize.STRING(200),
          allowNull: true,
        },
        downCnt: {
          field: "down_cnt",
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
        modelName: "PdsFile",
        tableName: "PdsFile",
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
