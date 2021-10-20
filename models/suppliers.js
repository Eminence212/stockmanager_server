const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Suppliers extends Model {
    static associate(models) {
      // define association here
      Suppliers.hasMany(models.Procurements, {
        foreignKey: "supplierId",
      });
    }
  }
  Suppliers.init(
    {
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      contact: {
        type: DataTypes.STRING(15),
        unique: true,
      },
    },
    {
      sequelize,
      modelName: "Suppliers",
    }
  );
  return Suppliers;
};
