const Sequelize = require("sequelize");

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
        prctureUrl: {
          field: "prcture_url",
          type: Sequelize.STRING(255),
        },
      },
      {
        sequelize,
        timestamps: true,
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
