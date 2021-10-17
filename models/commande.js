const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Commande extends Model {
    static associate(models) {
      // define association here
      Commande.belongsTo(models.Status, {
        foreignKey: "statusId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      Commande.hasMany(models.Distribution, {
        foreignKey: "commandeId",
      });
      Commande.hasMany(models.Facture, {
        foreignKey: "commandeId",
      });
      Commande.belongsTo(models.Client, {
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
