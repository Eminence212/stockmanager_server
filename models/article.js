"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    static associate(models) {
      // define association here
      Article.belongsTo(models.Article, {
        as: "Articles",
        foreignKey: "familleId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      Article.hasMany(models.Distribution, {
        as: 'Distributions',
        foreignKey:'articleId'
      })
       Article.hasMany(models.Mouvement_stock, {
         as: "Mouvement_stocks",
         foreignKey: "articleId",
       });
        Article.hasMany(models.Stock, {
          as: "Stocks",
          foreignKey: "articleId",
        });
       Article.hasMany(models.Stock_initial, {
         as: "Stock_initials",
         foreignKey: "articleId",
       });
       Article.hasMany(models.Approvisionnement, {
         as: "Approvisionnements",
         foreignKey: "articleId",
       });
    }
  }
  Article.init(
    {
      reference: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
      designation: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      prix_vente: {
        type: DataTypes.FLOAT(24, 6),
        allowNull: false,
        defaultValue: 0.0,
      },
      tva: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0.0,
      },
      seuil_reapprovisionnement: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      quante_min: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      familleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Article",
    }
  );
  return Article;
};
