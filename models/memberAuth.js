import Sequelize from "sequelize";

module.exports = class MemberAuth extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        userAuthNo: {
          primaryKey: true,
          field: "user_auth_no",
          type: Sequelize.BIGINT(19),
        },
        userNo: {
          field: "user_no",
          type: Sequelize.BIGINT(19),
        },
        auth: {
          field: "auth",
          type: Sequelize.STRING(50),
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
        modelName: "MemberAuth",
        tableName: "MemberAuth",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  static associate(db) {
    db.MemberAuth.belongsTo(db.Member);
  }
};
