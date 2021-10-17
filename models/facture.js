"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Facture extends Model {
    static associate(models) {
      // define association here
      Facture.belongsTo(models.Modere_reglement, {
        foreignKey: "reglementId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      Facture.belongsTo(models.Commande, {
        foreignKey: "commandeId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  Facture.init(
    {
      numero_interne: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
      date_facture: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      numero_recu: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
      reglementId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      commandeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Facture",
    }
  );
  return Facture;
};
