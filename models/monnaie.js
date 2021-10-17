"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Monnaie extends Model {
    static associate(models) {
      // define association here
      Monnaie.hasMany(models.Taux_jour, {
        as: "Taux_jours",
        foreignKey: "monnaieId",
      });
    }
  }
  Monnaie.init(
    {
      libelle_monnaie: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: "Monnaie",
    }
  );
  return Monnaie;
};
