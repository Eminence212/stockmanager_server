"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Commande extends Model {
    static associate(models) {
      // define association here
      Commande.belongsTo(models.Status, {
        as: "Statuses",
        foreignKey: "statusId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      Commande.hasMany(models.Distribution, {
        as: "Distributions",
        foreignKey: "commandeId",
      });
      Commande.hasMany(models.Facture, {
        as: "Factures",
        foreignKey: "commandeId",
      });
      Commande.belongsTo(models.Clients, {
        as: "Clients",
        foreignKey: "clientId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  Commande.init(
    {
      date_commande: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      statusId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      clientId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Commande",
    }
  );
  return Commande;
};
