const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Procurements extends Model {
    static associate(models) {
      // define association here
      Procurements.belongsTo(models.Articles, {
        foreignKey: "articleId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      Procurements.belongsTo(models.Suppliers, {
        foreignKey: "supplierId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      Procurements.belongsTo(models.Units, {
        foreignKey: "unitId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  Procurements.init(
    {
      procurementDate: {
        type: DataTypes.DATE,
      },
      folio: DataTypes.STRING(50),
      supplyQuantity: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      purchasePrice: {
        type: DataTypes.FLOAT(24, 2),
        defaultValue: 0,
      },
      articleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      supplierId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      unitId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Procurements",
    }
  );
  return Procurements;
};
