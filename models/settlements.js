const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Settlements extends Model {
    static associate(models) {
      // define association here
      Settlements.hasMany(models.Invoices, {
        foreignKey: "settlementId",
      });
    }
  }
  Settlements.init(
    {
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: "Settlements",
    }
  );
  return Settlements;
};
