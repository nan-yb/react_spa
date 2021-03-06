import Sequelize from "sequelize";

module.exports = class CodeDetail extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        groupCode: {
          primaryKey: true,
          field: "group_code",
          type: Sequelize.STRING(10),
        },
        codeValue: {
          primaryKey: true,
          field: "code_value",
          type: Sequelize.STRING(10),
        },
        codeName: {
          field: "code_name",
          type: Sequelize.STRING(30),
        },
        sortSeq: {
          field: "sort_seq",
          type: Sequelize.INTEGER(10),
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
        timestamps: false,
        underscored: false,
        modelName: "CodeDetail",
        tableName: "CodeDetail",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  static associate(db) {
    db.CodeDetail.belongsTo(db.CodeGroup, {
      foreignKey: "group_code",
    });
  }
};
