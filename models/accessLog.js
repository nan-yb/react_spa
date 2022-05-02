const Sequelize = require("sequelize");

module.exports = class AccessLog extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        logNo: {
          field: "log_no",
          type: Sequelize.BIGINT(19),
        },
        requestUri: {
          field: "request_uri",
          type: Sequelize.STRING(55),
          allowNull: true,
        },
        className: {
          field: "class_name",
          type: Sequelize.STRING(100),
          allowNull: true,
        },
        classSimpleName: {
          field: "class_simple_name",
          type: Sequelize.STRING(50),
          allowNull: true,
        },
        methodName: {
          field: "method_name",
          type: Sequelize.STRING(10),
          allowNull: true,
        },
        remoteAddr: {
          field: "remote_addr",
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
        timestamps: true,
        underscored: false,
        modelName: "AccessLog",
        tableName: "AccessLog",
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
