"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Status extends Model {
    static associate(models) {
      // define association here
      Status.hasMany(models.Commande, {
        as: "Commandes",
        foreignKey: "statusId",
      });
    }
  }
  Status.init(
    {
      libelle_status: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: "Status",
    }
  );
  return Status;
};
