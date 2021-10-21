"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Stock_movements extends Model {
    static associate(models) {
      // define association here
      Stock_movements.belongsTo(models.Articles, {
        foreignKey: "articleId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  Stock_movements.init(
    {
      entryDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      entryStock: {
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
      modelName: "Stock_movements",
    }
  );
  return Stock_movements;
};
