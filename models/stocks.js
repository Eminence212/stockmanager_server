const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Stocks extends Model {
    static associate(models) {
      // define association here
      Stocks.belongsTo(models.Articles, {
        foreignKey: "articleId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  Stocks.init(
    {
      quantityStock: {
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
      modelName: "Stocks",
    }
  );
  return Stocks;
};
