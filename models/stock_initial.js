"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Stock_initial extends Model {
    static associate(models) {
      // define association here
       Stock_initial.belongsTo(models.Article, {
         as: "Articles",
         foreignKey: "articleId",
         onDelete: "CASCADE",
         onUpdate: "CASCADE",
       });
    }
  }
  Stock_initial.init(
    {
      date_stock_initial: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      quantite_stock_initial: {
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
      modelName: "Stock_initial",
    }
  );
  return Stock_initial;
};
