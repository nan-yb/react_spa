import Sequelize from "sequelize";

module.exports = class PerformanceLog extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        logNo: {
          field: "log_no",
          type: Sequelize.BIGINT(19),
        },
        signatureName: {
          field: "signature_name",
          type: Sequelize.STRING(55),
          allowNull: true,
        },
        signatureTypeName: {
          field: "signature_type_name",
          type: Sequelize.STRING(100),
          allowNull: true,
        },
        durationTime: {
          field: "duration_time",
          type: Sequelize.BIGINT(19),
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
        modelName: "PerformanceLog",
        tableName: "PerformanceLog",
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
