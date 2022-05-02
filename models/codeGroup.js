const Sequelize = require("sequelize");

module.exports = class CodeGroup extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        groupCode: {
          field: "group_code",
          type: Sequelize.STRING(10),
        },
        groupName: {
          field: "group_bane",
          type: Sequelize.STRING(30),
        },
        useYn: {
          field: "use_yn",
          type: Sequelize.STRING(1),
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
        modelName: "CodeGroup",
        tableName: "CodeGroup",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  static associate(db) {
    db.CodeGroup.belongsTo(db.CodeDetail);
  }
};
