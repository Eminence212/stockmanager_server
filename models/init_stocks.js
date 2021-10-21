const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Init_stock extends Model {
    static associate(models) {
      // define association here
      Init_stock.belongsTo(models.Articles, {
        foreignKey: "articleId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  Init_stock.init(
    {
      entryDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      articleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Init_stocks",
    }
  );
  return Init_stock;
};
