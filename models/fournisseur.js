"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Fournisseur extends Model {
    static associate(models) {
      // define association here
      Fournisseur.hasMany(models.Approvisionnement, {
        as: "Approvisionnements",
        foreignKey: "fournisseurId",
      });
      Fournisseur.hasMany(models.Approvisionnement, {
        as: "Approvisionnements",
        foreignKey: "fournisseurId",
      });
    }
  }
  Fournisseur.init(
    {
      nom: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      contact: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: "Fournisseur",
    }
  );
  return Fournisseur;
};
