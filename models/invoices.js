const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Invoices extends Model {
    static associate(models) {
      // define association here
      Invoices.belongsTo(models.Settlements, {
        foreignKey: "settlementId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      Invoices.belongsTo(models.Commands, {
        foreignKey: "commandId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  Invoices.init(
    {
      internalNumber: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
      invoiceDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      receiptNumber: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      settlementId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      commandId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Invoices",
    }
  );
  return Invoices;
};
