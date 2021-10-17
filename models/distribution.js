"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Distribution extends Model {
    static associate(models) {
      // define association here
      Distribution.belongsTo(models.Article, {
        as: "Articles",
        foreignKey: "articleId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      Distribution.belongsTo(models.Commande, {
        as: "Commandes",
        foreignKey: "commandeId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  Distribution.init(
    {
      date_distribution: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      quantite_distribuee: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      commandeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      articleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Distribution",
    }
  );
  return Distribution;
};
