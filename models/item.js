import Sequelize from "sequelize";

module.exports = class Item extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        itemId: {
          field: "item_id",
          type: Sequelize.BIGINT(19),
        },
        itemName: {
          field: "item_name",
          type: Sequelize.STRING(50),
          allowNull: true,
        },
        price: {
          type: Sequelize.INTEGER(255),
          allowNull: true,
        },
        description: {
          type: Sequelize.STRING(255),
          allowNull: true,
        },
        pictureUrl: {
          field: "picture_url",
          type: Sequelize.STRING(255),
        },
        previewUrl: {
          field: "preview_url",
          type: Sequelize.STRING(255),
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
        modelName: "Item",
        tableName: "Item",
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
