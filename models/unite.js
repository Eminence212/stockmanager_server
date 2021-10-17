"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Unite extends Model {
    static associate(models) {
      // define association here
      Unite.hasMany(models.Approvisionnement, {
        as: "Approvisionnements",
        foreignKey: "uniteId",
      });
    }
  }
  Unite.init(
    {
      libelle_unite: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: "Unite",
    }
  );
  return Unite;
};
