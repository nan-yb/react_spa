const Sequelize = require("sequelize");

module.exports = class Member extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        userNo: {
          field: "user_no",
          type: Sequelize.BIGINT(19),
        },
        userId: {
          field: "user_id",
          type: Sequelize.STRING(50),
        },
        userPw: {
          field: "user_pw",
          type: Sequelize.STRING(200),
        },
        userName: {
          field: "user_name",
          type: Sequelize.STRING(100),
        },
        job: {
          type: Sequelize.STRING(3),
        },
        coin: {
          field: "coin",
          type: Sequelize.INTEGER(10),
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
        modelName: "Member",
        tableName: "Member",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  static associate(db) {
    db.Member.hasMany(db.MemberAuth);
  }
};
